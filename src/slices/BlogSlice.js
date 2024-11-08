import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../FireBaseConfig";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User is not logged in.");
        }
    
        const newPost = {
          ...action.payload, 
          authorId: user.uid,
        };
    
        console.log("Adding post:", newPost);
        state.posts.push(newPost); 
      } catch (error) {
        console.error("Error adding post:", error.message);
        alert("Please login to add a post.");
      }
    },
    

    updatePost: (state, action) => {
      const user = auth.currentUser;
      console.log("Updating post:", action.payload);
    
      const postToUpdate = state.posts.find((post) => post.id === action.payload.id);
      if (postToUpdate && postToUpdate.authorId === user.uid) {
        state.posts = state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, ...action.payload }
            : post
        );
        console.log("Post updated successfully:", state.posts);
      } else {
        console.error("You can only update your own posts.");
        alert("You can only update your own posts.");
      }
    },
    

    deletePost: (state, action) => {
      const user = auth.currentUser;
      console.log("Deleting post:", action.payload);
      const postToDelete = state.posts.find((post) => post.id === action.payload);

      if (postToDelete && postToDelete.authorId === user.uid ) {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        console.log("Post deleted successfully:", state.posts);
      } else {
        console.error("You can only delete your own posts.");
        alert("You can only delete your own posts.")

      }
    },

    getPostsByUser: (state, action) => {
      return state.posts.filter((post) => post.authorId === action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost, getPostsByUser } =
  blogSlice.actions;

export default blogSlice.reducer;
