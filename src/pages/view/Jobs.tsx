import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Briefcase, Search, MapPin, Clock, Calendar, TrendingUp, Sparkles, Building2, ArrowRight, Filter, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define your Job type based on your backend
interface Job {
  id: number;
  title: string;
  description: string;
  category?: string[];
  createdAt: string;
  closedAt: string;
  [key: string]: any; // optional to allow extra fields like embeddings
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]); // ✅ tell TypeScript what type of data this is
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const userType = localStorage.getItem('UserType')
  const navigate = useNavigate()

  // Form states
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [closedAt, setClosedAt] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    axios
      .get<Job[]>("http://localhost:3000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));

    // Trigger hero animation
    setTimeout(() => {
      if (heroRef.current) {
        heroRef.current.classList.add('hero-loaded');
      }
    }, 100);
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfilePage = () => {
    navigate('/user/profile')
  }

  const handleHomePage = () => {
    navigate('/user/home');
  }

  const handleQueryPage = () => {
    navigate('/user/query');
  }

  const handleLogout = () => {
    localStorage.removeItem("Authorization")
    localStorage.removeItem("UserType")
    navigate('/');
  }


  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert category string to array (comma-separated)
      const categoryArray = category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0);

      const jobData = {
        title,
        description,
        createdAt: new Date(createdAt).toISOString(),
        closedAt: new Date(closedAt).toISOString(),
        category: categoryArray,
        embeddings: null,
        userId,
      };

      await axios.post("http://localhost:3000/jobs", jobData);

      // Success - refresh jobs list
      const response = await axios.get<Job[]>("http://localhost:3000/jobs");
      setJobs(response.data);

      // Reset form and close dialog
      setTitle("");
      setDescription("");
      setCreatedAt("");
      setClosedAt("");
      setCategory("");
      setUserId("");
      setIsDialogOpen(false);

      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .hero-loaded .hero-title {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero-loaded .hero-subtitle {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .hero-loaded .hero-search {
          animation: fadeInScale 0.8s ease-out 0.4s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .job-card {
          animation: fadeInUp 0.6s ease-out forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .job-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
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

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        .floating-icon:nth-child(2) {
          animation-delay: 1s;
        }

        .stat-badge {
          animation: slideIn 0.6s ease-out forwards;
        }

        .input-focus:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold gradient-text">Rojgar</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a onClick={handleHomePage} className="hover:text-purple-400 transition">Home</a>
            <a onClick={handleQueryPage} className="hover:text-purple-400 transition">Mock Questions</a>
            <a onClick={handleProfilePage} className="hover:text-purple-400 transition">Profile</a>
            <a onClick={handleLogout} className="hover:text-purple-400 transition">Logout</a>
          </div>

          {userType === "POSTER" ?
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition" onClick={() => setIsDialogOpen(true)}>
              Post a Job
            </button>
            :
            ""
          }
        </div>
      </nav>

      {/* Post Job Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-3xl border border-purple-500/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-xl border-b border-purple-500/20 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold gradient-text">Post a New Job</h2>
                <p className="text-slate-400 text-sm mt-1">Fill in the details to create a job posting</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-slate-400 hover:text-white transition p-2 hover:bg-slate-700/50 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePostJob} className="p-6 space-y-5">
              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  placeholder="e.g. Senior React Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-2">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all resize-none"
                />
              </div>

              {/* Created At & Closed At - Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="createdAt" className="block text-sm font-semibold text-slate-300 mb-2">
                    Opening Date *
                  </label>
                  <input
                    type="datetime-local"
                    id="createdAt"
                    required
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="closedAt" className="block text-sm font-semibold text-slate-300 mb-2">
                    Closing Date *
                  </label>
                  <input
                    type="datetime-local"
                    id="closedAt"
                    required
                    value={closedAt}
                    onChange={(e) => setClosedAt(e.target.value)}
                    className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-300 mb-2">
                  Categories (comma-separated) *
                </label>
                <input
                  type="text"
                  id="category"
                  required
                  placeholder="e.g. React, JavaScript, Frontend"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Separate multiple categories with commas</p>
              </div>

              {/* User ID */}
              <div>
                <label htmlFor="userId" className="block text-sm font-semibold text-slate-300 mb-2">
                  User ID *
                </label>
                <input
                  type="text"
                  id="userId"
                  required
                  placeholder="Enter your user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2 ${loading
                    ? 'bg-purple-600/50 cursor-not-allowed'
                    : 'glow-button bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Post Job</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 grid-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>

        {/* Floating Icons */}
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

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="gradient-text">Dream Job</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Explore thousands of AI-matched opportunities tailored to your skills and passion
          </p>

          {/* Search Bar */}
          <div className="hero-search max-w-3xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-3 border border-purple-500/20 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search jobs, titles, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-focus w-full bg-slate-900/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 transition-all"
                  />
                </div>
                <button className="glow-button bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition flex items-center justify-center space-x-2">
                  <span>Search Jobs</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="stat-badge flex items-center space-x-2 bg-purple-600/20 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold">{jobs.length}+ Active Jobs</span>
              </div>
              <div className="stat-badge flex items-center space-x-2 bg-purple-600/20 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30" style={{ animationDelay: '0.1s' }}>
                <Building2 className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-semibold">500+ Companies</span>
              </div>
              <div className="stat-badge flex items-center space-x-2 bg-purple-600/20 backdrop-blur px-4 py-2 rounded-full border border-purple-500/30" style={{ animationDelay: '0.2s' }}>
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold">95% Match Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              Latest <span className="gradient-text">Openings</span>
            </h2>
            <p className="text-slate-400">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
            </p>
          </div>
          <button className="hidden md:flex items-center space-x-2 bg-slate-800/50 backdrop-blur border border-purple-500/20 px-4 py-2 rounded-xl hover:bg-slate-700/50 transition">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/30 backdrop-blur rounded-2xl border border-purple-500/20 p-12 inline-block">
              <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Loading amazing opportunities...</p>
            </div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/30 backdrop-blur rounded-2xl border border-purple-500/20 p-12 inline-block">
              <Search className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No jobs found matching your search.</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="job-card bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 shadow-xl"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-600/20 p-3 rounded-xl">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                    Active
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">{job.title}</h3>
                <p className="text-slate-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {job.description}
                </p>

                {/* Categories */}
                {job.category && job.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.category.slice(0, 3).map((cat: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30"
                      >
                        {cat}
                      </span>
                    ))}
                    {job.category.length > 3 && (
                      <span className="text-xs text-slate-500 px-2 py-1">
                        +{job.category.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Dates */}
                <div className="space-y-2 mb-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-pink-400" />
                    <span>Closes: {new Date(job.closedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      {
        userType === 'SEEKER' ?
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-12 text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Hired?
              </h2>
              <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                Post your skills and let our AI match you with the perfect job in minutes.
              </p>
            </div>
          </section>
          :
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-12 text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Hire Top Talent?
              </h2>
              <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                Post your job and let our AI match you with the perfect candidates in minutes.
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition" onClick={() => setIsDialogOpen(true)}>
                Post a Job
              </button>
            </div>
          </section>
      }

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold gradient-text">Rojgar</span>
          </div>
          <p className="text-slate-400">
            © {new Date().getFullYear()} Rojgar – Where AI Meets Opportunity
          </p>
        </div>
      </footer>
    </div>
  );
}
