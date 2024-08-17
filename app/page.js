// pages/index.js
'use client'
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import getStripe from './utils/get-stripe';
import { Fullscreen } from '@mui/icons-material';

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(133deg,#000000,#000000, #006573, #00124d, #000000, #000000)`,
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 20s ease infinite',
        minHeight: '100vh',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
        color: '#f5f5f5',
        backdropFilter: 'blur(10px)'
      }}

    >
      <AppBar position="static" 
      sx={{
        backgroundColor: 'transparent', // Remove background color
        boxShadow: 'none' // Optionally remove shadow if desired
      }}>
        <Toolbar>
          <Box style={{ flexGrow: 1, marginTop: '30px', marginLeft: '40px' }}>
            {/* Flashcard SaaS */}
            {/* <img
              src="https://static.vecteezy.com/system/resources/thumbnails/009/665/468/small/notes-illustration-3d-free-png.png"
              alt="Flashcard SaaS Logo"
              style={{ height: '50px', flexGrow: 1 }} // Adjust height as needed
            /> */}
          </Box>
          <SignedOut>
            {/* <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button> */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            py: 8,
            color: 'white', // Ensure text is readable on the gradient
          }}
        >
          <img
              src="https://static.vecteezy.com/system/resources/thumbnails/009/665/468/small/notes-illustration-3d-free-png.png"
              alt="Flashcard SaaS Logo"
              style={{ height: '100px'}} // Adjust height as needed
            />
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'Lato, sans-serif' }} >
            Cardify
          </Typography>
          <Typography paragraph sx={{ color: 'white',fontFamily: '"Segoe UI Emoji"',fontSize: '20px' }}>
            Turn your notes into interactive flashcards instantly.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <SignedOut>
              <Button href='/sign-up' variant="contained"  size="large" sx={{ mr: 2, backgroundColor: 'yellow', color:'blue' }}>
                Sign Up
              </Button>
              <Button href='/sign-in' variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white' }}>
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              
              <Button href='/flashcards' variant="contained" size="large" sx={{ mr: 2, backgroundColor: 'yellow', color:'blue' }}>
                My Cards
              </Button>
            </SignedIn>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ marginBottom: 8 }}>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" padding={8} sx={{ border: '2px solid grey' }} >
                <Typography variant="h6" gutterBottom>
                  AI-Powered Flashcards
                </Typography>
                <Typography color="textSecondary" sx={{ color: 'white'}}>
                  Automatically generate flashcards from your text notes using AI.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" padding={8} sx={{ border: '2px solid grey' }}>
                <Typography variant="h6" gutterBottom>
                  Customizable Layouts
                </Typography>
                <Typography color="textSecondary" sx={{ color: 'white'}}>
                  Tailor your flashcards to suit your learning style with various design options.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center" padding={8}  sx={{ border: '2px solid grey', height: 'full', borderBlockStyle: 'round' }}>
                <Typography variant="h6" gutterBottom>
                  Sync Across Devices
                </Typography>
                <Typography color="textSecondary" sx={{ color: 'white'}}>
                  Access your flashcards on any device, anytime, anywhere, anytime, anywhere.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom marginBottom={8} >
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: '#154c79', // Blue background color for the card
                  color: 'white', // White text for contrast
                  boxShadow: 3, // Optional: Card shadow for depth
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Free Plan
                  </Typography>
                  <Typography variant="h6">$0 / month</Typography>
                  <Typography color="inherit" paragraph>
                    Basic features for casual learners.
                  </Typography>
                  <SignedOut>
                    <Button href='/sign-in'
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: '#1976d2', // Blue color for the button
                        color: 'white', // White text for contrast
                        '&:hover': {
                          bgcolor: '#1565c0', // Darker blue for hover effect
                        },
                      }}
                    >
                      Login
                    </Button>
                  </SignedOut>
                  <SignedIn>
                    <Button href='/flashcards'
                      variant="contained"
                      sx={{
                        mt: 2,
                        bgcolor: '#1976d2', // Blue color for the button
                        color: 'white', // White text for contrast
                        '&:hover': {
                          bgcolor: '#1565c0', // Darker blue for hover effect
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                  </SignedIn>

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: '#154c79', // Blue background color for the card
                  color: 'white', // White text for contrast
                  boxShadow: 3, // Optional: Card shadow for depth
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Pro Plan
                  </Typography>
                  <Typography variant="h6">$10 / month</Typography>
                  <Typography color="inherit" paragraph>
                    Advanced features for power users.
                  </Typography>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: '#1976d2', // Blue color for the button
                      color: 'white', // White text for contrast
                      '&:hover': {
                        bgcolor: '#1565c0', // Darker blue for hover effect
                      },
                    }}
                  >
                    Get Pro
                  </Button>

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

      </Container>

      {/* Add the keyframes for gradient animation */}
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Box>
  );
}
