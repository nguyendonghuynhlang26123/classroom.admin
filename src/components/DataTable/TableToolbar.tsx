import { Close, Delete, Search } from '@mui/icons-material';
import { Box, IconButton, InputBase, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useDebounce } from 'components';
import React from 'react';
import { toolbarSx } from './style';
import { TableToolbarProps } from './type';

export const TableToolbar = (props: TableToolbarProps) => {
  const { numSelected, handleSearch, handleDelete } = props;
  const [input, setInput] = React.useState<string>('');
  const debounceSearch = useDebounce(input, 500);

  React.useEffect(() => {
    handleSearch(debounceSearch);
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
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Box sx={toolbarSx.container}>
          <Box sx={toolbarSx.search}>
            {input ? (
              <IconButton size="small" onClick={() => setInput('')}>
                <Close />
              </IconButton>
            ) : (
              <Search />
            )}
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
