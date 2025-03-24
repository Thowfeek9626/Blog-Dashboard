import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: string;
  body: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
          transition: "all 0.3s ease-in-out",
        },
        cursor:'pointer'
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#4A00E0",
            letterSpacing: 0.5,
            mb: 1,
          }}
        >
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            mb: 2,
            lineHeight: 1.5,
          }}
        >
          {post.body.slice(0, 100)}...
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Link href={`/post/${post.id}`} passHref>
            <Button
              size="small"
              sx={{
                backgroundColor: "#4A00E0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#8E2DE2",
                },
              }}
            >
              Read More
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
