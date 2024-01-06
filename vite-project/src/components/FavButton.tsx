import React from "react";

import FavIcon from "./FavIcon";

const FavButton = ({
  selected,
  onClick,
  isAuthenticated,
}: {
  selected: boolean;
  onClick: () => void;
  isAuthenticated: boolean;
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
        <FavIcon selected={selected} />
      </div>
    </div>
  );
};

export default FavButton;
