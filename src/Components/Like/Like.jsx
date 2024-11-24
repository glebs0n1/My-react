import React, { useState } from 'react';
import './Like.css'; 
import likeIcon from '../../assets/like.png';

const Like = ({ initialLikes = 0, onClick }) => {
  const [totalLikes, setTotalLikes] = useState(initialLikes);

  const handleLikeClick = () => {
    setTotalLikes(totalLikes + 1);
    if (onClick) {
      onClick(); // Call the external handler, if provided
    }
  };

  return (
    <button className="like-button" onClick={handleLikeClick}>
      <img src={likeIcon} alt="Like Icon" className="like-icon" />
      <span className="like-count">{totalLikes}</span>
    </button>
  );
};

export default Like;
