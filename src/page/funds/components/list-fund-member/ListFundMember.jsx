import { Card } from "@mui/material";
import React, { useState } from "react";
import "./ListFund.scss";
import { useLocation, useNavigate } from "react-router-dom";
const ListFundMember = () => {
    const location = useLocation();
    const navigate = useNavigate();
  const [listFund, setListFund] = useState([
    {
      id: 1,
      title: "QUỹ A",
      description: "Mục đích chi tiết",
      fund: 20000000,
    },
    {
      id: 2,
      title: "QUỹ B",
      description: "Mục đích chi tiết",
      fund: 20000000,
    },
    {
      id: 3,
      title: "QUỹ C",
      description: "Mục đích chi tiết",
      fund: 20000000,
    },
  ]);

  return (
    <div>
      <h4 className="bold">Danh sách quỹ</h4>
      {listFund.map((item, index) => {
        return (
          <Card className="fund-wrap">
            <div
              style={{
                paddingRight: 10,
              }}
              className="border-right w100"
            >
              {item.title}
            </div>
            <div
              style={{
                paddingRight: 10,
              }}
              className="border-right w100"
            >
              {item.fund} VND
            </div>
            <div className="w100">{item.description}</div>
            <div  onClick={() => navigate(location.pathname + "?id="+item.id)} className="button-more">Xem thêm</div>
          </Card>
        );
      })}
    </div>
  );
};

export default ListFundMember;
