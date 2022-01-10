import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { Avatar, Button, Chip, IconButton, Link, Stack, TableCell } from '@mui/material';
import { IAdmin } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu, useDialog } from 'components';
import { HeadCell } from 'components/DataTable/type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteAdminMutation, useFetchAllAdminsMutation } from 'services';
import { userManagementSx } from './style';

const headCells: HeadCell[] = [
  {
    id: 'name',
    position: 'left',
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    position: 'center',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'is_root',
    position: 'center',
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'created_at',
    position: 'center',
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'action',
    position: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

const AdminList = () => {
  const navigate = useNavigate();
  const [showDialog, Dialog] = useDialog();

  const [fetchAdmins, { data: getAllResponse, isLoading: isFetching }] = useFetchAllAdminsMutation();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
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

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc' | undefined, orderBy: string | undefined) => {
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

  const handleDelete = (ids: string[]) => {
    showDialog(`Confirm deleting ${ids.length} items?`, () => {
      Promise.all([...ids.map((id: string) => deleteAdmin(id).unwrap())])
        .then(() => {
          toast.success('Update succeed');
          //Refetch
          fetchAdmins({
            page: 1,
            per_page: 5,
          });
        })
        .catch((err) => {
          toast.error('Update failed! ' + err.data);
        });
    });
  };

  function createAdminRecordRow(admin: IAdmin): JSX.Element {
    return (
      <>
        <TableCell scope="row" padding="none" align="left">
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
        <TableCell align="center">{admin.email}</TableCell>
        <TableCell align="center">
          {admin.is_root ? (
            <Chip label="Root" color="success" variant="outlined" />
          ) : (
            <Chip label="Admin" color="warning" variant="outlined" />
          )}
        </TableCell>
        <TableCell align="center">{Utils.displayDate(admin.created_at as number)}</TableCell>
        <TableCell align="center">
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
                callback: () => handleDelete([admin._id as string]),
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
        deleteRows={(ids: string[]) => handleDelete(ids)}
        loading={isFetching}
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        total={totalPage}
        rowHeight={80}
      />

      <Dialog />
    </React.Fragment>
  );
};

export default AdminList;
