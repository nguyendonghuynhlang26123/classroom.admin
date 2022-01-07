//Profile
import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';
import { IUserBody } from 'common/interfaces';
import Utils from 'common/utils';
import { useAuth, useLoading, AppBreadcrumbs } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUploadImageMutation, useGetUserDetailsQuery, useUpdateUserDataMutation } from 'services/api';
import * as yup from 'yup';
import { userEditSx } from './style';

const validationSchema = yup.object({
  student_id: yup.string().matches(STUDENT_ID_REGEX, 'Invalid studentID'),
  first_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Firstname is required'),
  last_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Lastname is rquired'),
});

// const userData = {
//   _id: '61d83816b119e979e10bd681',
//   deleted_at: null,
//   google_id: null,
//   last_name: 'Nguyen',
//   first_name: 'Long',
//   avatar: 'https://lh3.googleusercontent.com/a/AATXAJy1BlcLwHzZSxkGabCyJHf3thKIH-0gzZVgOZA-=s96-c',
//   student_id: null,
//   email: 'long@mail.com',
//   created_at: 1641560086189,
//   updated_at: 1641560086189,
// };

const UserEdit = () => {
  const { userId } = useParams();
  const { data: userData, isLoading: isFetchingData } = useGetUserDetailsQuery(userId as string);
  const [updateProfile, { isLoading }] = useUpdateUserDataMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>(userData?.avatar);
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: {
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      student_id: userData?.student_id || '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (userData) {
        handleUpdateData(userData._id as string, values, uploadFile)
          .then(() => {
            toast.success('Update succeed');
          })
          .catch((err) => {
            toast.error('Update failed! ' + err.data);
          });
      }
    },
  });

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isUploading, isFetchingData));
  }, [isLoading, isUploading, isFetchingData]);

  React.useEffect(() => {
    if (userData) {
      formik.setValues({
        first_name: userData.first_name,
        last_name: userData.last_name,
        student_id: userData?.student_id ?? '',
      });
      setAvatar(userData.avatar);
    }
  }, [userData]);

  const handleUpdateData = async (id: string, values: IUserBody, file: any) => {
    let form_data = new FormData();

    if (file) {
      form_data.append('image', file);
      const uploaded = await uploadAvatar(form_data).unwrap();
      return await updateProfile({ id: id, body: { ...values, avatar: uploaded.url } });
    }
    return await updateProfile({ id: id, body: { ...values, avatar: undefined } });
  };

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
    <Box sx={userEditSx.root}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppBreadcrumbs
          title="Edit User"
          label="User Details"
          list={[
            {
              href: '/',
              label: 'Home',
            },
            {
              href: '/user-account',
              label: 'User',
            },
          ]}
        />
        <Stack direction="row">
          <Button variant="contained" onClick={() => formik.submitForm()}>
            Save
          </Button>
        </Stack>
      </Stack>
      <Box sx={userEditSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Box sx={userEditSx.avatarContainer}>
            {avatar ? (
              <Avatar variant="rounded" sx={{ width: '100%', height: 'auto' }} src={avatar} />
            ) : (
              <Avatar variant="rounded" sx={{ width: '100%', height: 'auto' }}></Avatar>
            )}

            <label htmlFor="icon-button-file" className="overlay">
              <input accept="image/*" id="icon-button-file" type="file" onChange={handleSelectFile} />
              <PhotoCamera />
            </label>
          </Box>
          <Box>
            <Stack direction="row" sx={userEditSx.stack}>
              <TextField
                id="first_name"
                name="first_name"
                label="First name (required)"
                fullWidth
                disabled={userData?.google_id !== null}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
              <TextField
                id="last_name"
                name="last_name"
                label="Lastname (required)"
                fullWidth
                disabled={userData?.google_id !== null}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Stack>
            <TextField
              id="student_id"
              name="student_id"
              label="Student Id"
              fullWidth
              value={formik.values.student_id}
              onChange={formik.handleChange}
              error={formik.touched.student_id && Boolean(formik.errors.student_id)}
              helperText={formik.touched.student_id && formik.errors.student_id}
            />
            <TextField id="email" name="email" label="Email" fullWidth disabled value={userData?.email} />
            {userData?.google_id != null && (
              <Typography sx={userEditSx.form_note} variant="body2">
                *This account is logged in using google account
              </Typography>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserEdit;
