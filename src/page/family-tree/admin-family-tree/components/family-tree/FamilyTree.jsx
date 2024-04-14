import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import {
  buildTree,
  dateFormat,
  handleError,
} from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { Avatar, Popover } from "@mui/material";
import "./Tree.scss";
// import "./styles.css";

const orgChartJson = {
  name: "CEO",
  attributes: {
    department: "Fabrication",
    img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
  },
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
        img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
            img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
          },
          children: [
            {
              name: "Workers",
              attributes: {
                department: "Fabrication",
                img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
              },
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
            img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
          },
          children: [
            {
              name: "Workers",
              attributes: {
                department: "Fabrication",
                img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      attributes: {
        department: "Fabrication",
        img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
      },
      children: [
        {
          name: "Sales Officer",
          attributes: {
            department: "Fabrication",
            img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
          },
          children: [
            {
              name: "Salespeople",
              attributes: {
                department: "Fabrication",
                img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
              },
            },
          ],
        },
        {
          name: "Sales Officer",
          attributes: {
            department: "Fabrication",
            img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
          },
          children: [
            {
              name: "Salespeople",
              attributes: {
                department: "Fabrication",
                img: "https://th.bing.com/th?id=OIF.39WTFN0HfwDIU0jGi%2bKrGw&rs=1&pid=ImgDetMain",
              },
            },
          ],
        },
      ],
    },
  ],
};

const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 3, y: 60 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const InfoItem = ({ item,geneName }) => {
  return (
    <div
      style={{
        width: 300,
        height: 300,
        padding: 10,
      }}
    >
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Tên :{" "}
        </span>
        <span>{item.FirstName + " " + item.LastName}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Nhánh :{" "}
        </span>
        <span>{geneName}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Giới tính :{" "}
        </span>
        <span>{item.Gender == "0" ?"Nam":"Nữ"}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Email :{" "}
        </span>
        <span>{item.Email}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Số điện thoại :{" "}
        </span>
        <span>{item.Phone}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Địa chỉ :{" "}
        </span>
        <span>{item.Address}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Ngày sinh :{" "}
        </span>
        <span>{dateFormat(item.DateOfBirth)}</span>
      </div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <span
          className="bold"
          style={{
            width: 100,
          }}
        >
          Ngày mất :{" "}
        </span>
        <span>{dateFormat(item.DateOfDeath)}</span>
      </div>
    </div>
  );
};
const NodeItem = ({ nodeDatum }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useAuthStore();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const count = nodeDatum?.Users?.length;
  const isMutilpe = count >= 2;
  return (
    <g>
      <foreignObject
        style={
          {
            // background:"red"
          }
        }
        width={count * 56}
        height="400"
        x={isMutilpe ? "-70" : "-30"}
        y="-40"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",

            background: "white",
            marrginLeft: 200,
            flexWrap: "nowrap",
            border: isMutilpe && "2px dotted  gray",
            borderRadius: 5,
            // height:300
          }}
        >
          {nodeDatum.Users.map((item, index) => {
            const useId = item.UserId;
            const isMineBlue = useId == user.Id && item.Gender == 0;
            const isMineRed = useId == user.Id && item.Gender == 1;
            return (
              <div
                className={
                  index === 0 && nodeDatum.Users.length >= 2 && "user-line"
                }
                style={{
                  position: "relative",
                  paddingTop: 3,
                  marginLeft: 10,
                  background: "white",
                }}
              >
                <Avatar
                  className={
                    isMineBlue
                      ? "animated-avatar-blue"
                      : isMineRed
                      ? "animated-avatar"
                      : ""
                  }
                  aria-describedby={id}
                  onClick={handleClick}
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: item.Gender == 0 ? "blue" : "red",
                  }}
                  src={item?.Avatar}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <div>
                    <InfoItem geneName={nodeDatum?.Name} item={item} />
                  </div>
                </Popover>
                <span
                  style={{
                    color: "black",
                    fontSize: 11,
                    fontWeight: "bold",
                    display: "inline-block",
                    width: 40,
                  }}
                >
                  {item?.FirstName + " " + item?.LastName}
                </span>
              </div>
            );
          })}
        </div>
      </foreignObject>
    </g>
  );
};
const RenderRectSvgNode = ({ nodeDatum, toggleNode }) => {

  return <NodeItem nodeDatum={nodeDatum} />;
};

export default function Tree1({ isGuest }) {
  const [dimensions, translate, containerRef] = useCenteredTree();
  const { currentIdGenealogy } = useAuthStore();
  const [listNode, setListNode] = useState([]);

  const getListAllNode = async () => {
    const res = await familyTreeApi.getListAllNode(currentIdGenealogy);
    if (res.data.StatusCode === 200) {
      setListNode(res.data.Data);
    }
  };
  useEffect(() => {
    if (currentIdGenealogy) {
      getListAllNode();
    }
  }, [currentIdGenealogy]);

  // DOWNLOAD
  const handleDownloadExcel = async () => {
    try {
      const res = await genealogyApi.exportExcel(currentIdGenealogy);
      if (res.data.StatusCode === 200) {
        const fileName = res.data.Data;
        const url = `http://localhost:7291/api/Download?fileName=${fileName}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      handleError(error);
    }
  };
  const listFilter = listNode.filter((i) => i.Users.length > 0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="wrap-ex">
          <p className="bold">Chú thích</p>
          <div
            style={{
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            <div className="flex-start">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  
                }}
              >
                <Avatar
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: "blue",
                    width: 25,
                    height: 25,
                  }}
                  src={""}
                />{" "}
                <span>Nam</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                
                }}
              >
                <Avatar
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: "red",
                    width: 25,
                    height: 25,
                  }}
                  src={""}
                />{" "}
                <span>Nữ</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Avatar
                  className="animated-avatar-blue"
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: "red",
                    width: 25,
                    height: 25,
                  }}
                  src={""}
                />{" "}
                <span>Chính mình</span>
              </div>
         <div className="flex-start" style={{
          gap:5
         }}>
         <div
                style={{
                 width:50,
                 height:25,
                 borderRadius:5,
                 border:"2px dotted gray"
                }}
              >
               
              </div>
              <span>Vợ chồng</span>
         </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...containerStyles }} ref={containerRef}>
        {listFilter.length > 0 && (
          <Tree
            data={buildTree(listFilter)}
            dimensions={dimensions}
            translate={translate}
            renderCustomNodeElement={RenderRectSvgNode}
            orientation="vertical"
            pathFunc={"step"}
            zoomable={false}
          />
        )}
        <div
          style={{
            position: "fixed",
            height: "50px",
            width: "calc(100vw  - 320px)",
            marginLeft: 320,
            right: 0,
            bottom: 50,

            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 20,
            // borderTop:"1px solid lightgray"
          }}
        >
          {!isGuest && (
            <div
              style={{
                marginTop: 20,
              }}
            >
              {" "}
              <PrimaryButton title={"Export PNG "} />
            </div>
          )}
          {!isGuest && (
            <div
              style={{
                marginTop: 20,
                marginLeft: 15,
              }}
            >
              {" "}
              <PrimaryButton
                event={() => handleDownloadExcel()}
                title={"Export EXCEL "}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
