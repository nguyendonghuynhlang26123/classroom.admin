import { DrawerItemConfigType } from 'common/type';
import {
  AccountBoxOutlined,
  AccountBoxTwoTone,
  AccountCircleOutlined,
  AdminPanelSettingsOutlined,
  BlockOutlined,
  ClassOutlined,
  HomeOutlined,
  SchoolOutlined,
} from '@mui/icons-material';

export const drawerConfigs: DrawerItemConfigType[] = [
  {
    title: 'Home',
    icon: <HomeOutlined />,
    href: '/',
    type: 'item',
  },
  {
    type: 'divider',
    title: '',
  },
  {
    title: 'Account management',
    type: 'group',
    children: [
      {
        title: 'User accounts',
        icon: <AccountCircleOutlined />,
        href: '/user-account',
        type: 'item',
      },
      {
        title: 'Admin accounts',
        icon: <AdminPanelSettingsOutlined />,
        href: '/admin-account',
        type: 'item',
      },
      {
        title: 'Black lists',
        icon: <BlockOutlined />,
        href: '/blacklist',
        type: 'item',
      },
    ],
  },
  {
    title: 'Classroom management',
    type: 'group',
    children: [
      {
        title: 'Classrooms',
        icon: <SchoolOutlined />,
        href: '/classroom',
        type: 'item',
      },
    ],
  },
];
