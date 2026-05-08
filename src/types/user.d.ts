interface UserLoginRequest {
    username: string;
    password: string;
}

interface UserRegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
}

interface User {
    username: string;
    FullName: string;
    balance: number;
}

export { UserLoginRequest, UserRegisterRequest, User };