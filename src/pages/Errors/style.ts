import { MultipleSxTypes } from 'common/type';

export const errorPageSx: MultipleSxTypes = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    px: {
      xs: 2,
      sm: 4,
    },
    py: 5,
    borderRadius: 2,
    width: 448,
    textAlign: 'center',
  },

  paper_title: {
    fontWeight: 600,
    textTransform: 'uppercase',
    mt: 2,
  },
};
