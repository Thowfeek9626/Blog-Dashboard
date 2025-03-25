"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddPostMutation } from "../../features/postsApi";
import { Container, TextField, Button, Typography } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost] = useAddPostMutation();
  const [open, setOpen] = useState(false);
  const [isError,setIsError] = useState(false)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addPost({ title, body, author: "User" });
      setOpen(true);
      setTitle("");
      setBody("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setIsError(true)
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "27px" }}>
          Create New Post
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            "&:hover": { backgroundColor: "#8d2de2" },
            backgroundColor: "#4e03e0",
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Container>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={isError?'error':'success'} variant="filled" sx={{ width: "100%" }}>
          {isError ? 'Could create Post' : 'Post submitted successfully!'}
        </Alert>
      </Snackbar>
    </>
  );
}
