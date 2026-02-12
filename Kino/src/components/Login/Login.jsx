import { useState } from 'react';
import styles from './Login.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user.slice';

function Login() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (name.trim()) {
      dispatch(
        login({
          userId: Date.now(),
          userName: name.trim(),
        })
      );
      setName('');
      navigate('/');
    }
  };

  return (
    <div className={styles['login-body']}>
      <h1>Вход</h1>
      <div className={styles['login']}>
        <Input
          type="text"
          value={name}
          onChange={value => setName(value)}
          placeholder="Ваше имя"
        />
        <Button onClick={handleLoginClick} text="Войти в профиль" />
      </div>
    </div>
  );
}

export default Login;
