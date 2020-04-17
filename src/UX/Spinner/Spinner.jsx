import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ldsEllipsis: {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px',
    '& div': {
      position: 'absolute',
      top: '33px',
      width: '13px',
      height: '13px',
      borderRadius: '50%',
      background: '#fc4c02',
      animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
      '&:nth-child(1)': {
        left: '8px',
        animation: '$ldsEllipsis1 0.6s infinite',
      },
      '&:nth-child(2)': {
        left: '8px',
        animation: '$ldsEllipsis2 0.6s infinite',
      },
      '&:nth-child(3)': {
        left: '32px',
        animation: '$ldsEllipsis2 0.6s infinite',
      },
      '&:nth-child(4)': {
        left: '56px',
        animation: '$ldsEllipsis3 0.6s infinite',
      },
    },
  },
  '@keyframes ldsEllipsis1': {
    '0%': { transform: 'scale(0)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes ldsEllipsis3': {
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(0)' },
  },
  '@keyframes ldsEllipsis2': {
    '0%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(24px, 0)' },
  },
});
const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.ldsEllipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
export default Spinner;
