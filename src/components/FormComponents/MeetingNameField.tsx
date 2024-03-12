import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import React, { useEffect } from 'react'
import "../FormComponents/meetingNameField.css"
const MeetingNameField = ({lable,value,placeholder,setMeetingName}:{
    lable:string,value:string,placeholder:string,setMeetingName:React.Dispatch<React.SetStateAction<string>>
}) => {
   
    

  return (
    <>
        {localStorage.getItem("zoom360-theme")=="light" ? <EuiFormRow className='label' style={{color:"black !important"}} label={lable}>
                <EuiFieldText style={{backgroundColor:"white"}} placeholder={placeholder} value={value} onChange={(e)=>{setMeetingName(e.target.value)}} />
            </EuiFormRow> : <EuiFormRow className='form-label' label={lable}>
                <EuiFieldText placeholder={placeholder} value={value} onChange={(e)=>{setMeetingName(e.target.value)}} />
                </EuiFormRow>}
    </>
  )
}

export default MeetingNameField
