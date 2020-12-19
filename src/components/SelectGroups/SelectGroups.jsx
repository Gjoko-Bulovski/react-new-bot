import React from "react";
import "../SelectGroups/SelectGroups.css";

const SelectGroups = ({ zones, labelTitle, onChange }) => {
  return (
    <div className="selectGroupsWrapper">
      <label className="selectGroupsLabel">
        <strong>{labelTitle}</strong>
      </label>
      <select className="selectGroups" onChange={onChange}>
        {zones.map((zone) => (
          <option value={zone.value} key={zone.value}>
            {zone.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroups;
