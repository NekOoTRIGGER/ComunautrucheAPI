import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import getData from "./Topic/Topic"; // doit retourner une promesse d'un tableau de Topic
import { Topic } from "./Types";
import { useUser } from "./UserContext";
import '../App.css';


export default function TopicCard() {
  const [topics, setTopics] = useState<Topic[]>([]); // ✅ maintenant TypeScript connaît le type
  const [showInfo, setShowInfo] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchData() {
      const data = await getData(); // maintenant data contient le tableau JSON
      setTopics(data);
    }
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(450px,0.5fr))",
        gap: "10px",
      }}
    >
      {topics.map((topic) => (
        <div
          key={topic.id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            className="container-card"
            key={topic.id}
            sx={{ backgroundColor: "#f5f5f5" }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12, textAlign: "right" }} color="text.secondary" gutterBottom>
                Créé le : {new Date(topic.createdAt).toLocaleDateString()}
              </Typography>

              <Typography sx={{ fontSize: 22, textAlign: "center" }} variant="h5" component="div">
                {topic.title}
              </Typography>

              <Typography sx={{ fontSize: 18, textAlign: "center" }} variant="body2">
                {topic.content}
              </Typography>
              {topic.topicTags?.length > 0 && (
                <Typography variant="caption" display="block" mt={1}>
                  Tags : {topic.topicTags.map((tag) => tag.name).join(", ")}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: "Center" }}>
              <Button sx={{
                fontSize: 16, backgroundColor: 'whitesmoke', boxShadow: 'none', transition: 'box-shadow 0.3s ease',
                '&:hover': { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', backgroundColor: 'whitesmoke', },
              }} size="small">
                Voir les sujets
              </Button>
            </CardActions>
            <CardActions sx={{ justifyContent: "left" }}>
              <Button onClick={() => setShowInfo(!showInfo)} size="small">Info</Button>
            </CardActions>
              {showInfo && (
              <Typography sx={{ fontSize: 12, textAlign: "left" }} color="text.secondary">
                Crée Par : {user?.email || "Utilisateur inconnu"}
              </Typography>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
}
