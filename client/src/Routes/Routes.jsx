import { Navigate, Route, Routes } from 'react-router-dom'
import UserForm from '../components/Userform';
import HomePage from '../pages/HomePage';
import UserAnalytics from '../pages/UserAnalytics';
import PostAnalytics from '../pages/PostAnalytics';

const AllRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserForm/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="home/userAnalys" element={<UserAnalytics/>}/>
        <Route path="home/postAnalys" element={<PostAnalytics/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
