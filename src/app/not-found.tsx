"use client";

import { Box, Button, Typography, Container, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import ErrorIcon from "@mui/icons-material/Error";

export default function NotFound() {
  const theme = useTheme();
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redirect to the home page
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        textAlign: "center",
        padding: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: theme.spacing(4),
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <ErrorIcon sx={{ fontSize: "6rem", color: "#f44336", marginBottom: "16px" }} />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: '#4e03e0',
            marginBottom: theme.spacing(2),
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "500",
            color: theme.palette.text.secondary,
            marginBottom: theme.spacing(3),
            lineHeight: 1.6,
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
          }}
        >
          Sorry, the page you're looking for does not exist or has been moved. Please check the URL or go back to the homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            padding: theme.spacing(1, 4),
            borderRadius: "30px",
            backgroundColor: "#4e03e0",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
                backgroundColor: "#8d2de2",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}
