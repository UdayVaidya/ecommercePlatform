import React from 'react';

const FilterBar = ({ searchTerm, setSearchTerm }) => (
  <div className="flex gap-4 my-4">
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded"
    />
  </div>
);

export default FilterBar;
