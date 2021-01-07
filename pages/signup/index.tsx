import * as React from "react";

import Head from "next/head";
import Link from "next/link";

import { LogoSmall } from "../../design-system/primitive/icons/LogoSmall";

export default function Signup() {
    return (
        <div className="view">
            <Head>
                <title>Tallii - Signup</title>
            </Head>

            <div className="mt-10">
                <h1 className="text-gray-50 font-bold text-4xl mt-3">Signup</h1>
                <p className="text-gray-500 mt-1">Let's get started.</p>
            </div>
            <p className="text-center text-gray-50">
                Already have an account?{" "}
                <Link href="/login">
                    <strong>Login</strong>
                </Link>
            </p>
        </div>
    );
}
