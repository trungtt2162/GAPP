import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
} from "@mui/material";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";

function AddEventForm() {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    eventClose: "",
    eventMode: "",
    eventImage: "",
    eventStreamLink: "",
    users: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(eventData); // Thay console.log bằng xử lý submit thực tế ở đây
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên sự kiện"
              variant="outlined"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày tổ chức"
              variant="outlined"
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Ngày đóng"
              variant="outlined"
              type="date"
              name="eventClose"
              value={eventData.eventClose}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Chế độ</InputLabel>
              <Select
                name="eventMode"
                value={eventData.eventMode}
                onChange={handleChange}
                label="Chế độ"
              >
                <MenuItem value="public_offline">Public - Offline</MenuItem>
                <MenuItem value="public_online">Public - Online</MenuItem>
                <MenuItem value="private_offline">Private - Offline</MenuItem>
                <MenuItem value="private_online">Private - Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              //   onChange={handleImageChange}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <label htmlFor="contained-button-file">
                <PrimaryButton title={"Tải ảnh minh họa lên"} />
              </label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Link Stream"
              variant="outlined"
              name="eventStreamLink"
              value={eventData.eventStreamLink}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              name="userRoles"
              id="userRoles"
              variant="outlined"
              label="userRoles"
              SelectProps={{
                multiple: true,
                value: eventData.users,
                // onChange: handleFieldChange,
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user1">User1</MenuItem>
              <MenuItem value="user2">User2</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Thêm Sự Kiện
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AddEventForm;
