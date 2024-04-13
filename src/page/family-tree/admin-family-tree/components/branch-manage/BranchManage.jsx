import { useTheme } from "@emotion/react";
import { useState } from "react";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../../components/common/tabs/TabPenal";
import { theme } from "../../../../../theme";
import AddBranch from "./AddBranch";
import BranchMap from "./BranchMap";
const BranchManage = () => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(0);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={0}
          value={value}
          text={"Sơ đồ nhánh"}
          onClick={(e) => setValue(0)}
        />
        <ButtonTab
          index={1}
          value={value}
          text={"Thêm nhánh"}
          onClick={(e) => setValue(1)}
        />
        
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={0}>
            <BranchMap />
          </TabPenal>
          <TabPenal value={value} index={1}>
            <AddBranch />
          </TabPenal>
         
        </div>
      </div>
    </div>
  );
};
export default BranchManage;
