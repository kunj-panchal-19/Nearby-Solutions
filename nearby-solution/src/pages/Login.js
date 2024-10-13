import React ,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import connectionString from './../components/connectionString'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Oauth from '../components/oauth';

export default function Login() {
  const {handleCurrentUser} = useContext(authContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
          NearbySolutions
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const defaultTheme = createTheme();
  // network part
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      
      const result = await fetch(`${connectionString}signin`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      const data = await result.json();
      console.log(data);
      // alert(" sadf")
      sessionStorage.setItem('token',data.accessToken);
      sessionStorage.setItem('u_id',data.id.toString())
      setError(false);
      if (data.success === false) {
        setError(data.message);
        console.log(data.message);
        setLoading(false);
        return;
      }
      handleCurrentUser(data);
      window.location.href="/"
    } 
    catch (error) {
      console.log(error);
      setError(error)
    }
    setLoading(false);
  };
  console.log(form)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <div className="border-2 rounded-md my-3 p-4">
        <Link to="/"><p className="text-center font-bold text-3xl">NearbySolutions</p></Link>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" onClick={handleSubmit} variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"

              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#172554' }}
            >
              {isLoading?"Loading":"Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </div>
      </Container>
    </ThemeProvider>
  );
}