// src/redux/features/properties/propertiesApi.ts
import { baseApi } from '@/redux/api/baseApi';
import { tagTypes } from '@/redux/tag-types';

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (formData) => {
        console.log('🔍 Creating property with:', formData instanceof FormData ? 'FormData' : 'JSON');
        
        return {
          url: '/perfections/create',
          method: 'POST',
          data: formData,
          // ❌ NO contentType - FormData হলে automatic হবে
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