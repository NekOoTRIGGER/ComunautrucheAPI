import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import { Topic } from "./Types";
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';

import '../App.css';
const token = localStorage.getItem("token");

async function getData(): Promise<Topic[]> {
  const url = "https://localhost:44353/api/Topic/";
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
    console.log("Fetched JSON:", json); // <== pour déboguer la forme

    if (!Array.isArray(json)) {
      console.error("Expected array but got:", json);
      return json.$values;
    }

    return json;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default function TopicCard() {
  const [topics, setTopics] = useState<Topic[]>([]); // ✅ maintenant TypeScript connaît le type
  const [showInfo, setShowInfo] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getData(); // maintenant data contient le tableau JSON
      setTopics(data);
    }
    fetchData();
  }, []);

  return (
    <div style={{display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(450px,0.5fr))",gap: "10px",}}>
      {topics.map((topic) => (
        <div key={topic.id} style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
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
              }}  onClick={() => navigate(`/post/${topic.id}`)} size="small">
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
