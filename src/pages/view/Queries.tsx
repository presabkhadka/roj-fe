import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Briefcase, Send, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionsResponse {
  technical: string[];
  behavioral: string[];
  technicalAnswers: string[];
  behavioralAnswers: string[];
}

export default function QueryPage() {
  const [techStack, setTechStack] = useState("");
  const [messages, setMessages] = useState<{ type: "user" | "ai"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userType = localStorage.getItem("UserType");

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleHomePage = () => navigate("/user/home");
  const handleProfilePage = () => navigate("/user/profile");
  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    localStorage.removeItem("UserType")
    navigate('/');
  }

  const handleSubmit = async () => {
    if (!techStack.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: techStack }]);
    setLoading(true);

    try {
      const res = await axios.get<QuestionsResponse>(
        `http://localhost:3000/jobs/questions/${techStack.trim().toLowerCase()}`
      );

      const aiResponse = [
        ...res.data.technical.map((q, i) => `Technical ${i + 1}: ${q}`),
        ...res.data.behavioral.map((q, i) => `Behavioral ${i + 1}: ${q}`),
      ].join("\n\n");

      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: "ai", content: "Failed to fetch questions." }]);
    } finally {
      setLoading(false);
      setTechStack("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold gradient-text">Rojgar</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a onClick={handleHomePage} className="hover:text-purple-400 transition">Home</a>
            <a className="text-purple-400 font-semibold transition">Mock Questions</a>
            <a onClick={handleProfilePage} className="hover:text-purple-400 transition">Profile</a>
            <a onClick={handleLogout} className="hover:text-purple-400 transition">Logout</a>
          </div>
          {userType === "POSTER" && (
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition">
              Post a Job
            </button>
          )}
        </div>
      </nav>


      {/* Chat Area */}
      <div className="flex-1 mt-32 px-6 pb-24 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-full rounded-xl p-4 whitespace-pre-line ${msg.type === "user"
              ? "self-end bg-purple-700/60 text-white"
              : "self-start bg-slate-800/50 text-purple-200"
              }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-slate-800/50 text-purple-200 rounded-xl p-4 animate-pulse">
            Generating response...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-4 left-0 w-full px-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter a tech stack (e.g., backend_development)"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 rounded-full px-4 py-3 bg-slate-800/50 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full transition flex items-center gap-2"
        >
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
}

