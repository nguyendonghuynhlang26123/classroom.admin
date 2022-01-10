import { ListItemIcon, ListItemText } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

export type PopupMenuPropType = {
  children: JSX.Element;
  items: {
    callback: () => void;
    label: string;
    icon?: JSX.Element;
    [k: string]: any;
  }[];
};

export const PopupMenu = ({ children, items }: PopupMenuPropType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {React.cloneElement(children, {
        onClick: handleClick,
        'aria-controls': open ? 'basic-menu' : undefined,
        'aria-haspopup': true,
        'aria-expanded': open ? 'true' : undefined,
      })}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map(({ icon, label, callback, ...props }, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              callback();
              handleClose();
            }}
            {...props}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
