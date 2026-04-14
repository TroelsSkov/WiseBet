interface UserLoginRequest {
    username: string;
    password: string;
}

interface UserRegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
}

export { UserLoginRequest, UserRegisterRequest };