import React from "react";
import "./Pagination.css"

const Pagination = props => {
  const nextPageclick = () => {
    props.clicknext(props.reponame);
  };
  const prevPageclick = () => {
    props.clickprev(props.reponame);
  };

  return (
    <div className="footer">
      <button disabled={props.disabled} onClick={prevPageclick}>
        Prev
      </button>
      {props.pagenumber}
      <button onClick={nextPageclick}>Next</button>
    </div>
  );
};

export default Pagination;
