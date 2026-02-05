export type user = {
    id: string
    displayName: string;
    email: string;
    token: string;
    photoUrl: string;
}

export type userLogin = {
    email: string;
    password: string;
}

export type userRegister = {
    displayName: string;
    email: string;
    password: string;
    interestedIn: string;
    gender: string;
    dateOfBirth: string;
    photoUrl: string;
}