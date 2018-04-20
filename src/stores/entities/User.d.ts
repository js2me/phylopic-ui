export interface User {
    readonly allowContact: boolean;
    readonly email: string;
    readonly familyName: string;
    readonly givenName: string;
    readonly role: "administrator" | "contributor";
}
