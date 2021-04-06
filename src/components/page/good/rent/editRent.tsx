import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from '@material-ui/core';
import { RentInfo } from '../../../../utils/http/goods/getGoodDetail';
import PriceInput from '../../../common/priceInput';
import { useFormStyle } from '../../../../utils/hook/useFornStyle';
import { useAsyncFnWithNotify } from '../../../../utils/hook/useAsyncFnWithNotify';
import { UploadRent } from '../../../../utils/http/shop/updateRent';

export interface EditRentProp {
  /**
   * 是否打开对话框
   * */
  open: boolean;
  /**
   * 对话框标题
   * */
  title: string;

  /**
   * 关闭修改框
   * */
  onClose(): void;

  /**
   * 租金信息,如果未指定这是新的
   * */
  rent?: RentInfo;

  /**
   * 修改
   * */
  onChange(rent: RentInfo | UploadRent): Promise<void>;

  /**
   * 成功信息
   * */
  successMessage: string;
}

/**
 * 编辑租金组件
 * */
export default function EditRent(props: EditRentProp): JSX.Element {
  const [rent, setRent] = React.useState<number>(1);
  const [pledge, setPledge] = React.useState<number>(1);
  const [timeType, setTimeType] = React.useState<3600 | 86400 | 2592000>(3600);
  const [timeValue, setTimeValue] = React.useState<number>(1);
  const classes = useFormStyle();
  React.useEffect(() => {
    if (props.rent !== undefined) {
      setRent(props.rent.rent);
      setPledge(props.rent.pledge);
      if (props.rent.time < 86400) {
        setTimeType(3600);
        setTimeValue(Math.floor(props.rent.time / 3600));
      } else if (props.rent.time < 2592000) {
        setTimeType(86400);
        setTimeValue(Math.floor(props.rent.time / 86400));
      } else {
        setTimeType(2592000);
        setTimeValue(Math.floor(props.rent.time / 86400));
      }
    }
  }, [props.rent]);
  const time = React.useMemo(() => {
    return timeType * timeValue;
  }, [timeType, timeValue]);
  const [changeState, fn] = useAsyncFnWithNotify(
    async () => {
      await props.onChange({ ...props.rent, rent, pledge, time });
      props.onClose();
    },
    props.successMessage,
    [rent, pledge, time, props.onChange],
  );
  return (
    <Dialog maxWidth={'sm'} open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <PriceInput label={'租金'} price={rent} onChangePrice={setRent} className={classes.input} />
        <PriceInput label={'保证金'} price={pledge} onChangePrice={setPledge} className={classes.input} />
        <FormControl component="fieldset">
          <FormLabel component="legend">
            租借时间: {`${timeValue}${timeType === 3600 ? '小时' : timeType === 86400 ? '天' : '月'}`}
          </FormLabel>
          <RadioGroup
            value={timeType}
            onChange={(event) => {
              setTimeType(parseInt(event.target.value) as 3600 | 86400 | 2592000);
            }}
          >
            <FormControlLabel value={3600} control={<Radio />} label="按小时计算" />
            <FormControlLabel value={86400} control={<Radio />} label="按天计算" />
            <FormControlLabel value={2592000} control={<Radio />} label="按月计算(一个月恒定为 30 天)" />
          </RadioGroup>
        </FormControl>
        <Slider
          value={timeValue}
          step={1}
          max={30}
          min={1}
          valueLabelFormat={(value) => `${value}${timeType === 3600 ? '时' : timeType === 86400 ? '天' : '月'}`}
          valueLabelDisplay="auto"
          onChange={(event, value) => {
            setTimeValue(value as number);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color={'secondary'} onClick={props.onClose}>
          取消
        </Button>
        <Button color={'primary'} disabled={changeState.loading} onClick={fn}>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
