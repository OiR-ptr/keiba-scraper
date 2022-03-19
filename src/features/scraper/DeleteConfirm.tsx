import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { deleteRace } from './scraperSlice';

type Props = {
  open: boolean,
  target: { id: number, name: string },
  onComplete?: VoidFunction,
  onCancel?: VoidFunction,
};

export function DeleteConfirm(props: Props) {
  const { open, target, onComplete, onCancel } = props;
  const dispatch = useAppDispatch();

  function handleCancel() {
    onCancel?.();
  }

  function handleDelete() {
    onComplete?.();
    dispatch(deleteRace(target.id));
  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        削除確認
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        {target.name}を削除します｡この操作は取り消せません｡
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={e => handleCancel()}>Cancel</Button>
        <Button onClick={e => handleDelete()}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}