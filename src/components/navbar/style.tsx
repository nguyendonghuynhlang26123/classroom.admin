import { SxType, MultipleSxTypes } from 'common/type';

const drawerWidth = 300;
const headerHeight = 64;

export const navbarLayoutSx: MultipleSxTypes = {
  root: {
    display: 'flex',
  },

  appbar: { width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` },

  toolbar: {
    bgcolor: 'background.paper',
    color: 'text.primary',
    justifyContent: 'flex-end',
    borderBottom: 1,
    borderColor: 'divider',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    px: 2,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
    '& .MuiListItem-root': {
      p: 0,
    },

    '& .logo': {
      fontWeight: 500,
      fontSize: 20,
    },
  },

  btnItem: {
    fontWeight: 500,
    fontSize: 16,
    height: 56,
  },

  main: {
    flexGrow: 1,
    bgcolor: 'grey.50',
    px: 3,
    mt: `${headerHeight}px`,
    minHeight: `calc(100vh - ${headerHeight}px)`,
  },

  accordionItem: {
    boxShadow: 0,
    width: '100%',
    p: 0,
    '& .MuiAccordionDetails-root': { p: 0 },
  },

  title: {
    fontWeight: 500,
    fontSize: 14,
    color: 'grey.800',
    letterSpacing: '.2px',
  },
};
