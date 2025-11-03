import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (formData) => {
        return {
          url: '/perfections/create',
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.properties],
    }),

    getAllProperties: builder.query({
      query: () => ({
        url: '/perfections',
        method: 'GET',
      }),
      providesTags: [tagTypes.properties],
    }),
  }),
});

export const {
  useCreatePropertiesMutation,
  useGetAllPropertiesQuery,
} = propertiesApi;