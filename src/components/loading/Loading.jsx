import React from "react";
import loadingImg from "../../images/Loading_icon.gif";
import "./loading.scss";
export default function Loading({ message, loading }) {
  return (
    <div className="loading">
      {loading && (
        <>
          
          <div className="loadingImg">
            <img src={loadingImg} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
