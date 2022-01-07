import { Toolbar, Typography, Tooltip, IconButton, Box, InputBase, Divider, Chip } from '@mui/material';
import { FilterList, Delete, Search } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import React from 'react';
import { TableToolbarProps } from './type';
import { toolbarSx } from './style';
import { useDebounce } from 'components';

export const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, handleSearch } = props;
  const [input, setInput] = React.useState<string>('');
  const debounceSearch = useDebounce(input, 500);

  React.useEffect(() => {
    if (debounceSearch) handleSearch(debounceSearch);
  }, [debounceSearch]);

  return (
    <Toolbar
      sx={{
        ...toolbarSx.root,
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <>
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Delete">
            <IconButton>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Box sx={toolbarSx.container}>
          <Box sx={toolbarSx.search}>
            <Search />
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={input}
              onChange={(ev) => setInput(ev.target.value)}
            />
          </Box>
        </Box>
      )}
    </Toolbar>
  );
};
