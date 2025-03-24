"use client";

import { useParams } from "next/navigation";
import { useGetPostByIdQuery } from "../../../features/postsApi";
import { Container, Typography } from "@mui/material";
import GradientCircularProgress from "@/components/CircularProgress";

export default function PostDetail() {
  const { id } = useParams();
  const { data: post, isLoading, error } = useGetPostByIdQuery(Number(id));

  if (isLoading) return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><GradientCircularProgress/> </div>;
  if (error || !post) return <Typography>Post not found.</Typography>;

  return (
    <Container>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="subtitle1">By {post.author}</Typography>
      <Typography variant="body1">{post.body}</Typography>
    </Container>
  );
}
