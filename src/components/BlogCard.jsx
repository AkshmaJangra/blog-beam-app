// BlogCard.js
import React from "react";
import { Link } from "react-router-dom";
import Thumbnail from "../assets/thumbnail.png";

const BlogCard = ({ post, getCoverImageUrl }) => {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <Link to={`/blog/${post?.id}`} className="text-decoration-none">
        <div className="card h-100 blog-card">
          <img
            src={getCoverImageUrl(post?.coverImage)}
            className="card-img-top"
            alt="Blog Thumbnail"
            style={{
              borderBottom: "1px solid #4a4a4a45",
              height: "200px",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{post?.title}</h5>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html:
                  post?.description?.length > 100
                    ? `${post?.description.substring(0, 100)}...`
                    : post?.description,
              }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
