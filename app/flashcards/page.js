'use client';
// import db from "@/firebase";
// import { useUser } from "@clerk/nextjs";
// import { collection, doc, getDoc, setDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardActionArea, Typography, Grid, Button, Box } from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useClerk } from "@clerk/nextjs";

// export default function Flashcards() {
//     const { isLoaded, isSignedIn, user } = useUser();
//     const { signOut } = useClerk();
//     const [flashcards, setFlashcards] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         async function getFlashcards() {
//             if (!user) return;
//             const docRef = doc(collection(db, 'users'), user.id);
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 const collections = docSnap.data().flashcardSets || [];
//                 setFlashcards(collections);
//             } else {
//                 await setDoc(docRef, { flashcardSets: [] });
//             }
//         }
//         getFlashcards();
//     }, [user]);

//     if (!isLoaded || !isSignedIn) {
//         return null;
//     }

//     const handleCardClick = (flashcard) => {
//         router.push(`/flashcard?id=${flashcard}`);
//     };

//     const handleGenerateClick = () => {
//         router.push('/generate');
//     };

//     const handleLogOut = async () => {
//         await signOut(); // Directly call signOut from useClerk
//         router.push('/'); // Redirect to home page after logging out
//     };

//     return (
//         <Grid
//             container
//             spacing={4}
//             sx={{
//                 padding: 4,
//                 background: `linear-gradient(135deg, #a2c2e0, #d0e3f0)`, // Light blue gradient background
//                 minHeight: '100vh',
//                 color: '#333', // Dark text color for contrast
//                 position: 'relative', // To position the logout button absolutely
//             }}
//         >
//             {/* Log Out Button */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: 60, // Increased top position for visibility
//                     left: 40,
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
//                 <Button
//                     onClick={handleLogOut}
//                     sx={{
//                         color: '#ffffff',
//                         padding: 0,
//                         minWidth: 'auto', // Adjust button width
//                         textTransform: 'none', // Prevent uppercase transformation
//                     }}
//                 >
//                     Log Out
//                 </Button>
//             </Box>

//             <Grid item xs={12}>
//                 <Box sx={{ textAlign: 'center', mb: 0.5 }}> {/* Reduced margin-bottom */}
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         onClick={handleGenerateClick}
//                     >
//                         Generate Flashcard
//                     </Button>
//                 </Box>
//             </Grid>
//             {flashcards.map((flashcard, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                     <Card
//                         sx={{
//                             borderRadius: 2,
//                             boxShadow: 3,
//                             transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                             '&:hover': {
//                                 transform: 'scale(1.05)',
//                                 boxShadow: 6,
//                             },
//                             backgroundColor: '#ffffff', // Light card background
//                             color: '#333', // Dark text color on cards
//                         }}
//                     >
//                         <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
//                             <CardContent>
//                                 <Typography
//                                     variant="h6"
//                                     component="div"
//                                     sx={{ textAlign: 'center', fontWeight: 'bold' }}
//                                 >
//                                     {flashcard.name}
//                                 </Typography>
//                             </CardContent>
//                         </CardActionArea>
//                     </Card>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// }
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { AppBar, Toolbar, Box, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';

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
        await signOut();
        router.push('/');
    };

    const colorArray = [
        'bg-red-200', 
        'bg-green-200',
        'bg-blue-200', 
        'bg-yellow-200',
        'bg-purple-200'
      ];
    const bordercolorArray = [
    'border-red-300', 
    'border-green-300',
    'border-blue-300', 
    'border-yellow-300',
    'border-purple-300'
    ];

    return (
        <>
        <AppBar position="fixed" 
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
        <div className="flex flex-col justify-around p-4 mt-20  h-screen text-gray-800 relative">
            <div className="flex justify-center items-center gap-4">
                {flashcards.map((flashcard, index) => (
                    <div
                        key={index}
                        className={ `${colorArray[index % colorArray.length]} hover:border hover:border-2 hover:border-solid hover:${bordercolorArray[index % bordercolorArray.length]} flex justify-center items-center p-4 rounded-lg shadow-lg h-40 w-60 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
                        onClick={() => handleCardClick(flashcard.name)}
                    >
                        <h3 className="text-center text-xl font-bold">{flashcard.name}</h3>
                    </div>
                ))}
               
            </div>
            <div className="text-center m-4">
                <button
                    onClick={handleGenerateClick}
                    className="bg-amber-500 text-white text-lg  px-6 py-3 rounded-lg shadow-md hover:bg-amber-600"
                >
                    Generate Flashcard
                </button>
            </div>
        </div>
        </>
    );
}
