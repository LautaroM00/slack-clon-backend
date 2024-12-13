export const validateEmail = (field_name, email) => {

    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    return regex.test(email) ? '' : 'El valor ingresado no es un email válido.'
}

export const validateLength = (field_name, value) => {

    if (field_name === 'name') {

        return String(value).length >= 5 ? '' : 'El nombre debe tener 5 caracteres o más.'

    }
    if (field_name === 'password') {

        return String(value).length >= 7 ? '' : 'El password debe tener 7 caracteres o más.'

    }

    if(field_name === 'workspace') {
        return String(value).length >= 5 || String(value).length <= 20 ? '' : 'El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.'
    }

    if(field_name === 'channel'){
        return String(value).length >= 3 || String(value).length <= 23 ? '' : 'El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.'
    }
}