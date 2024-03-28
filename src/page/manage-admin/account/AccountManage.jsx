import { useState } from "react";

import AddAccount from "./AddAccount";
import ListAccount from "./ListAccount";
import TabPenal from "../../../components/common/tabs/TabPenal";
import ButtonTab from "../../../components/common/button/ButtonTab";

const ManageAccount = () => {
  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Danh sách tài khoản"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Thêm tài khoản"}
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
            <ListAccount />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <AddAccount />
          </TabPenal>
        </div>
      </div>
    </div>
  );
};
export default ManageAccount;
