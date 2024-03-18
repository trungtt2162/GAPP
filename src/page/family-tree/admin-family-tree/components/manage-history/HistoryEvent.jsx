import { useState } from "react"
import HistoryEventItem from "./HistoryEventItem"
const HisoryEvent = () => {
    const [listHistory,setListHistory] = useState([
        {
            id:1,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        },
        {
            id:2,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        },
        {
            id:3,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        },
        {
            id:4,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        },
        {
            id:5,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        },
        {
            id:6,
            image:"https://afamilycdn.com/2018/7/8/e6f6xdaa-15310669097832081399127.jpeg",
            description:"Ngày cưới của A và B"
        }
    ]);
 const  handleSetHistory = (id,newData) => {
    const newHistoryList = [...listHistory]
    const index = listHistory.findIndex(i => i.id ===id);
    if(index >=0){
        newHistoryList[index] = newData;
        setListHistory(newHistoryList);
    }
 }
return (
    <div>
  {
    listHistory.map(item => <HistoryEventItem setHistory={handleSetHistory} {...item} />)
  }
    </div>
)
}
export default HisoryEvent;