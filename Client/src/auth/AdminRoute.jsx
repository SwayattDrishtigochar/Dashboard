import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  if (userInfo.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to='/' />;
  }
};
export default AdminRoute;
