import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function CreateAccount() {
    const navi = useNavigate();
    
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:2222/user/signup",data);

            if (res.data.status === 400) {
                toast.error(res.data.message);
            } else {
                toast.success("Account Created Successfully");
                navi("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <main>
                <h1>Create an Account</h1>

                <form onSubmit={handleSubmit} autoComplete="on" noValidate>

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone No</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        required
                    />

                    <p>
                        <button type="submit">Create Account</button>
                    </p>

                </form>
            </main>
        </>
    );
}

export default CreateAccount;
