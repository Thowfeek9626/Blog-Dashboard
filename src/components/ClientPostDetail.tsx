"use client";

import { useGetPostByIdQuery } from "@/features/postsApi";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import GradientCircularProgress from "@/components/CircularProgress";

export default function ClientPostDetail({ initialPost, id }: { initialPost: any; id: number }) {
  const { data: post = initialPost, isLoading, error } = useGetPostByIdQuery(id, { skip: !!initialPost });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <GradientCircularProgress />
      </Box>
    );

  if (error || !post) return <Typography>Post not found.</Typography>;

  return (
    <Container sx={{ paddingTop: "20px", maxWidth: "800px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button color="secondary" sx={{ backgroundColor: "#4e03e0","&:hover": { backgroundColor: "#8d2de2" }}} variant="contained" href="/">← Back</Button>
      </Box>
      <Paper sx={{ padding: "30px", boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#4A00E0" }}>{post.title}</Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px", textAlign: "justify" }}>{post.body}</Typography>
        <Typography variant="caption">- By <b>{post.author}</b></Typography>
      </Paper>
    </Container>
  );
}
