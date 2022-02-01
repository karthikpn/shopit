import React from "react";

const Message = ({ message, bcolor = "ffccb" }) => {
  return (
    <div
      style={{
        width: "80vw",
        padding: "1rem",
        background: `${bcolor}`,
        marginLeft: "10vw",
        marginTop: "10vh",
        height: "10vh",
      }}
    >
      <span
        style={{
          color: "#231f20",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
