
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Property_Page from "./pages/Property_Page";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Property_Page/:propertyName/:propertyId" element={<Property_Page />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
