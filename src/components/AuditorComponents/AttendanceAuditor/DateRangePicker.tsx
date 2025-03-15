import React from 'react';
import DatePickerWithRangeAndYear from './DatePickerWithRangeAndYear';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  onChange: (date: DateRange | undefined, year: number | undefined) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  return <DatePickerWithRangeAndYear onChange={onChange} />;
};

export default DateRangePicker;