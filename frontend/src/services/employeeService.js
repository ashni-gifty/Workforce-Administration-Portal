// import our reusable api axios instance from api.js
import api from "./api";

//using this file, we are creating a service layer for our employee entity

// fn to get all employees
export const getEmployees = () => {
    return api.get("employees/");
};

// fn to get the details of a single employee
export const getEmployee = (id) => {
    return api.get(`employees/${id}/`);
};

// fn to add employees
export const addEmployee = (employee) => {
    return api.post("employees/", employee);
};

// fn to edit employees
export const updateEmployee = (id,employee) => {
    return api.put(`employees/${id}/`, employee);
};

// fn to delete employees
export const deleteEmployee = (id) => {
    return api.delete(`employees/${id}/`);
};