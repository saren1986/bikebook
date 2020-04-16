import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { closeConfirmDialog } from '../../store/actions/index';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

const AlertDialog = () => {
  const {
    open, title, description, confirm,
  } = useSelector((state) => state.ux.confirmDialog);
  const dispatch = useDispatch();
  const classes = useStyles();
  const clickHandle = (name) => () => {
    if (name === 'confirm') {
      confirm();
    }
    dispatch(closeConfirmDialog());
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => dispatch(closeConfirmDialog())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="alert-dialog-title"
          className={classes.root}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickHandle('cancel')} color="default" autoFocus>
            Cancel
          </Button>
          <Button onClick={clickHandle('confirm')} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertDialog;
