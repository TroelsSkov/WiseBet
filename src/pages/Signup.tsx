import { apiService } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import wisebetLogo from "../assets/wisebet.png"
import { useState } from "react";
import { toast } from "react-toastify";
import {useUser} from "../context/UserContext";

function Signup() {
    const { refreshUser } = useUser();
    const navigate = useNavigate();
    const notify = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    function handleSignup(e: React.SubmitEvent) {
        e.preventDefault();

        apiService.post("/Api/Users/Auth/Register", { userName: username, password: password, fullName: fullName })
            .then(async ({ error }) => {
                if (error) {
                    console.error("Signup failed:", error);
                    notifyError("Signup failed: " + error);
                    return;
                }
                await refreshUser();
                // Login after account creation
                handleLogin();
            });
    }

    function handleLogin() {
        apiService.post("/Api/Users/Auth/Login", { userName: username, password: password })
            .then(({ error, data }) => {
                if (error) {
                    console.error("Login failed:", error);
                    notifyError("Login failed: " + error);
                    return;
                }

                notify("Login successful!");
                console.log("Login successful:", data);
                navigate("/");
            });
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src={wisebetLogo} alt="WiseBet" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Opret konto</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignup} method="POST" className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="full-name" className="block text-sm/6 font-medium text-gray-100">Fulde navn</label>
                            </div>
                            <div className="mt-2">
                                <Input onChange={e => setFullName(e.target.value)} id="full-name" type="text" name="full-name" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">Brugernavn</label>
                            <div className="mt-2">
                                <Input onChange={e => setUsername(e.target.value)} id="username" type="text" name="username" required />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Adgangskode</label>
                            </div>
                            <div className="mt-2">
                                <Input onChange={e => setPassword(e.target.value)} id="password" type="password" name="password" required />
                            </div>
                        </div>
                        <div>
                            <Button color="indigo">Opret konto</Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Har du allerede en bruger?&nbsp;
                        <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">Log ind</Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default Signup
