import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import { invalid } from 'moment'
import React, { useEffect } from 'react'
const MeetingNameField = ({lable,value,placeholder,setMeetingName, isInvalid,error}:{
    lable:string,value:string,placeholder:string, isInvalid:boolean,error:Array<string>  ,setMeetingName:React.Dispatch<React.SetStateAction<string>>
}) => {
   
    

  return (
    <>
                <EuiFormRow className='label'  label={lable} isInvalid={isInvalid} error={error}>
                <EuiFieldText isInvalid={isInvalid} placeholder={placeholder} value={value} onChange={(e)=>{setMeetingName(e.target.value)}} />
            </EuiFormRow>
    </>
  )
}

export default MeetingNameField
