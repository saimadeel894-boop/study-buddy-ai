import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Globe, 
  Code, 
  History,
  Lightbulb,
  ArrowRight,
  Zap,
  Brain,
  Target,
  Clock,
  Trash2,
  Heart,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentHeader } from "@/components/StudentHeader";
import { StudentFooter } from "@/components/StudentFooter";
import { useStudySession } from "@/hooks/useLocalStorage";

const subjects = [
  { id: "math", name: "Mathematics", icon: Calculator, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { id: "science", name: "Science", icon: FlaskConical, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { id: "english", name: "English", icon: BookOpen, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { id: "history", name: "History", icon: Globe, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { id: "coding", name: "Computer Science", icon: Code, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { id: "general", name: "General Knowledge", icon: Brain, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
];

const quickQuestions = [
  "Explain photosynthesis step by step",
  "How do I solve quadratic equations?",
  "What caused World War 2?",
  "Help me understand Python loops",
  "Explain Newton's laws of motion",
  "What is the Pythagorean theorem?",
];

const features = [
  { 
    icon: Zap, 
    title: "Instant Answers", 
    description: "Get clear explanations in seconds, no waiting" 
  },
  { 
    icon: Brain, 
    title: "Learn to Understand", 
    description: "We teach concepts, not just answers" 
  },
  { 
    icon: Target, 
    title: "Step-by-Step", 
    description: "Every solution broken down clearly" 
  },
  { 
    icon: Clock, 
    title: "Available 24/7", 
    description: "Study anytime, no appointments needed" 
  },
];

const studyTips = [
  "Take short breaks every 25 minutes (Pomodoro Technique)",
  "Teach what you learn to someone else",
  "Practice active recall instead of re-reading",
  "Get enough sleep - it helps memory consolidation",
  "Use spaced repetition for long-term memory",
  "Break big topics into smaller chunks",
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { session, clearRecentTopics } = useStudySession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/chat?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickQuestion = (question: string) => {
    navigate(`/chat?q=${encodeURIComponent(question)}`);
  };

  const randomTip = studyTips[Math.floor(Math.random() * studyTips.length)];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StudentHeader />
      
      {/* Sticky Search Bar (appears on scroll) */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
      >
        <div className="container mx-auto px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything..."
                className="pl-10 h-11"
              />
            </div>
            <Button type="submit" variant="hero" className="h-11 px-6">
              <span className="hidden sm:inline mr-2">Ask</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </motion.div>
      
      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5">
                <Sparkles className="w-3 h-3 mr-2" />
                Free • No Signup Required • Instant Access
              </Badge>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight">
                AI Student <span className="text-gradient">Assistant</span>
              </h1>
              
              <p className="text-sm md:text-base font-medium text-muted-foreground mb-6">
                Created by <span className="text-foreground font-semibold">SAIM ADEEL</span>
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Free AI help for students, instantly. Ask any question, get clear explanations.
              </p>

              {/* Main Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything... 'Explain photosynthesis' or 'How do I solve equations?'"
                    className="pl-14 pr-36 h-16 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-lg bg-card"
                  />
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-xl"
                  >
                    <span className="hidden sm:inline mr-2">Ask AI</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </form>

              {/* Quick Questions */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {quickQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-4 py-2 text-sm bg-card/80 hover:bg-card text-muted-foreground hover:text-foreground rounded-full transition-all border border-border/50 hover:border-primary/30 hover:shadow-md"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Study Tip Banner */}
        <section className="bg-primary/5 border-y border-primary/10 py-4">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-foreground flex items-center justify-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="font-medium">Study Tip:</span> 
              <span className="text-muted-foreground">{randomTip}</span>
            </p>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                What do you want to learn?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose a subject for tailored explanations, or just ask anything
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {subjects.map((subject, i) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => navigate(`/chat?subject=${subject.id}`)}
                    className="w-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div className={`w-14 h-14 rounded-xl ${subject.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <subject.icon className="w-7 h-7" />
                    </div>
                    <p className="font-medium text-foreground">{subject.name}</p>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Why students love StudyAI
              </h2>
              <p className="text-muted-foreground">Learning made simple and effective</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Topics (Session-based) */}
        {session.recentTopics.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <History className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">Continue Learning</h2>
                    <p className="text-sm text-muted-foreground">Pick up where you left off</p>
                  </div>
                </div>
                <button 
                  onClick={clearRecentTopics}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {session.recentTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => navigate(`/chat?q=${encodeURIComponent(topic.query)}`)}
                    className="px-4 py-2.5 bg-card hover:bg-secondary rounded-xl text-sm text-foreground transition-all flex items-center gap-2 border border-border hover:border-primary/30 hover:shadow-sm"
                  >
                    <Badge variant="outline" className="text-xs">{topic.subject}</Badge>
                    <span className="max-w-[200px] truncate">{topic.query}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <MessageSquare className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to start learning?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                  No signup, no login, no barriers. Just ask your question and start understanding concepts better than ever before.
                </p>
                <Button variant="hero" size="lg" onClick={() => navigate("/chat")} className="px-8">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              StudyAI is free for all students. Help us keep it running!
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              Support This Project
            </Button>
          </div>
        </section>
      </main>

      <StudentFooter />
    </div>
  );
}
