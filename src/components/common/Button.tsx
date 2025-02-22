import { Button as MuiButton, ButtonProps, CircularProgress } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const Button = ({ children, isLoading = false, disabled, ...props }: CustomButtonProps) => {
  return (
    <MuiButton
      disabled={isLoading || disabled}
      {...props}
      sx={{
        minWidth: '120px',
        height: '48px',
        ...props.sx
      }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;
