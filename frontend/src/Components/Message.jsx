import React from "react";

const Message = ({ message, bcolor = "#ffccbe" }) => {
  return (
    <div
      style={{
        width: "30vw",
        display: "inline-block",
        zIndex: "1",
        padding: "0.5rem",
        backgroundColor: `${bcolor}`,
        marginLeft: "20vw",
        marginTop: "4vh",
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
