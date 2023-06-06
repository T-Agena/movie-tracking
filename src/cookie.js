import { useCookie } from "react-use-cookie";
/*export default*/ function Cokkie() {
  const getTitle = useCookie("title");
  console.log(getTitle);
}
Cokkie();
