export const usernameValidate = {
    required: {
        value: true,
        message: "Please enter username"
    },
    minLength: {
        value: 6,
        message: "User must be at least 6 characters long"
    },
    pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: "user must be alphanumeric"
    }
}

export const emailValidate = {
    required: {
        value: true,
        message: "please enter an email address"
    },
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "email address is not valid"
    }
}

export const passwordValidate = {
    required: {
        value: true,
        message: "please enter a password"
    },
    minLength:{
        value: 6,
        message: "password must be at least 6 characters long"
    }

}