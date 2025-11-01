import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Mail, MapPin, UserCircle2, Star, TrendingUp, Building2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  skills: string[];
  userType: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const userType = localStorage.getItem('UserType');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>(
          "http://localhost:3000/users/8d75ccf2-e152-41ed-ab28-213b5a3b7dbd"
        );
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user profile");
      }
    };
    fetchUser();
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  if (!user) return null;

  const handleProfilePage = () => navigate('/user/profile');
  const handleHomePage = () => navigate('/user/home');
  const handleQueryPage = () => navigate('/user/query');
  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    localStorage.removeItem("UserType")
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .hero-loaded .profile-card { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .floating-icon { animation: float 3s ease-in-out infinite; }
      `}</style>

      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold gradient-text">Rojgar</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a onClick={handleHomePage} className="hover:text-purple-400 transition">Home</a>
            <a onClick={handleQueryPage} className="hover:text-purple-400 transition">Mock Questions</a>
            <a onClick={handleProfilePage} className="text-purple-400 font-semibold hover:text-purple-400 transition">Profile</a>
            <a onClick={handleLogout} className="hover:text-purple-400 transition">Logout</a>
          </div>

          {userType === "POSTER" &&
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition">
              Post a Job
            </button>
          }
        </div>
      </nav>

      <div className="absolute top-40 right-20 floating-icon hidden lg:block">
        <div className="bg-purple-600/20 p-4 rounded-2xl backdrop-blur">
          <TrendingUp className="w-8 h-8 text-purple-400" />
        </div>
      </div>
      <div className="absolute top-60 left-20 floating-icon hidden lg:block">
        <div className="bg-pink-600/20 p-4 rounded-2xl backdrop-blur">
          <Building2 className="w-8 h-8 text-pink-400" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-32">
        <div className="profile-card bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-40 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
                alt="profile avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          <div className="mt-20 px-8 pb-10 text-center">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {user.firstName} {user.lastName}
            </h1>

            <div className="mt-3 inline-flex items-center px-4 py-1 rounded-full bg-purple-600/20 text-purple-400 font-semibold text-sm">
              <UserCircle2 size={16} className="mr-2" />
              {user.userType}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-purple-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-pink-400" />
                <span>{user.address}</span>
              </div>
            </div>

            <div className="mt-8 border-t border-purple-500/20" />

            <div className="mt-8 text-left">
              <h2 className="flex items-center text-lg font-semibold text-white mb-3">
                <Star size={18} className="text-yellow-400 mr-2" />
                Skills
              </h2>
              {user.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-600/20 text-purple-200 text-sm font-medium rounded-full hover:bg-purple-600/30 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-purple-400 italic">No skills added yet.</p>
              )}
            </div>

            <div className="mt-10 pt-4 border-t border-purple-500/20">
              <p className="text-sm text-purple-300">
                Profile last updated recently • © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

