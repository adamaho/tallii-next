import * as React from "react";
import * as yup from "yup";

import Link from "next/link";

import { Formik } from "formik";
import { useMutation } from "react-query";
import { talliiAPI } from "../../api";
import {LoginOperationRequest} from "../../api/tallii";
import {Input, Validation} from "../../components";

// init the api client instance
const api = talliiAPI();

// define the validation schema
const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Maybe you should try that again.")
        .required("Maybe you should try entering an email."),
    password: yup.string().required("Maybe you should try entering a password")
});

export const Form: React.FunctionComponent = () => {

    const { mutate: login } = useMutation((request: LoginOperationRequest) => api.login.call(api, request), {
        onSuccess: (data) => {
            setResponse(JSON.stringify(data));
        }
    });

    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [response, setResponse] = React.useState<string>("");

    const handleLogin = React.useCallback(async () => {
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
    }, [email, password]);

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit} className="mt-12">
                        <Validation>
                            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoCapitalize={"none"}/>
                        </Validation>
                        <Validation>
                            <Input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                        </Validation>
                        <Link href="/">
                            <p className="font-bold text-gray-50 text-right text-xs mt-1">Forgot password?</p>
                        </Link>
                        <Validation errors={response}>
                            <button onClick={handleLogin} type="submit" className="block text-gray-900 bg-gray-50 mt-12 py-2 w-full rounded-md font-semibold">Login</button>
                        </Validation>
                    </form>
                )
            }}
        </Formik>
    );
};