import { createSlice } from "@reduxjs/toolkit";

const lightThemeSlice = createSlice({
    name: "lightTheme",
    initialState: { lightThemeKey: true },
    reducers: {
        toggle(state) {
            state.lightThemeKey = !state.lightThemeKey;
        }
    }

})

export const lightThemeActions = lightThemeSlice.actions;
export default lightThemeSlice;