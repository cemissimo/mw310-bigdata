import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreSelection from './components/StoreSelection'
import Store from './components/Store'


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={StoreSelection}></Route>
        <Route path='/store_selection' Component={StoreSelection} />
        <Route path='/store/:storeId' Component={Store} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
