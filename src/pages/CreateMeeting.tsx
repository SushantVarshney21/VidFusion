import React from 'react'
import Header from '../components/Header'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import { useNavigate } from 'react-router-dom'
import meeting1 from "../assets/meeting1.png";
import meeting2 from "../assets/meeting2.png";
import useAuth from '../hooks/useAuth';

const CreateMeeting = () => {
  useAuth()
    const navigate = useNavigate()
  return (
    <div  style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
     <Header/>
     <EuiFlexGroup style={{margin:"5vh 10vw"}} alignItems="center" justifyContent="center">
        <EuiFlexItem>
        <EuiCard
              icon={<EuiImage src={meeting1} alt='1 on 1 mmeeting image' size="100%"/>}
              title={`Create 1 on 1 meeting`}
              description="Create a personal single person meeting"
              onClick={() => navigate("/create1on1")}
              paddingSize="xl"
            />
        </EuiFlexItem> 
        <EuiFlexItem>
        <EuiCard
              icon={<EuiImage alt='Video conference image' src={meeting2} size="100%" />}
              title={`Create video conference`}
              description="Invite multiple person in a meeting"
              onClick={() => navigate("/videoconference")}
              paddingSize="xl"
            />
        </EuiFlexItem>    
    </EuiFlexGroup> 
    </div>
  )
}

export default CreateMeeting
