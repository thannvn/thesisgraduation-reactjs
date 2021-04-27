import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

interface AlertDialogProps {
  title: string,
  content: string,
  open: boolean,
  onClose: () => void,
  onAccept: () => void,
  acceptTheme?: 'primary' | 'secondary'
}
export default function AlertDialog({
  title,
  content,
  open,
  onClose,
  onAccept,
  acceptTheme = 'primary'
}: AlertDialogProps) {

  const handleClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    onClose()
  };

  const handleAccept = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    onAccept()
    onClose()
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClick={(event) => handleClick(event)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='h6' className='f-weight-700'>
            {title}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>

        <DialogActions className='-top-line'>
          <Button
            onClick={(event) => handleClose(event)}
            variant='outlined'
            size='small'
            className='p-round-button'
          >
            Hủy
          </Button>
          <Button
            onClick={(event) => handleAccept(event)}
            size='small'
            color={acceptTheme}
            variant='contained'
            className='p-round-button'>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}