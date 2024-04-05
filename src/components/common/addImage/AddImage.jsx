import { Avatar, Button } from '@mui/material';
import React from 'react';
import "./AddImage.scss"

const AddImage= ({url,click = () => {

},width=250,height=250}) => {
 
  return (
<div className='wrapAddImage'>
    <Avatar sx={{ width:width || 250, height:height || 250}} src={url}></Avatar>
    <Button onClick={() =>click() }>Thêm ảnh</Button>
</div>
   )
}

export default AddImage