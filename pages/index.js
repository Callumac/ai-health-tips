

import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "tip-today.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const tipData = JSON.parse(raw);

  return {
    props: { tipData },
    revalidate: 86400 // regenerate daily
  };
}

export default function Home({ tipData }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Daily Health Tip</h1>
      <p><strong>Topic:</strong> {tipData.topic}</p>
      <p>{tipData.tip}</p>
      <small style={{ color: "#888" }}>Last updated: {new Date(tipData.created).toLocaleDateString()}</small>
    </div>
  );
}
