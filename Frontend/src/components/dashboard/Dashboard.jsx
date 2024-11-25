import React from 'react'
import { NavLink } from 'react-router-dom';
import backgroundImage from '/src/assets/image7.jpg'; // Adjust the path as necessary

export default function Dashboard() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use imported image
        backgroundSize: 'cover', // Ensures the image covers the entire container
        backgroundPosition: 'center', // Centers the image in the container
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        display: 'flex', // Use flexbox to position items
        flexDirection: 'column'
      }}
    >
      {/* Main content area */}
      <div className="flex-1 p-4">
        {/* Navbar (optional) */}
        {/* <Navbar /> */}
        {/* Theme Toggler (optional) */}
        {/* <ThemeToggler /> */}
      </div>

      {/* Hero Section */}
      <section className="body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="mask mask-squircle" src="\src\assets\Elixir_landing.webp" alt="Hero" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">Fight against Boycott</h1>
            <p className="mb-8 leading-relaxed">Making friends has become easier and more convenient than ever before.</p>
            <div className="flex justify-center">
              <button className="inline-flex btn btn-primary border-0 py-2 px-6 focus:outline-none rounded text-lg">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Swap Section */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-5 py-24">
          <div className="flex flex-wrap -m-1 md:-m-2">
            {/* First Column with Image Swap */}
            <div className="flex flex-wrap w-full md:w-1/2 p-2">
              <div className="relative w-full h-96 overflow-hidden group">
                <img
                  src="/src/assets/Lonely.jpg"
                  alt="Lonely"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                  src="/src/assets/VideoCallChill.jpg"
                  alt="VideoCallChill"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
            {/* Second Column */}
            <div className="flex flex-wrap w-full md:w-1/2 p-2">
              {/* Top Large Image */}
              <div className="relative w-full h-96 overflow-hidden group">
                <img
                  src="src/assets/Breakup.jpg"
                  alt="Breakup"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                  src="/src/assets/Patchup.webp"
                  alt="Patchup"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
            {/* Full Width Image with Swap */}
            <div className="flex flex-wrap w-full p-2">
              <div className="relative w-full h-96 overflow-hidden group">
                <img
                  src="/src/assets/shutterstock_1977447137.jpg"
                  alt="LonelyParent"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <img
                  src="/src/assets/HappyOldParents.webp"
                  alt="HappyOldParents"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium mb-1">CATEGORY</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Confessions</h1>
                <p className="leading-relaxed mb-3">Chat with some purpose or some confession which you can't make to anybody else.</p>
                <a className="inline-flex items-center btn btn-primary">Lessgo
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium mb-1">CATEGORY</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium mb-3">Opinions</h1>
                <p className="leading-relaxed mb-3">Give an opinion you always wanted to give but had no one to listen to. Read other's opinion and react to them.</p>
                <a className="inline-flex items-center btn btn-primary">In in
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium mb-1">CATEGORY</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium mb-3">Chill</h1>
                <p className="leading-relaxed mb-3">Chill with random strangers of your interest and have meaningful conversations.</p>
                <a className="inline-flex items-center btn btn-primary">Can't wait
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
