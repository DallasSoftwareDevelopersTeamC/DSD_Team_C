import './loginWindow.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { createUser, loginUser } from '../../services/userAPIcalls';

export default function () {
  const [login, setLogin] = useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
    if (login) {
      const userData = await loginUser(
        data.get('username'),
        data.get('password')
      );
      userData.user ? console.log('success') : console.log(userData.message);
    } else {
      const userData = await createUser(
        data.get('username'),
        data.get('password'),
        data.get('companyId')
      );
      userData.user ? console.log('success') : console.log(userData.message);
    }
  };
  return (
    <div className="loginWindow-container">
      <div className="title-container">
        <h1 className="title">Orderly</h1>
      </div>
      <Box className="input-container" component="form" onSubmit={handleSubmit}>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}{' '}
        <p className="input-header">{login ? 'Login' : 'Register'}</p>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          InputLabelProps={{
            style: { color: '#3b9893' },
          }}
          sx={{ input: { cursor: 'pointer' } }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={login && 'password'}
          id="password"
          autoComplete="current-password"
          InputLabelProps={{
            style: { color: '#3b9893' },
          }}
          sx={{ input: { cursor: 'pointer' } }}
        />
        {!login && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              name="companyId"
              label="companyId"
              id="companyId"
              autoComplete="current-password"
              InputLabelProps={{
                style: { color: '#3b9893' },
              }}
              sx={{ input: { cursor: 'pointer' } }}
            />
          </>
        )}
        {login ? (
          <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="submit-button"
              className="login-button"
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="guest-submit-button"
              className="login-button"
            >
              Guest Sign In
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="guest-submit-button"
              className="login-button"
            >
              Submit
            </Button>
          </>
        )}
        <div className="new-account-container">
          <p
            className="new-account-link"
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </p>
        </div>
      </Box>
    </div>
  );
}
