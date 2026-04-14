import { useApi } from "../services/useApi";
import { apiService } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import wisebetLogo from "../assets/wisebet.png"

function Login() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/");
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src={wisebetLogo} alt="WiseBet" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Log ind</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">Brugernavn</label>
                            <div className="mt-2">
                                <Input id="username" type="text" name="username" required />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Adgangskode</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">Glemt adgangskode?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input id="password" type="password" name="password" required  />
                            </div>
                        </div>

                        <div>
                            <Button color="indigo">Log ind</Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Har du ikke en bruger?&nbsp;
                        <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300">Opret konto</Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default Login
