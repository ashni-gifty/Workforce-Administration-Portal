// import our reusable api axios instance from api.js
import api from "./api";

//using this file, we are creating a service layer for our project entity

// fn to get all projects
export const getProjects = () => {
    return api.get("projects/");
};

// fn to get the details of a single project
export const getProject = (id) => {
    return api.get(`projects/${id}/`);
};

// fn to add projects
export const addProject = (project) => {
    return api.post("projects/", project);
};

// fn to edit projects
export const updateProject = (id,project) => {
    return api.put(`projects/${id}/`, project);
};

// fn to delete projects
export const deleteProject = (id) => {
    return api.delete(`projects/${id}/`);
};