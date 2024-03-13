import React, { useState } from 'react'
import Header from '../components/Header'
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUserField from '../components/FormComponents/MeetingUserField'
import useAuth from '../hooks/useAuth'
import useFetchUsers from '../hooks/useFetchUsers'
import moment from 'moment'
import MeetingDateField from '../components/FormComponents/MeetingDateField'
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import { FieldErrorType, UserType } from '../utils/Types'
import { generateMeetingId } from '../utils/generateMeetingId'
import { addDoc } from 'firebase/firestore'
import { meetingref } from '../utils/FirebaseConfig'
import { useAppSelector } from '../app/hooks'

const OneOnOneMeeting = () => {
    useAuth();

    const [users]= useFetchUsers()
    const uid= localStorage.getItem("uid")
    const [meetingName,setMeetingName] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
    const [startDate, setStartDate] = useState(moment())
    const [showErrors, setShowErrors] = useState<{
      meetingName:FieldErrorType,
      meetingUser:FieldErrorType
    }>({
      meetingName:{
        show:false,
        message:[]
      },
      meetingUser:{
        show:false,
        message:[]
      }
    })

    const vailidateForm = ()=>{
      const showErrorsClone = { ...showErrors };
      let errors = false;
      if (!meetingName.length) {
        showErrorsClone.meetingName.show = true;
        showErrorsClone.meetingName.message = ["Please Enter Meeting Name"];
        errors = true;
      } else {
        showErrorsClone.meetingName.show = false;
        showErrorsClone.meetingName.message = [];
      }
      if (!selectedUsers.length) {
        showErrorsClone.meetingUser.show = true;
        showErrorsClone.meetingUser.message = ["Please Select a User"];
        errors = true;
      } else {
        showErrorsClone.meetingUser.show = false;
        showErrorsClone.meetingUser.message = [];
      }
      setShowErrors(showErrorsClone)
      return errors;
    }

    const createMeeting = async()=>{
      if (!vailidateForm()) {
        const meetingId = generateMeetingId();
        await addDoc(meetingref, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: "1-on-1",
          invitedUsers: [selectedUsers[0].uid],
          meetingDate: startDate.format("L"),
          maxUsers: 1,
          status: true,
        });
      }
    }

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
                isInvalid={showErrors.meetingName.show}
                error={showErrors.meetingName.message}
                />
                <MeetingUserField label='Invite User' options={users} onChange={onUserChange} selectedOptions={selectedUsers} singleSelection={{asPlainText:true}} isClearable={false} placeholder='Select a User' isInvalid={showErrors.meetingUser.show}
                error={showErrors.meetingUser.message} />
                <MeetingDateField selected={startDate} setStartDate={setStartDate} />
                <EuiSpacer/>
                <CreateMeetingButtons  createMeeting={createMeeting}  />
            </EuiForm>
        </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting
