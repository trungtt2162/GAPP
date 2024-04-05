export const LOCAL_STORAGE_KEY = {
    token:"token-giapa"
}
export const  genderOptions = [
    { value: true, label: 'Nam' },
    { value: false, label: 'Nữ' },
  ];
  export const  genderOptions2 = [
    { value: 0, label: 'Nam' },
    { value: 1, label: 'Nữ' },
  ];
  export const listLocation = [
    { id: 0, value: "Nơi Sinh" },
    { id: 1, value: "Nơi Cưới" },
    { id: 2, value: "Nơi Chôn Cất" },
    { id: 3, value: "Nơi Ở" },
    { id: 4, value: "Nơi Làm Việc" },
    { id: 5, value: "Nơi Học Tập" },
    { id: 6, value: "Địa Điểm Di Cư" },
    { id: 7, value: "Địa Điểm Quan Trọng Khác" },
    { id: 8, value: "Di Tích và Địa Điểm Lịch Sử" },
    { id: 9, value: "Nơi Thờ Phụng" }
  ];
  export const TYPE_EVENT = {
    0:"Online",
    1:"Offline"
  }
  export function getLocationName(id) {
    const location = listLocation.find(location => location.id === id);
    return location ? location.value : '';
  }
  
  export const USER_ROLE = {
    User:"Account",
    SiteAdmin:"Admin",
    SupperAdmin:"SuperAdmin"
  }