import React from "react";

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div>
              <button>View</button>
              <button>Edit</button>
              <button>Delete</button>
              {post.liked ? (
                <button >Unlike</button>
              ) : (
                <button>Like</button>
              )}
              <span>{post.likes} likes</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
