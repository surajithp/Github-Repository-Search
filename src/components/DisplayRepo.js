import React from "react";
import "./DisplayRepo.css";

const DisplaySingleRepo = props => {
  return (
    <div className="box margin">
      <p>{props.serialno}</p>
      <p>{props.full_name}</p>
      <p>Description: {props.description}</p>
      <a href={props.owner.html_url} rel="noopener noreferrer" target="_blank">
        Git_url
      </a>
      <p>
        <a href={props.homepage} rel="noopener noreferrer" target="_blank">
          Repository Homepage
        </a>
      </p>
      <p>Forks:{props.forks_count}</p>
      <p>Stars:{props.stargazers_count}</p>
    </div>
  );
};

export default DisplaySingleRepo;
