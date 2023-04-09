import "./App.css";
import UserForm from "./components/Userform";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AllRoutes from "./Routes/Routes";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <AllRoutes/>
    </div>
  );
}

export default App;
