import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.companyStatus === 'approved' ? (
    <Outlet />
  ) : (
    <Navigate to='/pending' replace />
  );
};
export default DashboardRoute;
