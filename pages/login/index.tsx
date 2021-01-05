import * as React from "react";

import Head from "next/head";
import Link from "next/link";

import { LogoSmall } from "../../design-system/primitive/icons/LogoSmall";
import { Form } from "./_loginForm";

export default function Login() {
    return (
        <div className="view flex flex-col justify-between">
            <Head>
                <title>Tallii - Login</title>
            </Head>

            <div className="mt-10">
                <LogoSmall />
                <h1 className="text-gray-50 font-bold text-4xl mt-3">Login</h1>
                <p className="text-gray-500 mt-1">
                    What is your email and password?
                </p>
                <Form />
            </div>
            <p className="text-center text-gray-50 text-xs mb-12">
                Don't have an account?{" "}
                <Link href="/signup">
                    <strong>Signup</strong>
                </Link>
            </p>
        </div>
    );
}
