const TabPenal = ({ index, value, children }) => {
  if (index === value) return <div>{children}</div>;
  else return <></>;
};
export default TabPenal;
