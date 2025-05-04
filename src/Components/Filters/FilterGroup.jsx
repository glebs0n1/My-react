import React from 'react';

const FilterGroup = ({ label, name, type, value, options, placeholder, handleFilterChange }) => {
  return (
    <div className="filter-group">
      <label htmlFor={name}>{label}</label>
      {type === 'text' ? (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleFilterChange}
          placeholder={placeholder}
        />
      ) : (
        <select id={name} name={name} value={value} onChange={handleFilterChange}>
          <option value="">Select {label}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default FilterGroup;
