

import { generateHealthTip } from "../utils/generateTip.js";

(async () => {
  await generateHealthTip();
  console.log("✅ New tip generated and saved.");
})();
