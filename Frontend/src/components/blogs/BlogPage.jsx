import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return <p className="text-center text-base">Blog not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="../blogs" className="text-indigo-500 hover:underline mb-4 inline-block">
        Back to Blogs
      </Link>
      <div className="bg-base shadow-md rounded-lg overflow-hidden">
        {blog.img && (
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 mb-4">{blog.intro}</p>
          <div className="prose">
            <p>{blog.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
