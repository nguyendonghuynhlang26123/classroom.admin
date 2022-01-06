import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileBtnProps } from './type';
import { useAppDispatch } from 'store/hooks';
import { cleanUp } from 'store/slices';

export const ProfileBtn = ({ fname, imageUrl }: ProfileBtnProps) => {
  const { logOut } = useAuth();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClicked = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    navigate('/');
    dispatch(cleanUp());
    logOut();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {imageUrl && imageUrl !== '' ? (
          <Avatar sx={{ width: 32, height: 32 }} alt={fname} src={imageUrl} />
        ) : (
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{fname.charAt(0)}</Avatar>
        )}
      </IconButton>
      <Menu
        id="menu-profile"
        anchorEl={anchorEl}
        MenuListProps={{
          'aria-labelledby': 'profile-button',
        }}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        <MenuItem onClick={handleProfileClicked} sx={{ width: 140 }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogOut} sx={{ width: 140 }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
