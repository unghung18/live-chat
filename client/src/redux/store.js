import { configureStore } from "@reduxjs/toolkit";
import refreshSidebarSlice from "./features/refreshSidebarSlice";
import lightThemeSlice from "./features/lightThemeSlice";

export default configureStore({
    reducer: {
        refreshSidebar: refreshSidebarSlice.reducer,
        lightTheme: lightThemeSlice.reducer
    }
})