import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { updateVideoGallery } from "../Features/videoSlice"



// const URI = `https://pixabay.com/api/videos/?key=${API}&q=yellow+flowers&pretty=true`




export const useVideo = () => {
    const dispatch = useDispatch()

    const { searchquery, selectedcategoryId } = useSelector((state) => state.ui)
    console.log(searchquery);



    const status = useSelector((state) => state.video.status);

    // const finalURL = `https://pixabay.com/api/videos/?key=51177854-0cbd589136a75d44e38ba636d&q=${category}&pretty=true`

    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

    const BASE_URL = "https://www.googleapis.com/youtube/v3"

    useEffect(() => {
        const fetchData = async () => {
            try {


                // const channelurl = "https://www.googleapis.com/youtube/v3/channels"
                // const channelparams = {

                //     part: "snippet",
                //     id: channelId,
                //     key: API_KEY,

                // }



                let url = "";
                let params = {

                    maxResults: 50,
                    key: API_KEY,


                };

                if (searchquery) {
                    url = `${BASE_URL}/search`;
                    params.part = "snippet"
                    params.q = searchquery;
                    params.type = "video"
                } else if (selectedcategoryId) {
                    url = `${BASE_URL}/videos`;
                    params.part = "snippet,statistics",
                        params.chart = "mostPopular";
                    params.regionCode = "IN"
                    params.videoCategoryId = selectedcategoryId;
                } else {
                    url = `${BASE_URL}/videos`;
                    params.part = "snippet,statistics",
                        params.chart = "mostPopular";
                    params.regionCode = "IN";

                }





                const res = await axios.get(url, { params });
                // const channelresponse = await axios.get(channelurl, {
                //     params: {

                //         part: "snippet",
                //         id: channelId,
                //         key: API_KEY,

                //     }
                // })



                const trimmeddata = res.data.items.map((video) => {



                    if (video.kind === "youtube#videoCategory" || video.kind === "youtube#video") {

                        const { snippet, statistics } = video;
                        return ({
                            video_id: video.id,
                            publishedAt: snippet.publishedAt,
                            channelId: snippet.channelId,
                            title: snippet.title,
                            description: snippet.description,
                            thumbnail: snippet.thumbnails.medium.url,
                            channeltitle: snippet.channelTitle,
                            categoryId: snippet.categoryId,
                            views: statistics.viewCount,
                            likes: statistics.likeCount,


                        })

                    }
                    else {   // this is for the searchresult endpoint as it differ in api structure
                        const { snippet } = video;
                        return ({
                            video_id: video.id.videoId,
                            publishedAt: snippet.publishedAt,
                            channelId: snippet.channelId,
                            title: snippet.title,
                            description: snippet.description,
                            thumbnail: snippet.thumbnails.medium.url,
                            channeltitle: snippet.channelTitle,

                        })
                    }

                })

                dispatch(updateVideoGallery(trimmeddata));


                //console.log(res.data.items);



            } catch (error) {
                console.log(`error : ${error}`);

            }


        }
        fetchData()

    }, [selectedcategoryId, searchquery])


}