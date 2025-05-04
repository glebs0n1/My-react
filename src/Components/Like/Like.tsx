import React, { useState } from 'react';

interface LikeProps {
  initialLikes: number;
  onClick: () => void;
}

const Like: React.FC<LikeProps> = ({ initialLikes, onClick }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLikes(likes + 1);
    onClick();
  };

  return (
    <div className="like-button-container">
      <button onClick={handleLike} className="like-button"> {likes} Likes
      </button>
    </div>
  );
};

export default Like;
