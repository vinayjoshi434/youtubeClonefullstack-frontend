import { useEffect } from "react";
import { populateCategory } from "../Features/uiSlice.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const URL = "https://www.googleapis.com/youtube/v3/videoCategories"
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export const useCategory = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchcategory = async () => {
            try {
                const res = await axios.get(URL, {
                    params: {

                        part: "snippet",
                        regionCode: "IN",
                        key: API_KEY

                    }
                });

                //console.log(res.data.items);

                const trimmeddata = res.data.items.map((category) => {
                    const { snippet } = category;
                    return ({

                        category_id: category.id,
                        title: snippet.title,
                        channelId: snippet.channelId,

                    })
                })

                dispatch(populateCategory(trimmeddata))






            } catch (error) {
                console.log(`error : ${error}`)
            }





        }

        fetchcategory()
    }, [])





}