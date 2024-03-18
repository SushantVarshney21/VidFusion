import { EuiDatePicker, EuiFormRow } from '@elastic/eui'
import moment from 'moment';
import React from 'react'

const MeetingTimeField = ({
  selected,
  setStartTime,
  times
}: {
  selected: moment.Moment;
  setStartTime: React.Dispatch<React.SetStateAction<moment.Moment>>;
  times:any
}) => {
  return (
    <EuiFormRow label="Set Meeting Time">
        <EuiDatePicker
  showTimeSelect
  showTimeSelectOnly
  selected={selected}
  onChange={(time)=>setStartTime(time!)}
  injectTimes={[times]}
/>
    </EuiFormRow>
  )
}

export default MeetingTimeField
