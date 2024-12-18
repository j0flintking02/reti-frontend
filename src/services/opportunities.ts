import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from "@reduxjs/toolkit/query/react"
import {
    customError,
    LoginResponseType,
    OpportunitiesResponseType,
    OpportunitiesType,
    ProfileResponseType,
    OpportunitiesDetailsResponseType
} from "./types.ts";
import {getHeaders} from "../utils.ts";



export const opportunityApi = createApi({
    reducerPath: 'opportunityApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${import.meta.env.VITE_BASE_URL}/v1/`
        }
    ) as BaseQueryFn<string | FetchArgs, unknown, customError>,
    tagTypes: ['Opportunities'],
    endpoints: ({mutation, query}) => ({
        addOpportunity: mutation<LoginResponseType, User>({
            query: (data) => ({
                url: 'jobs',
                method: 'POST',
                headers: getHeaders(),
                body: data,
            }),
            transformResponse: (response) => response,
            transformErrorResponse: (
                response
            ) => response,
        }),
        getOpportunities: query<OpportunitiesResponseType, void>({
            query: () => ({
                url: `jobs`,
                method: "GET",
                headers: getHeaders(),
            }),
        }),
        getOpportunityDetails: query<OpportunitiesDetailsResponseType, string>({
            query: (jobId) => ({
                url: `jobs/${jobId}`,
                method: "GET",
                headers: getHeaders(),
            }),
        }),
        updateOpportunity: mutation<LoginResponseType, { data:OpportunitiesType, opportunityID:string }>({
            query: (data) => ({
                url: 'jobs',
                method: 'POST',
                headers: getHeaders(),
                body: data,
            }),
            transformResponse: (response) => response,
            transformErrorResponse: (
                response
            ) => response,
        }),
        updateOpportunity: mutation<OpportunitiesType, { payload:OpportunitiesType, jobID:string }>({
            query: ({body, jobID}) => ({
                url: `/jobs/${jobID}`,
                method: "UPDATE",
                body,
                headers: getHeaders(),
            }),
        }),
        deleteOpportunity: mutation<OpportunitiesType, number>({
            query: (jobID) => ({
                url: `/jobs/${jobID}`,
                method: "DELETE",
                headers: getHeaders(),
            }),
        }),
    })
})

export const {
    useAddOpportunityMutation,
    useGetOpportunitiesQuery,
    useUpdateOpportunityMutation,
    useDeleteOpportunityMutation,
    useGetOpportunityDetailsQuery
} = opportunityApi