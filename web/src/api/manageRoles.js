import { get, post } from "./helpers";

export async function fetchEmployees() {
  const { data: employees } = await get(`/admin/employees`);
  return employees;
}

export async function fetchEmployee(params) {
  const queryParams = new URLSearchParams();
  if (params.username) queryParams.append('username', params.username);
  const { data: employee } = await get(`/admin/employee?${queryParams.toString()}`);
  return employee;
}

export async function updateEmployeeStatus(user) {
  // make a post to update employee status
  const {data: response} = await post("/admin/update-status", {user});
  return response;
}