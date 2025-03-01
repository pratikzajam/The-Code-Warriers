
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    gender: "",
});

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch("https://gemify-backend.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("Registration successful! You can now log in.");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                mobileNo: "",
                gender: "",
            });
        } else {
            setMessage(data.message || "Registration failed. Try again.");
        }
    } catch (error) {
        setMessage("Network error. Please try again later.");
    }

    setLoading(false);
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
                    {["name", "email", "password", "confirmPassword", "mobileNo"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                                {field === "confirmPassword" ? "Confirm Password" : field}
                            </label>
                            <input
                                type={field.includes("password") ? "password" : field === "email" ? "email" : field === "mobileNo" ? "tel" : "text"}
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
                            <option value="" disabled>Select your gender</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Get Started"}
                    </button>
                </form>

                {message && (
                    <p className={`text-sm mt-4 text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}

                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    </>
);
};

export default Register;
