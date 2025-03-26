import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PaginationParams } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const postsApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], PaginationParams>({
      query: ({ page = 1, limit = 4 }) => `/posts?page=${page}&limit=${limit}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Post" as const, id })), { type: "Post", id: "LIST" }]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsApi;
