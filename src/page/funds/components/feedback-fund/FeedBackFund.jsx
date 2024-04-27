import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { handleError, uploadImageToFirebase } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import useAuthStore from "../../../../zustand/authStore";
import { feedbackApi } from "../../../../api/feedback.api";
import { toast } from "react-toastify";

function FeedBackFund({ setNewList, item }) {
  const [fundId, setFundId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [listFund, setListFund] = useState([]);
  const { currentIdGenealogy } = useAuthStore();
  const originData = {
    IdGenealogy: "",
    Type: 0,
    Name: "",
    Title: "",
    Description: "",
    IdInstance: 0,
    Image:""
  };
  const [formData, setFormData] = useState(item || originData);
  const handleImageChange = async (event) => {
    // Lấy ảnh từ sự kiện và lưu vào state
    const file = event.target.files[0];
    const url = await uploadImageToFirebase(file);
    setFormData({ ...formData, Title: Image });
  };

  //
  const getListFund = async () => {
    try {
      const res = await fundApi.getlistFund(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        setListFund(res.data.Data.Data || []);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (currentIdGenealogy) {
      getListFund();
    }
  }, [currentIdGenealogy]);

  //
  const onAdd = async () => {
    try {
      const res = !item
        ? await feedbackApi.createFeedback({
            ...formData,
            IdGenealogy: currentIdGenealogy,
          })
        : await feedbackApi.updateFeedBack({
            ...formData,
            IdGenealogy: currentIdGenealogy,
          });
      if (res.data.StatusCode === 200) {
       if(!item){
        setFormData(originData);
        toast.success("Thêm thành công");
       }
       else{
        setNewList();
        toast.success("Sửa thành công");
       }
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <form>
        <h4 className="bold">Góp ý</h4>
        <FormControl
          style={{
            width: "100%",
          }}
        >
          <InputLabel id="select-label">Quỹ</InputLabel>
          <Select
            style={{
              width: "100%",
            }}
            labelId="select-label"
            id="select"
            value={formData.IdInstance}
            onChange={(e) =>
              setFormData({ ...formData, IdInstance: e.target.value })
            }
            label="Quỹ"
          >
            {listFund.map((i) => (
              <MenuItem value={i.Id}>{i.Name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Tiêu đề"
          fullWidth
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Nội dung"
          fullWidth
          multiline
          rows={4}
          value={formData.Description}
          onChange={(e) =>
            setFormData({ ...formData, Description: e.target.value })
          }
          margin="normal"
        />
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          style={{
            display: "none",
          }}
        />
        <div className="flex-start">
          {formData.Image && (
            <img
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
                marginBottom: 10,
              }}
              src={formData.Image}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          {/* <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              Tải ảnh lên
            </Button>
          </label> */}
          <Button disabled={!formData.IdInstance || !formData.Description || !formData.Name} onClick={() => onAdd()} variant="contained" color="primary">
            Gửi
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default FeedBackFund;
