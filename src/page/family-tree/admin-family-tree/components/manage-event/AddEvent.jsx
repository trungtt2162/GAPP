import React, { useRef, useState } from "react";

import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddImage from "../../../../../components/common/addImage/AddImage";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    width: "100%",
    margin: "auto",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));
function AddEventForm() {
  const classes = useStyles();

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDateClose, setEventDateClose] = useState("");
  const [userAttendMode, setUserAttendMode] = useState("");
  const [eventType, setEventType] = useState("online");
  const [allowRegistration, setAllowRegistration] = useState(false);
  const [participantLimit, setParticipantLimit] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [privateOrpublic, setPrivateOrpublic] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const fileRef = useRef();

  const handleChangeFile = (event) => {};
  const handleUserSelection = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md">
      <h4 className="bold">Thêm sự kiện</h4>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Tên sự kiện"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Mô tả sự kiện"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              multiline
              fullWidth
              required
            />
            <TextField
              label="Ngày tổ chức"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="Ngày đóng"
              type="date"
              value={eventDateClose}
              onChange={(e) => setEventDateClose(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <TextField
              label="Link stream"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              multiline
              fullWidth
              required
            />
            <div
              style={{
                width: "100%",
              }}
              className="flex-start"
            >
              <FormControl component="fieldset">
                <FormLabel
                  style={{
                    textAlign: "start",
                  }}
                  component="legend"
                >
                  Chế độ
                </FormLabel>
                <RadioGroup
                  row
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online"
                  />
                  <FormControlLabel
                    value="offline"
                    control={<Radio />}
                    label="Offline"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                width: "100%",
              }}
              className="flex-start"
            >
              <FormControl component="fieldset">
                <FormLabel
                  style={{
                    textAlign: "start",
                  }}
                  component="legend"
                >
                  Chế độ
                </FormLabel>
                <RadioGroup
                  row
                  value={eventType}
                  onChange={(e) => setPrivateOrpublic(e.target.value)}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Private"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Public"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                width: "150%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "50%",
              }}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên</TableCell>
                      <TableCell>Ngày sinh</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Địa chỉ</TableCell>
                      <TableCell>Giới tính</TableCell>
                      <TableCell>Tham gia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Dùng map để render từng user */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <TableRow key={index}>
                        <TableCell>User {index + 1}</TableCell>
                        <TableCell>01/01/1990</TableCell>
                        <TableCell>user{index + 1}@example.com</TableCell>
                        <TableCell>123 Street, City</TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(index)}
                            onChange={() => handleUserSelection(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <Button type="submit" variant="contained" color="primary">
              Tạo
            </Button>
          </form>
        </Grid>
        <Grid item xs={4}>
          <input
            onChange={handleChangeFile}
            type="file"
            style={{
              display: "none",
            }}
            ref={fileRef}
          />
          <AddImage click={() => fileRef.current.click()} url={image} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddEventForm;
