import React from "react";

const Showdependency = props => {
  return (
    <div>
      <ul>
        <li>
          {props.name}-{props.count}
        </li>
      </ul>
    </div>
  );
};

export default Showdependency;
