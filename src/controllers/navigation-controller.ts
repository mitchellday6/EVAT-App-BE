import { Request, Response } from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import axios from "axios";

const mapsClient = new Client({});

// Gemini Pro response structure
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const createRouteFromPoints = async (req: Request, res: Response) => {
  try {
    const { start, stops, destination } = req.body;

    if (!start || !destination) {
      return res.status(400).json({ message: "Start and destination are required." });
    }

    const response = await mapsClient.directions({
      params: {
        origin: start,
        destination: destination,
        waypoints: stops || [],
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    res.status(200).json({ route: response.data.routes[0] });
  } catch (err: any) {
    console.error("Directions API error:", err.message);
    res.status(500).json({ message: "Failed to get route", error: err.message });
  }
};

export const createRouteFromSentence = async (req: Request, res: Response) => {
  try {
    const { sentence } = req.body;
    if (!sentence) return res.status(400).json({ message: "Sentence is required." });

    // Gemini Pro API call using axios
    const geminiRes = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Extract the start location, optional stops, and destination from this sentence: "${sentence}". Return a JSON like: { "start": "...", "stops": ["..."], "destination": "..." }`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = geminiRes.data.candidates[0]?.content?.parts[0]?.text;
    if (!text) {
      return res.status(400).json({ message: "Gemini did not return valid output." });
    }

    const extracted = JSON.parse(text);

    if (!extracted.start || !extracted.destination) {
      return res.status(400).json({ message: "Failed to extract start or destination from sentence." });
    }

    const directionsRes = await mapsClient.directions({
      params: {
        origin: extracted.start,
        destination: extracted.destination,
        waypoints: extracted.stops || [],
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    res.status(200).json({ route: directionsRes.data.routes[0] });
  } catch (err: any) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ message: "Error processing sentence", error: err.message });
  }
};
