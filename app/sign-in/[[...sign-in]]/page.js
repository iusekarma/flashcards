import { SignIn } from '@clerk/nextjs';
import { Box } from '@mui/material';

export default function Page() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <SignIn />
    </Box>
  );
}