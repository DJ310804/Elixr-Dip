import React, { useState, useEffect } from 'react';
import { AlertCircle, Edit, Trash, Save, X, Plus, Minus, Music, Video, Image } from 'lucide-react';

const BlogPostCreator = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState(['']);
  const [additionalSections, setAdditionalSections] = useState([{ title: '', content: '' }]);
  const [media, setMedia] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const categories = ['Technology', 'Health', 'Finance', 'Travel']; // Sample categories

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic (add or update post)
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    setTags([...tags, '']);
  };

  const handleAdditionalSectionChange = (index, field, value) => {
    const newSections = [...additionalSections];
    newSections[index][field] = value;
    setAdditionalSections(newSections);
  };

  const handleRemoveAdditionalSection = (index) => {
    setAdditionalSections(additionalSections.filter((_, i) => i !== index));
  };

  const handleAddAdditionalSection = () => {
    setAdditionalSections([...additionalSections, { title: '', content: '' }]);
  };

  const handleMediaChange = (index, field, value) => {
    const newMedia = [...media];
    newMedia[index][field] = value;
    setMedia(newMedia);
  };

  const handleRemoveMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleAddMedia = (type) => {
    setMedia([...media, { type, url: '', description: '' }]);
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    setTags(post.tags);
    setAdditionalSections(post.additionalSections);
    setMedia(post.media);
    setEditingId(post.id);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setTags(['']);
    setAdditionalSections([{ title: '', content: '' }]);
    setMedia([]);
    setEditingId(null);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || post.category === filterCategory)
  );

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="container mx-auto p-4 bg-base-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-base-800">Advanced Blog Post Creator</h1>
      
      <div className="bg-base rounded-lg shadow-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter post title"
                className="input input-bordered w-full bg-base-50 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered w-full bg-base-50 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Content</span>
            </label>
            <textarea
              placeholder="Enter post content"
              className="textarea textarea-bordered h-32 bg-base-50 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Tags</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Enter tag"
                    className="input input-bordered input-sm bg-base-50 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <button type="button" className="btn btn-ghost btn-sm ml-1" onClick={() => handleRemoveTag(index)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm" onClick={handleAddTag}>
                <Plus size={16} className="mr-1" /> Add Tag
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Additional Sections</span>
            </label>
            {additionalSections.map((section, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-base-50 shadow-sm">
                <input
                  type="text"
                  placeholder="Section Title"
                  className="input input-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={section.title}
                  onChange={(e) => handleAdditionalSectionChange(index, 'title', e.target.value)}
                />
                <textarea
                  placeholder="Section Content"
                  className="textarea textarea-bordered w-full h-24 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={section.content}
                  onChange={(e) => handleAdditionalSectionChange(index, 'content', e.target.value)}
                ></textarea>
                <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={() => handleRemoveAdditionalSection(index)}>
                  <Minus size={16} className="mr-1" /> Remove Section
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline btn-sm mt-2" onClick={handleAddAdditionalSection}>
              <Plus size={16} className="mr-1" /> Add Section
            </button>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Media</span>
            </label>
            {media.map((item, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-base-50 shadow-sm">
                <select
                  className="select select-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={item.type}
                  onChange={(e) => handleMediaChange(index, 'type', e.target.value)}
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="gif">GIF</option>
                </select>
                <input
                  type="url"
                  placeholder="Media URL"
                  className="input input-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={item.url}
                  onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Media Description"
                  className="input input-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={item.description}
                  onChange={(e) => handleMediaChange(index, 'description', e.target.value)}
                />
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleRemoveMedia(index)}>
                  <Minus size={16} className="mr-1" /> Remove Media
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => handleAddMedia('audio')}>
                <Music size={16} className="mr-1" /> Add Audio
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => handleAddMedia('video')}>
                <Video size={16} className="mr-1" /> Add Video
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => handleAddMedia('gif')}>
                <Image size={16} className="mr-1" /> Add GIF
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button type="submit" className="btn btn-primary px-6 py-2">
              {editingId !== null ? 'Update Post' : 'Add Post'}
            </button>
            {editingId !== null && (
              <button type="button" className="btn btn-ghost" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blog Posts List */}
      <div className="bg-base rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-base-800 mb-6">Blog Posts</h2>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="input input-bordered w-full bg-base-50 focus:border-base-500 focus:ring focus:ring-blue-200 transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered bg-base-50 focus:border-base-500 focus:ring focus:ring-blue-200 transition duration-200"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg bg-base-50 shadow-sm hover:shadow-lg transition duration-200">
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                <div className="space-x-2">
                  <button className="btn btn-sm btn-outline" onClick={() => handleEdit(post)}>
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button className="btn btn-sm btn-outline" onClick={() => handleDelete(post.id)}>
                    <Trash size={16} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCreator;



// https://claude.ai/