import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    blogs: [
        {
            id: 1,
            title: "Hello World",
            intro: "dlkmsd",
            img: "NULL",
            content:"",
        },
    ],
};

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        addBlog: (state, action) => {
            const blog = {
                id: nanoid(),
                title: action.payload.title,
                intro: action.payload.intro,
                img: action.payload.img, 
            };
            state.blogs.push(blog);
        },
        removeBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
        },
    },
});

export const { addBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
