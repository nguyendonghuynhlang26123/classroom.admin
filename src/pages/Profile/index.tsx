//Profile
import { Box } from '@mui/material';
import { NAME_REGEX, STUDENT_ID_REGEX } from 'common/constants/regex';
import React from 'react';
import * as yup from 'yup';
import { profileSx } from './style';

const validationSchema = yup.object({
  student_id: yup.string().matches(STUDENT_ID_REGEX, 'Invalid studentID'),
  first_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Firstname is required'),
  last_name: yup.string().matches(NAME_REGEX, 'Invalid name').required('Lastname is rquired'),
});

const UserProfile = () => {
  return <Box sx={profileSx.root}></Box>;
};

export default UserProfile;
