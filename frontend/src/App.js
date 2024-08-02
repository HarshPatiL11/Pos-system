import 'antd/dist/reset.css';
import './App.css';  
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './Components/page/HomePage';
import GetItemByName from './Components/page/GetName.js';
function App() {
  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Item' element={<GetItemByName/>}/>
      </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
