import { Avatar, Button } from '@mui/material';
import React from 'react';
import "./AddImage.scss"

const AddImage= ({url,click = () => {

}}) => {
 
  return (
<div className='wrapAddImage'>
    <Avatar sx={{ width: 250, height: 250 }} src={url}></Avatar>
    <Button onClick={() =>click() }>Thêm ảnh</Button>
</div>
   )
}

export default AddImage