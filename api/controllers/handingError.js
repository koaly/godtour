class Exception {
    constructor(name, status, message) {
        this.name = name;
        this.status = status
        this.message = message
    }
}
class NotFoundException extends Exception {
    constructor(obj) {
        super("errors", 404, `${obj} is not found`)
    }
}
class EmailAlreadyExits extends Exception {
    constructor() {
        super("errors", 409, "email is already exits")
    }
}