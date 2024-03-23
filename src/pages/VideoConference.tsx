import {
    EuiFlexGroup,
    EuiForm,
    EuiFormRow,
    EuiSpacer,
    EuiSwitch,
  } from "@elastic/eui";
  import { addDoc } from "firebase/firestore";
  import moment from "moment";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useAppSelector } from "../app/hooks";
  import CreateMeetingButtons from "../components/FormComponents/CreateMeetingButtons";
  import MeetingDateField from "../components/FormComponents/MeetingDateField";
  import MeetingNameField from "../components/FormComponents/MeetingNameField";
  
  import Header from "../components/Header";
  import useAuth from "../hooks/useAuth";
  import useFetchUsers from "../hooks/useFetchUsers";
  import useToast from "../hooks/useToast";
  import { meetingref } from "../utils/FirebaseConfig";
  import { generateMeetingId } from "../utils/generateMeetingId";
  import { FieldErrorType, UserType } from "../utils/Types";
import MeetingMaximumUsersField from "../components/FormComponents/MeetingMaximumUsers";
import MeetingUserField from "../components/FormComponents/MeetingUserField";
  
  export default function VideoConference() {
    useAuth();
    const [users] = useFetchUsers();
    const [createToast] = useToast();
    const uid = useAppSelector((zoomApp) => zoomApp.auth.userInfo?.uid);
    const navigate = useNavigate();
  
    const [meetingName, setMeetingName] = useState("");
    const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
    const [startDate, setStartDate] = useState(moment());
    const [size, setSize] = useState(1);
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
    const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
  
    const onUserChange = (selectedOptions:any)=>{
      setSelectedUser(selectedOptions)
  }  
    const validateForm = () => {
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
      if (!selectedUser.length && !anyoneCanJoin) {
        showErrorsClone.meetingUser.show = true;
        showErrorsClone.meetingUser.message = ["Please Select a User"];
        errors = true;
      } else {
        showErrorsClone.meetingUser.show = false;
        showErrorsClone.meetingUser.message = [];
      }
      setShowErrors(showErrorsClone);
      return errors;
    };
  
    const createMeeting = async () => {
      if (!validateForm()) {
        const meetingId = generateMeetingId();
        await addDoc(meetingref, {
          createdBy: uid,
          meetingId,
          meetingName,
          meetingType: anyoneCanJoin ? "anyone-can-join" : "video-conference",
          invitedUsers: anyoneCanJoin
            ? []
            : selectedUser.map((user: UserType) => user.uid),
          meetingDate: startDate.format("L"),
          maxUsers: anyoneCanJoin ? 100 : size,
          status: true,
        });
        createToast({
          title: anyoneCanJoin
            ? "Anyone can join meeting created successfully"
            : "Video Conference created successfully.",
          type: "success",
        });
        navigate("/");
      }
    };
  
    useEffect(()=>{
      document.title= "VidFusion - Video Conference"
    },[])

    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiForm>
            <EuiFormRow display="columnCompressedSwitch" label="Anyone can Join">
              <EuiSwitch
                showLabel={false}
                label="Anyone Can Join"
                checked={anyoneCanJoin}
                onChange={(e) => setAnyoneCanJoin(e.target.checked)}
                compressed
              />
            </EuiFormRow>
  
            <MeetingNameField
              lable="Meeting name"
              isInvalid={showErrors.meetingName.show}
              error={showErrors.meetingName.message}
              placeholder="Meeting name"
              value={meetingName}
              setMeetingName={setMeetingName}
            />
  
            {anyoneCanJoin ? (
              <MeetingMaximumUsersField value={size} setSize={setSize} />
            ) : (
              <MeetingUserField label='Invite User' options={users} onChange={onUserChange} selectedOptions={selectedUser} singleSelection={false} isClearable={false} placeholder='Select a User' isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message} />
            ) }
            <MeetingDateField selected={startDate} setStartDate={setStartDate} />
            <EuiSpacer />
            <CreateMeetingButtons createMeeting={createMeeting} />
          </EuiForm>
        </EuiFlexGroup>
      </div>
    );
  }