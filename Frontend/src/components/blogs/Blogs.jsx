import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // Sample blog data - in a real application, this would typically come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and start building your first component-based application.",
      author: "Jane Doe",
      date: "2024-10-05",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      excerpt: "Explore cutting-edge CSS features and how to use them in your web projects.",
      author: "John Smith",
      date: "2024-10-08",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "The Future of Web Development",
      excerpt: "Discover upcoming trends and technologies shaping the future of web development.",
      author: "Alice Johnson",
      date: "2024-10-11",
      imageUrl: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Your Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="card-actions justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  By {post.author} on {post.date}
                </div>
                <Link to="/blog">
                <button className="btn btn-primary">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;