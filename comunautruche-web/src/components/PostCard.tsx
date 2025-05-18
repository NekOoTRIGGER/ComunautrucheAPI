import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Post } from "./Types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const token = localStorage.getItem("token");

async function getData(topicId?: string): Promise<Post[]> {
  if (!topicId) return []; // ✅ évite l'appel si pas d'ID

  const url = `https://localhost:44353/api/Post/Topic/${topicId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    // ✅ Si l’API retourne des $values, prends-les, sinon retourne le json directement s’il est un tableau
    const posts: Post[] = Array.isArray(json.$values)
      ? json.$values
      : Array.isArray(json)
        ? json
        : [];

    console.log("Fetched posts:", posts); // Debug
    return posts;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default function PostCard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { topicId } = useParams<{ topicId: string }>();

useEffect(() => {
  async function fetchData() {
    if (topicId) {
      const data = await getData(topicId);
      setPosts(data);
    }
  }
  fetchData();
}, [topicId]);

  return  (
    <Grid container spacing={2} padding={2}>
      {posts.map((post) => (
          <Card
            className="container-card"
            sx={{
              backgroundColor: "#f5f5f5",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              image={post.image}
              alt="Image du post"
              sx={{
                objectFit: "cover",
                height: 150,
              }}
            />
            <CardContent>
              <Typography
                sx={{ fontSize: 12, textAlign: "right" }}
                color="text.secondary"
                gutterBottom
              >
                posté le : {new Date(post.postedAt).toLocaleDateString()}
              </Typography>

              <Typography
                sx={{ fontSize: 22, textAlign: "center" }}
                variant="h5"
                component="div"
              >
                {post.title}
              </Typography>

              <Typography
                sx={{ fontSize: 16, textAlign: "center", marginTop: 1 }}
                component="p"
              >
                {post.content}
              </Typography>
            </CardContent>
          </Card>
      ))}
    </Grid>
  );
}