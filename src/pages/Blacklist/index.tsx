import { Restore } from '@mui/icons-material';
import { Avatar, IconButton, Link, Stack, TableCell, Tooltip, Chip } from '@mui/material';
import { IBlackList } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable } from 'components';
import React from 'react';
import { useFetchAllBlacklistMutation, useUnblockAccountMutation } from 'services';
import { toast } from 'react-toastify';
import { HeadCell } from 'components/DataTable/type';

const headCells: HeadCell[] = [
  {
    id: 'restored',
    position: 'center',
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'account',
    position: 'left',
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'actor',
    position: 'left',
    disablePadding: false,
    label: 'Reporter',
  },
  {
    id: 'reason',
    position: 'center',
    disablePadding: false,
    label: 'Reason',
  },
  {
    id: 'created_at',
    position: 'center',
    disablePadding: false,
    label: 'Issue date',
  },
  {
    id: 'action',
    position: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

const BlacklistManagement = () => {
  const [fetchBlacklist, { data: getAllResponse, isLoading: isFetchingUsers }] = useFetchAllBlacklistMutation();
  const [unblockAccount, { isLoading: isUnblocking }] = useUnblockAccountMutation();
  const totalPage = getAllResponse?.total_page ?? 0;
  const blocklist = getAllResponse?.data ?? [];
  const rows = blocklist.map((user: IBlackList) => createBlacklistRecordRow(user));
  const rowIds = blocklist.map((u: IBlackList) => u._id as string);

  React.useEffect(() => {
    fetchBlacklist({
      page: 0,
      per_page: 5,
    });
  }, []);

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc', orderBy: string) => {
    fetchBlacklist({
      page: page + 1,
      per_page: perPage,
      sort_by: orderBy,
      sort_type: order,
    });
  };

  const handleSearch = (key: string) => {
    fetchBlacklist({
      query: key,
      page: 1,
      per_page: 10,
    });
  };

  const handleUnblockAccount = (blackListId: string) => {
    unblockAccount(blackListId)
      .unwrap()
      .then(() => {
        toast.success('Update succeed');
        //Refetch
        fetchBlacklist({
          page: 0,
          per_page: 5,
        });
      })
      .catch((err) => {
        toast.error('Update failed! ' + err.data);
      });
  };

  function createBlacklistRecordRow(blacklist: IBlackList): JSX.Element {
    const restoredSx = blacklist.restored
      ? {
          color: 'text.secondary',
          fontStyle: 'italic',
          textDecoration: 'line-through',
        }
      : {};
    return (
      <>
        <TableCell align="left" scope="row" padding="none">
          {blacklist.restored && <Chip label="Restored" color="success" variant="outlined" />}
        </TableCell>
        <TableCell scope="row" padding="none" sx={restoredSx} align="center">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={blacklist.account.avatar} sizes="small" sx={{ width: 32, height: 32 }} />
            <Link underline="hover" href="#" onClick={(ev) => ev.preventDefault()}>
              {Utils.getFullName(blacklist.account.first_name, blacklist.account.last_name)}
            </Link>
          </Stack>
        </TableCell>
        <TableCell sx={restoredSx}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={blacklist.actor.avatar} sizes="small" sx={{ width: 32, height: 32 }} />
            <Link underline="hover" href="#" onClick={(ev) => ev.preventDefault()}>
              {blacklist.actor.name}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="center" sx={restoredSx}>
          {blacklist.reason}
        </TableCell>
        <TableCell align="center" sx={restoredSx}>
          {Utils.displayDate(blacklist.created_at as number)}
        </TableCell>
        <TableCell align="center">
          {!blacklist.restored && (
            <Tooltip title="Unblock this account">
              <IconButton onClick={() => handleUnblockAccount(blacklist._id as string)}>
                <Restore color="success" />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </>
    );
  }

  return (
    <React.Fragment>
      <AppBreadcrumbs
        title="Blacklist History"
        label="Blacklist"
        list={[
          {
            href: '/',
            label: 'Home',
          },
        ]}
      />
      <DataTable
        deleteRows={(ids: string[]) => console.log(ids)}
        loading={isFetchingUsers}
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        total={totalPage}
        rowHeight={60}
        disableCheckbox
      />
    </React.Fragment>
  );
};

export default BlacklistManagement;
