import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { userId, isLoading } = useSelector(state => state.user);



  
  if (isLoading) {
    return <div>Загрузка...</div>;
  }


  if (!userId) {
    return <Navigate to="/login" replace />;
  }


  return children;
}

export default PrivateRoute;
