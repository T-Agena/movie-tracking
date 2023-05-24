import Search from "./SearchMovie";
import Favorites from "./MyFavorites";

function PageChenge(props){
  if(props.sContents===true){
    return <Search/>
  }else{
    return <Favorites/>
  }
}
export default PageChenge;