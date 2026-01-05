import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  BookOpen, 
  FileQuestion, 
  Calendar,
  BarChart3,
  Zap,
  Shield,
  Trophy
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "AI Study Chat",
    description: "Ask any question and get clear, step-by-step explanations instantly. Like having a tutor in your pocket.",
    color: "from-primary to-primary-glow",
  },
  {
    icon: BookOpen,
    title: "Content Library",
    description: "Access structured notes, summaries, and practice questions organized by subject and grade level.",
    color: "from-accent to-accent",
  },
  {
    icon: FileQuestion,
    title: "Homework Help",
    description: "Upload or type your homework problems and get detailed solutions with explanations.",
    color: "from-success to-success",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    description: "Create personalized study schedules based on your goals. AI suggests the best time allocation.",
    color: "from-primary to-primary-glow",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and insights on your performance.",
    color: "from-accent to-accent",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, maintain streaks, and compete on leaderboards to stay motivated.",
    color: "from-success to-success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Excel</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From instant AI tutoring to personalized study plans, we've got all the tools 
            you need to succeed academically.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group border-border/50">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">COPPA Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">Data Encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">24/7 Available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
