import React, { useState } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoIconButton = ({ infoText }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-owns={open ? 'info-popover' : undefined}
        aria-haspopup="true"
        onClick={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        <InfoIcon style={{width:20,height:20}} />
      </IconButton>
      <Popover
        id="info-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography style={{
            // color:"red"
        }} sx={{ p: 2 }}>{infoText}</Typography>
      </Popover>
    </>
  );
};

export default InfoIconButton;