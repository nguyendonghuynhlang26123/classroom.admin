import { Block, Delete, Edit, More, MoreVert } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Link, Stack, TableCell, Typography } from '@mui/material';
import { IUser } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu, useLoading } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAllUsersMutation } from 'services';
import { userManagementSx } from './style';

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
    id: 'student_id',
    numeric: true,
    disablePadding: false,
    label: 'Student id',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'google_id',
    numeric: false,
    disablePadding: false,
    label: 'Google id',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const UserList = () => {
  const navigate = useNavigate();

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

  function createUserRecordRow(user: IUser): JSX.Element {
    return (
      <>
        <TableCell scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={user.avatar} sizes="small" sx={userManagementSx.avatar} />
            <Link
              underline="hover"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                navigate('/user-account/' + user._id);
              }}
              sx={userManagementSx.link}
            >
              {Utils.getFullName(user.first_name, user.last_name)}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user.deleted_at && <Chip label="Deleted" color="warning" />}</TableCell>
        <TableCell align="right">{user.student_id}</TableCell>
        <TableCell align="left">{user.google_id}</TableCell>
        <TableCell align="right">
          <PopupMenu
            items={[
              {
                label: 'Edit',
                icon: <Edit color="primary" />,
                colorMode: 'primary',
                sx: { width: 150, color: 'primary.main' },
                callback: () => navigate('/user-account/' + user._id),
              },
              {
                label: 'Ban',
                icon: <Block color="warning" />,
                colorMode: 'warning',
                sx: { width: 150, color: 'warning.main' },
                callback: () => console.log('Bann'),
              },
              {
                label: 'Delete',
                icon: <Delete color="error" />,
                colorMode: 'error',
                sx: { width: 150, color: 'error.main' },
                callback: () => console.log('DELETE'),
              },
            ]}
          >
            <IconButton>
              <MoreVert />
            </IconButton>
          </PopupMenu>
        </TableCell>
      </>
    );
  }

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
        loading={isFetchingUsers}
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

export default UserList;
