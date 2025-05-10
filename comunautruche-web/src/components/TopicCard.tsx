import { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import getData from "./Topic/Topic"; // doit retourner une promesse d'un tableau de Topic
import { Topic } from "./Types";
import { useNavigate } from "react-router-dom";


export default function TopicCard() {
const [topics, setTopics] = useState<Topic[]>([]); // ✅ maintenant TypeScript connaît le type

 useEffect(() => {
  async function fetchData() {
    const data = await getData(); // maintenant data contient le tableau JSON
    setTopics(data);
  }
  fetchData();
}, []);

  return (
    <>
      {topics.map((topic) => (
        <Card key={topic.id} sx={{ backgroundColor: "#f5f5f5", minWidth: 50, mb: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Créé le : {new Date(topic.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="h5" component="div">
              {topic.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Par : {topic.user?.name || "Utilisateur inconnu"}
            </Typography>
            <Typography variant="body2">
              {topic.content}
            </Typography>
            {topic.topicTags?.length > 0 && (
              <Typography variant="caption" display="block" mt={1}>
                Tags : {topic.topicTags.map(tag => tag.name).join(", ")}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {/* <Button onClick={() => navigate('/')} size="small">
              Voir les posts
            </Button>        */}
              </CardActions>
        </Card>
      ))}
    </>
  );
}
