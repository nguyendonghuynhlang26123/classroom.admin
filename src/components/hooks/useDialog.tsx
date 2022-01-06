import React from 'react';
import { ConfirmDialog } from '../';

type Invoker = (message: string, callback: VoidFunction) => any;
type HookState = {
  show: boolean;
  message: string;
  callback: VoidFunction;
};
type ComponentPropsType = {
  onClose?: () => void;
  title?: string;
  onConfirm?: () => void;
  alwayShow?: boolean;
};
type Component = (props: ComponentPropsType) => React.ReactElement;
const defaultState: HookState = {
  show: false,
  message: '',
  callback: () => {},
};

export const useDialog = (): [Invoker, Component] => {
  const [state, setState] = React.useState<HookState>(defaultState);

  const invoker = (message: string, callback: VoidFunction) => {
    if (!state.show) {
      setState({
        show: true,
        message: message,
        callback: callback,
      });
    }
  };
  return [
    invoker,
    (props: ComponentPropsType) => (
      <ConfirmDialog
        open={state.show}
        handleClose={() => {
          if (props.onClose) props.onClose();
          setState(defaultState);
        }}
        title={props.title}
        alwayShow={props.alwayShow}
        description={state.message}
        onConfirm={() => {
          state.callback();
          if (props.onClose) props.onClose();
          setState(defaultState);
        }}
      />
    ),
  ];
};
