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
export const SmallForm = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  margin: '0 auto',
  '& button': {
    margin: '10px',
  },
});
export const Placeholder = styled('div')(({ theme }) => ({
  background: '#fff',
  padding: '10px',
  boxShadow: '0px 8px 24px rgba(13,13,18,0.04)',
  borderRadius: '5px',
  [theme.breakpoints.up('sm')]: {
    padding: '15px',
  },
}));
export const Btn = styled(Button)({
  width: '100%',
  '@media(min-width: 600px)': {
    width: 'auto',
  },
});
