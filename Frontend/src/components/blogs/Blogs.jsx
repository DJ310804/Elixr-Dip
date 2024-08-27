import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThemeToggler from '../theme/ThemeToggler';
import { removeBlog } from '../../features/blogs/blogSlice';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs.blogs || []);
  const theme = useSelector((state) => state.theme.theme); // Get the current theme
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeBlog(id));
  };

  const handleUpdate = (id) => {
    console.log(`Update blog with id: ${id}`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  if (!blogs.length) {
    return <p className="text-center text-base">No blogs available.</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center text-base">Blogs</h1>
      <div className="space-y-6 px-4 md:px-8">
        {blogs.map((blog) => (
          <section
            key={blog.id}
            className={`p-6 border border-base hover:shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="md:w-64">
                  <span className="font-semibold title-font">
                    Category: {blog.category || 'Not known'}
                  </span>
                  <br />
                  <span className="mt-1 text-sm">12 Jun 2019</span>
                </div>
              </div>
              <div className="md:flex-grow md:mr-4">
                <h2 className="text-2xl font-medium title-font mb-2">
                  {blog.title}
                </h2>
                <p className="leading-relaxed">
                  {truncateText(blog.intro, 150)}
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-indigo-500 inline-flex items-center mt-4 cursor-pointer hover:underline"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              <div className="mt-4 md:mt-0 md:ml-auto flex items-center space-x-4">
                <div
                  onClick={() => handleDelete(blog.id)}
                  className="cursor-pointer"
                >
                  <svg
                    className="h-8 w-8 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
                <div
                  onClick={() => handleUpdate(blog.id)}
                  className="cursor-pointer"
                >
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Blogs;
