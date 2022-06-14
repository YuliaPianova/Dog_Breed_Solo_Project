import './App.css';
import AllBreeds from "./components/AllBreeds";
import NewBreed from "./components/NewBreed";
import OneBreed from "./components/OneBreed";
import EditBreed from "./components/EditBreed";
import LoginRegist from "./views/LoginRegist";
import UserProfile from "./components/UserProfile"

import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  
  
  return (

    <BrowserRouter>

    <div className="App">


      <Routes>
        <Route element = {<LoginRegist />} path= "/" />
        <Route element = {<AllBreeds />} path= "/home" />
        <Route element = {<NewBreed />} path= "/new" />
        <Route element = {<OneBreed />} path= "/breed/:id" />
        <Route element = {<EditBreed />} path= "/breed/edit/:id" />
        <Route element = {<UserProfile />} path= "/user/profile/:username" />

      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
