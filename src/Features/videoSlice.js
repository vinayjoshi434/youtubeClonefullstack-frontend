import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    videos: [],
    customuploadedvideos: [],
    allcustomvideos: [],
    selectedVideo: null,
    status: "idle"


}
export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {

        addCustomVideo(state, action) {
            state.customuploadedvideos = action.payload
            // state.trendingvideos.push(action.payload)
        },
        clearCustomvideos(state) {
            state.customuploadedvideos = []
        }
        ,
        removecustomVideo(state, action) {
            const reqid = action.payload
            const delid = state.customuploadedvideos.findIndex((ele) => {
                return ele.id !== reqid
            })
            state.customuploadedvideos.splice(delid, 1)
        },

        updateVideoGallery(state, action) {
            state.videos = action.payload // this will setting up the new Products
            state.status = "succeded"

        },
        changeStatus(state) {
            state.status = "idle"
        },
        setAllCustomVideos(state, action) {
            state.allcustomvideos = action.payload
        },
        clearAllCustomVideos(state) {
            state.allcustomvideos = []
        }

    }
})

export const { addCustomVideo, removecustomVideo, updateVideoGallery, changeStatus, clearCustomvideos, setAllCustomVideos, clearAllCustomVideos } = videoSlice.actions

export default videoSlice.reducer