import React, { useEffect, useRef, useState } from "react";
import "../Accordion/Accordion.css";

const Accordion = ({ isOpen, children, handleClick, title }) => {
  //useRef
  let content = useRef();

  //state
  const [heightRef, setHeightRef] = useState();

  //useEffect
  useEffect(() => {
    setHeightRef(content.current.scrollHeight);
  }, []);

  return (
    <div>
      <div className="btn-accordion" onClick={handleClick}>
        <strong className="accordion-title">{title}</strong>
        <i
          className={
            isOpen ? "fas fa-chevron-down" : "fas fa-chevron-down rotate"
          }
        ></i>
      </div>
      <div
        ref={content}
        style={{
          maxHeight: isOpen ? `${heightRef}px` : `0px`,
          overflow: "hidden",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
