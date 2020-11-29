import React, { useState, useEffect } from "react";
import { LANDING, LAUNCH, YEARS } from "../../utils/constants";
import "./filter.css";

export const FilterComponent = (props) => {
  const [years, setYears] = useState(YEARS);
  const [landingValues, setLandingValues] = useState(LANDING);
  const [launchValues, setLaunchValues] = useState(LAUNCH);
  useEffect(() => {}, [years, landingValues, launchValues]);

  const applyFilter = (field, selectedValue, propertyName) => {
    props.applyFilter({
      propertyName: propertyName,
      selection: selectedValue,
    });
  };
  /*Method which return the year filters */
  const displayYears = () => {
    return years.map((year) => {
      return (
        <div>
          <button
            className={year.isSelected ? "filter-applied" : "filter-button"}
            key={year.value}
            onClick={() => {
              years.forEach((property) => {
                if (property.value === year.value) {
                  property.isSelected = !property.isSelected;
                } else {
                  property.isSelected = false;
                }
              });
              applyFilter("years", year, "launch_year");
            }}
          >
            {year.value}
          </button>
        </div>
      );
    });
  };
  /*Method which will return the launch filters */
  const displayLaunches = () => {
    return launchValues.map((launch) => {
      return (
        <div key={`${launch.value}`}>
          <button
            className={launch.isSelected ? "filter-applied" : "filter-button"}
            onClick={() => {
              launchValues.forEach((property) => {
                if (property.value === launch.value) {
                  property.isSelected = !property.isSelected;
                } else {
                  property.isSelected = false;
                }
              });
              applyFilter("launchValues", launch, "launch_success");
            }}
          >
            {launch.value}
          </button>
        </div>
      );
    });
  };
  /*Method which will return the land filter */
  const displayLand = () => {
    return landingValues.map((land) => {
      return (
        <div key={`${land.value}`}>
          <button
            className={land.isSelected ? "filter-applied" : "filter-button"}
            onClick={() => {
              landingValues.forEach((property) => {
                if (property.value === land.value) {
                  property.isSelected = !property.isSelected;
                } else {
                  property.isSelected = false;
                }
              });
              applyFilter("landingValues", land, "land_success");
            }}
          >
            {land.value}
          </button>
        </div>
      );
    });
  };
  return (
    <div>
      {" "}
      <nav className="filter-container">
        <h3 className="filter-heading">Filters</h3>
        <div className="sub-heading">Launch Year</div>
        <span className="year-filter">{displayYears()}</span>
        <div className="sub-heading">Successful Launch</div>
        <span className="launch-filter">{displayLaunches()}</span>
        <div className="sub-heading">Successful Landing</div>
        <span className="land-filter">{displayLand()}</span>
      </nav>
    </div>
  );
};
