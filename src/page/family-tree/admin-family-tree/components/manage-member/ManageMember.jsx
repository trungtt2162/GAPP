import { useTheme } from "@emotion/react";
import { useState } from "react";
import ButtonTab from "../../../../../components/common/button/ButtonTab";
import TabPenal from "../../../../../components/common/tabs/TabPenal";
import { theme } from "../../../../../theme";
import ListMember from "./ListMember";
import ListMemberPending from "./ListMemberPending";
import AddMemberForm from "./AddMember";
import { USER_ROLE } from "../../../../../constant/common";
import useAuthStore from "../../../../../zustand/authStore";

const ManageMember = () => {
  const { palette } = useTheme(theme);
  const [value, setValue] = useState(1);
  const { isLogin, roleCode } = useAuthStore();

  const isSiteAdmin = isLogin && roleCode === USER_ROLE.SiteAdmin;
  const isSupperAdmin = isLogin && roleCode === USER_ROLE.SupperAdmin;
  const isPeopleAdmin = isLogin && roleCode === USER_ROLE.PeopleAdmin;
  const isUser = isLogin && roleCode === USER_ROLE.User;
  const isMember = isUser || isSiteAdmin || isPeopleAdmin;

  return (
    <div>
      <div className="flex-center">
        <ButtonTab
          index={1}
          value={value}
          text={"Danh sách thành viên"}
          onClick={(e) => setValue(1)}
        />
        {isSiteAdmin && (
          <ButtonTab
            index={2}
            value={value}
            text={"Danh sách chờ duyệt"}
            onClick={(e) => setValue(2)}
          />
        )}
        <ButtonTab
          index={3}
          value={value}
          text={"Thêm thành viên"}
          onClick={(e) => setValue(3)}
        />
      </div>
      <div>
        <div
          style={{
            marginTop: 30,
          }}
        >
          <TabPenal value={value} index={1}>
            <ListMember setValue={setValue} />
          </TabPenal>
          <TabPenal value={value} index={2}>
            <ListMemberPending />
          </TabPenal>
          <TabPenal value={value} index={3}>
            <AddMemberForm />
          </TabPenal>
        </div>
      </div>
    </div>
  );
};
export default ManageMember;
