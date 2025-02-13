import { Router } from "express";
import { fetchEmployee, fetchEmployees, updateEmployeeStatus } from "./manageRoles.js";

export const adminRouter = Router();

adminRouter.get('/employees', fetchEmployees);
adminRouter.get('/employee', fetchEmployee);
adminRouter.post('/update-status', updateEmployeeStatus);
