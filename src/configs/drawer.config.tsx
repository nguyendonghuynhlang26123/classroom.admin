import { AccountCircleOutlined, AdminPanelSettingsOutlined, BlockOutlined, HomeOutlined, SchoolOutlined } from '@mui/icons-material';
import { DrawerItemConfigType } from 'common/type';

export const drawerConfigs: DrawerItemConfigType[] = [
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
