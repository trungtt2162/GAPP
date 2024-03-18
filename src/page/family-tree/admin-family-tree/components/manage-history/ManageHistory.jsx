import { useTheme } from "@emotion/react";
import { useState } from "react";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../../components/common/tabs/TabPenal";
import { theme } from "../../../../../theme";
import EditInfoHistory from "./EditInfoHistory";
import HistoryEvent from "./HistoryEvent"
const ManageHistory = () => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Chỉnh sửa thông tin giới thiệu lịch sử"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Các mốc sự kiện lịch sử"}
          onClick={(e) => setValue(2)}
        />
        
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
          <EditInfoHistory />
          </TabPenal>
          <TabPenal value={value} index={2}>
          <HistoryEvent />
          </TabPenal>
       
        </div>
      </div>
    </div>
  );
};
export default ManageHistory;
