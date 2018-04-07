export interface User {
    allowContact: boolean;
    email: string;
    familyName: string;
    givenName: string;
    role: "administrator" | "contributor";
}
