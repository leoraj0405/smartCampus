import { post } from "./api/axiosInstance";

export const login = async(
  payload: any,
  role: "admin" | "staff" | "student"
) => {
  const endpoint =
    role === "admin" ? "/admin/login" : "/login";
    const response = await post(endpoint, payload);
    return response
};