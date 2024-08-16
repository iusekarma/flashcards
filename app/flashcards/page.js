'use client';
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea, Typography, Grid, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return;
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcardSets || [];
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcardSets: [] });
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    const handleCardClick = (flashcard) => {
        router.push(`/flashcard?id=${flashcard}`);
    };

    const handleGenerateClick = () => {
        router.push('/generate');
    };

    const handleLogOut = async () => {
        await signOut(); // Directly call signOut from useClerk
        router.push('/'); // Redirect to home page after logging out
    };

    return (
        <Grid
            container
            spacing={4}
            sx={{
                padding: 4,
                background: `linear-gradient(135deg, #a2c2e0, #d0e3f0)`, // Light blue gradient background
                minHeight: '100vh',
                color: '#333', // Dark text color for contrast
                position: 'relative', // To position the logout button absolutely
            }}
        >
            {/* Log Out Button */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 60, // Increased top position for visibility
                    left: 40,
                    backgroundColor: '#007bff', // Blue background color
                    color: '#ffffff', // Text color
                    borderRadius: 4, // Rounded corners
                    padding: '8px 16px', // Padding for button
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: '#0056b3', // Darker blue on hover
                    },
                }}
            >
                <Button
                    onClick={handleLogOut}
                    sx={{
                        color: '#ffffff',
                        padding: 0,
                        minWidth: 'auto', // Adjust button width
                        textTransform: 'none', // Prevent uppercase transformation
                    }}
                >
                    Log Out
                </Button>
            </Box>

            <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', mb: 0.5 }}> {/* Reduced margin-bottom */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleGenerateClick}
                    >
                        Generate Flashcard
                    </Button>
                </Box>
            </Grid>
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                            backgroundColor: '#ffffff', // Light card background
                            color: '#333', // Dark text color on cards
                        }}
                    >
                        <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ textAlign: 'center', fontWeight: 'bold' }}
                                >
                                    {flashcard.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
