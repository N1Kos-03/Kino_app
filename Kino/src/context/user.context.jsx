import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  userId: null,
  userName: '',
  setUser: () => {},
  logout: () => {}
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUserId(savedUser.userId);
      setUserName(savedUser.userName);
    }
     setIsLoading(false);
  }, []);

  const setUser = (id, name) => {
    setUserId(id);
    setUserName(name);
    localStorage.setItem('user', JSON.stringify({ userId: id, userName: name }));
  };

  const logout = () => {
    setUserId(null);
    setUserName('');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ userId, userName, isLoading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
