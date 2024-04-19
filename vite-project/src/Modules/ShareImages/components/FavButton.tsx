import React from "react";

import FavIcon from "./FavIcon";

const FavButton = ({
  selected,
  onClick,
  isAuthenticated,
  size = 30,
}: {
  selected: boolean;
  onClick: () => void;
  isAuthenticated: boolean;
  size?: number;
}) => {
  const handleAlert = () => {
    alert("Create an account or login first to track favourites");
  };
  return (
    <div
      onClick={isAuthenticated ? onClick : handleAlert}
      className="photo-list__fav-icon"
    >
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={selected} size={size} />
      </div>
    </div>
  );
};

export default FavButton;
