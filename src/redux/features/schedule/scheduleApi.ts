import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => {
        return {
          url: "/schedule/create",
          method: "POST",
           data,
        };
      },
      invalidatesTags: [tagTypes.schedule],
    }),
    getAllSchedule: builder.query({
      query: () => ({
        url: "/schedule",
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),

    updateSchedule: builder.mutation({
      query: (id) => ({
        url: `/update-schedule/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
 useCreateScheduleMutation,
 useGetAllScheduleQuery,
 useUpdateScheduleMutation
} = scheduleApi;