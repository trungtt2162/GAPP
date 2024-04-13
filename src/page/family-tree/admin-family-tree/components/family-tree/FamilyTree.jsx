import React, { useEffect } from "react";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
import { buildTree, handleError } from "../../../../../ultils/helper";
import { genealogyApi } from "../../../../../api/genealogy.api";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { Avatar } from "@mui/material";
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

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => {
  console.log(nodeDatum.Users);
  return (
    <g>
      <g>
        <foreignObject
          style={
            {
              // background:"red"
            }
          }
          width="200"
          height="100"
          x={nodeDatum.Users.length >= 2 ?"-60":"-30"}
          y="-40"
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              width: "100%",
              background:"white",
              marrginLeft:200
            }}
          >
            {nodeDatum.Users.map((item, index) => (
              <div
                className={
                  index === 0 && nodeDatum.Users.length >= 2 && "user-line"
                }
                style={{
                  position: "relative",
                  // border: "1px solid gray",
                  // background: item.Gender == "0" ?"blue":"red",
                  // height: 60,
                  // width:60,
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // borderRadius:30,
                  // fontSize:10,
                  // fontWeight:"bold"
                  // background: "red",
                  marginLeft: 10,
                }}
              >
                <Avatar
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: item.Gender == 0 ? "blue" : "red",
                  }}
                  src={item?.Avatar}
                />
                <span
                  style={{ color: "black", fontSize: 11, fontWeight: "bold",display:"inline-block",width:40 }}
                >
                  {item?.FirstName + " " + item?.LastName}
                </span>
              </div>
            ))}
          </div>
        </foreignObject>
      </g>
    </g>
  );
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
      console.log(res);
      if (res.data.StatusCode === 200) {
        const fileName = res.data.Data;
        const url = `http://localhost:7291/api/Download?fileName=${fileName}`;
        console.log(url);
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
    <div style={{ ...containerStyles }} ref={containerRef}>
      {listFilter.length > 0 && (
        <Tree
          data={buildTree(listFilter)}
          dimensions={dimensions}
          translate={translate}
          renderCustomNodeElement={renderRectSvgNode}
          orientation="vertical"
          pathFunc={"step"}
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
  );
}
