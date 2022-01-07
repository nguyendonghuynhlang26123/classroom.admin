import { Box, Button, CircularProgress, Container, Grow, Paper, TextField, Typography } from '@mui/material';
import { AuthData } from 'common/interfaces';
import { useAuth } from 'components/context';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { sharedStyleSx } from './style';

const validationSchema = yup.object({
  email: yup.string().email('This field should be a valid email').required('Please enter email'),
  password: yup.string().required('Please Enter your password'),
});

const LoginPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: AuthData) => {
      setLoading(true);
      signIn(values).catch((e) => {
        toast.warning('Invalid credentials');
        setLoading(false);
      });
    },
  });

  return (
    <Box sx={sharedStyleSx.root}>
      <Grow appear={true} in={true} timeout={500}>
        <Container sx={sharedStyleSx.container}>
          <Paper elevation={4} square sx={sharedStyleSx.paper}>
            <Typography variant="h2">🎓</Typography>
            <Typography variant="h5">Moorssalc Admin</Typography>
            <Typography variant="body1">Sign in </Typography>

            <Box component="form" noValidate autoComplete="off" sx={sharedStyleSx.form} onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                autoComplete="off"
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
                fullWidth
                autoComplete="off"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                aria-label="login with credentials"
                endIcon={loading && <CircularProgress size={16} />}
                disabled={loading}
              >
                Sign in
              </Button>
            </Box>
          </Paper>
        </Container>
      </Grow>
    </Box>
  );
};

export default LoginPage;
