import { notFound } from "next/navigation";
import ClientPostDetail from "@/components/ClientPostDetail";

async function getPost(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`, {
    next: { revalidate: 60 }, 
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  if (isNaN(postId)) return notFound(); 

  const post = await getPost(postId);
  if (!post) return notFound(); 

  return <ClientPostDetail initialPost={post} id={postId} />;
}
