'use client'
import { SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import getStripe from './utils/get-stripe';
import Image from 'next/image';

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col">
      <div
          className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#61c87e] to-[#7069d2] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="fixed inset-x-0 top-[40%] -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[180deg] bg-gradient-to-tr from-[#61c87e] to-[#7069d2] opacity-30 sm:left-[-calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

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

      <main className="flex-grow container mx-auto flex flex-col items-center justify-center text-center py-16">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/009/665/468/small/notes-illustration-3d-free-png.png"
          alt="Flashcard SaaS Logo"
          className="h-24 mb-6"
        />
        <div
          className="text-5xl font-semibold bg-gradient-to-r from-gray-800 to-indigo-600 p-4 bg-clip-text text-transparent"
          style={{ fontFamily: "'Libre Franklin'" }}
        >
          Cardify
        </div>
        <p className="text-lg font-light mb-8">
          Turn your notes into interactive flashcards instantly.
        </p>
        <div className="mt-2">
          <SignedOut>
            <a href="/sign-up" className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded mr-4">Sign Up</a>
            <a href="/sign-in" className="px-6 py-3 bg-yellow-500 border border-white text-white font-semibold rounded">Login</a>
          </SignedOut>
          <SignedIn>
            <a href="/flashcards" className="px-6 py-3 bg-yellow-500 text-blue-900 font-semibold rounded">My Cards</a>
          </SignedIn>
        </div>
      </main>

      <section className="py-16">
        {/* <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">
          <div className="text-center p-8 border-2 border-gray-400 rounded">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Flashcards</h3>
            <p>Automatically generate flashcards from your text notes using AI.</p>
          </div>
          <div className="text-center p-8 border-2 border-gray-400 rounded">
            <h3 className="text-xl font-semibold mb-4">Customizable Layouts</h3>
            <p>Tailor your flashcards to suit your learning style with various design options.</p>
          </div>
          <div className="text-center p-8 border-2 border-gray-400 rounded">
            <h3 className="text-xl font-semibold mb-4">Sync Across Devices</h3>
            <p>Access your flashcards on any device, anytime, anywhere.</p>
          </div>
        </div> */} 
    <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
        <div className="mx-auto grid gap-6 md:w-3/4  lg:grid-cols-3">
            <div className="bg-cyan-50 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 hover:scale-[1.02] transition duration-300 ease-in-out">
                <div className="space-y-4">
                <Image 
                  src="/images/geminiai.png" 
                  className="drop-shadow-md rounded-full" 
                  alt="Site Logo" 
                  width={60} 
                  height={60} 
                />

                    <h3 className="text-2xl font-semibold text-purple-900">Generative AI</h3>
                    <p className="mb-6">Automatically creates flashcards from your prompts, turning your ideas into interactive study aids with ease.</p>
                    <div  className="block font-medium text-purple-300">Know more</div>
                </div>
            </div>
            <div className="bg-cyan-50 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 hover:scale-[1.02] transition duration-300 ease-in-out">
                <div className="space-y-4">
                    <Image 
                      src="/images/adaptivity.png" 
                      className="drop-shadow-md bg-white rounded-full" 
                      alt="Site Logo" 
                      width={60} 
                      height={60} 
                    />
                    <h3 className="text-2xl font-semibold text-purple-900">Adaptive Levels</h3>
                    <p className="mb-6">Customize your learning experience with flashcards categorized into easy, medium, and hard levels based on your proficiency</p>
                    <div  className="block font-medium text-purple-300">Know more</div>

                </div>
            </div>
            <div className="bg-cyan-50 rounded-2xl shadow-xl px-8 py-12 sm:px-12 lg:px-8 hover:scale-[1.02] transition duration-300 ease-in-out">
                <div className="space-y-4">
                    <Image 
                      src="/images/firebase.png" 
                      className="drop-shadow-md bg-white rounded-full" 
                      alt="Site Logo" 
                      width={60} 
                      height={60} 
                    />
                    <h3 className="text-2xl font-semibold text-purple-900">Firestore Keep</h3>
                    <p className="mb-6">Seamlessly store and access all your generated flashcards in an organized manner with secure, cloud-based storage</p>
                    <div  className="block font-medium text-purple-300">Know more</div>
                </div>
            </div>
        </div>
    </div>
      </section>

      <section className="py-16 text-center">
        {/* <h2 className="text-3xl font-bold mb-10">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-0 justify-center">
          <div className="bg-blue-900 text-white p-8 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
            <p className="text-lg mb-4">$0 / month</p>
            <p>Basic features for casual learners.</p>
            <SignedOut>
              <a href="/sign-in" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Login</a>
            </SignedOut>
            <SignedIn>
              <a href="/flashcards" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Dashboard</a>
            </SignedIn>
          </div>
          <div className="bg-blue-900 text-white p-8 rounded shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <p className="text-lg mb-4">$10 / month</p>
            <p>Advanced features for power users.</p>
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Get Pro
            </button>
          </div>
        </div> */}
        <div className="flex flex-col items-center p-10 text-gray-700 md:p-20"> 
	<h2 className="text-2xl font-medium">Membership</h2>

	{/* <!-- Component Start --> */}
	<div className="flex flex-wrap items-center justify-center w-full max-w-4xl mt-8 ">
		<div className=" group flex flex-col flex-grow mt-8 overflow-hidden bg-white rounded-lg shadow-lg hover:scale-[1.03] transition duration-300 ease-in-out">
			<div className="flex flex-col items-center p-10 bg-yellow-100 group-hover:bg-yellow-200">
				<span className="font-semibold">Free Plan</span>
				<div className="flex items-center">
					<span className="text-3xl">$</span>
					<span className="text-5xl font-bold">0</span>
					<span className="text-2xl text-gray-500">/mo</span>
				</div>
			</div> 
			<div className="p-10">
				<ul>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Basic Features</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Generate with prompt</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Save</span>
					</li>
				</ul>
			</div>
			<div className="flex px-10 pb-10 justfy-center">
            <SignedOut>
              <a href="/sign-in" className="flex items-center bg-yellow-100 group-hover:bg-yellow-200 justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">Join Now</a>
            </SignedOut>
            <SignedIn>
              <a href="/flashcards" className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">Go to your Cards</a>
            </SignedIn>
				{/* <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">Join now</button> */}
			</div>
		</div>

		{/* <!-- Tile 2 --> */}
		<div className="group z-10 flex flex-col flex-grow mt-8 overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110 hover:scale-[1.2] transition duration-300 ease-in-out">
			<div className="flex flex-col items-center p-10 bg-orange-100 group-hover:bg-orange-200">
				<span className="font-semibold">Pro Plan</span>
				<div className="flex items-center">
					<span className="text-3xl">$</span>
					<span className="text-6xl font-bold">10</span>
					<span className="text-2xl text-gray-500">/mo</span>
				</div>
			</div>
			<div className="p-10">
				<ul>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2"> Advanced features+</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Adaptive Levels</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Generate from PDFs</span>
					</li>
				</ul>
			</div>
			<div className="flex px-10 pb-10 justfy-center">
      <button  
        onClick={handleSubmit}
        className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-orange-100 group-hover:bg-orange-200 rounded-lg"
      >
        Join now
      </button>
			</div>
		</div>

		{/* <!-- Tile 3 --> */}
		<div className="group flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg mt-8 hover:scale-[1.03] transition duration-300 ease-in-out">
			<div className="flex flex-col items-center p-10 bg-yellow-100 group-hover:bg-yellow-200">
				<span className="font-semibold">Free Plan</span>
				<div className="flex items-center">
					<span className="text-3xl">$</span>
					<span className="text-5xl font-bold">0</span>
					<span className="text-2xl text-gray-500">/mo</span>
				</div>
			</div>
			<div className="p-10">
				<ul>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Basic Features</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Generate with prompt</span>
					</li>
					<li className="flex items-center">
						<svg className="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span className="ml-2">Save</span>
					</li>
				</ul>
			</div>
			<div className="flex px-10 pb-10 justfy-center">
            <SignedOut>
              <a href="/sign-in" className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-yellow-100 group-hover:bg-yellow-200 rounded-lg">Join Now</a>
            </SignedOut>
            <SignedIn>
              <a href="/flashcards" className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-yellow-100 group-hover:bg-yellow-200 rounded-lg">Go to your Cards</a>
            </SignedIn>
			</div>
		</div>
	</div>
	{/* <!-- Component End  --> */}

</div>
      </section>

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
    </div>
  );
}
