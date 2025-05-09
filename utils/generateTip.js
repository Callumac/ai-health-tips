
import { OpenAI } from "openai";
import fs from "fs-extra";
import path from "path";
import topics from "./healthTopics.json" assert { type: "json" };

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateHealthTip() {
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const prompt = `Give a clear, actionable, and fresh health tip about "${topic}" in 2-3 sentences. Avoid clichés or overused advice.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8
  });

  const tip = response.choices[0].message.content.trim();

  const outputPath = path.resolve("data", "tip-today.json");
  await fs.ensureDir("data");
  await fs.writeJson(outputPath, {
    topic,
    tip,
    created: new Date().toISOString()
  }, { spaces: 2 });
}
