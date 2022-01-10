import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { Button, Chip, IconButton, Link, Stack, TableCell } from '@mui/material';
import { IClassroom, IClassroomUser, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu, useDialog } from 'components';
import { HeadCell } from 'components/DataTable/type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteClassroomMutation, useFetchAllClassesMutation } from 'services';
import { userManagementSx } from './style';

const headCells: HeadCell[] = [
  {
    id: 'title',
    position: 'center',
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'subject',
    position: 'center',
    disablePadding: false,
    label: 'Subject',
  },
  {
    id: 'section',
    position: 'center',
    disablePadding: false,
    label: 'Section',
  },
  {
    id: 'room',
    position: 'center',
    disablePadding: false,
    label: 'Room',
  },
  {
    id: 'code',
    position: 'center',
    disablePadding: false,
    label: 'Code',
  },
  {
    id: 'users',
    position: 'center',
    disablePadding: false,
    label: 'Participants',
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

const ClassroomList = () => {
  const navigate = useNavigate();
  const [showDialog, Dialog] = useDialog();

  const [fetchClassrooms, { data: getAllResponse, isLoading: isFetching }] = useFetchAllClassesMutation();
  const [deleteClassroom] = useDeleteClassroomMutation();
  const totalPage = getAllResponse?.total_page ?? 0;
  const classroomList = getAllResponse?.data ?? [];
  const rows = classroomList.map((c: IClassroom) => createClassroomRecordRow(c));
  const rowIds = classroomList.map((c: IClassroom) => c._id as string);

  React.useEffect(() => {
    fetchClassrooms({
      page: 1,
      per_page: 5,
    });
  }, []);

  const fetchData = (page: number, perPage: number, order: 'desc' | 'asc', orderBy: string) => {
    fetchClassrooms({
      page: page + 1,
      per_page: perPage,
      sort_by: orderBy,
      sort_type: order,
    });
  };

  const handleSearch = (key: string) => {
    fetchClassrooms({
      query: key,
      page: 1,
      per_page: 10,
    });
  };

  const handleDelete = (ids: string[]) => {
    showDialog(`Confirm deleting ${ids.length} items?`, () => {
      Promise.all([...ids.map((id: string) => deleteClassroom(id).unwrap())])
        .then(() => {
          toast.success('Update succeed');
          //Refetch
          fetchClassrooms({
            page: 1,
            per_page: 5,
          });
        })
        .catch((err) => {
          toast.error('Update failed! ' + err.data);
        });
    });
  };

  function createClassroomRecordRow(classroom: IClassroom): JSX.Element {
    const teacherCount = classroom.users.filter((u: IClassroomUser) => u.role !== UserRole.STUDENT).length;
    const studentCount = classroom.users.filter((u: IClassroomUser) => u.role === UserRole.STUDENT).length;

    return (
      <>
        <TableCell scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar src={admin.avatar} sizes="small" sx={{ width: 32, height: 32 }} /> */}
            <Link
              underline="hover"
              href="#"
              onClick={(ev) => {
                ev.preventDefault();
                navigate('/classroom/edit/' + classroom._id);
              }}
              sx={userManagementSx.link}
            >
              {classroom.title}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="center">{classroom.subject}</TableCell>
        <TableCell align="center">{classroom.section}</TableCell>
        <TableCell align="center">{classroom.room}</TableCell>
        <TableCell align="center">
          <Chip label={classroom.code} onClick={() => {}} size="small" />
        </TableCell>
        <TableCell align="center">
          {/* {classroom.users.length} */}
          <Chip label={`${teacherCount} teachers`} color="success" size="small" variant="outlined" />{' '}
          <Chip label={`${studentCount} students`} color="primary" size="small" variant="outlined" />
          {/* {classroom.is_root ? <Chip label="Root" color="success" /> : <Chip label="Admin" color="warning" />} */}
        </TableCell>
        <TableCell align="center">{Utils.displayDate(classroom.created_at as number)}</TableCell>
        <TableCell align="center">
          <PopupMenu
            items={[
              {
                label: 'Edit',
                icon: <Edit color="primary" />,
                colorMode: 'primary',
                sx: { width: 150, color: 'primary.main' },
                callback: () => navigate('/classroom/edit/' + classroom._id),
              },
              {
                label: 'Delete',
                icon: <Delete color="error" />,
                colorMode: 'error',
                sx: { width: 150, color: 'error.main' },
                callback: () => handleDelete([classroom._id as string]),
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
          title="Classrooms management"
          label="Classroom"
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
        deleteRows={handleDelete}
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

export default ClassroomList;
