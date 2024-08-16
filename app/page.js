// pages/index.js
'use client'
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import getStripe from './utils/get-stripe';

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
        background: `linear-gradient(135deg, #b8860b, #5a189a, #9b2226, #c2185b)`, // Deep gold, dark violet, deep red, and rich pink
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
        minHeight: '100vh',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)', // Adds a subtle depth for a more metallic look
        color: '#f5f5f5', // Light text color to contrast with the deep background
      }}

    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
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
          <Typography variant="h2" component="h1" gutterBottom>
            Flashcard Builder
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Turn your notes into interactive flashcards instantly.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <SignedOut>
              <Button href='/sign-up' variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                Sign Up
              </Button>
              <Button href='/sign-in' variant="outlined" color="primary" size="large">
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              <Typography variant="p" color="textSecondary" sx={{ mr: 1 }}>
                Go to your
              </Typography>
              <Button href='/flashcards' variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
                Dashboard
              </Button>
            </SignedIn>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  AI-Powered Flashcards
                </Typography>
                <Typography color="textSecondary">
                  Automatically generate flashcards from your text notes using AI.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Customizable Layouts
                </Typography>
                <Typography color="textSecondary">
                  Tailor your flashcards to suit your learning style with various design options.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Sync Across Devices
                </Typography>
                <Typography color="textSecondary">
                  Access your flashcards on any device, anytime, anywhere.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
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
