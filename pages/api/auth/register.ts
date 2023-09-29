import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../src/utils/supabase"; // Import your Supabase client

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      // Insert a new user into the "users" table
      const { data, error } = await supabase
        .from("users")
        .insert([{ username: username, email: email, password: password }])
        .select();

      if (error) throw error;

      if (data)
        res
          .status(200)
          .json({ message: "Registration successful", user: data[0] });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
