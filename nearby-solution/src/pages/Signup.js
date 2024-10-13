import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/context";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import connectionString from "../components/connectionString";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Oauth from "../components/oauth";

export default function Signup() {
  const {handleCurrentUser} = useContext(authContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      // console.log(JSON.stringify)
      const result = await fetch(`${connectionString}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await result.json();
      console.log(data);
      setError(false);
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      handleCurrentUser(data);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  // console.log(form);
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  onChange={handleChange}

                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}

                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}

                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: '#172554' }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </div>
      </Container>
    </ThemeProvider>
  );
}