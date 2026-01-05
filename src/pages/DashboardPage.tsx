import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  BookOpen, 
  Trophy, 
  Flame, 
  Clock, 
  Target,
  ChevronRight,
  TrendingUp,
  Star,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: MessageSquare, label: "Questions Asked", value: "47", change: "+12 this week" },
  { icon: BookOpen, label: "Topics Studied", value: "15", change: "+3 this week" },
  { icon: Flame, label: "Day Streak", value: "7", change: "Keep it up!" },
  { icon: Trophy, label: "Badges Earned", value: "5", change: "2 more to unlock" },
];

const recentActivity = [
  { subject: "Mathematics", topic: "Quadratic Equations", time: "2 hours ago", status: "completed" },
  { subject: "Science", topic: "Photosynthesis", time: "Yesterday", status: "completed" },
  { subject: "History", topic: "World War II", time: "2 days ago", status: "in-progress" },
  { subject: "Coding", topic: "Python Loops", time: "3 days ago", status: "completed" },
];

const upcomingGoals = [
  { title: "Complete Algebra Chapter", progress: 75, due: "Tomorrow" },
  { title: "Science Quiz Prep", progress: 40, due: "In 3 days" },
  { title: "Essay Draft", progress: 20, due: "Next week" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome back, Student! 👋
            </h1>
            <p className="text-muted-foreground">
              You're on a 7-day streak! Keep up the great work.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                    <div className="font-display text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-xs text-success mt-2">{stat.change}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Button variant="hero" size="lg" className="h-auto py-4 flex-col" asChild>
                      <Link to="/chat">
                        <MessageSquare className="w-6 h-6 mb-2" />
                        Ask AI
                      </Link>
                    </Button>
                    <Button variant="secondary" size="lg" className="h-auto py-4 flex-col" asChild>
                      <Link to="/library">
                        <BookOpen className="w-6 h-6 mb-2" />
                        Content Library
                      </Link>
                    </Button>
                    <Button variant="secondary" size="lg" className="h-auto py-4 flex-col" asChild>
                      <Link to="/planner">
                        <Calendar className="w-6 h-6 mb-2" />
                        Study Planner
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Recent Activity
                    </span>
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{activity.topic}</p>
                          <p className="text-sm text-muted-foreground">{activity.subject}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={activity.status === "completed" ? "success" : "secondary"}>
                            {activity.status === "completed" ? (
                              <><CheckCircle2 className="w-3 h-3 mr-1" /> Done</>
                            ) : (
                              "In Progress"
                            )}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Your Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingGoals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{goal.title}</span>
                        <span className="text-xs text-muted-foreground">{goal.due}</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Add New Goal
                  </Button>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Recent Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 flex-wrap">
                    {["🔥", "📚", "🧠", "⭐", "🎯"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-xl"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    View All Badges
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* Upgrade CTA */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-foreground">Go Premium</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unlock unlimited AI help, advanced features, and more!
                  </p>
                  <Button variant="accent" className="w-full" asChild>
                    <Link to="/pricing">Upgrade Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
