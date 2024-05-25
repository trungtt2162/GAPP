import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { handleError, formatMoney } from "../../../../ultils/helper";
import { fundApi } from "../../../../api/fund.api";
import useAuthStore from "../../../../zustand/authStore";
import { toast } from "react-toastify";

function AddFundForm({ item, reset }) {
  const origin = {
    IdGenealogy: "",
    Money: 0,
    Name: "",
    SpendPurpose: "",
    EstimatedMoney: "",
    Id: 0,
    IsCheck: false,
  };
  const [fundInfo, setFundInfo] = useState(item || origin);

  const { currentIdGenealogy } = useAuthStore();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFundInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    try {
      const res = !item
        ? await fundApi.addFund({
            ...fundInfo,
            IdGenealogy: currentIdGenealogy,
          })
        : await fundApi.updateFund({
            ...fundInfo,
            IdGenealogy: currentIdGenealogy,
          });
      if (res.data.StatusCode === 200) {
        if(!item){
          setFundInfo({
            IdGenealogy: "",
            Money: 0,
            Name: "",
            SpendPurpose: "",
            EstimatedMoney: "",
            Id: 0,
          });
          toast.success("Thêm thành công");
        }
        else{
          reset()
          toast.success("Sửa thành công");
        }
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <h4 className="bold">{item ? "Chỉnh sửa quỹ" : "Thêm Quỹ Mới"}</h4>
      <form>
        <TextField
          required
          fullWidth
          label="Tên quỹ"
          name="Name"
          value={fundInfo.Name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Số tiền dự tính"
          name="EstimatedMoney"
          value={fundInfo.EstimatedMoney}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Nội dung"
          name="SpendPurpose"
          value={fundInfo.SpendPurpose}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          disabled={
            !fundInfo.Name || !fundInfo.EstimatedMoney || !fundInfo.SpendPurpose
          }
          onClick={() => handleAdd()}
          variant="contained"
          color="primary"
        >
          {item ? "Sửa" : "Thêm"}
        </Button>
      </form>
    </Container>
  );
}

export default AddFundForm;
