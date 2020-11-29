import React from "react";
import "./launch-list.css";

export const LaunchListComponent = (props) => {
  return (
    <div className="launch-list-container">
      {props.launchList &&
        props.launchList.map((listItem) => {
          return (
            <div className="launch-item">
              <img
                src={listItem.links.mission_patch_small}
                alt="No Data"
                className="launch-image"
              />
              <h4 className="launch-title">
                {" "}
                {listItem.mission_name} #{listItem.flight_number}
              </h4>
              <h4 className="mission-id">Mission Ids:</h4>
              {listItem.mission_id.map((id) => {
                return <li>{id}</li>;
              })}
              <div className="launch-year">
                <h4 className="launch-year-title">Launch Year:</h4>
                <p className="launch-year-value">{listItem.launch_year}</p>
              </div>
              <div className="succ-launch">
                <h4 className="succ-launch-title">Successful Launch:</h4>
                <p className="succ-launch-value">
                  {`${listItem.launch_success}`}
                </p>
              </div>
              <div className="succ-land">
                <h4 className="succ-land-title">Successful Landing:</h4>
                <p className="succ-land-value">
                  {listItem.rocket.first_stage.cores[0].land_success !== null &&
                    `${listItem.rocket.first_stage.cores[0].land_success}`}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
