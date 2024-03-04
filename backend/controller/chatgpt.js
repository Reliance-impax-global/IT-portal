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

// main();l
export const handlerequest = async (req, res) => {
  console.log(req.body);

  try {
    // const prompt = `client wants to develop a ${req.body.projectname} with ${req.body.apps} please generate a technical doumentation for developers to understand.The documentation should include following points :- 1. Introduction 2. System Architecture 3. System requirements 4. User Authentication. 5. User Interface 6. Testing 7. Deployment 8. Maintenance and support .Explain each of the points with minimum 10 bullet points .Give your response in html format.`;
    const prompt =
      "client want to develop a food ordering app with driver app restro app admin app and customer app please generate a technnical documentation to explain the project to developers,Include suggested tech stack and sdk needed. Phases wise target ,300 words please.";
    console.log(prompt);
    const msg = await main(prompt);
    console.log(msg);
    const filter = `${msg} convert this into html format`;
    const final = await main(filter);
    console.log(final);
    res.status(200).json(msg);
  } catch (err) {
    console.log(err);
  }
};

// A client wants to develop apps and he chooses apps that he wants to develop and number of developers he wants to develop those apps. Generate a well organized documentation for developers to understand client requirement using the client preference given: client apps=${apps} number of senior developers=${srdev}  number of junior developers=${jrdev}  number of ui ux designers=${UiUx}`;
