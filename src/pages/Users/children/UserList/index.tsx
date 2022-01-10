import { Block, Delete, DoNotDisturbOnTwoTone, Edit, MarkEmailReadTwoTone, MoreVert } from '@mui/icons-material';
import { Avatar, Button, IconButton, Link, Stack, TableCell, TextField, Tooltip } from '@mui/material';
import GgIcon from 'assets/images/gg.svg';
import { IUser } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu, SimpleModal, useDialog } from 'components';
import { HeadCell } from 'components/DataTable/type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useBanAccountMutation, useDeleteUserMutation, useFetchAllUsersMutation } from 'services';
import { userManagementSx } from './style';

const headCells: HeadCell[] = [
  {
    id: 'name',
    position: 'left',
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'email',
    position: 'center',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'student_id',
    position: 'center',
    disablePadding: false,
    label: 'Student id',
  },
  {
    id: 'google_id',
    position: 'center',
    disablePadding: true,
    label: '',
  },
  {
    id: 'is_activated',
    position: 'center',
    disablePadding: true,
    label: '',
  },
  {
    id: 'is_banned',
    position: 'center',
    disablePadding: true,
    label: '',
  },
  {
    id: 'created_at',
    position: 'center',
    disablePadding: true,
    label: 'Join at',
  },
  {
    id: 'action',
    position: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

const UserList = () => {
  const navigate = useNavigate();
  const [showDialog, Dialog] = useDialog();

  const [fetchUsers, { data: getAllResponse, isLoading: isFetchingUsers }] = useFetchAllUsersMutation();
  const [deletuser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [banUser, { isLoading: isBanning }] = useBanAccountMutation();
  const totalPage = getAllResponse?.total_page ?? 0;
  const userList = getAllResponse?.data ?? [];
  const rows = userList.map((user: IUser) => createUserRecordRow(user));
  const rowIds = userList.map((u: IUser) => u._id as string);

  const [banTarget, setBanTarget] = React.useState<string | undefined>();
  const [banReason, setBanReason] = React.useState<string>('');

  React.useEffect(() => {
    fetchUsers({
      page: 0,
      per_page: 5,
    });
  }, []);

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc', orderBy: string) => {
    fetchUsers({
      page: page + 1,
      per_page: perPage,
      sort_by: orderBy,
      sort_type: order,
    });
  };

  const handleSearch = (key: string) => {
    fetchUsers({
      query: key,
      page: 1,
      per_page: 10,
    });
  };

  const handleBan = (id: string, reason: string) => {
    banUser({ user_id: id, reason: reason })
      .unwrap()
      .then(() => {
        toast.success('Account banned');
        //Refetch
        fetchUsers({
          page: 0,
          per_page: 5,
        });
      })
      .catch((err) => {
        toast.error('Operation failed! ' + err.data);
      });
    closeBanModal();
  };

  const closeBanModal = () => {
    setBanReason('');
    setBanTarget(undefined);
  };

  const handleDelete = (ids: string[]) => {
    showDialog(`Confirm deleting ${ids.length} items?`, () => {
      Promise.all([...ids.map((id: string) => deletuser(id).unwrap())])
        .then(() => {
          toast.success('Update succeed');
          //Refetch
          fetchUsers({
            page: 1,
            per_page: 5,
          });
        })
        .catch((err) => {
          toast.error('Update failed! ' + err.data);
        });
    });
  };

  function createUserRecordRow(user: IUser): JSX.Element {
    return (
      <>
        <TableCell scope="row" padding="none" align="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={user.avatar} sizes="small" sx={userManagementSx.avatar} />
            <Link
              underline="hover"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                navigate('/user-account/edit/' + user._id);
              }}
              sx={userManagementSx.link}
            >
              {Utils.getFullName(user.first_name, user.last_name)}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.student_id}</TableCell>
        <TableCell align="center" padding="none">
          {user.google_id && (
            <Tooltip title={`This user is logged in using google (id=${user.google_id})`}>
              <img src={GgIcon} alt="gg icon" sizes="32" />
            </Tooltip>
          )}
        </TableCell>
        <TableCell align="center" padding="none">
          {user.is_activated && (
            <Tooltip title={`This user is activated`}>
              <MarkEmailReadTwoTone color="success" />
            </Tooltip>
          )}
        </TableCell>
        <TableCell align="center" padding="none">
          {user.is_banned && (
            <Tooltip title={`This account is blocked from using the app`}>
              <DoNotDisturbOnTwoTone color="error" />
            </Tooltip>
          )}
        </TableCell>
        <TableCell align="center" padding="none">
          {Utils.displayDate(user.created_at as number)}
        </TableCell>
        <TableCell align="center">
          <PopupMenu
            items={[
              {
                label: 'Edit',
                icon: <Edit color="primary" />,
                colorMode: 'primary',
                sx: { width: 150, color: 'primary.main' },
                callback: () => navigate('/user-account/edit/' + user._id),
              },
              {
                label: 'Ban',
                icon: <Block color="warning" />,
                colorMode: 'warning',
                sx: { width: 150, color: 'warning.main' },
                callback: () => setBanTarget(user._id),
              },
              {
                label: 'Delete',
                icon: <Delete color="error" />,
                colorMode: 'error',
                sx: { width: 150, color: 'error.main' },
                callback: () => handleDelete([user._id as string]),
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
        deleteRows={handleDelete}
        loading={Utils.isLoading(isFetchingUsers, isDeleting, isBanning)}
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        total={totalPage}
        rowHeight={60}
      />

      <SimpleModal open={Boolean(banTarget)} handleClose={closeBanModal} title="Block/Ban a user">
        <>
          <TextField sx={{ my: 1 }} label="Ban reason?" value={banReason} onChange={(ev: any) => setBanReason(ev.target.value)} />
          <Stack direction="row" sx={{ my: 1 }} justifyContent="flex-end">
            <Button onClick={closeBanModal}>Cancel</Button>
            <Button onClick={() => handleBan(banTarget as string, banReason)}>Proceed</Button>
          </Stack>
        </>
      </SimpleModal>

      <Dialog />
    </React.Fragment>
  );
};

export default UserList;
