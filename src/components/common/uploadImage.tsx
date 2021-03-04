import React from 'react';
import { ButtonBase, ButtonBaseProps, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface UploadImageProp extends ButtonBaseProps {
  src: string;

  onChangeSrc(newSrc: string): void;
}

const useStyle = makeStyles(() =>
  createStyles({
    image: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    input: {
      display: 'none',
    },
  }),
);

/**
 * 上传图片组件
 * */
export default function UploadImage(props: UploadImageProp): JSX.Element {
  const classes = useStyle();
  return (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length !== 0) {
            const blob = files[0].slice();
            const src = URL.createObjectURL(blob);
            props.onChangeSrc(src);
            event.target.files = null;
          }
        }}
      />
      <ButtonBase
        {...props}
        className={`${props.className} ${classes.image}`}
        style={{ backgroundImage: `url('${props.src}')` }}
        onClick={() => {
          document.getElementById('contained-button-file')?.click();
        }}
      />
    </>
  );
}
