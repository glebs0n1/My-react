import React from 'react';
import './Filters.css';

const Filters = ({ searchQuery, filters, handleSearchChange, handleFilterChange, handleSearchSubmit }) => {
  return (
    <div className="filters">
      <h3>Filter Pets</h3>
      <form onSubmit={handleSearchSubmit}>
        {/* Optional: Include name search input here OR in the top bar, but not both */}
        <div className="filter-group">
          <label htmlFor="pet-name">Pet Name</label>
          <input
            type="text"
            id="pet-name"
            name="pet-name"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="age">Age</label>
          <select id="age" name="age" value={filters.age} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="puppy">Puppy</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="size">Size</label>
          <select id="size" name="size" value={filters.size} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="coatLength">Coat Length</label>
          <select id="coatLength" name="coatLength" value={filters.coatLength} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="color">Color</label>
          <select id="color" name="color" value={filters.color} onChange={handleFilterChange}>
            <option value="">Any</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="gray">Gray</option>
          </select>
        </div>

        <button type="submit" className="search-button">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
