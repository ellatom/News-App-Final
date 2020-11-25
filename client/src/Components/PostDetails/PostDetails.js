import React, { useState } from 'react';
import { Grid, List, Header, Image } from "semantic-ui-react";
import './postdetails.css';
import Popup from '../Core/Modal/Modal';

//postlist has post, eact post has details, click on edit opens popup.
function PostDetails(props) {

    const [showPopup, setShowPopup] = useState(false);
    const { onDelete, onEdit, savePost, post, keyPost } = props;

    debugger;
    console.log(post.image);

    const onDeleteClick = async (event) => {
        console.log("on delete click post details",event);
        await onDelete(event, keyPost);
    }

    const onEditClick = async (event) => {
        setShowPopup(true);
        await onEdit(event, post._id);
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div >
            <List.Item >
                <Grid>
                    <Grid.Column width={16}>
                        <div className="postView">
                            <br />
                            <div className="ui card" >
                                <Header as="h3" className="title" key={post.id}><i className="far fa-question-circle"></i>Title:<br />{post.title}</Header>
                                <List.Description className="description"><i className="fas fa-crown">Description:</i><br />{post.description}</List.Description>
                                <List.Description className="author"><i className="fas fa-crown">Author:</i><br />{post.author}</List.Description>
                                <List.Description className="image"><i className="fas fa-crown">Image:</i><br />{post.image}</List.Description>
                                <Image src={post.image} className="urlToImage" />
                                <div>
                                    <button className="ui left attached button" onClick={onEditClick}>Edit</button>
                                    <button className="right attached ui button" onClick={onDeleteClick}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </List.Item>
            {showPopup && <Popup post={post} savePost={savePost} closePopup={togglePopup} />}
        </div>
    )
}
export default PostDetails;

