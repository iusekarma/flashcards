import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';

export default function Header(){
    return (
        <header className="bg-transparent p-6 flex justify-between items-center">
        <div className="ml-10 mt-7">
          {/* Logo or Title can go here */}
        </div>
        <div className="mr-10">
          <SignedOut>
            {/* Uncomment to enable sign-in and sign-up buttons
            <a href="/sign-in" className="text-white mr-4">Login</a>
            <a href="/sign-up" className="text-white">Sign Up</a>
            */}
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    );
}