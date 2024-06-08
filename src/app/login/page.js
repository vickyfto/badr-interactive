"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import FacebookLogin from 'react-facebook-login';

const AuthWithFacebook = (props) => {
    const router = useRouter()
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    })

    const handleFacebookCallback = (response) => {
        console.log('response:', response)
        if (response?.status === "unknown") {
            alert('Something went wrong with facebook Login')
            console.error('Sorry!', 'Something went wrong with facebook Login.');
            return;
        }
        localStorage.setItem("auth_fb", JSON.stringify(response))
        router.push("/")
    }

    const handleOnChange = (e) => {
        const { value, name } = e.target
        setDataForm((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("manual_auth", JSON.stringify(dataForm))
        router.push("/")
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleOnChange} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleOnChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <div className="flex flex-col text-gray-600">
                                    <div className="flex justify-center z-50 font-bold">
                                        OR
                                    </div>
                                    <div className="bg-slate-100" style={{ zIndex: "1", height: "3px", marginTop: "-12px" }}></div>
                                    <div className="flex justify-center mt-5">
                                        <FacebookLogin
                                            buttonStyle={{ padding: "6px", borderRadius: "8px" }}
                                            appId="823273732592420"  // we need to get this from facebook developer console by setting the app.
                                            autoLoad={false}
                                            fields="name,email"
                                            textButton="Login with Facebook"
                                            callback={handleFacebookCallback} />
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default AuthWithFacebook