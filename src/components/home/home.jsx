import React, { useState, useEffect } from "react";
import { environment } from "../../environment/environment";
import { FilterComponent } from "../filter/filter";
import { LaunchListComponent } from "../launch-list/launch-list";
import { BrowserRouter as useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import "./home.css";

export const HomeComponent = () => {
  const history = useHistory();
  const baseDomainUrl = environment.domainBaseUrl;
  const [launchList, setLaunchList] = useState([]);
  const [appliedYear, setAppliedYear] = useState("");
  const [isLaunched, setIsLaunched] = useState("");
  const [isLanded, setIsLanded] = useState("");
  let recordLimit = 50;
  const getQueryParameters = () => {
    fetchLaunches();
  };
  const fetchLaunches = async () => {
    let reqUrl = `${baseDomainUrl}/launches?limit=${recordLimit}`;
    if (appliedYear) {
      reqUrl = reqUrl + `&launch_year=${appliedYear}`;
    }
    if (isLaunched) {
      const launchStatus = isLaunched === "Yes" ? true : false;
      reqUrl = reqUrl + `&launch_success=${launchStatus}`;
    }
    if (isLanded) {
      const landStatus = isLanded === "Yes" ? true : false;
      reqUrl = reqUrl + `&land_success=${landStatus}`;
    }
    axios.get(reqUrl).then((response) => {
      setLaunchList(response.data);
      setLaunchList(response.data);
      changeUrl();
    });
  };
  useEffect(() => {
    getQueryParameters();
  }, [appliedYear, isLaunched, isLanded]);

  const applyFilter = (payload) => {
    if (payload.propertyName === "launch_year") {
      if (payload.selection.isSelected) {
        setAppliedYear(payload.selection.value);
      } else {
        setAppliedYear("");
      }
    } else if (payload.propertyName === "launch_success") {
      if (payload.selection.isSelected) {
        setIsLaunched(payload.selection.value);
      } else {
        setIsLaunched(null);
      }
    } else if (payload.propertyName === "land_success") {
      if (payload.selection.isSelected) {
        setIsLanded(payload.selection.value);
      } else {
        setIsLanded(null);
      }
    }
  };
  const changeUrl = () => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    if (appliedYear) {
      currentUrlParams.set("year", appliedYear);
    } else {
      currentUrlParams.delete("year");
    }
    if (isLanded) {
      currentUrlParams.set("isLanded", isLanded);
    } else {
      currentUrlParams.delete("isLanded");
    }
    if (isLaunched) {
      currentUrlParams.set("isLaunched", isLaunched);
    } else {
      currentUrlParams.delete("isLaunched");
    }
    if (currentUrlParams) {
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    } else {
      history.push(window.location.pathname);
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">SpaceX Launch Programs</h1>
      <div className="wrapper">
        <FilterComponent applyFilter={applyFilter} />
        <LaunchListComponent launchList={launchList} />
      </div>
      <div className="developer-details">
        <h2>Developed By: Devika J N</h2>
      </div>
    </div>
  );
};
