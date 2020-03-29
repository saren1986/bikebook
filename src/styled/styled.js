import { styled } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

export const Header = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  margin: '10px',
  fontSize: '18px',
  fontWeight: '600',
});

export const Input = styled(TextField)({
  width: '100%',
});

export const BtnWrapper = styled('div')({
  textAlign: 'right',
  marginTop: '30px',
});

export const Btn = styled(Button)({
  width: '100%',
  '@media(min-width: 600px)': {
    width: 'auto',
  },
});
