import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    userData: any | null;
    token: string | null;
    expiresAt: number | null;
}

const ONE_HOUR = 1 * 60 * 1000;

const initialState: AuthState = {
    userData: null,
    token: null,
    expiresAt: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ userData: any; token: string }>
        ) => {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
            state.expiresAt = Date.now() + ONE_HOUR;
        },

        logout: (state) => {
            state.userData = null;
            state.token = null;
            state.expiresAt = null;
        },
        checkExpiry: (state) => {
            if (state.expiresAt && Date.now() > state.expiresAt) {
                state.userData = null;
                state.token = null;
                state.expiresAt = null;
            }
        }
    },
});

export const { login, logout, checkExpiry } = authSlice.actions;
export default authSlice.reducer;
