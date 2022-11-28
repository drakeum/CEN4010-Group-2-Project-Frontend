import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Property_Page from "./pages/Property_Page";
import {  
  BrowserRouter as
  Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route exact path="/Home" element={<Home/>} /> 
            <Route path="/Property_Page/:propertyId" element={<Property_Page />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
