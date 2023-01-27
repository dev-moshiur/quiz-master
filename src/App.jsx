import Context from "./context";
import { Routes, Route } from "react-router-dom";
import CreateQuize from "./components/createQuize/CreateQuize";
import Topbar from "./components/topbar/Topbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import "./app.scss";
import PrivateOutlet from "./components/privateOutlet/PrivateOutlet";

import Perticipent from "./components/perticipent/Perticipent";
import Admin from "./components/adminDashboard/Admin";
function App() {
  return (
    <div className="App">
      <Context>
        <Topbar />
        <div className="logo">
          <span>Quiz</span> Master
        </div>
        <div className="pages">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              
              <Route path="participent" element={<Perticipent />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="/*" element={<PrivateOutlet />}>
                <Route path="admin" element={<Admin />} />
                <Route path="create" element={<CreateQuize />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Context>
    </div>
  );
}

export default App;
