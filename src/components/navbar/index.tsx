import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  Divider,
  Drawer,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
} from '@mui/material';
import { NavbarProps } from './type';
import { navbarLayoutSx } from './style';
import { ExpandMore, Menu } from '@mui/icons-material';
import { HomeOutlined, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { IClassroom } from 'common/interfaces';
import { ProfileBtn } from '../ProfileBtn';
import { drawerConfigs } from 'configs';
import { DrawerItemConfigType } from 'common/type';

export const Navbar = ({ children, loading, userData }: NavbarProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const navigate = useNavigate();

  const DrawerItem = (item: DrawerItemConfigType, isChildren: boolean): JSX.Element => {
    if (item.type === 'group')
      return (
        <>
          <ListItem>
            <Accordion sx={navbarLayoutSx.accordionItem} defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
                <Typography sx={navbarLayoutSx.title}>{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.children?.map((subItem, i) => (
                  <React.Fragment key={i}>{DrawerItem(subItem, true)}</React.Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          </ListItem>

          <Divider component="li" />
        </>
      );
    else if (item.type === 'item')
      return (
        <>
          <ListItem>
            <ListItemButton sx={navbarLayoutSx.btnItem} onClick={() => navigate(item.href ?? '')}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        </>
      );
    else if (item.type === 'divider') return <Divider component="li" />;
    else return <></>;
  };

  return (
    <React.Fragment>
      <Box sx={navbarLayoutSx.root}>
        <AppBar position="fixed" sx={navbarLayoutSx.appbar} elevation={trigger ? 4 : 0}>
          <Toolbar sx={navbarLayoutSx.toolbar}>
            <Typography>Hello {userData.first_name},</Typography>
            <ProfileBtn fname="Long" imageUrl={null} />
          </Toolbar>
          {loading && <LinearProgress />}
        </AppBar>
        <Drawer sx={navbarLayoutSx.drawer} variant="permanent" anchor="left">
          <Toolbar>
            <Typography variant="h6" className="logo">
              🎓Moossalc
            </Typography>
          </Toolbar>

          <List>
            {drawerConfigs.map((item, i) => (
              <React.Fragment key={i}> {DrawerItem(item, true)} </React.Fragment>
            ))}
            {/* <ListItemButton sx={navbarLayoutSx.btnItem} onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={'Profile Setting'} />
            </ListItemButton> */}
          </List>
        </Drawer>
        <Box component="main" sx={navbarLayoutSx.main}>
          {children}
        </Box>
      </Box>
    </React.Fragment>
  );
};
