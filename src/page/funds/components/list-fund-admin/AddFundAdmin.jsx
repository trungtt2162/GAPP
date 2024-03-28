import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

function AddFundForm() {
    const [fundInfo, setFundInfo] = useState({
      fundName: '',
      estimatedAmount: '',
      description: '',
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFundInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(fundInfo);
      // Xử lý submit form ở đây, ví dụ gửi dữ liệu đến server
    };
  
    return (
      <Container maxWidth="sm">
        <h4 className="bold">
          Thêm Quỹ Mới
        </h4>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên quỹ"
            name="fundName"
            value={fundInfo.fundName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số tiền dự tính"
            name="estimatedAmount"
            type="number"
            value={fundInfo.estimatedAmount}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nội dung"
            name="description"
            value={fundInfo.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Thêm
          </Button>
        </form>
      </Container>
    );
  }
  
  export default AddFundForm;