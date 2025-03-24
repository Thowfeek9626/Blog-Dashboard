"use client";

import { useState } from "react";
import { useAddPostMutation } from "../../features/postsApi";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost] = useAddPostMutation();

  const handleSubmit = async () => {
    await addPost({ title, body, author: "User" });
    setTitle("");
    setBody("");
  };

  return (
    <Container>
      <Typography variant="h4">Create New Post</Typography>
      <TextField label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Body" fullWidth multiline rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
      <Button onClick={handleSubmit} variant="contained">Submit</Button>
    </Container>
  );
}
