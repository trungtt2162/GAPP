import "./RequestEvent.scss";
import React, { useState } from "react";
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
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { theme } from "../../theme";
import Navbar from "../../components/layout/Navbar";
import "./../history-family/History.scss";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap:20,
      alignItems: 'center',
      width: '50%',
      margin: 'auto',
      '& > *': {
        marginBottom: theme.spacing(2),
      },
    },
  }));
const RequestEvents = () => {
    const classes = useStyles();

  const { palette } = useTheme(theme);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDateClose, setEventDateClose] = useState("");
  const [userAttendMode,setUserAttendMode] = useState("");
  const [eventType, setEventType] = useState("online");
  const [allowRegistration, setAllowRegistration] = useState(false);
  const [participantLimit, setParticipantLimit] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleUserSelection = () => {};
  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý dữ liệu form tại đây
    console.log({
      eventName,
      eventDescription,
      eventDate,
      eventType,
      allowRegistration,
      participantLimit,
    });
  };
  return (
    <div>
      <Navbar />
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
      <div className="how-work">
        <Box
          sx={{
            display: "flex",
            alignItems: { md: "flex-end", xs: "center" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between", xs: "center" },
            p: "40px",
            background: "#f0f0f0",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="content-card card-item">
                <h4 className="bold">Request sự kiện</h4>
                <form className={classes.form}  onSubmit={handleSubmit}>
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
                <div style={{
                    width:"100%"
                }} className="flex-start">
                <FormControl component="fieldset">
                    <FormLabel style={{
                        textAlign:"start"
                    }} component="legend">Chế độ</FormLabel>
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
                <div style={{
                    width:"100%"
                }} className="flex-start">
                <FormControl component="fieldset">
                    <FormLabel style={{
                        textAlign:"start"
                    }} component="legend">Người tham gia</FormLabel>
                    <RadioGroup
                      row
                      value={userAttendMode}
                      onChange={(e) => setUserAttendMode(e.target.value)}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Cho phép đăng kí tham gia"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Giới hạn đối tượng tham gia"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                  
                  {userAttendMode === "2" && (
                    <div style={{
                        width:"150%",
                    }}>
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
                                <TableCell>
                                  user{index + 1}@example.com
                                </TableCell>
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
                  )}
                  <Button type="submit" variant="contained" color="primary">
                    Request
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default RequestEvents;
