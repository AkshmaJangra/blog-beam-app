import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../slices/BlogSlice";
import { Link } from "react-router-dom";
import backgrounfimg from "../assets/Rectangle235.png";
import Thumbnail from "../assets/thumbnail.png";
import { useState } from "react";
import BlogCard from "./BlogCard";

const Home = () => {
  const { posts } = useSelector((state) => state.blog);
  let blogs = posts;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const getCoverImageUrl = (coverImage) => {
    if (coverImage instanceof File) {
      return URL.createObjectURL(coverImage);
    }
    return coverImage || Thumbnail;
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(0, indexOfLastPost);

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="position-relative d-flex homeconta">
        <img
          loading="lazy"
          src={backgrounfimg}
          alt="backgroundimage"
          className="w-100"
        />
        <div className="position-absolute h-100 w-100 top-0">
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-6 col-md-6 col-xl-6 col-xxl-6 col-sm-6 col-12 d-flex align-items-center">
                <div className="homecontainer">
                  <h1 className="fw-bold text-white">
                    Explore Insights & Inspiration
                  </h1>
                  <p className="w-75 mt-4 text-white">
                    Dive into a world of ideas, stories, and knowledge shared by
                    our community of writers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 cardcontainer">
        <h2 className="text-center my-4">Our Latest Blogs</h2>
        <div className="row">
          {currentPosts.length === 0 ? (
            <p className="text-center">No blog posts available.</p>
          ) : (
            currentPosts?.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                getCoverImageUrl={getCoverImageUrl}
              />
            ))
          )}
        </div>

        {/* Load More Button */}
        {blogs?.length > indexOfLastPost && (
          <div className="d-flex justify-content-center align-items-center py-4">
            <button
              className="btn text-white mb-4 load-more-btn my-5"
              style={{ background: "black" }}
              onClick={loadMorePosts}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
