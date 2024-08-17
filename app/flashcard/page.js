// 'use client';
// import db from "@/firebase";
// import { useUser } from "@clerk/nextjs";
// import { collection, doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardActionArea, Typography, Box, IconButton, Paper } from "@mui/material";
// import { ArrowBack, ArrowForward, ArrowBackIosNew } from '@mui/icons-material';
// import { useSearchParams, useRouter } from "next/navigation";

// export default function Flashcards() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const [flashcards, setFlashcards] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [flipped, setFlipped] = useState(false);

//     const searchParams = useSearchParams();
//     const id = searchParams.get('id');
//     const router = useRouter();

//     useEffect(() => {
//         async function getFlashcard() {
//             if (!id || !user) return;
        
//             const docRef = doc(collection(doc(collection(db, 'users'), user.id), 'flashcardSets'), id);
//             const docs = await getDoc(docRef);
//             const flashcards = [];
//             docs.data().flashcards.forEach((flashcard) => {
//                 flashcards.push(flashcard);
//             });
//             setFlashcards(flashcards);
//             setCurrentIndex(0);  // Start with the first flashcard
//             setFlipped(false);  // Ensure the card is not flipped initially
//         }
//         getFlashcard();
//     }, [id, user]);

//     const handleNext = () => {
//         setFlipped(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     const handlePrevious = () => {
//         setFlipped(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     const handleCardClick = () => {
//         setFlipped(!flipped);
//     };

//     const handleBackToFlashcards = () => {
//         router.push('/flashcards'); // Update the path to your Flashcards page
//     };

//     if (!isLoaded || !isSignedIn || flashcards.length === 0) {
//         return null;
//     }

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 minHeight: '100vh',
//                 textAlign: 'center',
//                 position: 'relative',
//                 padding: 2,
//                 backgroundColor: '#f0f4f8', // Background color to match the previous page
//             }}
//         >
//             {/* Back to Flashcards Button */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: 16,
//                     right: 16,
//                     backgroundColor: '#007bff', // Blue background color
//                     color: '#ffffff', // Text color
//                     borderRadius: 4, // Rounded corners
//                     padding: '8px 16px', // Padding for button
//                     display: 'flex',
//                     alignItems: 'center',
//                     boxShadow: 3,
//                     '&:hover': {
//                         backgroundColor: '#0056b3', // Darker blue on hover
//                     },
//                 }}
//             >
//                 <IconButton
//                     onClick={handleBackToFlashcards}
//                     sx={{
//                         color: '#ffffff',
//                         padding: 0,
//                     }}
//                 >
//                     <ArrowBackIosNew />
//                 </IconButton>
//                 <Typography sx={{ ml: 1, fontWeight: 'bold' }}>Back to Flashcards</Typography>
//             </Box>

//             {/* Card Display */}
//             <Card sx={{ maxWidth: 600, minHeight: 200 }}>
//                 <CardActionArea onClick={handleCardClick}>
//                     <CardContent>
//                         <Typography variant="h5">
//                             {flipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
//                         </Typography>
//                     </CardContent>
//                 </CardActionArea>
//             </Card>

//             {/* Navigation Box */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     bottom: 16,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     width: '100%',
//                     maxWidth: 600,
//                 }}
//             >
//                 <Paper
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: 1,
//                         borderRadius: 2,
//                         boxShadow: 2,
//                         backgroundColor: '#76b7e6', // Light blue background color for "Previous"
//                     }}
//                 >
//                     <IconButton onClick={handlePrevious} disabled={flashcards.length <= 1}>
//                         <ArrowBack />
//                     </IconButton>
//                     <Typography sx={{ mx: 1 }}>Previous</Typography>
//                 </Paper>

//                 <Paper
//                     sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: 1,
//                         borderRadius: 2,
//                         boxShadow: 2,
//                         backgroundColor: '#23b51d', // Light green background color for "Next"
//                     }}
//                 >
//                     <Typography sx={{ mx: 1 }}>Next</Typography>
//                     <IconButton onClick={handleNext} disabled={flashcards.length <= 1}>
//                         <ArrowForward />
//                     </IconButton>
//                 </Paper>
//             </Box>
//         </Box>
//     );
// }
'use client';
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getFlashcard() {
            if (!id || !user) return;

            const docRef = doc(collection(doc(collection(db, 'users'), user.id), 'flashcardSets'), id);
            const docs = await getDoc(docRef);
            const flashcards = [];
            docs.data().flashcards.forEach((flashcard) => {
                flashcards.push(flashcard);
            });
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

    const handleBackToFlashcards = () => {
        router.push('/flashcards'); // Update the path to your Flashcards page
    };

    if (!isLoaded || !isSignedIn || flashcards.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center relative p-4 bg-gray-100">

            <div onClick={handleBackToFlashcards} className="absolute top-4 right-4 bg-amber-400 text-white rounded px-4 py-2 flex items-center shadow-md hover:bg-amber-500 cursor-pointer">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span className="font-bold">Back to My Cards</span>
            </div>

            {/* Card Display */}
            <div className="perspective-1000">
                <div 
                    onClick={handleCardClick} 
                    className={`flex justify-center items-center flex-wrap max-w-md min-h-[200px] bg-white p-4 pl-8 lr-8 rounded-lg shadow-md cursor-pointer transform transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
                >
                    <p className="text-xl">
                        {flipped ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                    </p>
                </div>
            </div>

            {/* Navigation Box */}
            <div className="absolute mb-10 bottom-4 flex justify-between w-full max-w-md">
                <div className="flex items-center bg-gray-500 text-white rounded-lg px-3 py-2 shadow-md">
                    <button onClick={handlePrevious} disabled={flashcards.length <= 1} className="focus:outline-none">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center  justify-center bg-amber-500 text-white rounded-lg py-2 px-3 shadow-md">
                    <button onClick={handleNext} disabled={flashcards.length <= 1} className="focus:outline-none">
                        <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
