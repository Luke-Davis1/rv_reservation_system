import { get } from "./helpers";

export async function fetchProfileDetails() {
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");
  const queryParams = new URLSearchParams();
  if (username) queryParams.append('username', username);
  if (userType) queryParams.append('userType', userType);
  const { data: profileData } = await get(`/auth/profile?${queryParams.toString()}`);
  return profileData;
}