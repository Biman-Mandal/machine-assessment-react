import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state.profile.userSliceData);
  return (
    <div>
      <center>
        <h1>Hi, {userData.name}</h1>
      </center>
    </div>
  );
};

export default Dashboard;
