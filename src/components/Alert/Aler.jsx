import React from "react";
import "../Alert/Alert.css";

const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;
