// src/theme.ts
import { createTheme } from "@mantine/core";

export const lightTheme = createTheme({
  colors: {
    sunset: [
      "#fff2ec",
      "#ffe0d4",
      "#ffbfa7",
      "#ff9b78",
      "#ff7e54",
      "#ff6a3c",
      "#ff5f30",
      "#e24b1f",
      "#c63c13",
      "#a12a05",
    ],
  },
  primaryColor: "sunset",
});

export const darkTheme = createTheme({
  colors: {
    purpleDark: [
      "#f3e9fb",
      "#e1cdf5",
      "#cca7ea",
      "#b67fdf",
      "#a262d7",
      "#944fd1",
      "#8d46cf",
      "#6e3a91ff", // your preferred dark shade
      "#532c6d",
      "#3a1e4b",
    ],
  },
  primaryColor: "purpleDark",
});
