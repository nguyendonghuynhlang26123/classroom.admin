import { More } from '@mui/icons-material';
import { Avatar, Stack, TableCell, Typography } from '@mui/material';
import { IUser } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable } from 'components';
import React from 'react';
import { useFetchAllUsersMutation } from 'services';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Created date',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function createUserRecordRow(user: IUser): JSX.Element {
  return (
    <>
      <TableCell scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={user.avatar} sizes="small" />
          <Typography>{Utils.getFullName(user.first_name, user.last_name)}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.google_id}</TableCell>
      <TableCell align="right">{user.student_id}</TableCell>
      <TableCell align="right">
        <More />
      </TableCell>
    </>
  );
}

const AdminAccountManagement = () => {
  const [page, setPage] = React.useState<number>(0);
  const [perPage, setPerPage] = React.useState<number>(5);

  const [fetchUsers, { data: getAllResponse, isLoading: isFetchingUsers }] = useFetchAllUsersMutation();
  const totalPage = getAllResponse?.total_page ?? 0;
  const userList = getAllResponse?.data ?? [];
  const rows = userList.map((user: IUser) => createUserRecordRow(user));
  const rowIds = userList.map((u: IUser) => u._id as string);

  React.useEffect(() => {
    fetchUsers({
      page: page + 1,
      per_page: perPage,
    });
  }, []);

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc', orderBy: string) => {
    fetchUsers({
      page: page + 1,
      per_page: perPage,
      sort_by: orderBy,
      sort_type: order,
    });
    setPage(page);
    setPerPage(perPage);
  };

  const handleSearch = (key: string) => {
    setPage(0);
    setPerPage(10);

    fetchUsers({
      query: key,
      page: 1,
      per_page: 10,
    });
  };

  return (
    <React.Fragment>
      <AppBreadcrumbs
        title="Users management"
        label="Users"
        list={[
          {
            href: '/',
            label: 'Home',
          },
        ]}
      />
      <DataTable
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        curPage={page}
        perPage={perPage}
        total={totalPage}
        rowHeight={60}
      />
    </React.Fragment>
  );
};

export default AdminAccountManagement;
