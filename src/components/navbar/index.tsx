import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { DrawerItemConfigType } from 'common/type';
import { drawerConfigs } from 'configs';
import * as React from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { ProfileBtn } from '../ProfileBtn';
import { navbarLayoutSx } from './style';
import { NavbarProps } from './type';

export const Navbar = ({ children, loading, userData }: NavbarProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const DrawerItem = (item: DrawerItemConfigType, isChildren: boolean): JSX.Element => {
    let isActive: boolean = false;
    if (item.href && matchPath(item.href, pathname)) {
      isActive = true;
    }

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
            <ListItemButton sx={navbarLayoutSx.btnItem} onClick={() => navigate(item.href ?? '')} className={isActive ? 'active' : ''}>
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
            <Typography>Hello {userData.name},</Typography>
            <ProfileBtn fname={userData.name} imageUrl={userData.avatar} />
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
          <Container>{children}</Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};
