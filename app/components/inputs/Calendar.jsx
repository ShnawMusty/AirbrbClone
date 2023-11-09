'use client'

import { DateRange } from "react-date-range"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calendar = ({value, onChange, disabledDates}) => {
  return (
    <DateRange ranges={[value]} rangeColors={["#262626"]} date={new Date()} minDate={new Date()} direction="vertical" disabledDates={disabledDates} showDateDisplay={false} onChange={onChange}/>
  )
}

export default Calendar