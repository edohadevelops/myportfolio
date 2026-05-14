import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import environment from '../../configuration/siteConfig'

const baseQuery = fetchBaseQuery({
    baseUrl: environment.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.token;
        // console.log(`Token: ${token}`);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        } 
        // else {
        //     const token = getState().register.token;
        //     headers.set("authorization", `Bearer ${token}`);
        //   }
        return headers;
      }
})

const customBaseQuery = async (args,api,extraOptions) => {
    const result = await baseQuery(args,api,extraOptions);

    if (result.error && result.error.status === 406) {
        // api.dispatch(logoutUser());
        console.error(result.error.data.message)
        // showAlert("", result.error.data.message, "error");
        return;
    } else if (result.error && result.error.status === 401) {
        // api.dispatch(logoutUser());
        console.error(result.error.data.message)
        // showAlert("", result.error.data.message, "error");
    }
    return result;
}

export default customBaseQuery;