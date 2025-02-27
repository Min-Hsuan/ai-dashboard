import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  const { data, error } = await supabase.from("products").select("*");

  if (error) return res.status(500).json({ message: error.message });

  res.status(200).json(data);
}