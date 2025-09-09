export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} e-mail is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}