import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../assets/Rectangle235.png";

const BlogPage = () => {
  const { id } = useParams();

  const blog = useSelector((state) => {
    console.log(state, id);
    return state.blog.posts.find(
      (post) => post.id.toString() === id.toString()
    );
  });

  const getCoverImageUrl = (coverImage) => {
    if (coverImage instanceof File) {
      return URL.createObjectURL(coverImage);
    }
    return coverImage;
  };

  if (!blog) {
    return (
      <div
        className="justify-content-center d-flex align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <h5>Blog post not found!</h5>
      </div>
    );
  }

  return (
    <div
      className="pt-4"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        background: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mb-2">
        <div className="container">
          <div className="row text-center p-2">
            <div className="col-lg-12 col-sm-12 mt-5">
              <h4
                className="text-dark text-capitalize"
                style={{ fontFamily: "myFont" }}
              >
                {blog.title}
              </h4>

              <div className="pt-5">
                <img
                  src={getCoverImageUrl(blog.coverImage)}
                  alt="Blog Thumbnail"
                  style={{
                    borderRadius: "10px",
                    width: "50%",
                    height: "auto",
                    boxShadow: "1px 1px 17px 2px rgba(0,0,0,1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-2 py-5 container text-justify"
        style={{ textAlign: "justify" }}
      >
        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: blog?.description,
          }}
        />
      </div>
    </div>
  );
};

export default BlogPage;
