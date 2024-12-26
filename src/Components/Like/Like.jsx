import React, { useState } from 'react';
import './Like.css';
import likeIcon from '../../assets/like.png';

const Like = ({ onGlobalLike }) => {
  const handleLikeClick = () => {
    if (onGlobalLike) {
      onGlobalLike(); 
    }
  };

  return (
    <button className="like-button" onClick={handleLikeClick}>
      <img src={likeIcon} alt="Like Icon" className="like-icon" />
    </button>
  );
};

export default Like;
