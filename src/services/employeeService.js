import instance from "../api/customer-employee"

export const getListEmployee = () => {
    return instance.get('/employees')
}

export const createNewEmployee = (name, age, email, gender) => {
    return instance.post('/employees', { name, age, email, gender })
}

export const removeEmployee = (employeeID) => {
    return instance.delete(`/employees/${employeeID}`)
}

export const getEmployeeById = (employeeID) => {
    return instance.get(`/employees/${employeeID}`)
}

export const updateEmployee = (employeeID, name, age, email, gender) => {
    return instance.put(`/employees/${employeeID}`, {name, age, email, gender})
}
