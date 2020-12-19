import React from "react";
import "../InputGroups/InputGroups.css";

const InputGroups = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  isError,
  isErrorTitle,
  labelTitle,
}) => {
  return (
    <div className="inputGroupsWrapper">
      <label className="inputGroupsLabel" htmlFor={labelTitle}>
        <strong>{labelTitle}</strong>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={isError ? `inputGroups inputGroupsRed` : "inputGroups"}
      />
      {isError && <p className="errorTitle">{isErrorTitle}</p>}
    </div>
  );
};

export default InputGroups;
