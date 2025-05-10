import { Topic } from "../Types";
const token = localStorage.getItem("token");

export default async function getData(): Promise<Topic[]> {
  const url = "https://localhost:44353/api/Topic/getalltopics";
  try {
    const response = await fetch(url, {
   method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`

    }})
  

    if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json;
} catch (error) {
  console.error(error);
  return [];
}
}