import './App.css';
import { useState } from 'react';
import PageChenge from './PageChenge';

function App() {
  const [sContents, setSContents] = useState(true);
  
  const chengeMenu = (menu) => {
    if(menu){
      setSContents(menu);
    }else{
      setSContents(menu);
    }
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie</h1>
        <div>
          <p className='menu' onClick={()=>{chengeMenu(true)}}>Search Movie</p>
          <p className='menu' onClick={()=>{chengeMenu(false)}}>My Favorites</p>
        </div>
      </header>
      <div>
        <PageChenge sContents={sContents}/>
      </div>
    </div>
  );
}

export default App;
