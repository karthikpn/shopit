import React from "react";

const Message = ({ error }) => {
  return (
    <div
      style={{
        width: "80vw",
        padding: "1rem",
        backgroundColor: "#ffcccb",
        marginLeft: "10vw",
        marginTop: "20vh",
      }}
    >
      <span
        style={{
          color: "#231f20",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {error}
      </span>
    </div>
  );
};

export default Message;
