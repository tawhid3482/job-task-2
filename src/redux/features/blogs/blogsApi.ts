import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const BlogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlogs: builder.mutation({
      query: (formData) => {
        return {
          url: "/blogs/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.blogs],
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    deleteBlogs: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useCreateBlogsMutation,
  useGetAllBlogsQuery,
  
  useDeleteBlogsMutation,
} = BlogsApi;