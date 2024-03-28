import React from "react";
import Tree from "react-d3-tree";
import { useCallback, useState } from "react";
import PrimaryButton from "../../../../../components/common/button/PrimaryButton";
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

// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <foreignObject
      width="200"
      height="300"
      x="-30"
      y="-40"
    >
      <div style={{position:"relative"}}>
        {nodeDatum.attributes?.img && (
          <img
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              border: "2px solid gray",
              marginLeft:-140
            }}
            src={nodeDatum.attributes?.img}
          />
        )}
        <div style={{
          position:"absolute",
          top:-5,
          right:110
        }}>
        <div>Abc</div>
        <div>Abc</div>
        </div>
      </div>
    </foreignObject>
  </g>
  
);

export default function Tree1() {
  const [dimensions, translate, containerRef] = useCenteredTree();
  return (
    <div style={{...containerStyles}} ref={containerRef}>
      <Tree
        data={orgChartJson}
        dimensions={dimensions}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        pathFunc={"step"}
      />
      <div style={{
        position:"fixed",
        height:"50px",
        width:"calc(100vw  - 320px)",
        marginLeft:320,
        right:0,
        bottom:50,
        
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingLeft:50,
        borderTop:"1px solid lightgray"

      }}>
       <div style={{
        marginTop:20
       }}> <PrimaryButton title={"Export PNG "} /></div>
       <div  style={{
        marginTop:20,
        marginLeft:15
       }}> <PrimaryButton title={"Export EXCEL "} /></div>
      </div>
    </div>
  );
}
