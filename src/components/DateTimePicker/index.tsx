import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { MyTimePickerProps } from './type';

export const MyTimePicker = ({ label, value, handleChange, disabled, ...other }: MyTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} {...other} />}
        label=""
        value={value}
        disabled={disabled}
        onChange={(newValue: any) => {
          handleChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
};
