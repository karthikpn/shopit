import React from "react";

const Message = ({ message, bcolor = "#ffccbe" }) => {
  return (
    <div
      style={{
        width: "fit-content",
        display: "inline-block",
        zIndex: "1",
        padding: "0.5rem",
        backgroundColor: `${bcolor}`,
        marginLeft: "10vw",
        marginTop: "0vh",
        position: "absolute",
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
