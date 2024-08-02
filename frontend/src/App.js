import 'antd/dist/reset.css';
import './App.css';  
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './Components/page/HomePage';
import GetItemByName from './Components/page/GetName.js';
import Cart from './Components/page/cart.js';
import MenuEdit from './Components/page/MenuEdit.js';
function App() {
  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Item' element={<GetItemByName/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/menuEdit' element={<MenuEdit/>}/>
      </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
