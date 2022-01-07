import { SxType } from 'common/type';

export const breadcrumbSx: SxType = {
  pt: 6,
  pb: 2,
  '& .breadcumbs-header': {
    fontSize: 20,
    fontWeight: 500,
    mt: 0,
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
