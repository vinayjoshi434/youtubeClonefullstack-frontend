import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    theme: "light",
    isSidebarOpen: true,
    categories: [],
    selectedcategory: "",
    selectedcategoryId: null,
    searchquery: "",
    isuploaded: 0,
    isdeleted: 0
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {

        changeTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },

        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen
        }
        ,
        setCategoryandId(state, action) {
            const { newcategory, categoryid } = action.payload
            state.selectedcategory = newcategory
            state.selectedcategoryId = categoryid
            state.searchquery = null
        },
        clearCategoryandId(state) {
            state.selectedcategory = null
            state.selectedcategoryId = null
        },

        clearSearhQuery(state) {
            state.searchquery = null
        },

        populateCategory(state, action) {
            state.categories = action.payload
        },

        setSearchQuery: (state, action) => {
            state.searchquery = action.payload;
            state.selectedcategory = null
            state.selectedcategoryId = null
        },
        setIsUploaded: (state) => {
            state.isuploaded += 1
        },
        setIsDeleted: (state) => {
            state.isdeleted += 1
        }

    }
})



export const { changeTheme, toggleSidebar, setCategoryandId, setSearchQuery, populateCategory, clearCategoryandId, clearSearhQuery, setIsUploaded, setIsDeleted } = uiSlice.actions;
export default uiSlice.reducer;