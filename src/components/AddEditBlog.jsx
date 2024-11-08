import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost as addBlog,
  updatePost as updateBlog,
  deletePost,
} from "../slices/BlogSlice";
import { Modal, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddEditBlog({ isEditing: initialIsEditing = false, existingBlog }) {
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [description, setDescription] = useState(
    existingBlog?.description || ""
  );
  const [coverImage, setCoverImage] = useState(
    existingBlog?.coverImage || null
  );
  const [id, setId] = useState(existingBlog?.id || null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const dispatch = useDispatch();
  const { posts = [] } = useSelector((state) => state.blog) || {};
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [filteredPosts, setFilteredPosts] = useState([]);
  useEffect(() => {
    if (currentUser && posts) {
      console.log("sxfsdf", currentUser);
      const userPosts = posts.filter(
        (post) => post.authorId === currentUser?.uid
      );
      console.log("sxfsdf", userPosts);

      setFilteredPosts(userPosts);
      console.log("sxfsdf", filteredPosts);
    } else {
      setFilteredPosts([]);
    }
  }, [currentUser, posts]);

  useEffect(() => {
    if (isEditing && existingBlog) {
      setTitle(existingBlog.title);
      setDescription(existingBlog.description);
      setCoverImage(existingBlog.coverImage);
    }
  }, [isEditing, existingBlog]);

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill in both title and description.");
      return;
    }

    const blogData = {
      id: id || Date.now(),
      title,
      description,
      coverImage,
    };

    if (isEditing) {
      dispatch(updateBlog(blogData));
    } else {
      dispatch(addBlog(blogData));
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTitle("");
    setDescription("");
    setCoverImage(null);
    setIsEditing(false);
  };

  const handleShowModal = (blog = null) => {
    if (blog) {
      setId(blog.id);
      setIsEditing(Boolean(blog));
      setTitle(blog?.title || "");
      setDescription(blog?.description || "");
      setCoverImage(blog?.coverImage || null);
    } else {
      setId("");
      setIsEditing("");
      setTitle("");
      setDescription("");
      setCoverImage(null);
    }

    setShowModal(true);
  };

  const renderTooltip = (text) => <Tooltip>{text}</Tooltip>;

  return (
    <div className="text-center ">
      <div
        className="container"
        style={{ minHeight: "100vh", paddingTop: "120px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Table of Blog Posts</h2>
          <button className="btn btn-success" onClick={() => handleShowModal()}>
            Add Blog
          </button>
        </div>

        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Thumbnail Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          {filteredPosts?.length > 0 ? (
            <tbody>
              {filteredPosts.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog?.description?.length > 60
                          ? `${blog?.description.substring(0, 60)}...`
                          : blog?.description,
                    }}
                  />
                  <td>
                    {blog.coverImage ? (
                      <img
                        src={URL.createObjectURL(blog.coverImage)}
                        className="card-img-top"
                        alt="Cover"
                        style={{
                          width: "15%",
                          height: "auto",
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip("Edit Blog")}
                    >
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => handleShowModal(blog)}
                      >
                        <i className="fa-regular fa-pen-to-square" />
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip("Delete Blog")}
                    >
                      <button
                        className="btn btn-danger btn-sm ms-1"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  No blog post found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/* Modal for Adding/Editing Blog */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Blog" : "Create Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <input
              type="text"
              className="form-control my-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
            />
            <ReactQuill
              className="my-2"
              value={description}
              onChange={(value) => setDescription(value)}
              placeholder="Blog Description"
            />

            <div>
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                accept="image/*"
              />
              {coverImage && <p>Cover image: {coverImage.name}</p>}
            </div>
            <Button
              onClick={handleSubmit}
              className="btn text-white my-4 w-100"
              style={{ background: "black" }}
            >
              {isEditing ? "Update Blog" : "Add Blog"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddEditBlog;
