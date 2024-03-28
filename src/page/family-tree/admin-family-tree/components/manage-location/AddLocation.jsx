import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Grid } from '@mui/material';
import PrimaryButton from '../../../../../components/common/button/PrimaryButton';

function AddLocationForm() {
  const [locationData, setLocationData] = useState({
    name: '',
    type: '',
    owner: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocationData({
      ...locationData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(locationData); // Thay console.log bằng xử lý submit thực tế ở đây
  };

  return (
    <Container maxWidth="sm">
      <h4 className="bold">Thêm địa điểm</h4>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên địa điểm"
              variant="outlined"
              name="name"
              value={locationData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại địa điểm</InputLabel>
              <Select
                name="type"
                value={locationData.type}
                onChange={handleChange}
                label="Loại địa điểm"
              >
                <MenuItem value="Nhà hàng">Nhà hàng</MenuItem>
                <MenuItem value="Khách sạn">Khách sạn</MenuItem>
                <MenuItem value="Quán cafe">Quán cafe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa điểm này là của"
              variant="outlined"
              name="owner"
              value={locationData.owner}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton title={"Thêm địa điểm"}  />
             
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddLocationForm;