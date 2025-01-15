import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './users';
import {
  CreateMentorshipSessionDto,
  MentorshipSession,
  MentorshipSessionResponse,
  MentorshipSessionsResponse,
  UpdateMentorshipSessionDto,
} from './types/mentorship';

export const mentorshipSessionsApi = createApi({
  reducerPath: 'mentorshipSessionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['MentorshipSessions'],
  endpoints: (builder) => ({
    getMentorshipSessions: builder.query<MentorshipSession[], void>({
      query: () => 'mentorship-sessions',
      transformResponse: (response: MentorshipSessionsResponse) => response.data,
      providesTags: ['MentorshipSessions'],
    }),

    getMentorshipSessionsByMentor: builder.query<MentorshipSession[], number>({
      query: (mentorId) => `mentorship-sessions/mentor/${mentorId}`,
      transformResponse: (response: MentorshipSessionsResponse) => response.data,
      providesTags: ['MentorshipSessions'],
    }),

    getMentorshipSessionsByYouth: builder.query<MentorshipSession[], number>({
      query: (youthId) => `mentorship-sessions/youth/${youthId}`,
      transformResponse: (response: MentorshipSessionsResponse) => response.data,
      providesTags: ['MentorshipSessions'],
    }),

    createMentorshipSession: builder.mutation<MentorshipSession, CreateMentorshipSessionDto>({
      query: (sessionData) => ({
        url: 'mentorship-sessions',
        method: 'POST',
        body: sessionData,
      }),
      transformResponse: (response: MentorshipSessionResponse) => response.data,
      invalidatesTags: ['MentorshipSessions'],
    }),

    updateMentorshipSession: builder.mutation<MentorshipSession, { id: string; data: UpdateMentorshipSessionDto }>({
      query: ({ id, data }) => ({
        url: `mentorship-sessions/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: MentorshipSessionResponse) => response.data,
      invalidatesTags: ['MentorshipSessions'],
    }),

    deleteMentorshipSession: builder.mutation<void, string>({
      query: (id) => ({
        url: `mentorship-sessions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MentorshipSessions'],
    }),
  }),
});

export const {
  useGetMentorshipSessionsQuery,
  useGetMentorshipSessionsByMentorQuery,
  useGetMentorshipSessionsByYouthQuery,
  useCreateMentorshipSessionMutation,
  useUpdateMentorshipSessionMutation,
  useDeleteMentorshipSessionMutation,
} = mentorshipSessionsApi;
