  import dayjs from 'dayjs';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
  import TextField from '@mui/material/TextField';

  import { styled } from '@mui/material/styles';

  
const StyledDateTimePicker = styled(DateTimePicker)({
  '& .MuiInputLabel-root': {
    color: '#EDE4F1 !important',
    backgroundColor: '#171123',
    padding: '0px 5px'
  },
  '& .MuiSvgIcon-root': {
    color: '#EDE4F1 !important',
  },
});

  export default function ResponsiveDateTimePicker( {value,onChangeFunction, label}) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDateTimePicker label={label} value={value} onChange={onChangeFunction} slotProps={{
      textField: {
        variant: 'outlined',
        InputProps: {
          sx: { borderRadius: '2rem', color: '#EDE4f1', border: '2px solid #EDE4F1', fontFamily: 'Audiowide, sans-serif' },
        },
      },
    }} />
      </LocalizationProvider>
    );
  }