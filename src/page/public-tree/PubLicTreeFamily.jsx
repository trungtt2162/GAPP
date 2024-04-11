import React from "react";
import { Box, Card } from "@mui/material";

import Tree1 from "../family-tree/admin-family-tree/components/family-tree/FamilyTree";
import Navbar from "../../components/layout/Navbar";

const PublicTree = () => {
  return (
    <div
      style={{ height: "auto", minHeight: 500, marginTop: 30 }}
      className="content-card card-item "
    >
      <Box
        width="100%"
        max-width="10w"
        sx={{
          p: "2.5rem",
        }}
      ></Box>
        <h4>Cây gia phả</h4>
        <Tree1 />
    </div>
  );
};

export default PublicTree;
