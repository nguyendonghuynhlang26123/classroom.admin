export type TableToolbarProps = {
  numSelected: number;
  handleSearch: (key: string) => any;
  handleDelete: () => any;
  // filters: [];
};

export type FitlerType = {};

export type HeadCell = {
  disablePadding: boolean;
  id: string;
  label: string;
  position: 'left' | 'center' | 'right';
  disableSort?: boolean;
};

export type TableHeaderProps = {
  disableCheckbox?: boolean;
  headCells: HeadCell[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
};

export type DataTablePropType = {
  loading?: boolean;
  disableCheckbox?: boolean;
  rows: JSX.Element[];
  rowIds: string[];
  headCells: HeadCell[];
  fetchData: (page: number, perPage: number, order: 'asc' | 'desc', orderBy: string) => any;
  searchData: (key: string) => any;
  deleteRows: (ids: string[]) => any;
  total: number;
  rowHeight?: number;
};
