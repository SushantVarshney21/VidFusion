import React from "react";
import { useAppSelector } from "../app/hooks";
import useAuth from "../hooks/useAuth";
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
import dashboard1 from "../assets/dashboard1.png";
import dashboard2 from "../assets/dashboard2.png";
import dashboard3 from "../assets/dashboard3.png";

import Header from "../components/Header";
const Dashboard = () => {
  const navigate = useNavigate();
  useAuth();
  return (
    <>
    <Header/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <EuiFlexGroup style={{margin:"5vh 10vw"}} alignItems="center" justifyContent="center" >
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard1} alt=""  size="5rem"/>}
              title={`Create Meeting`}
              description="Create a new meeting and invite people"
              onClick={() => navigate("/create")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard2} alt=""  size="10rem"/>}
              title={`My Meetings`}
              description="View your created meetings"
              onClick={() => navigate("/mymeeting")}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard
              icon={<EuiImage src={dashboard3} alt=""  size="5rem"/>}
              title={`Meetings`}
              description="View the meetings that you are invited to"
              onClick={() => navigate("/meeting")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
};

export default Dashboard;
