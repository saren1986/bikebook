import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const Header = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px',
  fontSize: '18px',
  fontWeight: '600',
});

export const BtnWrapper = styled('div')(({ theme }) => ({
  textAlign: 'right',
  marginTop: '15px',
  margin: '10px 0',
  [theme.breakpoints.up('sm')]: {
    '& > button:not(:only-child)': {
      marginLeft: '15px',
      marginTop: '30px',
    },
  },
}));
export const Btn = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: '10px',
  [theme.breakpoints.up('sm')]: {
    marginBottom: '0px',
    width: 'auto',
  },

}));
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

