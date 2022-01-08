import { Block, Delete, Edit, More, MoreVert } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Link, Stack, TableCell, Button } from '@mui/material';
import { IClassroom, IClassroomUser, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { AppBreadcrumbs, DataTable, PopupMenu } from 'components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchAllClassesMutation } from 'services';
import { userManagementSx } from './style';

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'subject',
    numeric: true,
    disablePadding: false,
    label: 'Subject',
  },
  {
    id: 'section',
    numeric: true,
    disablePadding: false,
    label: 'Section',
  },
  {
    id: 'room',
    numeric: true,
    disablePadding: false,
    label: 'Room',
  },
  {
    id: 'code',
    numeric: true,
    disablePadding: false,
    label: 'Code',
  },
  {
    id: 'users',
    numeric: true,
    disablePadding: false,
    label: 'Participants',
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

const ClassroomList = () => {
  const navigate = useNavigate();

  const [fetchClassrooms, { data: getAllResponse, isLoading: isFetching }] = useFetchAllClassesMutation();
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
        <TableCell align="right">{classroom.subject}</TableCell>
        <TableCell align="right">{classroom.section}</TableCell>
        <TableCell align="right">{classroom.room}</TableCell>
        <TableCell align="right">
          <Chip label={classroom.code} onClick={() => {}} size="small" />
        </TableCell>
        <TableCell align="right">
          {/* {classroom.users.length} */}
          <Chip label={`${teacherCount} teachers`} color="success" size="small" variant="outlined" />{' '}
          <Chip label={`${studentCount} students`} color="primary" size="small" variant="outlined" />
          {/* {classroom.is_root ? <Chip label="Root" color="success" /> : <Chip label="Admin" color="warning" />} */}
        </TableCell>
        <TableCell align="right">{Utils.displayDate(classroom.created_at as number)}</TableCell>
        <TableCell align="right">
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
        loading={isFetching}
        headCells={headCells}
        rows={rows}
        fetchData={fetchData}
        searchData={handleSearch}
        rowIds={rowIds}
        total={totalPage}
        rowHeight={80}
      />
    </React.Fragment>
  );
};

export default ClassroomList;
