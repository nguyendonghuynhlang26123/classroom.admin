import { MultipleSxTypes } from 'common/type';

export const headerSx: MultipleSxTypes = {
  root: {
    bgcolor: 'grey.100',
    borderRadius: 2.5,
  },
};

export const toolbarSx: MultipleSxTypes = {
  root: {
    width: '100%',
    justifyContent: 'space-between',

    '& .MuiDivider-root': {
      mx: -3,
    },
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  search: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    py: 1,

    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      p: 1,
    },
  },

  filters: {
    py: 2,
    '& .MuiChip-root': {
      py: 1,
      mx: 1,
    },
  },
};

export const tableSx: MultipleSxTypes = {
  root: { width: '100%', borderRadius: 2, boxShadow: 1, my: 2, overflow: 'hidden' },
  table: { minWidth: 750 },
};
