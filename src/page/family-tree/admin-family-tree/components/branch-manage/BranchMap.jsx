import React, { useEffect } from "react";
import Tree1 from "../family-tree/FamilyTree";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import useAuthStore from "../../../../../zustand/authStore";
import { familyTreeApi } from "../../../../../api/familyTree.api";
import { buildTree } from "../../../../../ultils/helper";
import {
    Avatar
  } from "@mui/material";
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
  console.log(nodeDatum);

  return (
    <g>
      <foreignObject width="100" height="100" x="-50" y="0">
        <div
          style={{
            position: "relative",
            border: "1px solid gray",
            background: "black",
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           
          <span style={{ color: "white" }}>{nodeDatum?.Name}</span>
        </div>
      </foreignObject>
    </g>
  );
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
          renderCustomNodeElement={renderRectSvgNode}
          orientation="vertical"
          pathFunc={"step"}
        />
      )}
    </div>
  );
};

export default BranchMap;
