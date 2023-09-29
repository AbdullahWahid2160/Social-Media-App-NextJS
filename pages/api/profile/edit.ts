import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../src/utils/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { id, updatedData } = req.body;

      const { data, error } = await supabase
        .from("profiles")
        .update(updatedData)
        .eq("user_id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log("Edited Response: ", data);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user profiles" });
    }
  } else {
    // Handle other HTTP methods (e.g., POST for creating user profiles)
    res.status(405).json({ error: "Method not allowed" });
  }
};
