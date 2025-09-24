import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function ResponsiveDateTimePicker( {value,onChangeFunction, label}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label={label} value={value} onChange={onChangeFunction}  sx={{
              "& .MuiInputLabel-root": { color: "#EDE4F1"},
              "& .MuiInputLabel-root.Mui-focused": { color: "#EDE4F1" },
            }} />
    </LocalizationProvider>
  );
}