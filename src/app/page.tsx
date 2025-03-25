"use client";

import { useState, useCallback } from "react";
import { useGetPostsQuery } from "../features/postsApi";
import { Container, Typography, Pagination, Box } from "@mui/material";
import PostCard from "@/components/PostCard";
import GradientCircularProgress from "@/components/CircularProgress";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data: posts = [], isLoading, error } = useGetPostsQuery({ page, limit });

  const handleChange = useCallback((_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );

  if (error) return <Typography>Error loading posts</Typography>;

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {posts.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
      <Box mt={4} mb={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} page={page} onChange={handleChange} color="secondary" size="large" shape="rounded" />
      </Box>
    </Container>
  );
}
