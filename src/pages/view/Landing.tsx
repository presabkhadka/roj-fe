import React, { useEffect, useRef } from 'react';
import { Briefcase, Users, Mail, TrendingUp, Zap, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const RojgarLanding = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate GSAP-like animations with CSS classes
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    // Hero animation on mount
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('hero-loaded');
      }
    }, 100);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Advanced similarity scoring analyzes skills and requirements to find perfect candidate-job matches in seconds."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Automated Emails",
      description: "Personalized outreach to top candidates and constructive feedback for rejected applicants automatically."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Skill Improvement Insights",
      description: "Candidates receive actionable feedback on skills to develop, turning rejections into growth opportunities."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Transparent Process",
      description: "Clear, skill-driven evaluation removes bias and uncertainty from the hiring journey."
    }
  ];

  const stats = [
    { value: "95%", label: "Match Accuracy" },
    { value: "10x", label: "Faster Hiring" },
    { value: "1000+", label: "Successful Placements" },
    { value: "24/7", label: "Automated Processing" }
  ];

  const moveToLogin = () => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1]
    if (!token) {
      navigate("/login")
    } else {
      navigate("/user/home")
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }

        .hero-loaded .hero-title {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero-loaded .hero-subtitle {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .hero-loaded .hero-description {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .hero-loaded .hero-cta {
          animation: fadeInScale 0.8s ease-out 0.6s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
        }

        .stat-card {
          animation: float 3s ease-in-out infinite;
        }

        .stat-card:nth-child(2) {
          animation-delay: 0.5s;
        }

        .stat-card:nth-child(3) {
          animation-delay: 1s;
        }

        .stat-card:nth-child(4) {
          animation-delay: 1.5s;
        }

        .glow-button {
          animation: glow 2s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(to right, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold gradient-text">Rojgar</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-purple-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition">How It Works</a>
            <a href="#stats" className="hover:text-purple-400 transition">Impact</a>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition" onClick={moveToLogin}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 grid-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Where AI Meets <span className="gradient-text">Opportunity</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-purple-300 mb-4 font-semibold">
            Intelligent Job Matching, Automated Hiring
          </p>
          <p className="hero-description text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Transform your hiring process with AI-powered matching that analyzes skills, finds perfect candidates,
            and automates personalized communication — all while providing valuable feedback to every applicant.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="glow-button bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-2 transition">
              <span>Start Matching Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full font-bold text-lg transition">
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful Features That <span className="gradient-text">Deliver Results</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="animate-on-scroll feature-card bg-gradient-to-br from-purple-900/30 to-slate-800/30 backdrop-blur p-8 rounded-2xl border border-purple-500/20"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="bg-purple-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-center mb-16">
            Simple, <span className="gradient-text">Intelligent</span>, Effective
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "AI Analysis", desc: "Our AI analyzes job descriptions and candidate profiles to understand skill requirements and expertise." },
              { step: "02", title: "Smart Matching", desc: "Advanced similarity scoring identifies the best candidate-job matches based on skills and qualifications." },
              { step: "03", title: "Auto Communication", desc: "Top candidates receive personalized offers, while others get constructive feedback for growth." }
            ].map((item, idx) => (
              <div key={idx} className="animate-on-scroll text-center" style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="text-6xl font-bold text-purple-600/30 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="py-20 px-6 bg-gradient-to-br from-purple-900/20 to-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold text-center mb-16">
            The <span className="gradient-text">Impact</span> We Deliver
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="animate-on-scroll stat-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur p-8 rounded-2xl border border-purple-500/30 text-center"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-300 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="gradient-text">Hiring Process?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of companies using AI to find the perfect candidates faster and more accurately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glow-button bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-2 transition">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-purple-400 hover:bg-purple-400/10 px-10 py-4 rounded-full font-bold text-lg transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 px-6 bg-slate-900/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold gradient-text">Rojgar</span>
          </div>
          <p className="text-slate-400">© 2025 Rojgar. Where AI Meets Opportunity.</p>
        </div>
      </footer>
    </div>
  );
};

export default RojgarLanding;
