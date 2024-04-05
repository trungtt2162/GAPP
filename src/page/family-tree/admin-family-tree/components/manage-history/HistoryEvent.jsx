import { useEffect, useState } from "react";
import HistoryEventItem from "./HistoryEventItem";
import useAuthStore from "../../../../../zustand/authStore";
import { handleError } from "../../../../../ultils/helper";
import { historyApi } from "../../../../../api/history.api";
import CustomModal from "../../../../../components/common/modal/CustomModal";
import AddHistory from "./AddHostory";
const HisoryEvent = () => {
  const { userGenealogy } = useAuthStore();

  const [currentItem, setCurrentItem] = useState(null);
  const [listHistory, setListHistory] = useState([]);

  const getListHistory = async (id) => {
    try {
      const res = await historyApi.getListAllHistoryByGenealogyId(id);
      if (res.data.StatusCode === 200) {
        setListHistory(res.data.Data.Data);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getListHistory(userGenealogy[0]?.IdGenealogy);
  }, [userGenealogy]);
  const handleSetHistory = (id, newData) => {
    // const newHistoryList = [...listHistory];
    // const index = listHistory.findIndex((i) => i.id === id);
    // if (index >= 0) {
    //   newHistoryList[index] = newData;
    //   setListHistory(newHistoryList);
    // }
  };
  //
  const onClose = () => {
    setCurrentItem(null);
  }
  const updateItem = (item) => {
    const index = listHistory.findIndex(i => i.Id == item.Id);
    if(index>=0){
        const list = [...listHistory];
        list[index] = item;
        console.log(list)
        setListHistory(list);
        onClose();
    }
  }
  return (
    <div>
      {listHistory.map((item) => (
        <HistoryEventItem
          setListHistory={setListHistory}
          listHistory={listHistory}
          setHistory={handleSetHistory}
          {...item}
          curr={item}
          setCurrentItem={setCurrentItem}
        />
      ))}
      <CustomModal onClose={onClose} open={currentItem}>{<AddHistory updateItem={updateItem} item={currentItem} />}</CustomModal>
    </div>
  );
};
export default HisoryEvent;
