import { NextResponse } from "next/server";

const portfolioContext = `You are the portfolio assistant for Kudakwashe Jasi, a Full Stack Developer based in Harare, Zimbabwe.
Skills: HTML, CSS, JavaScript, Tailwind CSS, React.js, front-end and back-end development.
Services: web applications, clean code, high-fidelity interfaces, responsive pages, SEO, and animations.
Experience: Web Developer at Uncommon.org from 2023 to 2024.
Education: Certificate in Software Engineering from Uncommon.org in 2024. Do not claim any unfinished or unverified school qualification.
Projects: Kudakwashe Jasi Academy, Petty Heating Solution, React admin dashboard, Coffee Cafe, Coffee Shop, and MERN Task Manager.
Contact: email Kudakwashejasi4@gmail.com, GitHub github.com/kudakwasheJasi, and LinkedIn linkedin.com/in/kudakwashe-jasi-359ba22aa.
University goal: continue into university-level studies in software engineering or computer science, with interests in full-stack development, web technologies, user-focused interfaces, and problem-solving.
Answer clearly and briefly. If asked something unrelated, explain that you can help with questions about Kudakwashe's portfolio, skills, services, projects, academic profile, or availability.`;

function fallbackAnswer(message) {
  const question = message.toLowerCase();
  if (question.includes("skill") || question.includes("technology") || question.includes("stack")) {
    return "Kudakwashe works with HTML, CSS, JavaScript, Tailwind CSS, and React.js, with experience across front-end and back-end development.";
  }
  if (question.includes("project")) {
    return "Featured projects include Kudakwashe Jasi Academy, Petty Heating Solution, a React admin dashboard, Coffee Cafe, Coffee Shop, and a MERN Task Manager app. You can open them from the Portfolio section.";
  }
  if (question.includes("service") || question.includes("hire") || question.includes("available")) {
    return "Kudakwashe is available for software engineering opportunities and offers web applications, responsive interfaces, clean code, SEO, and interactive animations.";
  }
  if (question.includes("contact") || question.includes("email") || question.includes("github")) {
    return "You can reach Kudakwashe at Kudakwashejasi4@gmail.com or through github.com/kudakwasheJasi. The Contact section also has WhatsApp and LinkedIn links.";
  }
  return "I can answer questions about Kudakwashe's skills, services, projects, experience, availability, and contact details.";
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    const cleanMessage = typeof message === "string" ? message.trim().slice(0, 1000) : "";
    if (!cleanMessage) {
      return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json({ answer: fallbackAnswer(cleanMessage), mode: "fallback" });
    }

    if (apiKey.includes("your_real") || apiKey.includes("your_api") || apiKey.includes("replace") || apiKey.length < 30) {
      return NextResponse.json({ error: "Live AI is not configured yet. Add a valid OpenAI API key to .env.local and restart the dev server." }, { status: 503 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          { role: "system", content: portfolioContext },
          { role: "user", content: cleanMessage },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "The live AI key is invalid or revoked. Create a new key and update .env.local." }, { status: 502 });
      }
      if (response.status === 429) {
        return NextResponse.json({ error: "The live AI account has no available quota. Add billing or usage credits, then restart the server." }, { status: 502 });
      }
      return NextResponse.json({ error: `The live AI provider returned HTTP ${response.status}. Check the model and account settings.` }, { status: 502 });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ answer: answer || fallbackAnswer(cleanMessage), mode: "ai" });
  } catch {
    return NextResponse.json({ error: "The live AI assistant is temporarily unavailable." }, { status: 500 });
  }
}
