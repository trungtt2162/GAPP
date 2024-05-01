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
import moment from "moment";

function AddDonateMember({ setNewList, item }) {
  console.log(setNewList)
  const [listFund, setListFund] = useState([]);
  const { currentIdGenealogy } = useAuthStore();
  const originData = {
    IdFund: "",
    IdGenealogy: 0,
    UserID: "",
    Money: "",
    PaymentDate: "2024-04-08T14:14:42.758Z",
    FirstName: "string",
    LastName: "string",
    Email: "string",
    Confirmed: true,
    Id: 0,
  };
  const [memberDonate, setmemberDonate] = useState(item ? {...item,PaymentDate:moment(item.PaymentDate).format("YYYY-MM-DD")}: originData);
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
    const currentMem = listMember.find((i) => i.Id === memberDonate.UserID);
    if (currentMem) {
      memberDonate.Email = currentMem.Email;
      memberDonate.LastName = currentMem.LastName;
      memberDonate.FirstName = currentMem.FirstName;
    }
    try {
      const dataPost = { ...memberDonate, IdGenealogy: currentIdGenealogy };
      const res = !item
        ? await fundApi.addContributor(dataPost)
        : await fundApi.updateContributor(dataPost);
      if (res.data.StatusCode === 200) {
        if (!item) {
          setmemberDonate(originData);
          toast.success("Thêm thanh công");
        }
        else{
          setNewList(memberDonate)
          toast.success("Sửa thành công");
          
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h4 className="bold">
        {!item ? "Thêm Người đóng góp" : "Cập nhật người đóng góp"}
      </h4>
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
          fullWidth
          label="Người đóng góp"
          name="UserID"
          value={memberDonate.UserID}
          onChange={handleChange}
          margin="normal"
          select
          required
        >
          {listMember.map((option) => (
            <MenuItem value={option.Id}>
              {option.FirstName + " " + option.LastName}
            </MenuItem>
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
          style={{
            marginTop: 15,
            marginBottom: 15,
          }}
          fullWidth
          label="Ngày donate"
          variant="outlined"
          type="date"
          name="PaymentDate"
          value={memberDonate.PaymentDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button disabled={!memberDonate.Money || !memberDonate.PaymentDate || !memberDonate.UserID || !memberDonate.IdFund} onClick={() => onAdd()} variant="contained" color="primary">
          {!item ? "Thêm" : "Cập nhật"}
        </Button>
      </form>
    </Container>
  );
}

export default AddDonateMember;
