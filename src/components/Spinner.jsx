import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => (
  <div className="spinner-container">
    <ClipLoader
      color="#ff6f61"
      size={70}
      cssOverride={{ borderWidth: "7px" }}
    />
  </div>
);

export default Spinner;
