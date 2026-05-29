import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for leads (could be replaced with a database)
  const leadsFile = path.join(process.cwd(), "leads.json");

  // Ensure leads file exists
  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, JSON.stringify([]));
  }

  // API Routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, address, message } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const newLead = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        address,
        message,
        date: new Date().toISOString()
      };

      const data = await fs.readFile(leadsFile, "utf-8");
      const leads = JSON.parse(data);
      leads.push(newLead);
      await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));

      console.log("New lead captured:", newLead);
      res.status(200).json({ success: true, message: "Thank you for getting in touch. We will contact you soon." });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
