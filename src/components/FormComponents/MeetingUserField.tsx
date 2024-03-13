import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingUserField = ({label,options, onChange, selectedOptions, isClearable,placeholder,singleSelection=false,isInvalid,error}:{
    label:string,options:any, onChange:any, selectedOptions:any, isInvalid:boolean,error:Array<string> ,isClearable:boolean,placeholder:string,singleSelection:any
}) => {
  return (
    <>
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
        <EuiComboBox options={options} isInvalid={isInvalid} onChange={onChange} selectedOptions={selectedOptions} singleSelection={singleSelection} placeholder={placeholder} isClearable={isClearable} ></EuiComboBox>
    </EuiFormRow>
</>
    
  )
}

export default MeetingUserField
