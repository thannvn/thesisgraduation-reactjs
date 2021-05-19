import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ReportProblemOutlined } from '@material-ui/icons';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

interface ConfirmDialogProps {
  title: string,
  content: string,
  open: boolean,
  onClose: () => void,
  onAccept: () => void,
  acceptTheme?: 'primary' | 'secondary',
  dialogTheme?: 'warning' | 'confirm'
}
export default function ConfirmDialog({
  title,
  content,
  open,
  onClose,
  onAccept,
  acceptTheme = 'primary',
  dialogTheme = 'confirm',
}: ConfirmDialogProps) {
  const warning: boolean = dialogTheme === 'warning'

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
        <DialogTitle id="alert-dialog-title" >
          <div className='h-d_flex -align-center'>
            {warning && <ReportProblemOutlined fontSize='large' color='secondary' />}

            <Typography variant='h6' className='f-weight-700 h-ml-10'>
              {title}
            </Typography>
          </div>

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