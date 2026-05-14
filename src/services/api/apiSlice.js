import { createApi } from '@reduxjs/toolkit/query/react'
import customBaseQuery from '../query-builder/customQuery'

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({}),
    tagTypes: ["Project","Category","Stack"]
})

export default apiSlice