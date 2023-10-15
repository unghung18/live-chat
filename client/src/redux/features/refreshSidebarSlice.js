import { createSlice } from "@reduxjs/toolkit";

const refreshSidebarSlice = createSlice({
    name: "refreshSidebar",
    initialState: { refreshSidebarKey: false },
    reducers: {
        toggle(state) {
            state.refreshSidebarKey = !state.refreshSidebarKey;
        }
    }
})

export const refreshSidebarActions = refreshSidebarSlice.actions;
export default refreshSidebarSlice;