import React from 'react';

const FilterGroup = ({ label, name, value, options, handleFilterChange }) => {
  return (
    <div className="filter-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleFilterChange}
      >
        {options.map(option => (
          <option key={option} value={option}>{option || `Select ${label}`}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterGroup;
