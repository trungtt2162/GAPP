import { useEffect, useRef, useState } from "react";
import {
  dateFormat,
  dateFormat3,
  handleError,
  uploafFileBase64,
} from "../../../../../ultils/helper";
import {
  Button,
  Card,
  Grid,
  TextField,
  Avatar,
  TableRow,
  TableCell,
} from "@mui/material";
import { toast } from "react-toastify";
import { historyApi } from "../../../../../api/history.api";
import { Table } from "react-bootstrap";
{
  /* <TableRow key={index}>
<TableCell>{user.Name}</TableCell>
<TableCell>{(dateFormat3(user.OrganizationDate))}</TableCell>

</TableRow> */
}

const HisoryEventItem = ({
  Image,
  Description,
  setHistory,
  Id,
  setListHistory,
  listHistory,
  IDGenealogy,
  curr,
  setCurrentItem,
  Date,
  Title,
}) => {
  const [txtDes, setTxtDes] = useState(Description);
  const [imageUrl, setImageUrl] = useState(Image);
  const [modeEdit, setModeEdit] = useState(false);
  const fileRef = useRef();
  const onChangeImage = (e) => {
    const base64 = uploafFileBase64(e, setImageUrl);
  };
  useEffect(() => {
    setHistory(Id, {
      Description: txtDes,
      Image: imageUrl,
    });
  }, [imageUrl, setImageUrl]);

  const deleteHistory = async () => {
    try {
      const res = await historyApi.deleteHistory(Id, IDGenealogy);
      if (res.data.StatusCode === 200) {
        toast.success("Xóa thành công");
        setListHistory(listHistory.filter((i) => i.Id != Id));
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <TableRow>
      <TableCell className='text-center'>
      <div>
          <div
            style={{
             display:"flex",
             justifyContent:"center",
             alignItems:"center"
            }}
          >
            {Title}
          </div>
        </div>
      </TableCell>
      <TableCell className='text-center'>
        <div>
          <div
            style={{
            
            }}
          >
            {dateFormat3(Date)}
          </div>
        </div>
      </TableCell>
      <TableCell className='text-center'>
        <div>
          {!modeEdit && (
            <Button
              onClick={() => setCurrentItem(curr)}
              style={{
                marginRight: 10,
                marginTop: 30,
              }}
              variant="contained"
              color="success"
            >
              Sửa
            </Button>
          )}
          {modeEdit && (
            <Button
              onClick={() => setModeEdit(false)}
              style={{
                marginRight: 10,
                marginTop: 30,
              }}
              variant="contained"
              color="success"
            >
              Ok
            </Button>
          )}
          <Button
            onClick={() => deleteHistory()}
            style={{
              marginRight: 10,
              marginTop: 30,
            }}
            variant="contained"
            color="error"
          >
            Xóa
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
export default HisoryEventItem;
