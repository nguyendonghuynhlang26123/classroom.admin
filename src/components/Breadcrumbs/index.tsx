import { Typography, Box, Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { breadcrumbSx } from './style';
import { BreadcrumbPropsType } from './type';

export const AppBreadcrumbs = ({ title, list }: BreadcrumbPropsType) => {
  const navigate = useNavigate();
  const handleOnClick = (ev: any, link: string) => {
    ev.preventDefault();
    navigate(link);
  };
  return (
    <Box sx={breadcrumbSx}>
      <Typography className="breadcumbs-header">{title}</Typography>
      <Breadcrumbs separator="●" aria-label="breadcrumb">
        {list.map((item, i) => (
          <Link key={i} underline="hover" href="#" onClick={(ev) => handleOnClick(ev, item.href)}>
            {item.label}
          </Link>
        ))}

        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
    </Box>
  );
};
