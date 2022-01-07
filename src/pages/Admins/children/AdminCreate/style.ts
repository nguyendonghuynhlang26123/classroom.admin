import { MultipleSxTypes } from 'common/type';

export const userCreateSx: MultipleSxTypes = {
  root: {
    maxWidth: 1000,
    '& .MuiButton-root': {
      ml: 'auto',
      textTransform: 'capitalize',
    },
    '& .MuiTextField-root': {
      my: 1,
    },
    '& .Mui-disabled .MuiInputBase-input': {
      bgcolor: 'grey.200',
      fontWeight: 500,
    },
  },

  stack: {
    gap: 3,
  },

  form: {
    mt: 3,
    p: 3,
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
    bgcolor: 'background.default',
    width: 'auto',
    '& .MuiTextField-root': {
      my: 1,
    },
  },

  form_note: {
    fontSize: '13px',
    mt: 1,
    color: 'warning.main',
    fontWeight: 400,
    fontStyle: 'italic',
  },

  avatarContainer: {
    position: 'relative',
    width: 200,

    '& label': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'ease-in-out 200ms',
      borderRadius: 1,

      '& input': {
        display: 'none',
      },

      '& .MuiSvgIcon-root': {
        opacity: 0,
        color: 'white',
      },

      ':hover': {
        bgcolor: 'rgba(0,0,0,0.4)',
        '& .MuiSvgIcon-root': {
          opacity: 1,
        },
      },
    },
  },
};
