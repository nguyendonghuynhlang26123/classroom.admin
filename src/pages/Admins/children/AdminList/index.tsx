import { Block, Delete, Edit, More, MoreVert } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Link, Stack, TableCell, Button } from '@mui/material';
import { IAdmin } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAllAdminsMutation } from 'services';
import { userManagementSx } from './style';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'is_root',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const AdminList = () => {
  const navigate = useNavigate();

  const [fetchAdmins, { data: getAllResponse, isLoading: isFetching }] = useFetchAllAdminsMutation();
  const totalPage = getAllResponse?.total_page ?? 0;
  const adminList = getAllResponse?.data ?? [];
  const rows = adminList.map((a: IAdmin) => createAdminRecordRow(a));
  const rowIds = adminList.map((a: IAdmin) => a._id as string);

  React.useEffect(() => {
    fetchAdmins({
      page: 1,
      per_page: 5,
    });
  }, []);

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc', orderBy: string) => {
    fetchAdmins({
      page: page + 1,
      per_page: perPage,
      sort_by: orderBy,
      sort_type: order,
    });
  };

  const handleSearch = (key: string) => {
    fetchAdmins({
      query: key,
      page: 1,
      per_page: 10,
    });
  };

  function createAdminRecordRow(admin: IAdmin): JSX.Element {
    return (
      <>
        <TableCell scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={admin.avatar} sizes="small" sx={{ width: 32, height: 32 }} />
            <Link
              underline="hover"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                navigate('/admin-account/edit/' + admin._id);
              }}
              sx={userManagementSx.link}
            >
              {admin.name}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left">{admin.email}</TableCell>
        <TableCell align="right">
          {admin.is_root ? <Chip label="Root" color="success" /> : <Chip label="Admin" color="warning" />}
        </TableCell>
        <TableCell align="right">{Utils.displayDate(admin.created_at as number)}</TableCell>
        <TableCell align="right">
          <PopupMenu
            items={[
              {
                label: 'Edit',
                icon: <Edit color="primary" />,
                colorMode: 'primary',
                sx: { width: 150, color: 'primary.main' },
                callback: () => navigate('/admin-account/edit/' + admin._id),
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppBreadcrumbs
          title="Admin accounts management"
          label="Amin"
          list={[
            {
              href: '/',
              label: 'Home',
            },
          ]}
        />
        <Stack direction="row">
          <Button variant="outlined" onClick={() => navigate('./create')}>
            Add one
          </Button>
        </Stack>
      </Stack>
      <DataTable
        loading={isFetching}
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        curPage={0}
        perPage={5}
        total={totalPage}
        rowHeight={60}
      />
    </React.Fragment>
  );
};

export default AdminList;
