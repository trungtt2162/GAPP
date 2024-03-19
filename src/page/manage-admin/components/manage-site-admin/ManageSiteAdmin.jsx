import { useState } from "react";

import ButtonTab from "../../../../components/common/button/ButtonTab";
import ListAdmin from "./ListAdmin";
import ListAdminLock from "./ListAdminLock";
import TabPenal from "../../../../components/common/tabs/TabPenal";

const ManageSiteAdmin = () => {
  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Danh sách Admin"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Admin bị cấm"}
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
            <ListAdmin setValue={setValue} />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <ListAdminLock />
          </TabPenal>
         
        </div>
      </div>
    </div>
  );
};
export default ManageSiteAdmin;
