
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
