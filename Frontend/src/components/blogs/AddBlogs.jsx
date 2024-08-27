import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../features/blogs/blogSlice';

const AddBlogs = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [img, setImg] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addBlog({ title, intro, img }));

        setTitle('');
        setIntro('');
        setImg(null);
    };

    return (
        <div className="flex items-center justify-center p-4">
        <form onSubmit={handleSubmit}>
            <div className='card bg-base-100 max-w-md w-full shadow-xl flex flex-col  justify-center p-4'>
            <div>
                <label htmlFor="title" className='card-title '>Title:</label>
                <input type="text"
                       placeholder="Type here"
                       class="input input-bordered input- w-full max-w-xs"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="intro" className='card-title'>Introduction:</label>
                <textarea
                    placeholder="Type here"
                    class="input input-bordered input- w-full max-w-xs" 
                    id="intro"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="img" className='card-title p-1' >Upload Image:</label>
                <input className='file-input file-input-xs w-full max-w-xs '
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <button className='btn btn-primary m-4' type="submit card-actions ">Add Blog</button>
            </div>
        </form>
        </div>
    );
};

export default AddBlogs;
