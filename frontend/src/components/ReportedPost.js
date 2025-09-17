

const ReportedPost = ({ post, onDelete, onIgnore }) => {
  return (
    <div className="reported-post">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {/* tags */}
        <div className="reported-post-actions">
            <button className="ignore-button" onClick={() => onIgnore(post.id)}>Ignore</button>
            <button className="delete-button" onClick={() => onDelete(post.id)}>Delete</button>
        </div>
    </div>
  );
}

export default ReportedPost;