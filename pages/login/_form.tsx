import * as React from "react";

import Link from "next/link";

export const Form: React.FunctionComponent = () => {
    return (
        <div className="mt-12">
            <input className="w-full bg-gray-700 border border-solid border-gray-600 focus:outline-none text-gray-50 p-2 placeholder-gray-500 shadow-none" placeholder="Email" autoCapitalize={"none"}/>
            <input className="w-full bg-gray-700 border border-solid border-gray-600 focus:outline-none text-gray-50 p-2 placeholder-gray-500 shadow-none mt-4" placeholder="Password" type="password" />
            <Link href="/">
                <p className="font-bold text-gray-50 text-right mt-1">Forgot password?</p>
            </Link>
            <button className="block text-gray-900 bg-gray-50 mt-12 py-2 w-full rounded-md font-semibold">Login</button>
        </div>
    );
};