import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { LogoLarge } from "../design-system/primitive/icons/LogoLarge";

export default function Welcome() {
    return (
        <div>
            <Head>
                <title>Tallii - Welcome</title>
            </Head>

            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-center mt-8">
                    <LogoLarge />
                </div>
                <div className="mb-10">
                    <h1 className="text-gray-50 text-4xl font-bold">Welcome</h1>
                    <p className="text-gray-500 text-md mt-1">
                        Ready to keep score?
                    </p>
                    <Link href="/login">
                        <button className="text-gray-900 bg-gray-50 mt-12 py-2 w-full rounded-md font-semibold">
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
