import React, { useRef, useState } from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Grid, MenuItem } from '@mui/material';
import { genderOptions } from '../../constant/common';
import AddImage from '../../components/common/addImage/AddImage';

function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
    gender: '',
    birthday: '',
    image:""
  });
  const fileRef = useRef();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  const handleChangeFile = (e) => {
 const file = e.target.files[0]
  }

  return (
    <form onSubmit={handleSubmit}>
        <h4 style={{marginBottom:20}} className="bold">Thông tin cá nhân</h4>
      <Grid container>
       <Grid item xs={8}>
       <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Họ"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Tên"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CCCD/CMND"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
        name="gender"
        select
        label="Giới tính"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
      >
        {genderOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Ngày sinh nhật"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Lưu thông tin
          </Button>
        </Grid>
      </Grid>
       </Grid>
       <Grid item xs={4}>
        <input onChange={handleChangeFile} type ="file" ref={fileRef} style={{
            display:"none"
        }} />
             <AddImage click={() => fileRef.current.click()} url={formData.image} />
       </Grid>
      </Grid>
    </form>
  );
}

export default Profile;