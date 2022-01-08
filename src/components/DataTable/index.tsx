import {
  Box,
  Checkbox,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';
import { TableHeader } from './TableHeader';
import { TableToolbar } from './TableToolbar';
import { DataTablePropType } from './type';
import { tableSx } from './style';

export const DataTable = (props: DataTablePropType) => {
  const { loading, rows, rowIds, headCells, fetchData, total, searchData, rowHeight } = props;
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('created_at');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    fetchData(page, rowsPerPage, isAsc ? 'desc' : 'asc', property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rowIds;
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxChecked = (event: React.MouseEvent<unknown>, rowIndex: number) => {
    const rowId = rowIds[rowIndex];
    const selectedIndex = selected.indexOf(rowId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchData(newPage, rowsPerPage, order, orderBy);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newPerPage);
    setPage(0);
    fetchData(0, newPerPage, order, orderBy);
  };

  const isSelected = (rowIndex: number) => selected.indexOf(rowIds[rowIndex]) !== -1;

  const searchCallback = (key: string) => {
    //Reset after call search fcn
    setPage(0);
    setOrder('desc');
    setOrderBy('created_at');
    searchData(key);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page >= 0 ? Math.max(0, rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={tableSx.root} elevation={1}>
      <TableToolbar numSelected={selected.length} handleSearch={searchCallback} />
      <TableContainer>
        <Table sx={tableSx.table} aria-labelledby="tableTitle" size={'medium'}>
          <TableHeader
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={headCells.length + 1} sx={{ p: 0 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {rows.length === 0 ? (
              <TableRow
                style={{
                  height: (rowHeight ?? 53) * emptyRows,
                }}
              >
                <TableCell colSpan={headCells.length + 1} />
              </TableRow>
            ) : (
              <>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ height: rowHeight }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleCheckboxChecked(event, index)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {row}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (rowHeight ?? 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={headCells.length + 1} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
