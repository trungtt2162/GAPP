import { useTheme } from "@emotion/react";
import { useState } from "react";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../../components/common/tabs/TabPenal";
import { theme } from "../../../../../theme";
import MemberLocation from "./MemberLocation";
import OtherLocation from "./OtherLocation";
import { AddLocation } from "@mui/icons-material";
import AddLocationForm from "./AddLocation";
import { USER_ROLE } from "../../../../../constant/common";
import useAuthStore from "../../../../../zustand/authStore";
const ManageLocation = () => {
  const { palette } = useTheme(theme);
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;

  const [value, setValue] = useState(1);
  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Địa chỉ thành viên"}
          onClick={(e) => setValue(1)}
        />
        <ButtonTab
          index={2}
          value={value}
          text={"Địa điểm khác"}
          onClick={(e) => setValue(2)}
        />
         {isSiteAdmin && <ButtonTab
          index={3}
          value={value}
          text={"Thêm địa điểm khác"}
          onClick={(e) => setValue(3)}
        />}
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
           <MemberLocation />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <OtherLocation />
          </TabPenal>
          <TabPenal value={value} index={3}>
            <AddLocationForm />
          </TabPenal>
        </div>
      </div>
    </div>
  );
};
export default ManageLocation;
