//Profile
import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, CircularProgress, Container, Grid, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';
import { IUser, IUserBody } from 'common/interfaces';
import Utils from 'common/utils';
import { Navbar, useAuth, useLoading } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation, useUploadImageMutation, useGetAllClassesQuery } from 'services/api';
import * as yup from 'yup';
import { profileSx } from './style';

const validationSchema = yup.object({
  student_id: yup.string().matches(STUDENT_ID_REGEX, 'Invalid studentID'),
  first_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Firstname is required'),
  last_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Lastname is rquired'),
});

const UserProfile = () => {
  const { userData, reload } = useAuth();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const { data: classrooms, isLoading: isFetchingClassrooms } = useGetAllClassesQuery();
  const [avatar, setAvatar] = React.useState<string | undefined>(userData?.avatar);
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [loading, setLoading] = useLoading();

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
            reload();
            toast.success('Update succeed');
          })
          .catch((err) => {
            toast.error('Update failed! ' + err.data);
          });
      }
    },
  });

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isUploading, isFetchingClassrooms));
  }, [isLoading, isUploading, isFetchingClassrooms]);

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
    <Box sx={profileSx.root}>
      <Container maxWidth={false} sx={profileSx.container}>
        <Box sx={profileSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Typography sx={profileSx.form_title} color="primary">
            Profile
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} sx={{ px: 2, py: 1 }}>
              <Box sx={profileSx.avatarContainer}>
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
            </Grid>
            <Grid item xs={8}>
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
              <Stack direction="row" sx={profileSx.stack}>
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
              {userData?.google_id != null && (
                <Typography sx={profileSx.form_note} variant="body2">
                  *You are linking your account with google, so please update your google account if you want to update your classroom
                  account
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
