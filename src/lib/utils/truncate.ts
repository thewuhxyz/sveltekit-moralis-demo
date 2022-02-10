export const truncate = (
  addr: string
  //   length: number,
  //   ending: string
) => {
  return `${addr.substr(0, 5)}...${addr.substr(addr.length - 4)}`;
  //   if (length == null) {
  //     return str; //default
  //   }
  //   if (ending == null) {
  //     ending = '...';
  //   }
  //   if (str.length > length) {
  //     return str.substring(0, length - ending.length) + ending;
  //   } else {
  //     return str;
  //   }
};
