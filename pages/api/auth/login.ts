import { NextApiRequest, NextApiResponse } from "next";

import supabase from "../../../src/utils/supabase"; // Import your Supabase client

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Query the "users" table to check if the provided credentials are valid
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error) throw error;

      if (data)
        res.status(200).json({ message: "Login successful", user: data });
    } catch (error) {
      res.status(500).json({ error: "Error during login" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
