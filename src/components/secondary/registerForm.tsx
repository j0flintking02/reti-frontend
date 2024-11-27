import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useState } from "react";


const RegisterForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-2">
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Full name</label>
                        <div className="mt-2">
                            <Input
                                placeholder="Enter your full name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <Input
                                placeholder="Enter your email"
                                type="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div className="mt-2">
                            <Input
                                placeholder="Enter password"
                                type={passwordVisible ? "text" : "password"}
                                suffix={
                                    passwordVisible ? (
                                        <EyeOutlined className='text-gray-400' onClick={() => setPasswordVisible(false)} />
                                    ) : (
                                        <EyeInvisibleOutlined className='text-gray-400' onClick={() => setPasswordVisible(true)} />
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Confirm password</label>
                        <div className="mt-2">
                            <Input
                                placeholder="Confirm password"
                                type={confirmPasswordVisible ? "text" : "password"}
                                suffix={
                                    confirmPasswordVisible ? (
                                        <EyeOutlined className='text-gray-400'
                                            onClick={() => setConfirmPasswordVisible(false)} />
                                    ) : (
                                        <EyeInvisibleOutlined className='text-gray-400' onClick={() => setConfirmPasswordVisible(true)} />
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="text-sm py-4">
                        <Checkbox >Remember me</Checkbox>

                    </div>

                    <div>
                        <Button type="primary" className="flex w-full justify-center px-3 py-4 text-sm/6 font-semibold text-white">Sign up</Button>
                    </div>
                    <div>
                        <Button className="flex items-center w-full justify-center px-3 py-4 text-sm font-semibold  text-gray-700 hover:bg-gray-100">
                            <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.28 0 6.11 1.14 8.39 3.02l6.24-6.24C34.83 2.34 29.67 0 24 0 14.75 0 7.1 5.6 4.07 13.57l7.47 5.8C13.6 13.26 18.5 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M47.53 24.5c0-1.3-.11-2.47-.3-3.65H24v7.3h13.43c-.56 2.9-2.2 5.35-4.8 6.98l7.47 5.8C44.65 36.86 47.53 31.1 47.53 24.5z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.47 28.43c-.85-1.34-1.34-2.9-1.34-4.43 0-1.53.49-3.09 1.34-4.43l-7.47-5.8C1.09 17.68 0 20.53 0 24c0 3.47 1.09 6.32 3 8.23l7.47-5.8z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c5.67 0 10.83-1.86 14.43-5.05l-7.47-5.8c-2.02 1.32-4.55 2.13-6.96 2.13-5.5 0-10.4-3.76-12.22-8.87l-7.47 5.8C7.1 42.4 14.75 48 24 48z"
                                />
                            </svg>
                            Sign up with Google
                        </Button>
                    </div>

                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account? {''}
                    <a href="#" className="text-[#5B9BD5] hover:text-[#5B9BD5] hover:underline">Sign in</a>
                </p>
            </div>
        </>
    )
}

export default RegisterForm;