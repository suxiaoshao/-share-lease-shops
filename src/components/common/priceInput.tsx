import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

export interface PriceInputProp extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 价格
   * */
  price: number;

  /**
   * 修改时
   * */
  onChangePrice(newPrice: number): void;

  /**
   * 标签信息
   * */
  label: string;
}

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
    },
    mainInput: {
      flex: '1 1 0',
    },
    input: {
      flex: '0 0 100px',
    },
  }),
);

export default function PriceInput(props: PriceInputProp): JSX.Element {
  const classes = useStyle();
  /**
   * 价格整数部分
   * */
  const priceIsAnInteger = React.useMemo(() => {
    return Math.floor(props.price) || 0;
  }, [props.price]);
  /**
   * 价格小数部分
   * */
  const priceTheDecimal = React.useMemo(() => {
    return Math.floor(props.price * 100 - priceIsAnInteger * 100);
  }, [props.price, priceIsAnInteger]);
  return (
    <div {...props} className={`${props.className} ${classes.main}`}>
      <TextField
        label={`${props.label}(元)`}
        onChange={(event) => {
          props.onChangePrice((parseInt(event.target.value) || 0) + priceTheDecimal / 100);
        }}
        value={priceIsAnInteger}
        className={classes.mainInput}
      />
      <TextField
        label={`${props.label}(分)`}
        onChange={(event) => {
          const newPriceTheDecimal = parseInt(event.target.value) / 100 || 0;
          props.onChangePrice(
            priceIsAnInteger + (newPriceTheDecimal > 0.99 ? priceTheDecimal / 100 : newPriceTheDecimal),
          );
        }}
        value={priceTheDecimal}
        className={classes.input}
      />
    </div>
  );
}
