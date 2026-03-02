import { Request, Response } from "express";
import { generateContent } from "../services/content.service";

export async function sendRequest(req: Request, res: Response) {
  try {
    const request = req.body.question;
    const result = await generateContent(request as string);
    res.send({
      Answer: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("error", err.message);
    } else {
      console.log(err);
    }
  }
}
