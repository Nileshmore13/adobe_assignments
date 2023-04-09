import "./App.css";
import UserForm from "./components/Userform";
import Navbar from "./components/Navbar";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import UserList from "./components/UserList";
import AllRoutes from "./Routes/Routes";

function App() {
  const handleSubmit = () => {};
  let posts=[
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]
  return (
    <div className="App">
      <Navbar />
      <AllRoutes/>
      {/* <UserForm/> */}
      {/* <PostForm
        initialValues={{ title: "My post", content: "This is my post." }}
        onSubmit={handleSubmit}
      /> */}
      {/* <UserList  users={[
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]}/> */}
  {/* <PostList posts={posts}/> */}
    </div>
  );
}

export default App;
