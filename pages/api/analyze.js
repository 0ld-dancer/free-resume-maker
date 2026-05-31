import { analyzeResume } from "../../utils/gemini.js"; // 👈 Update with your exact file name

export default async function handler(req, res) {
  // Reject any incoming requests that aren't POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    // In the Pages Router, the body parser automatically converts JSON payloads
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ success: false, error: "Missing resumeData payload" });
    }

    // Call your backend utility function from your utils folder
    const feedback = await analyzeResume(resumeData);

    // Return the response back to your client-side frontend
    return res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
}