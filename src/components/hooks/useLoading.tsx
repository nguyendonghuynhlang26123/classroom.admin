import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLoading } from 'store/slices';

type Loading = boolean;
type SetLoading = (args: boolean) => any; // Return success

export const useLoading = (): [Loading, SetLoading] => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.loading);

  return [
    loading,
    (v: boolean) => {
      dispatch(setLoading(v));
    },
  ];
};
