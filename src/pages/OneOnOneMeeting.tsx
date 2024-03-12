import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUserField from '../components/FormComponents/MeetingUserField'
import useAuth from '../hooks/useAuth'
import useFetchUsers from '../hooks/useFetchUsers'

const OneOnOneMeeting = () => {
    useAuth();
    const [meetingName,setMeetingName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [users]= useFetchUsers()

    const onUserChange = (selectedOptions:any)=>{
        setSelectedUsers(selectedOptions)
    }

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiForm>
                <MeetingNameField 
                lable= "Meeting Name"
                placeholder= "Meeting Name"
                value= {meetingName}
                setMeetingName={setMeetingName}
                />
                <MeetingUserField label='Invite User' options={users} onChange={onUserChange} selectedOptions={selectedUsers} singleSelection={{asPlainText:true}} isClearable={false} placeholder='Select a User' />
            </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting
