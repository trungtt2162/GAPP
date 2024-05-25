import React, { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { saveSvgAsPng } from "save-svg-as-png";
import {
  buildTree,
  checkEmptyData,
  checkUserExistence,
  dateFormat,
  extractUserDataFromFamilyTree,
  handleError,
} from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { Avatar, Popover } from "@mui/material";
import "./Tree.scss";
import { BASE_URL_DOWNLOAD } from "../../../../../api";
import { toPng } from "html-to-image";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddMemberForm from "../manage-member/AddMember";
import { USER_ROLE } from "../../../../../constant/common";

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
      style={
        {
          // width: 400,
          // height: 500,
          // padding: 10,
        }
      }
    >
      <h4
        style={{
          color: "black",
          textAlign: "center",
        }}
      >
        Thông tin thành viên
      </h4>
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
        <span>
          {item.FirstName + " " + item.LastName}{" "}
          {item.Description && ` (${item.Description}) `}
        </span>
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
const SelectInfo = ({ item, geneName, getListAllNode,listNode }) => {
  console.log(item);
  const { userGenealogy, currentIdGenealogy, roleCode, user } = useAuthStore();
  const listmemberFamily = buildTree(listNode, user.Id);
  const listFinalMemberFamily = extractUserDataFromFamilyTree(
    listmemberFamily,
    checkUserExistence(listmemberFamily, user.Id)
  );
  const isDeleteAndEdit = () => checkUserExistence(listFinalMemberFamily, item.UserId);
  const isSiteAdmin = roleCode === USER_ROLE.SiteAdmin;
  const isPeopleAdmin = roleCode === USER_ROLE.PeopleAdmin;
  const isUser = !isSiteAdmin && !isPeopleAdmin;
  const isAdmin = isSiteAdmin || isPeopleAdmin;
  const OPTION = {
    VIEW: 1,
    EDIT: 2,
    ADD_CK: 3,
    ADD_CHILD: 4,
    VIEW_CHILD_TREE: 5,
  };
  const [modeModal, setModeModal] = useState(null);
  const listOption = [
    {
      key: OPTION.VIEW,
      name: "Xem",
      show: true,
    },
    {
      key: OPTION.EDIT,
      name: "Sửa",
      show: isSiteAdmin || (isPeopleAdmin &&isDeleteAndEdit() ),
    },
    {
      key: OPTION.ADD_CK,
      name: "Thêm vợ chồng",
      show:  isSiteAdmin || (isPeopleAdmin &&isDeleteAndEdit() ),
    },
    {
      key: OPTION.ADD_CHILD,
      name: "Thêm con",
      show:  isSiteAdmin || (isPeopleAdmin &&isDeleteAndEdit() ),
    },
    {
      key: OPTION.VIEW_CHILD_TREE,
      name: "Xem riêng nhánh này",
      show: true,
    },
  ];
  let conntentModal = <></>;
  switch (modeModal) {
    case OPTION.VIEW: {
      conntentModal = <InfoItem item={item} geneName={geneName} />;
      break;
    }
    case OPTION.EDIT: {
      conntentModal = (
        <AddMemberForm
          refreshData={() => {
            getListAllNode();
            setModeModal(null);
          }}
          item={item}
        />
      );
      break;
    }
    case OPTION.ADD_CK: {
      conntentModal = (
        <AddMemberForm
          onCloseModal={() => {
            getListAllNode();
            setModeModal(null);
          }}
          idTree={item.IdFamilyTree}
          isTree
        />
      );
      break;
    }
    case OPTION.ADD_CHILD: {
      conntentModal = (
        <AddMemberForm
          onCloseModal={() => {
            getListAllNode();
            setModeModal(null);
          }}
          idTree={item.IdFamilyTree}
          dataAddChild={{
            idParent: item.IdFamilyTree,
          }}
        />
      );
      break;
    }
    case OPTION.VIEW_CHILD_TREE: {
      conntentModal = (
        <Tree1
          currentTree={item.IdFamilyTree}
          currentName={item.FirstName + " " + item.LastName}
          dataAddChild={{
            idParent: item.IdFamilyTree,
          }}
        />
      );
      break;
    }
    default: {
      conntentModal = null;
    }
  }

  return (
    <>
      <div
        style={{
          width: 200,
        }}
      >
        {listOption.filter(i => i.show).map((item, index) => (
          <div
            onClick={() => setModeModal(item.key)}
            className="hover-gray"
            style={{
              padding: 10,
              textAlign: "start",
              cursor: "pointer",
              textDecoration: "none",
              borderBottom:
                index !== listOption.length - 1 && "1px solid lightgray",
            }}
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
      <CustomModal
        open={modeModal && conntentModal}
        onClose={() => setModeModal(null)}
      >
        {conntentModal}
      </CustomModal>
    </>
  );
};
const NodeItem = ({ nodeDatum, getListAllNode,listNode }) => {
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
            const isMineBlue = useId == user?.Id && item.Gender == 0;
            const isMineRed = useId == user?.Id && item.Gender == 1;
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
                    {/* <InfoItem geneName={nodeDatum?.Name} item={item} /> */}
                    <SelectInfo
                      getListAllNode={getListAllNode}
                      geneName={nodeDatum?.Name}
                      item={item}
                      listNode={listNode}
                    />
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
                <div  style={{
                    color: "black",
                    fontSize: 11,
                   
                  }}>{`${item?.Description ? "( " + item?.Description + " )" :""}`}</div>
              </div>
            );
          })}
        </div>
      </foreignObject>
    </g>
  );
};
const RenderRectSvgNode =
  (getListAllNode,listNode) =>
  ({ nodeDatum, toggleNode }) => {
    return <NodeItem nodeDatum={nodeDatum} getListAllNode={getListAllNode} listNode = {listNode} />;
  };

export default function Tree1({ isGuest, idTree, currentTree, currentName }) {
  const elementRef = useRef(null);
  const captureElement = () => {
    saveSvgAsPng(document.getElementsByClassName("svgClass")[0], "familyTree", {
      backgroundColor: "white",
    });
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
  console.log(buildTree(listFilter));
  let dataTree = buildTree(listFilter);
  if (currentTree) {
    dataTree = extractUserDataFromFamilyTree(dataTree, currentTree);
  }
  console.log(dataTree);
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
          <div style={{ marginTop: 10 }} className="wrap-ex">
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
        {!currentName && !currentTree
          ? "Cây gia phả" + (nameGene ? " của " + nameGene : "")
          : "Nhánh riêng của " + currentName}
      </p>
      <div style={{ ...containerStyles }} ref={containerRef}>
        {listFilter.length > 0 && (
          <Tree
            data={dataTree}
            dimensions={dimensions}
            translate={translate}
            renderCustomNodeElement={RenderRectSvgNode(getListAllNode,listNode)}
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
          {!isGuest && !currentTree && (
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
          {!isGuest && !currentTree && (
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
