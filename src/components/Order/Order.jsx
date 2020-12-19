import React from "react";

const Order = ({ orderTitle, orderBody }) => {
  return (
    <li>
      <strong>{orderTitle}</strong>{" "}
      <span style={{ color: "#072d43" }}>{orderBody}</span>
    </li>
  );
};

export default Order;
