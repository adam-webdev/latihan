import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/user/User";
import UpdateUser from "./components/user/UpdateUser";
import { ChakraProvider } from "@chakra-ui/react";
import News from "./components/news/News";
import UpdateNews from "./components/news/UpdateNews";
import CreateNews from "./components/news/CreateNews";
import Product from "./components/product/Product";
import Discussion from "./components/discussion/Discussion";
import CreateDiscussion from "./components/discussion/CreateDiscussion";
import Comment from "./components/comment/Comment";
import ProductPrice from "./components/producer-price/ProducerPrice";
import CreateProducerPrice from "./components/producer-price/CreateProducerPrice";
import UpdateProducerPrice from "./components/producer-price/UpdateProducerPrice";
import Directory from "./components/directory/Directory";
import UpdateDirectory from "./components/directory/UpdateDirectory";
import CreateDirectory from "./components/directory/CreateDirectory";
import Complain from "./components/complain/Complain";
import ViewComplain from "./components/complain/ViewComplain";
import PestManagement from "./components/pest-management/PestManagement";
import CreatePestManagement from "./components/pest-management/CreatePestManagement";
import UpdatePestManagement from "./components/pest-management/UpdatePestManagement";
import Plant from "./components/plant/Plant";
import Erdkk from "./components/erdkk/Erdkk";
import ViewErdkk from "./components/erdkk/ViewErdkk";
import CreatePlantingGuide from "./components/planting-guide/CreatePlantingGuide";
import UpdatePlantingGuide from "./components/planting-guide/UpdatePlantingGuide";
import PlantingGuide from "./components/planting-guide/PlantingGuide";
import Field from "./components/field/Field";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { UserInfo, UserContext } from "./context/UserContext";
import { useEffect, useContext } from "react";

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserInfo);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER_INFO", payload: user });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/home" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:id/edit" element={<UpdateUser />} />
      {/* news */}
      <Route path="/news" element={<News />} />
      <Route path="/news/:id/edit" element={<UpdateNews />} />
      <Route path="/news/create" element={<CreateNews />} />

      {/* product */}
      <Route path="/product" element={<Product />} />

      {/* discussion */}
      <Route path="/discussion" element={<Discussion />} />
      <Route path="/discussion/create" element={<CreateDiscussion />} />
      <Route path="/comment/:id" element={<Comment />} />

      {/* producer price */}
      <Route path="/producer-price" element={<ProductPrice />} />
      <Route
        path="/producer-price/:id/edit"
        element={<UpdateProducerPrice />}
      />
      <Route path="/producer-price/create" element={<CreateProducerPrice />} />

      {/* directory */}
      <Route path="/directory" element={<Directory />} />
      <Route path="/directory/:id/edit" element={<UpdateDirectory />} />
      <Route path="/directory/create" element={<CreateDirectory />} />

      {/* complain */}
      <Route path="/complain" element={<Complain />} />
      <Route path="/complain/:id/view" element={<ViewComplain />} />

      {/* pest-management */}
      <Route path="/pest-management" element={<PestManagement />} />
      <Route
        path="/pest-management/:id/edit"
        element={<UpdatePestManagement />}
      />
      <Route
        path="/pest-management/create"
        element={<CreatePestManagement />}
      />

      {/* plant */}
      <Route path="/plaint" element={<Plant />} />

      {/* Erdkk */}
      <Route path="/erdkk" element={<Erdkk />} />
      <Route path="/erdkk/:id/view" element={<ViewErdkk />} />

      {/* planting guide */}
      <Route path="/planting-guide" element={<PlantingGuide />} />
      <Route
        path="/planting-guide/:id/edit"
        element={<UpdatePlantingGuide />}
      />
      <Route path="/planting-guide/create" element={<CreatePlantingGuide />} />

      {/* field */}
      <Route path="/field" element={<Field />} />
    </Routes>
  );
};

function App() {
  const location = useLocation();
  // const title = location.pathname.replace("/", ">");
  const title = location.pathname.substr(1);

  const capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join("").toLowerCase();
  return (
    <ChakraProvider>
      <UserContext>
        <div className="App">
          <Navbar />
          <div className="navigation">
            <h3 letterSpacing="10px">
              {location.pathname === "/" ? "Home" : capitalize(title)}
            </h3>
          </div>
          <div className="app-body">
            <Routing />
          </div>
        </div>
      </UserContext>
    </ChakraProvider>
  );
}

export default App;
