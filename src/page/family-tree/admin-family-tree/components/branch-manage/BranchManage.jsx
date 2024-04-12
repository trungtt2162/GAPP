import { useTheme } from "@emotion/react";
import { useState } from "react";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../../components/common/tabs/TabPenal";
import { theme } from "../../../../../theme";
import AddBranch from "./AddBranch";
const BranchManage = () => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Thêm nhánh"}
          onClick={(e) => setValue(1)}
        />
        {/* <ButtonTab
          index={2}
          value={value}
          text={"Danh sách sự kiện chờ duyệt"}
          onClick={(e) => setValue(2)}
        />
        <ButtonTab
          index={3}
          value={value}
          text={"Tạo sự kiện mới"}
          onClick={(e) => setValue(3)}
        /> */}
        
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
           <AddBranch />
          </TabPenal>
          {/* <TabPenal value={value} index={2}>
            <ListEventPending />
          </TabPenal>
          <TabPenal value={value} index={3}>
            <AddEventForm />
          </TabPenal> */}
       
        </div>
      </div>
    </div>
  );
};
export default BranchManage;
