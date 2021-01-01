import * as React from "react";
import * as yup from "yup";

import Link from "next/link";

import { useRouter } from "next/router";
import { Formik } from "formik";
import { useMutation } from "react-query";

import { talliiAPI } from "../../api";
import {LoginOperationRequest, Token} from "../../api/tallii";
import {Icon, Input, Validation} from "../../components";
import { setAuthCookies } from "../../utils";

// init the api client instance
const api = talliiAPI();

// define the validation schema
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Are you sure that is your email?")
        .required("Without your email we don't know who you are."),
    password: yup.string().required("Without your password we can't be sure its you.")
});

export const Form: React.FunctionComponent = () => {
    // init instance of router
    const router = useRouter();

    // init login mutation
    const { mutate: login, isLoading} = useMutation((request: LoginOperationRequest) => api.login.call(api, request), {
        onSuccess: (data: Token) => {
            // set the auth cookies
            setAuthCookies(data);

            // push route to home
            router.push("/prototypes");
        }
    });

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={async({ email, password }) => {
                try {
                    const request: LoginOperationRequest = {
                        loginRequest: {
                            email,
                            password
                        }
                    };

                    await login(request);
                } catch (error) {
                    console.warn(error);
                }
            }}
        >
            {(formik) => {
                const emailError = (formik.submitCount > 0 && formik.touched.email && formik.errors.email);
                const passwordError = (formik.submitCount > 0 && formik.touched.password && formik.errors.password);

                console.log(formik.isSubmitting);

                return (
                    <form onSubmit={formik.handleSubmit} className="mt-12">
                        <Validation
                            errors={
                                emailError
                                    ? formik.errors.email
                                    : undefined
                            }
                        >
                            <Input state={emailError ? "warning" : undefined} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Email" autoCapitalize="off" />

                        </Validation>
                        <Validation
                            errors={
                                passwordError
                                    ? formik.errors.password
                                    : undefined
                            }
                        >
                            <Input state={passwordError ? "warning" : undefined} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Password" type="password" />
                        </Validation>
                        <div className="flex items-center justify-end">
                            <Link href="/">
                                <p className="font-bold text-gray-50 inline text-right text-xs mt-1">Forgot password?</p>
                            </Link>
                        </div>
                        <Validation>
                            <button type="submit" className="block text-gray-900 text-sm bg-gray-50 mt-12 py-3 w-full rounded-md font-semibold flex items-center justify-center">
                                {isLoading ? <Icon.Loading /> : "Login"}
                            </button>
                        </Validation>
                    </form>
                );
            }}
        </Formik>
    );
};