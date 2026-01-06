import { useState } from "react";
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
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentHeader } from "@/components/StudentHeader";
import { StudentFooter } from "@/components/StudentFooter";
import { useStudySession } from "@/hooks/useLocalStorage";

const subjects = [
  { id: "math", name: "Mathematics", icon: Calculator, color: "bg-blue-500/10 text-blue-600" },
  { id: "science", name: "Science", icon: FlaskConical, color: "bg-green-500/10 text-green-600" },
  { id: "english", name: "English", icon: BookOpen, color: "bg-purple-500/10 text-purple-600" },
  { id: "history", name: "History", icon: Globe, color: "bg-amber-500/10 text-amber-600" },
  { id: "coding", name: "Computer Science", icon: Code, color: "bg-pink-500/10 text-pink-600" },
  { id: "general", name: "General Knowledge", icon: Brain, color: "bg-cyan-500/10 text-cyan-600" },
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
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { session, clearRecentTopics } = useStudySession();

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
      
      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Free • No Signup Required
              </Badge>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Your AI Study <span className="text-gradient">Assistant</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Ask any question. Get clear explanations. Learn faster.
              </p>

              {/* Main Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything... 'Explain photosynthesis' or 'How do I solve equations?'"
                    className="pl-14 pr-32 h-16 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-lg"
                  />
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6"
                  >
                    <span className="hidden sm:inline mr-2">Ask AI</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </form>

              {/* Quick Questions */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {quickQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Study Tip Banner */}
        <section className="bg-primary/5 border-y border-primary/10 py-3">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-foreground flex items-center justify-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <span className="font-medium">Study Tip:</span> {randomTip}
            </p>
          </div>
        </section>

        {/* Subjects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                What do you want to learn?
              </h2>
              <p className="text-muted-foreground">Choose a subject or just ask anything</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                    <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <subject.icon className="w-6 h-6" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{subject.name}</p>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-card/50 border-border/50">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-foreground">Recent Topics</h2>
                </div>
                <button 
                  onClick={clearRecentTopics}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
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
                    className="px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-xl text-sm text-foreground transition-colors flex items-center gap-2"
                  >
                    <Badge variant="outline" className="text-xs">{topic.subject}</Badge>
                    {topic.query.length > 40 ? topic.query.slice(0, 40) + "..." : topic.query}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to start learning?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  No signup, no login, no barriers. Just ask your question and start understanding.
                </p>
                <Button variant="hero" size="lg" onClick={() => navigate("/chat")}>
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Learning Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <StudentFooter />
    </div>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
