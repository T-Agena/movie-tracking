import { getCookie } from "react-use-cookie";
/*export default*/ function Cokkie() {
  const getTitle = getCookie("title");
  console.log(getTitle);
}
Cokkie();
