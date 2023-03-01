import { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // здесь можно добавить логику для обработки введенных данных
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Пароль:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          Подтверждение пароля:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;
