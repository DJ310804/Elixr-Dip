import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    console.log({
      title,
      content,
      category,
      tags,
      additionalSections,
      media,
    });
    axios.post('http://127.0.0.1:8000/api/blog/posts/', {
      title,
      content,
      category,
      tags,
      // additionalSections,
      // media,
    })
    .then(response => {
      console.log(response.data);
      setPosts([...posts, response.data]); // Add the new post to the list
      resetForm();
    })
    .catch(error => console.error(error));
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
                  <option value="image">Image</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter media URL"
                  className="input input-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={item.url}
                  onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter media description"
                  className="input input-bordered w-full mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                  value={item.description}
                  onChange={(e) => handleMediaChange(index, 'description', e.target.value)}
                />
                <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={() => handleRemoveMedia(index)}>
                  <Minus size={16} className="mr-1" /> Remove Media
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline btn-sm mt-2" onClick={() => handleAddMedia('image')}>
              <Image size={16} className="mr-1" /> Add Image
            </button>
            <button type="button" className="btn btn-outline btn-sm mt-2" onClick={() => handleAddMedia('audio')}>
              <Music size={16} className="mr-1" /> Add Audio
            </button>
            <button type="button" className="btn btn-outline btn-sm mt-2" onClick={() => handleAddMedia('video')}>
              <Video size={16} className="mr-1" /> Add Video
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" className="btn btn-ghost btn-sm" onClick={resetForm}>
              <X size={16} /> Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Post
            </button>
          </div>
        </form>
      </div>

      <div className="bg-base rounded-lg shadow-lg p-6 mt-8">
        <input
          type="text"
          className="input input-bordered w-full mb-4 bg-base-50"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4 mb-4">
          <select
            className="select select-bordered w-full bg-base-50"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Filter by category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg bg-base-50">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">Category: {post.category}</p>
              <p className="my-2">{post.content}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleEdit(post)}
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  className="btn btn-outline btn-sm text-red-500"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostCreator;
