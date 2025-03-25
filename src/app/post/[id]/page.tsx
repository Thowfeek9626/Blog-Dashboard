"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetPostByIdQuery } from "../../../features/postsApi";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import GradientCircularProgress from "@/components/CircularProgress";

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: post, isLoading, error } = useGetPostByIdQuery(Number(id));

  if (isLoading)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <GradientCircularProgress />
      </div>
    );
  if (error || !post) return <Typography>Post not found.</Typography>;

  return (
    <Container
      sx={{
        paddingTop: "20px",
        paddingBottom: "50px",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Button */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{
            backgroundColor: "#4A00E0",
            "&:hover": { backgroundColor: "#8E2DE2" },
          }}
        >
          ← Back to Home
        </Button>
      </Box>

      {/* Post Card */}
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#4A00E0",
            letterSpacing: 0.5,
            marginBottom: "20px",
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.5rem" },
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#555",
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            textAlign: "justify",
            marginBottom: "20px",
            wordWrap: "break-word",
          }}
        >
          {post.body}
        </Typography>
        <Typography variant="caption">- By <span style={{fontWeight:'bold'}}>{post.author}</span></Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
            padding: "10px 0",
            backgroundColor: "#4A00E0",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: "1px",
            }}
          >
            Enjoy reading? Don't forget to leave a comment below!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
