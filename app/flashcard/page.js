'use client';
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardContent, CardActionArea, Typography, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useSearchParams } from "next/navigation";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
            if (!id || !user) return
        
            const docRef = doc(collection(doc(collection(db, 'users'), user.id),'flashcardSets'), id)
            console.log(docRef)
            const docs = await getDoc(docRef)
            const flashcards = []
            docs.data().flashcards.forEach((flashcard) => {
              flashcards.push(flashcard)
            })
            setFlashcards(flashcards);
            setCurrentIndex(0);  // Start with the first flashcard
            setFlipped(false);  // Ensure the card is not flipped initially
        }
        getFlashcard();
    }, [id, user]);

    const handleNext = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    if (!isLoaded || !isSignedIn || flashcards.length === 0) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                position: 'relative',
                padding: 2,
            }}
        >
            {/* Card Display */}
            <Card sx={{ maxWidth: 600, minHeight: 200 }}>
                <CardActionArea onClick={handleCardClick}>
                    <CardContent>
                        <Typography variant="h5">
                            {flipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Navigation Buttons */}
            <Box sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
                <IconButton onClick={handlePrevious} disabled={flashcards.length <= 1}>
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
                <IconButton onClick={handleNext} disabled={flashcards.length <= 1}>
                    <ArrowForward />
                </IconButton>
            </Box>
        </Box>
    );
}
