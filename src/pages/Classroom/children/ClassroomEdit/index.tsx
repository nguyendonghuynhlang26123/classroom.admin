//Profile
import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { IClassroomBody } from 'common/interfaces';
import Utils from 'common/utils';
import { useAuth, useLoading, AppBreadcrumbs } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUploadImageMutation, useGetClassDetailsQuery, useUpdateClassDetailsMutation } from 'services/api';
import * as yup from 'yup';
import { classroomEditSx } from './style';

const validationSchema = yup.object({
  title: yup
    .string()
    .min(1, 'Classroom Title should be of 1-100 characters length')
    .max(100, 'Classroom Title should be of 1-100 characters length')
    .required('Classroom Title is required'),
  section: yup.string().min(1, 'Section should be of 1-50 characters length').max(50, 'Section should be of 1-50 characters length'),
  subject: yup.string().min(1, 'Subject should be of 1-50 characters length').max(50, 'Subject should be of 1-50 characters length'),
  room: yup.string().min(1, 'Room should be of 1-50 characters length').max(50, 'Room should be of 1-50 characters length'),
});
const defaultProps: IClassroomBody = {
  title: '',
  room: '',
  section: '',
  subject: '',
};

const ClassroomEdit = () => {
  const { classroomId } = useParams();
  const { data: classroomData, isLoading: isFetchingData } = useGetClassDetailsQuery(classroomId as string);
  console.log('log ~ file: index.tsx ~ line 35 ~ ClassroomEdit ~ classroomData', classroomData);
  const [updateClassroom, { isLoading }] = useUpdateClassDetailsMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>(classroomData?.image);
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [, setLoading] = useLoading();

  const formik = useFormik<IClassroomBody>({
    initialValues: defaultProps,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateClassroom({ id: classroomId as string, body: values })
        .unwrap()
        .then(() => {
          toast.success('Update class data completed');
        })
        .catch((err) => {
          toast.error('Update class data failed! ' + err.data);
        });
    },
  });

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isUploading, isFetchingData));
  }, [isLoading, isUploading, isFetchingData]);

  React.useEffect(() => {
    if (classroomData) {
      formik.setValues({
        title: classroomData.title ?? '',
        room: classroomData.room ?? '',
        section: classroomData.section ?? '',
        subject: classroomData.subject ?? '',
      });
      setAvatar(classroomData?.image);
    }
  }, [classroomData]);

  // const handleUpdateData = async (id: string, name: string, file: any) => {
  //   let form_data = new FormData();

  //   if (file) {
  //     form_data.append('image', file);
  //     const uploaded = await uploadAvatar(form_data).unwrap();
  //     return await updateClassroom({ id: id, body: { name: name, avatar: uploaded.url } });
  //   }
  //   return await updateClassroom({ id: id, body: { name: name, avatar: undefined } });
  // };

  const handleSelectFile = (ev: any) => {
    const file = ev?.target?.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.warning('Image size is too large! Please try another one');
      return;
    }
    if (file.type.split('/')[0] !== 'image') {
      toast.warning('Please upload image only!');
      return;
    }
    setUploadFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  return (
    <Box sx={classroomEditSx.root}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppBreadcrumbs
          title="Edit User"
          label="Edit"
          list={[
            {
              href: '/',
              label: 'Home',
            },
            {
              href: '/admin-account',
              label: 'Admin',
            },
          ]}
        />
        <Stack direction="row">
          <Button variant="outlined" onClick={() => formik.submitForm()}>
            Save
          </Button>
        </Stack>
      </Stack>
      <Box sx={classroomEditSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={3} direction="column" alignItems="center">
          <Box sx={classroomEditSx.imageContainer}>
            <Avatar variant="rounded" sx={{ height: '100%', width: '100%' }} src={avatar} />

            <label htmlFor="icon-button-file" className="overlay">
              <input accept="image/*" id="icon-button-file" type="file" onChange={handleSelectFile} />
              <PhotoCamera />
            </label>
          </Box>
          <Box>
            <TextField
              id="title"
              name="title"
              label="Class name (required)"
              variant="filled"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="section"
              name="section"
              label="Section"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.section}
              error={formik.touched.section && Boolean(formik.errors.section)}
              helperText={formik.touched.section && formik.errors.section}
            />
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.subject}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />
            <TextField
              id="room"
              name="room"
              label="Room"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.room}
              error={formik.touched.room && Boolean(formik.errors.room)}
              helperText={formik.touched.room && formik.errors.room}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ClassroomEdit;
