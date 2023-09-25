import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../src/app/utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Handle GET request to fetch user profiles
    try {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        throw error;
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user profiles" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
