import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

function PrivateRoute({ children }) {
  const { userId, isLoading } = useContext(UserContext);

  // Ждём инициализацию контекста
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // Не залогинен
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  //  Залогинен
  return children;
}

export default PrivateRoute;
