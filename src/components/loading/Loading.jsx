import React from "react";
import loadingImg from "../Curve-Loading.gif";
import "./loading.scss";
export default function Loading({ message, loading }) {
  return (
    <div className="loading">
      {loading && (
        <>
          <div className="message">{message}</div>
          <div className="loadingImg">
            <img src={loadingImg} alt="" />
          </div>
        </>
      )}
    </div>
  );
}
