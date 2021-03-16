import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type LoadingState<T> =
  | {
      retry: () => void;
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: true;
      error?: Error | undefined;
      value?: T | undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error?: undefined;
      value: T;
    };

export interface LoadingProp<T> {
  /**
   * 状态
   * */
  state: LoadingState<T>;
  /**
   * 成功组件
   * */
  children: React.ReactNode;
  /**
   * 失败组件
   * */
  errorChildren: React.ReactNode;
}

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    all: {
      flex: '1 1 0',
    },
  }),
);

/**
 * loading 数据
 * */
export function Loading<T>(props: LoadingProp<T>): JSX.Element {
  const classes = useStyle();
  return (
    <>
      {props.state.loading ? (
        <div className={classes.main}>
          <Skeleton variant="text" height={80} />
          <Skeleton variant="circle" width={80} height={80} />
          <Skeleton variant="rect" className={classes.all} />
        </div>
      ) : props.state.error ? (
        props.errorChildren
      ) : (
        props.children
      )}
    </>
  );
}
