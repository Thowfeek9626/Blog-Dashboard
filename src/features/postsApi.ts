import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post,PaginationParams } from "@/app/types";
const BASE_URL = 'https://67e23df697fc65f535351a87.mockapi.io';


export const postsApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], PaginationParams>({
      query: ({ page = 1, limit = 4 }) => `/posts?page=${page}&limit=${limit}`,
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsApi;
