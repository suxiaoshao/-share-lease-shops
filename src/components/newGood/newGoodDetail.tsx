import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { useGoodCardStyle } from '../good/goodDetailInfo';
import PriceInput from '../common/priceInput';
import UploadImage from '../common/uploadImage';
import { useFormStyle } from '../../utils/hook/useFornStyle';
import { useImageStyle } from '../goods/goodEdit';
import { UploadGood } from '../../utils/http/shop/addGood';
import { GoodType } from '../../utils/http/goods/goodList';

export interface NewGoodDetailProp {
  /**
   * 新的 good
   * */
  newGood: UploadGood;

  /**
   * 触发更新
   * */
  onChange(newGood: UploadGood): void;
}

export default function NewGoodDetail(props: NewGoodDetailProp): JSX.Element {
  const classes = useGoodCardStyle();
  const inputClasses = useFormStyle();
  const imageClasses = useImageStyle();
  return (
    <Card className={classes.base}>
      <CardHeader title={'基本信息'} />
      <CardContent>
        <TextField
          label={'商品名'}
          fullWidth
          value={props.newGood.name}
          onChange={(event) => {
            const newGood = { ...props.newGood, name: event.target.value };
            props.onChange(newGood);
          }}
          className={inputClasses.input}
        />
        <PriceInput
          label={'价格'}
          price={props.newGood.price}
          onChangePrice={(price) => {
            const newGood = { ...props.newGood, price };
            props.onChange(newGood);
          }}
          className={inputClasses.input}
        />
        <TextField
          label={'商品描述'}
          fullWidth
          value={props.newGood.info}
          onChange={(event) => {
            const newGood = { ...props.newGood, info: event.target.value };
            props.onChange(newGood);
          }}
          className={inputClasses.input}
        />
        <FormControl className={inputClasses.input}>
          <FormLabel component="legend">商品类型</FormLabel>
          <RadioGroup
            row
            value={props.newGood.type}
            onChange={(event) => {
              const newGood = { ...props.newGood, type: event.target.value as GoodType };
              props.onChange(newGood);
            }}
          >
            <FormControlLabel value="电子器件" control={<Radio />} label="电子器件" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth className={inputClasses.input}>
          <Typography variant={'caption'} color={'textSecondary'} component={'label'}>
            图片
          </Typography>
          <UploadImage
            onChangeSrc={(picUrl) => {
              const newGood = { ...props.newGood, picUrl };
              props.onChange(newGood);
            }}
            className={imageClasses.image}
            src={props.newGood.picUrl}
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
