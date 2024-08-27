import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { toggleSidebar } from '../../../features/chat/ChatSlice';

const Sidebar = () => {
  const isOpen = useSelector((state) => state.chat.sidebarOpen);
  const dispatch = useDispatch();

  return createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 1000 }} // Ensure the overlay is above all other elements
    >
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-base-100 shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 1100 }} // Ensure the sidebar is above the overlay
      >
        <div className="p-4">
          <button
            className="p-2 rounded-full bg-base-200 text-base-800 hover:bg-base-300"
            onClick={() => dispatch(toggleSidebar())}
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mt-4 text-base-800">Sidebar</h2>
          <nav className="mt-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block p-2 rounded hover:bg-base-200 text-base-800"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="block p-2 rounded hover:bg-base-200 text-base-800"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block p-2 rounded hover:bg-base-200 text-base-800"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  Skip
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>,
    document.body // Render the sidebar at the root of the document
  );
};

export default Sidebar;
