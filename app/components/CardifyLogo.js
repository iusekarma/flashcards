export default function CardifyLogo() {
    return(
        <div className="flex items-center justify-center -mx-6 px-6 py-4">
            <a href="/" title="home">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/665/468/small/notes-illustration-3d-free-png.png" className="w-10" alt="tailus logo" /> 
            </a>
            <div
            className="text-3xl font-semibold bg-gradient-to-r from-gray-800 to-indigo-600 pl-2 p-4 bg-clip-text text-transparent"
            style={{ fontFamily: "'Libre Franklin'" }}
            >
            Cardify
            </div>
        </div>
    )
}