import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export const post = async (url: string, payload: any) => {
  try {
    const response = await api.post(url, payload);

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: error.response?.data,
        status: error.response?.status || 500,
        error:
          error.response?.data?.message ||
          "Request failed",
      };
    }

    return {
      success: false,
      status: 500,
      error: "Unexpected error occurred",
    };
  }
};