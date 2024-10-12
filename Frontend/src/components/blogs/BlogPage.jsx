import React, { useState } from 'react';
import { Calendar, Clock, User, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const BlogPage = () => {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  // Sample post data
  const post = {
    id: 1,
    title: "The Future of Artificial Intelligence in Web Development",
    content: `
      <p>Artificial Intelligence (AI) is rapidly transforming various industries, and web development is no exception. As we move towards more intelligent and adaptive web applications, AI is playing an increasingly crucial role in shaping the future of how we build and interact with websites.</p>

      <h2>1. Personalized User Experiences</h2>
      <p>AI algorithms can analyze user behavior and preferences to create highly personalized experiences. Websites can dynamically adjust their content, layout, and functionality based on individual user needs, leading to improved engagement and conversion rates.</p>

      <h2>2. Intelligent Chatbots and Virtual Assistants</h2>
      <p>AI-powered chatbots are becoming more sophisticated, offering natural language processing capabilities that can understand and respond to user queries more effectively. These virtual assistants can provide 24/7 support, handle complex interactions, and even learn from each conversation to improve their performance over time.</p>

      <h2>3. Automated Design and Development</h2>
      <p>AI tools are emerging that can generate code, create layouts, and even design entire websites based on simple text descriptions or by analyzing existing designs. While these tools won't replace human developers, they can significantly speed up the development process and allow developers to focus on more complex tasks.</p>

      <h2>Conclusion</h2>
      <p>As AI continues to evolve, its impact on web development will only grow. Developers who embrace these technologies and learn to integrate them into their workflows will be well-positioned to create the next generation of intelligent, adaptive, and user-centric web applications.</p>
    `,
    author: "Jane Doe",
    authorAvatar: "/api/placeholder/100/100",
    date: "2024-10-15",
    readTime: "5 min read",
    imageUrl: "/api/placeholder/1200/600",
    tags: ["AI", "Web Development", "Future Tech"]
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-base-200 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <article className="card bg-base-100 shadow-xl">
          <figure>
            <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={post.authorAvatar} alt={post.author} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <div className="text-sm text-base-content/70">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
              <div className="text-sm text-base-content/70">
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {post.readTime}
                </span>
              </div>
            </div>
            <div className="divider"></div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="badge badge-primary">{tag}</span>
                ))}
              </div>
            </div>
            <div className="card-actions justify-between items-center mt-8">
              <div className="flex space-x-4">
                <button className={`btn btn-outline ${isLiked ? 'btn-primary' : ''}`} onClick={handleLike}>
                  <ThumbsUp size={20} className="mr-2" />
                  {likes} Likes
                </button>
                <button className="btn btn-outline">
                  <MessageCircle size={20} className="mr-2" />
                  Comments
                </button>
              </div>
              <button className="btn btn-outline">
                <Share2 size={20} className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;