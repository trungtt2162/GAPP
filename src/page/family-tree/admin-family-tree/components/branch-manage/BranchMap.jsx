import React, { useEffect } from "react";
import Tree1 from "../family-tree/FamilyTree";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { buildTree, handleError } from "../../../../../ultils/helper";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddBranch from "./AddBranch";

const orgChartJson = {
  name: "CEO",

  children: [
    {
      name: "Manager",

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
const NodeItem = ({ nodeDatum, getListAllNode }) => {
  console.log(nodeDatum)
  const isDelete = !nodeDatum?.children.length && !nodeDatum?.Users?.length;
  const [currentItem, setCurrentItem] = useState(null);
  const handleDelete = async (idGene, id) => {
    try {
      const res = await familyTreeApi.deleteTree(idGene, id);
      if (res.data.StatusCode === 200) {
        getListAllNode();
        toast.success("Đã xóa");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <g>
      <foreignObject width="150" height="100" x="-50" y="0">
        <div style={{ display: "flex", background: "white", gap: 5 }}>
          <div
            style={{
              position: "relative",
              border: "1px solid gray",
              background: "black",
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <span style={{ color: "white" }}>{nodeDatum?.Name}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 0.6,
              justifyContent: "center",
            }}
          >
            {isDelete && (
              <DeleteIcon
                onClick={() =>
                  handleDelete(nodeDatum.IdGenealogy, nodeDatum.Id)
                }
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontSize: 20,
                }}
              />
            )}
            <EditIcon
              onClick={() =>
                setCurrentItem({
                  IdGenealogy: 0,
                  Id: nodeDatum.Id,
                  name: nodeDatum.Name,
                  description:nodeDatum.Description,
                  parentId: nodeDatum.ParentID == null ? "000":nodeDatum.ParentID,
                })
              }
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: 20,
              }}
            />
          </div>
        </div>
        <CustomModal open={currentItem} onClose={() => setCurrentItem(null)}>
          <AddBranch getListAllNode={() => {
            getListAllNode();
            setCurrentItem(null)
          }} item={currentItem} />
        </CustomModal>
      </foreignObject>
    </g>
  );
};
const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2.5, y: 60 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};

const containerStyles = {
  width: "100vw",
  height: "100vh",
};
const renderRectSvgNode =
  (getListAllNode) =>
  ({ nodeDatum, toggleNode }) => {
    return <NodeItem nodeDatum={nodeDatum} getListAllNode={getListAllNode} />;
  };

const BranchMap = () => {
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
  console.log(listNode);
  return (
    <div style={{ ...containerStyles }} ref={containerRef}>
      {listNode.length > 0 && (
        <Tree
          data={buildTree(listNode)}
          dimensions={dimensions}
          translate={translate}
          renderCustomNodeElement={renderRectSvgNode(getListAllNode)}
          orientation="vertical"
          pathFunc={"step"}
          zoomable={false}
        />
      )}
    </div>
  );
};

export default BranchMap;
