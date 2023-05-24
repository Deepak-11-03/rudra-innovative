import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/FormComponents/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/FormComponents/Signup";
import Home from "./Components/Home";
import Profile from "./Components/ProfileComponent/Profile";


function App() {
 
  return (
    <div className="App">
    <Header/>
    <Routes>
    <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/profile' element={<Profile />} />

    </Routes>
    </div>
  );
}

export default App;
