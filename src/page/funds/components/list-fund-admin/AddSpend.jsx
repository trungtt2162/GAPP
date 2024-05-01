import {
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { handleError } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import useAuthStore from "../../../../zustand/authStore";
import { genealogyApi } from "../../../../api/genealogy.api";
import { toast } from "react-toastify";

function AddSpend({item,setNewList}) {
  const [listFund, setListFund] = useState([]);
  const { currentIdGenealogy } = useAuthStore();
  const originData = {
    IdFund: "",
    IdGenealogy: "",
    Description: "",
    Money: "",
  };
  const [memberDonate, setmemberDonate] = useState(item || originData);
  const [listMember, setListMember] = useState([]);

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

  //get List member
  const getListMember = async () => {
    try {
      const res = await genealogyApi.getListUserFromGenealogy(
        currentIdGenealogy
      );
      if (res.data.StatusCode === 200) {
        setListMember(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getListMember();
  }, [currentIdGenealogy]);

  // Add
  const onAdd = async () => {
    
    try {
      const dataPost = { ...memberDonate, IdGenealogy: currentIdGenealogy };
      const res =!item?   await fundApi.addSendFund(dataPost) : await fundApi.updateFundSend(dataPost);
      if (res.data.StatusCode === 200) {
       if(!item){
        setmemberDonate(originData);
        toast.success("Thêm thanh công");
       }
       else{
        setNewList(memberDonate)
        toast.success("Sửa thanh công");
       }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h4 className="bold">{item ? "Sửa khoản chi" :"Thêm khoản chi"}</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tên quỹ"
          name="IdFund"
          value={memberDonate.IdFund}
          onChange={handleChange}
          margin="normal"
          select
          required
        >
          {listFund.map((option) => (
            <MenuItem value={option.Id}>{option.Name}</MenuItem>
          ))}
        </TextField>
      
        <TextField
          date
          fullWidth
          label="Số tiền"
          name="Money"
          value={memberDonate.Money}
          onChange={handleChange}
          multiline
          rows={1}
          margin="normal"
          type={"number"}
          required
        />
        
        <TextField
          date
          fullWidth
          label="Nội dung"
          name="Description"
          value={memberDonate.Description}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
          required
        />
        
        <Button disabled={!memberDonate.Money || !memberDonate.Description || !memberDonate.IdFund} onClick={() => onAdd()} variant="contained" color="primary">
          {item ? "Sửa" :"Thêm"}
        </Button>
      </form>
    </Container>
  );
}

export default AddSpend;
