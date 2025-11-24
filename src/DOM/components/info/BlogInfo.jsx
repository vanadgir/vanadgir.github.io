import OverlayContentLink from "../OverlayContentLink";
import { blogList } from "../../content/entries/blogMedia";

const BlogInfo = ({ planet, openDetail }) => {
  const handleOpenBlog = (blogId) => {
    if (!openDetail) return;
    openDetail(`blog:${blogId}`);
  };

  return (
    <div className="blog-info">
      <h2>{planet.label}</h2>
      <p>Dev logs, writeups, and thoughts.</p>

      <ul className="info-item-list">
        {blogList.map((blog) => (
          <li key={blog.id} className="info-item-list-item">
            <OverlayContentLink
              title={blog.label}
              description={blog.description}
              onActivate={() => handleOpenBlog(blog.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogInfo;
