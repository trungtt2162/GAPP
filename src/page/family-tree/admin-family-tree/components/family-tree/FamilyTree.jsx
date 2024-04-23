import React, { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { saveSvgAsPng } from "save-svg-as-png";
import {
  buildTree,
  checkEmptyData,
  dateFormat,
  handleError,
} from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { Avatar, Popover } from "@mui/material";
import "./Tree.scss";
import { BASE_URL_DOWNLOAD } from "../../../../../api";
import { toPng } from "html-to-image";

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
      setTranslate({ x: width / 2, y: 60 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};

const containerStyles = {
  width: "100%",
  height: "100vh",
};

const InfoItem = ({ item, geneName }) => {
  return (
    <div
      style={{
        width: 400,
        height: 500,
        padding: 10,
      }}
    >
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Avatar
          style={{
            width: 70,
            height: 70,
          }}
          src={item.Avatar}
        />
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
        <span>{item.Gender == "0" ? "Nam" : "Nữ"}</span>
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
          Nghề nghiệp :{" "}
        </span>
        <span>{item.JobTitle}</span>
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
          Nơi sinh :{" "}
        </span>
        <span>{item.HomeTown}</span>
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
          CMND/CCCD :{" "}
        </span>
        <span>{item.Indentification}</span>
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
          Là liệt sĩ :{" "}
        </span>
        <span>{item.IsMartyrs == false ? "Không" : "Phải"}</span>
      </div>
    </div>
  );
};
const NodeItem = ({ nodeDatum }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElList, setAnchorElList] = React.useState(
    Array(nodeDatum?.Users.length).fill(null)
  );
  const { user } = useAuthStore();

  const handleClick = (event, index) => {
    const newAnchorElList = [...anchorElList];
    newAnchorElList[index] = event.currentTarget;
    setAnchorElList(newAnchorElList);
  };

  const handleClose = (index) => {
    const newAnchorElList = [...anchorElList];
    newAnchorElList[index] = null;
    setAnchorElList(newAnchorElList);
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);
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
            const open = Boolean(anchorElList[index]);
            const id = open ? "simple-popover" + index : undefined;

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
                  onClick={(event) => handleClick(event, index)}
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
                  anchorEl={anchorElList[index]}
                  onClose={() => handleClose(index)}
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

export default function Tree1({ isGuest, idTree }) {
  const elementRef = useRef(null);
  const captureElement = () => {
    saveSvgAsPng(document.getElementsByClassName("svgClass")[0], "familyTree", {
      backgroundColor: "white",
    });
    // if (elementRef.current) {
    //   toPng(elementRef.current)
    //     .then((imgDataUrl) => {
    //       // Tạo một thẻ a để tải xuống
    //       const link = document.createElement("a");
    //       link.href = imgDataUrl;
    //       link.download = "captured_element.png"; // Đặt tên file
    //       link.click();
    //     })
    //     .catch((error) => {
    //       console.error("Không thể chụp phần tử:", error);
    //     });
    // } else {
    //   console.error("Không tìm thấy phần tử để chụp");
    // }
  };

  const [dimensions, translate, containerRef] = useCenteredTree();
  const { currentIdGenealogy: idTree2 } = useAuthStore();
  const [listNode, setListNode] = useState([]);
  const currentIdGenealogy = idTree || idTree2;
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
        const url = BASE_URL_DOWNLOAD + `?fileName=${fileName}`;
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
  const nameGene = listNode.length > 0 ? listNode[0]?.GenealogyName : "";
  const isEmpty = listNode.every((item) => !item?.Users?.length);
  return (
    <div>
      {!isEmpty && (
        <div
          ref={elementRef}
          id="elementId"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
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
                    className="animated-avatar-mind"
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
                <div
                  className="flex-start"
                  style={{
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 25,
                      borderRadius: 5,
                      border: "2px dotted gray",
                    }}
                  ></div>
                  <span>Vợ chồng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <p
        style={{
          fontWeight: "bold",
          flex: 1,
          textAlign: "center",
          fontSize: 20,
          marginTop: 20,
        }}
      >
        Cây gia phả {nameGene ? " của " + nameGene : ""}{" "}
      </p>
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
            svgClassName="svgClass"
          />
        )}
        {isEmpty && (
          <div
            style={{
              textAlign: "center",
              marginTop: 50,
            }}
          >
            {checkEmptyData([])}
          </div>
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
              <PrimaryButton
                event={() => captureElement()}
                title={"Export PNG "}
              />
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
