import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Developers from './pages/Developers';
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import About from "./pages/AboutPage";
import DeveloperPage from './pages/DeveloperPage';
import ChatRoom from './pages/ChatRoom';
import HackathonPage from './pages/HackathonPage';
import TaskManagementPage from './pages/TaskManagementPage';
import SendMail from './pages/SendMail';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/developers/:id" element={<DeveloperPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/sendmail" element={<SendMail />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/hackathons" element={<HackathonPage />} />
          <Route path="/taskmanagement" element={<TaskManagementPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
