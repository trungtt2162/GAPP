import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

function AddDonateMember() {
  const [memberDonate, setmemberDonate] = useState({
    fundName: "",
    fullName: "",
    fund: "",
    time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setmemberDonate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(memberDonate);
    // Xử lý submit form ở đây, ví dụ gửi dữ liệu đến server
  };

  return (
    <Container maxWidth="sm">
      <h4 className="bold">Thêm Người đóng góp</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tên quỹ"
          name="fundName"
          value={memberDonate.fundName}
          onChange={handleChange}
          margin="normal"
          select
        />
        <TextField
          fullWidth
          label="Họ tên người đóng góp"
          name="estimatedAmount"
          type="number"
          value={memberDonate.fullName}
          onChange={handleChange}
          margin="normal"
        />
      
        <TextField
          date
          fullWidth
          label="Số tiền"
          name="description"
          value={memberDonate.fund}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
        style={{
            marginTop:15,
            marginBottom:15
        }}
          fullWidth
          label="Ngày donate"
          variant="outlined"
          type="date"
          name="time"
          value={memberDonate.time}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Thêm
        </Button>
      </form>
    </Container>
  );
}

export default AddDonateMember;
