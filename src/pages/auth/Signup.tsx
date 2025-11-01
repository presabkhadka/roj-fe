import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Mail, Lock, Eye, EyeOff, User, Users, Building2, Sparkles, Loader, ArrowRight, Tag } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<'SEEKER' | 'POSTER'>('SEEKER');
  const [skills, setSkills] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('loaded');
      }
    }, 100);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || firstName.length < 3) {
      toast.error("First name must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (!lastName || lastName.length < 3) {
      toast.error("Last name must be at least 3 characters");
      setLoading(false);
      return;
    }

    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Convert skills string to array (comma-separated)
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    try {
      let api = import.meta.env.VITE_BASE_URL;
      await axios.post(`${api}/users/signup`, {
        firstName,
        lastName,
        username,
        email,
        password,
        userTypes: userType,
        skills: skillsArray,
      });

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative grid-bg">
      <style>{`
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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .loaded .logo-section {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .loaded .form-section {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .loaded .welcome-text {
          animation: slideInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .loaded .tagline {
          animation: slideInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .loaded .form-container {
          animation: fadeInScale 0.8s ease-out 0.3s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .gradient-text {
          background: linear-gradient(to right, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-button {
          animation: glow 2s ease-in-out infinite;
        }

        .input-focus:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        .floating-icon:nth-child(2) {
          animation-delay: 1s;
        }

        .floating-icon:nth-child(3) {
          animation-delay: 2s;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div ref={containerRef} className="min-h-screen grid md:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="logo-section hidden md:flex flex-col justify-center items-center p-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent"></div>

          {/* Floating Icons */}
          <div className="absolute top-20 left-20 floating-icon">
            <div className="bg-purple-600/20 p-4 rounded-2xl backdrop-blur">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="absolute bottom-32 left-32 floating-icon">
            <div className="bg-pink-600/20 p-4 rounded-2xl backdrop-blur">
              <Building2 className="w-8 h-8 text-pink-400" />
            </div>
          </div>
          <div className="absolute top-40 right-20 floating-icon">
            <div className="bg-purple-600/20 p-4 rounded-2xl backdrop-blur">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Briefcase className="w-16 h-16 text-purple-400" />
              <span className="text-6xl font-bold gradient-text">Rojgar</span>
            </div>

            <h1 className="welcome-text text-5xl font-bold mb-6 leading-tight">
              Register an account ✅
            </h1>

            <p className="tagline text-xl text-purple-300 font-semibold mb-4">
              Where AI Meets Opportunity
            </p>

            <p className="text-slate-300 text-lg max-w-md mx-auto">
              Join Rojgar today and experience intelligent job matching powered by AI. Create your account to get started.
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="form-section flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center space-x-2 mb-6">
              <Briefcase className="w-10 h-10 text-purple-400" />
              <span className="text-4xl font-bold gradient-text">Rojgar</span>
            </div>

            <div className="form-container bg-slate-800/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-purple-500/20 shadow-2xl my-6">
              <h2 className="text-3xl font-bold mb-2 text-center">Create Account</h2>
              <p className="text-slate-400 text-center mb-6">Join us and start your journey</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name - Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-slate-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      id="username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type={isVisible ? "text" : "password"}
                      id="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition"
                    >
                      {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('SEEKER')}
                      className={`p-3 rounded-xl border-2 transition-all ${userType === 'SEEKER'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                        }`}
                    >
                      <Users className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                      <span className="text-sm font-semibold">Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('POSTER')}
                      className={`p-3 rounded-xl border-2 transition-all ${userType === 'POSTER'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                        }`}
                    >
                      <Building2 className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                      <span className="text-sm font-semibold">Employer</span>
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label htmlFor="skills" className="block text-sm font-semibold text-slate-300 mb-2">
                    Skills (comma-separated)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      id="skills"
                      placeholder="e.g. PHP, JavaScript, React"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${loading
                    ? 'bg-purple-600/50 cursor-not-allowed'
                    : 'glow-button bg-purple-600 hover:bg-purple-700'
                    }`}
                >
                  {loading ? (
                    <Loader className="w-5 h-5 spinner" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center text-slate-400 text-sm italic">
                  Already have an account?{' '}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-purple-400 hover:text-purple-300 font-semibold underline cursor-pointer transition"
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>

            {/* Mobile Tagline */}
            <p className="md:hidden text-center text-slate-400 mt-6 text-sm">
              Where AI Meets Opportunity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
