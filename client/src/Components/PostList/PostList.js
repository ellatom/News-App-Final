import React from 'react';
import PostDetails from '../PostDetails/PostDetails';
import './postlist.css'

//In news live  postlist, each post is postdetails component.
function PostList(props) {

  const { onDelete, onEdit, savePost, posts } = props;
  const renderPostList = () => {

    return posts.data && posts.data.map((post, index) => {//map is on array not forget
      return (
        <PostDetails
          key={post.id}
          onDelete={onDelete}
          onEdit={onEdit}
          savePost={savePost}

          keyPost={post.title}
          post={post}>
        </PostDetails>
      )
    });
  };

  return (<div className="postList" >{renderPostList()}</div>)
}

export default PostList;