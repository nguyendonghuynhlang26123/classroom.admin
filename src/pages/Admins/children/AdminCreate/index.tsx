//Profile
import { PhotoCamera } from '@mui/icons-material';
import { Avatar, Box, Button, Stack, TextField } from '@mui/material';
import Utils from 'common/utils';
import { AppBreadcrumbs, useLoading } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateAdminMutation, useUploadImageMutation } from 'services/api';
import * as yup from 'yup';
import { userCreateSx } from './style';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please enter password confirmation'),
});

const AdminCreate = () => {
  const navigate = useNavigate();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadImageMutation();
  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [avatar, setAvatar] = React.useState<string | undefined>();
  const [uploadFile, setUploadFile] = React.useState<any>(null);
  const [, setLoading] = useLoading();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSave(values.email, values.name, values.password, uploadFile)
        .then(() => {
          toast.success('Successfully created new Admin');
          navigate('/admin-account');
        })
        .catch((err) => {
          toast.error('Update failed! ' + err.data);
        });
    },
  });

  React.useEffect(() => {
    setLoading(Utils.isLoading(isUploading));
  }, [isUploading]);

  const handleSave = async (email: string, name: string, password: string, file: any) => {
    let form_data = new FormData();

    // const result = await createAdmin({ name: name, email: email, password: password });

    if (file) {
      form_data.append('image', file);
      const uploaded = await uploadAvatar(form_data).unwrap();
      return await createAdmin({ name: name, email: email, password: password, avatar: uploaded.url });
    }
    return await createAdmin({ name: name, email: email, password: password });
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
    <Box sx={userCreateSx.root}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <AppBreadcrumbs
          title="Create admin"
          label="Create"
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
      <Box sx={userCreateSx.form} component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Box sx={userCreateSx.avatarContainer}>
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
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="off"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              id="passwordConfirm"
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              fullWidth
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminCreate;
