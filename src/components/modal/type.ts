import React from 'react';
export type SimpleModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactElement;

  [x: string]: any; //other props
};

export type ConfirmDialogProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  description: string;
  onConfirm: () => void;
  alwayShow?: boolean;
};
