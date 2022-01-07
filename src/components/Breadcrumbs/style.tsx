import { SxType } from 'common/type';

export const breadcrumbSx: SxType = {
  py: 4,
  '& .breadcumbs-header': {
    fontSize: 20,
    fontWeight: 500,
  },

  '& .MuiBreadcrumbs-root': {
    fontSize: 14,

    '& .MuiTypography-root': {},

    '& .MuiBreadcrumbs-separator': {
      mx: 1,
      fontSize: 10,
    },
  },
};
