import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useFormStyle = makeStyles((theme) =>
  createStyles({
    input: {
      margin: `${theme.spacing(1.5)}px 0`,
    },
  }),
);
