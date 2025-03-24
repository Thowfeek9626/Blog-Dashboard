"use client";

import { useState } from "react";
import { useGetPostsQuery } from "../features/postsApi";
import { Container, Typography, Pagination, Box } from "@mui/material";
import PostCard from "@/components/PostCard";
import GradientCircularProgress from "@/components/CircularProgress";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 4; // Posts per page
  const { data: posts = [], isLoading, error } = useGetPostsQuery({ page, limit });

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );

  if (error) return <Typography>Error loading posts</Typography>;

  return (
    <Container style={{marginTop:'12px'}}>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {posts.map((post) => (
        <PostCard post={post} key={post?.id} />
      ))}

      <Box mt={4} mb={4} sx={{position: "fixed",bottom: 0,left:'40%',zIndex: 10,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Pagination count={10} page={page} onChange={handleChange} color="primary" />
      </Box>
    </Container>
  );
}