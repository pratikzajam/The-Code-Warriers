import React, { useState } from "react";

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <>
            <h1 className="flex text-3xl font-bold pt-9 pb-5 items-center justify-center bg-gray-100">
                Register to Gamify Wellness!
            </h1>

            <p className="text-xl pb-6 text-gray-500 text-center bg-gray-100">Start your wellness journey today</p>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['username', 'email', 'password', 'age', 'phone'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                                    {field}
                                </label>
                                <input
                                    type={field === 'password' ? 'password' : field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                                    id={field}
                                    name={field}
                                    placeholder={`Enter your ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>
                                    Select your gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Get Started
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Already have an account? <a href="#" className="text-blue-500 hover:underline">Log in</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Registration;
