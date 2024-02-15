import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OpenAi, // defaults to process.env["OPENAI_API_KEY"]
});

async function main(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
  console.log(completion.choices);
}

// main();
export const handlerequest = async (req, res) => {
  console.log(req.body);

  try {
    const prompt = ` Generate a  well detailed documentation on how to develop the app so that developers can be guided through it also output it in HTMl format with all the content: client apps=${req.body.apps} number of senior developers=${req.body.seniorDev}  number of junior developers=${req.body.juniorDev} number of ui ux designers=${req.body.UIUx}`;
    const msg = await main(prompt);
    console.log(msg);
    res.status(200).json(msg);
  } catch (err) {
    console.log(err);
  }
};

// A client wants to develop apps and he chooses apps that he wants to develop and number of developers he wants to develop those apps. Generate a well organized documentation for developers to understand client requirement using the client preference given: client apps=${apps} number of senior developers=${srdev}  number of junior developers=${jrdev}  number of ui ux designers=${UiUx}`;
