import { useState, useContext } from 'react';
import styles from './Login.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { UserContext } from '../../context/user.context';

function Login() {
  const [name, setName] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLoginClick = () => {
    if (name.trim()) {
      const userId = Date.now();
      setUser(userId, name.trim());
      setName('');
    }
  };

  return (
    <div className={styles['login-body']}>
      <h1>Вход</h1>
      <div className={styles['login']}>
        <Input
          type="text"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Ваше имя"
        />
        <Button onClick={handleLoginClick} text="Войти в профиль" />
      </div>
    </div>
  );
}

export default Login;
