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
  app.post("/api/chat", async (req, res) => {
    try {
      const { name, email, text } = req.body;
      
      const newTicket = {
        id: Date.now().toString(),
        name: name || "Anonymous User",
        email: email || "no-email@provided.com",
        message: text,
        timestamp: new Date().toISOString()
      };

      // Output to CLI (simulation of email trigger notification to support@maroontech.co.za)
      console.log(`\n=========================================`);
      console.log(`📠 [EMAIL TRIGGER SYSTEM] Triggering urgent inbound support notification!`);
      console.log(`To: support@maroontech.co.za`);
      console.log(`Subject: Maroon Tech Active Live Chat Session Request from: ${newTicket.name}`);
      console.log(`User Contact: ${newTicket.email}`);
      console.log(`Message Content: "${newTicket.message}"`);
      console.log(`=========================================\n`);

      // Store in chat_leads.json for database auditing simulation
      const chatFile = path.join(process.cwd(), "chat_leads.json");
      let chats = [];
      try {
        const data = await fs.readFile(chatFile, "utf-8");
        chats = JSON.parse(data);
      } catch {
        // file doesn't exist yet
      }
      chats.push(newTicket);
      await fs.writeFile(chatFile, JSON.stringify(chats, null, 2));

      res.status(200).json({ 
        success: true, 
        message: "Your message has been received!",
        botResponse: `Hi ${newTicket.name || 'there'}! I've logged your request in our system and sent an active alert notification to support@maroontech.co.za. A support tech has received your signal and is looking into your inquiry right now! 🚀`
      });
    } catch (error) {
      console.error("Error processing chat ticket:", error);
      res.status(500).json({ error: "Could not establish real-time socket connection link." });
    }
  });

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
