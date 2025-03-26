import ClientPosts from "@/components/ClientPosts";

async function getPosts(page = 1, limit = 4) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/posts?page=${page}&limit=${limit}`, {
    next: { revalidate: 10 }, // Refresh cache every 10s
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export const metadata = {
  title: "Blog Dashboard",
  description: "The dashboard will display a list of blog posts",
};


export default async function Home() {
  const page = 1;
  const limit = 4;
  const initialPosts = await getPosts(page, limit);

  return <ClientPosts initialPosts={initialPosts} />;
}
