from rest_framework import serializers
from account.models import User,AccessibilityNeed
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth.password_validation import validate_password 
from account.utils import Util

class AccessibilityNeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessibilityNeed
        fields = ['value', 'name']

class UserRegistrationSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(
    #     write_only=True, 
    #     required=True, 
    #     validators=[validate_password],
    #     style={'input_type': 'password'}
    # )
    # password2 = serializers.CharField(
    #     write_only=True, 
    #     required=True,
    #     style={'input_type': 'password'}
    # )
    # accessibility_needs = serializers.ListField(
    #     child=serializers.CharField(),
    #     required=False,
    #     write_only=True
    # )
    # tc = serializers.BooleanField(required=True)

    class Meta:
            model=User
            fields=['email','password','password2','tc','has_accessibility_needs','accessibility_needs','other_accessibility_need']
            extra_kwargs = {
                'password': {'write_only': True, 'min_length': 5},
            }

            def validate(self, attrs):
                password=attrs.get('password')
                password2=attrs.get('password2')
                if password!=password2:
                    raise serializers.ValidationError({'Password and Confirm Password do not match'})
                return attrs
        
        #     def create(self, validate_data):
        #         accessibility_needs = validate_data.pop('accessibility_needs', [])

        #         user = User.objects.create_user(
        #         email=validate_data['email'],
        #         username=validate_data['username'],
        #         password=validate_data['password'],
        #         tc=validate_data['tc'],
        #         has_accessibility_needs=validate_data.get('has_accessibility_needs', False),
        #         other_accessibility_need=validate_data.get('other_accessibility_need', '')
        # )

        #         if User.has_accessibility_needs:
        #             for need_value in accessibility_needs:
        #                 need, _ = AccessibilityNeed.objects.get_or_create(
        #                     value=need_value,
        #                     defaults={'name': need_value.replace('_', ' ').title()}
        #                 )
        #                 User.accessibility_needs.add(need)
        #         return User.objects.create_user(**validate_data)
            
            
    
class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','email']


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')  

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Password and Confirm Password do not match'}
            )

        user.set_password(password)
        user.save()

        return attrs
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        fields=['email']
    
    def validate(self, attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uid=urlsafe_base64_encode(force_bytes(user.id))
            print('encoded uid:',uid)
            token=PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token',token)
            link='http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('pass reset link:',link)
            #email send
            data={
                'subject':'Reset Your Password',
                'body':f'Please use this link to reset your password {link}',
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError({'You are not a registered user'})
    
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')  
            token = self.context.get('token')  

            if password != password2:
                raise serializers.ValidationError(
                    {'password': 'Password and Confirm Password do not match'}
                )

            id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError({'token is invalid'})
            
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError({'token is invalid'})



