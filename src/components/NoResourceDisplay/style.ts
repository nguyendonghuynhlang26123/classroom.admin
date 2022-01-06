import { MultipleSxTypes } from 'common/type';

export const styleSx: MultipleSxTypes = {
  root: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    py: 3,
    px: 2,
  },

  imgContainer: {
    '& img': {
      height: 200,
    },
  },

  textContainer: {
    flex: 1,
  },

  textTitle: {
    fontWeight: 600,
    fontSize: 24,
  },
  textDescription: {
    fontWeight: 500,
    fontSize: 14,
    color: 'grey.600',
    my: 1,
  },
  btn: {
    my: 1,
  },
};
