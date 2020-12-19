import React from "react";
import "../CheckboxGroups/CheckboxGroups.css";

const CheckboxGroups = ({
  labelLeft,
  labelRight,
  name,
  value,
  checked,
  onChange,
  defaultChecked,
  marginLeft,
  marginRight,
}) => {
  return (
    <div>
      <label className="checkboxGroupsLabel">
        {labelLeft}
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          defaultChecked={defaultChecked}
          className="checkboxGroupsInput"
        />
        <span
          className="checkboxGroupsSpan"
          style={{ marginLeft: marginLeft, marginRight: marginRight }}
        />
        {labelRight}
      </label>
    </div>
  );
};

export default CheckboxGroups;
