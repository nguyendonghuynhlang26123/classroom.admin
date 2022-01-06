export type DrawerItemConfigType = {
  title: string;
  icon?: React.ReactElement;
  href?: string;
  type: 'item' | 'group' | 'divider';
  children?: DrawerItemConfigType[];
};
