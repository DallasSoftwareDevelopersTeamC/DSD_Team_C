import './loginWindow.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { createUser, loginUser } from '../../services/userAPIcalls';
import { CircularProgress } from '@mui/material';
import { createCompany } from '../../services/companyAPIcalls';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [company, setCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [companyAddedPrompt, setCompanyAddedPrompt] = useState('');
  const [userAddedPrompt, setUserAddedPrompt] = useState('');
  const [userLoginErrorPrompt, setUserLoginErrorPrompt] = useState('');
  const [userAddedErrorPrompt, setUserAddedErrorPrompt] = useState('');
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (company) {
      const companyData = await createCompany(data.get('companyName'));
      setCompanyAddedPrompt(companyData.companyId);
      setLoading(false);
      return setPrompt(true);
    }
    if (login) {
      const userData = await loginUser(
        data.get('username'),
        data.get('password')
      );
      if (userData.user) {
        setLoading(false);
        return navigate('/');
      } else {
        setUserLoginErrorPrompt(userData.message);
        setLoading(false);
        return setPrompt(true);
      }
    } else {
      const userData = await createUser(
        data.get('username'),
        data.get('password'),
        data.get('companyId')
      );
      if (userData.username) {
        setUserAddedPrompt(userData.username);
        setLoading(false);
        return setPrompt(true);
      } else {
        console.log(userData);
        setUserAddedErrorPrompt(userData.message);
        setLoading(false);
        return setPrompt(true);
      }
    }
  };

  const goBack = async () => {
    setLoading(true);
    setUserAddedPrompt('');
    setCompanyAddedPrompt('');
    setCompany(false);
    setUserAddedErrorPrompt(false);
    setUserLoginErrorPrompt(false);
    setPrompt(false);
    setLoading(false);
    setLogin(true);
  };
  return (
    <div className="loginWindow-container">
      <div className="title-container">
        <h1 className="title">Orderly</h1>
      </div>
      <Box className="input-container" component="form" onSubmit={handleSubmit}>
        {prompt ? (
          <>
            {companyAddedPrompt && (
              <div className="prompt">
                <p>Success!</p>
                <p>Your new company ID is {companyAddedPrompt}</p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
            {userAddedPrompt && (
              <div className="prompt">
                <p style={{ textAlign: 'center' }}>
                  Thank you {userAddedPrompt} for signing up! Please sign in.{' '}
                </p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
            {userLoginErrorPrompt && (
              <div className="prompt">
                <p>{userLoginErrorPrompt}</p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
            {userAddedErrorPrompt && (
              <div className="prompt">
                <p>{userAddedErrorPrompt}</p>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  id="go-back-button"
                  className="go-back-button"
                  onClick={() => {
                    goBack();
                  }}
                >
                  OK
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            {' '}
            {loading ? (
              <>
                {' '}
                <CircularProgress
                  className="circle-spinner"
                  size="5rem"
                  style={{ color: '#3b9893' }}
                />
              </>
            ) : (
              <>
                {!company ? (
                  <>
                    <p className="input-header">
                      {login ? 'Login' : 'Register'}
                    </p>
                  </>
                ) : (
                  <p className="input-header">Company</p>
                )}
                {!company ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {' '}
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="companyName"
                      label="Company Name"
                      name="companyName"
                      autoComplete="companyName"
                      autoFocus
                      InputLabelProps={{
                        style: { color: '#3b9893' },
                      }}
                      sx={{ input: { cursor: 'pointer' } }}
                    />
                  </>
                )}
                {!company ? (
                  <>
                    {' '}
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
                      Add Company
                    </Button>
                  </>
                )}

                <div className="new-account-container">
                  {!company ? (
                    <>
                      {' '}
                      <div>
                        <p
                          className="add-company-link"
                          onClick={() => {
                            setCompany(!company);
                          }}
                        >
                          Add Company
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {' '}
                      <div>
                        <p
                          className="add-company-link"
                          onClick={() => {
                            setCompany(!company);
                          }}
                        >
                          Go Back
                        </p>
                      </div>
                    </>
                  )}
                  {!company && (
                    <>
                      {' '}
                      <div>
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
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
}
