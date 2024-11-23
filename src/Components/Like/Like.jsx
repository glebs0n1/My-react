import React, { useState } from 'react';
import './Like.css'; 
import likeIcon from '../../assets/like.png';

const Like = ({ initialLikes = 0 }) => {
  const [totalLikes, setTotalLikes] = useState(initialLikes);
  const handleLikeClick = () => {
    setTotalLikes(totalLikes + 1);
  };

  return (
    <button className="like-button" onClick={handleLikeClick}>
      <img src={likeIcon} alt="Like Icon" className="like-icon" />
      <span className="like-count">{totalLikes}</span>
    </button>
  );
};

export default Like;
