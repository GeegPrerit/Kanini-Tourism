import React from 'react';

const SearchBar = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row justify-content-center"> {/* Center the search bar */}
        <div className="col-md-6"> {/* Limit the width of the search bar */}
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-button"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-primary rounded-pill" type="button" id="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
