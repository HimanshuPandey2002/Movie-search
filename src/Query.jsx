import React from "react";

const Query = ({ title, imgSrc, rating }) => {
  if (imgSrc == null || title == null) {
    return null;
  }
  return (
    <div className="query">
      <img
        src={`https://image.tmdb.org/t/p/w500${imgSrc}`}
        alt=""
        className="poster"
      />
      <h3 className="title">{title}</h3>
      <p className="rating">{rating}</p>
    </div>
  );
};

export default Query;
