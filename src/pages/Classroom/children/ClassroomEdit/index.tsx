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
import { useUploadImageMutation, useGetAdminDetailsQuery, useUpdateAdminAccountMutation } from 'services/api';
import * as yup from 'yup';
import { userEditSx } from './style';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});

const AdminEdit = () => {
  const { adminId } = useParams();
  const { data: adminData, isLoading: isFetchingData } = useGetAdminDetailsQuery(adminId as string);
  const [updateAdmin, { isLoading }] = useUpdateAdminAccountMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>(adminData?.avatar);
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: {
      name: adminData?.name || '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (adminData) {
        handleUpdateData(adminData._id as string, values.name, uploadFile)
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
    if (adminData) {
      formik.setValues({
        name: adminData?.name || '',
      });
      setAvatar(adminData.avatar);
    }
  }, [adminData]);

  const handleUpdateData = async (id: string, name: string, file: any) => {
    let form_data = new FormData();

    if (file) {
      form_data.append('image', file);
      const uploaded = await uploadAvatar(form_data).unwrap();
      return await updateAdmin({ id: id, body: { name: name, avatar: uploaded.url } });
    }
    return await updateAdmin({ id: id, body: { name: name, avatar: undefined } });
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
            <TextField
              id="name"
              name="name"
              label="Name (required)"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField id="email" name="email" label="Email" fullWidth disabled value={adminData?.email} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminEdit;
