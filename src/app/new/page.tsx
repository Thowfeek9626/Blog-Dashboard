"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation } from "../../features/postsApi";
import { Container, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false); 
  const [bodyError, setBodyError] = useState(false);

  const router = useRouter();
  const [createPost] = useCreatePostMutation();

  const handleSubmit = useCallback(async () => {
    setTitleError(false);
    setBodyError(false);

    if (!title.trim() || !body.trim()) {
      if (!title.trim()) setTitleError(true);
      if (!body.trim()) setBodyError(true);
      return; 
    }

    setLoading(true);
    try {
      await createPost({ title, body, author: "User" }).unwrap();
      setOpen(true);
      setTitle("");
      setBody("");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setIsError(true);
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  }, [title, body, createPost, router]);

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
        <Typography variant="h4">Create New Post</Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError} 
          helperText={titleError ? "Title is required" : ""}
        />
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          error={bodyError} 
          helperText={bodyError ? "Body is required" : ""}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#4e03e0",
            "&:hover": { backgroundColor: "#8d2de2" },
            width: "auto",
            alignSelf: "start",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Container>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={isError ? "error" : "success"} variant="filled" sx={{ width: "100%" }}>
          {isError ? "Could not create Post" : "Post submitted successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
}
