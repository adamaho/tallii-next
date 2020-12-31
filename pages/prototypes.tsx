import * as React from "react";

import Head from 'next/head'
import Link from "next/link";

export default function Prototypes() {

    const [pressed, setPressed] = React.useState(false);

    return (
        <div className="h-full w-full p-4">
            <Head>
                <title>adamaho</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="mb-8">
                <div className="text-gray-50">{"<"}</div>
            </div>
            <div className="flex items-start justify-between">
                <div className="flex items-center justify-center h-16 w-16 bg-yellow-100 rounded-full shadow-lg">
                    <p className="text-lg">😀️</p>
                </div>
                <button className="bg-blue-500 text-gray-50 px-4 py-2 text-sm font-semibold rounded-md">Follow</button>
            </div>
            <div>
                <h1 className="text-gray-50 font-bold text-3xl mt-2">adamaho</h1>
                <p className="text-gray-50 text-sm mt-2">This is my chirp, taunt, bio thing.</p>
                <Link href="/following">
                    <div  className="flex items-center mt-2">
                        <p className="text-gray-50 font-bold text-sm">5</p>
                        <p className="text-gray-500 text-sm ml-1">Following</p>
                        <p className="text-gray-50 font-bold text-sm ml-2">50</p>
                        <p className="text-gray-500 text-sm ml-1">Followers</p>
                    </div>
                </Link>
            </div>
            <div className="mt-6">
                <button onTouchMove={() => setPressed(false)} className={`transition-transform duration-200 ease-in-out w-full text-left bg-gray-800 p-4 rounded-2xl mb-4 ${pressed ? "transform scale-95" : ""}`} onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}>
                    <div className="mb-6">
                        <p className="text-gray-500 text-sm">bryanne</p>
                        <h3 className="text-gray-50 font-bold text-xl">Backgammon</h3>
                        <p className="text-gray-50 text-sm">This is the description of the event.</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8 bg-yellow-100 rounded-full shadow">
                            <p className="text-xs">😀️</p>
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 bg-red-100 rounded-full shadow -ml-2">
                            <p className="text-xs">😍️</p>
                        </div>
                    </div>
                </button>
                <button onTouchMove={() => setPressed(false)} className={`transition-transform duration-200 ease-in-out w-full text-left bg-gray-800 p-4 rounded-2xl mb-4 ${pressed ? "transform scale-95" : ""}`} onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}>
                    <div className="mb-6">
                        <p className="text-gray-500 text-sm">bryanne</p>
                        <h3 className="text-gray-50 font-bold text-xl">Backgammon</h3>
                        <p className="text-gray-50 text-sm">This is the description of the event.</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8 bg-yellow-100 rounded-full shadow">
                            <p className="text-xs">😀️</p>
                        </div>
                        <div className="flex items-center justify-center h-8 w-8 bg-red-100 rounded-full shadow -ml-2">
                            <p className="text-xs">😍️</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}