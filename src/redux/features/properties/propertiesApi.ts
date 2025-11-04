import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (formData) => {
        return {
          url: "/perfections/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.properties],
    }),

    getAllProperties: builder.query({
      query: () => ({
        url: "/perfections",
        method: "GET",
      }),
      providesTags: [tagTypes.properties],
    }),
    updateProperties: builder.mutation({
      query: ({ propertyId, data }) => {
        console.log("Updating:", propertyId);
        return {
          url: `/perfections/update/${propertyId}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.slider],
    }),

    deleteProperties: builder.mutation({
      query: (id: string) => ({
        url: `/perfections/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slider],
    }),
  }),
});

export const {
  useCreatePropertiesMutation,
  useGetAllPropertiesQuery,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
} = propertiesApi;
