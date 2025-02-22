import { TextField, TextFieldProps } from '@mui/material';

const Input = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        ...props.sx
      }}
    />
  );
};

export default Input;
