export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} e-mail is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with ID ${userId} not found`)
        this.name = 'UserNotFoundError'
    }
}