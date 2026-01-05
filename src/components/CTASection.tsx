import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Start Your Learning Journey Today
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="text-gradient"> Study Habits?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of students who are already learning smarter with StudyAI. 
            Start your free trial today — no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/chat">Try AI Chat Demo</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            ✨ 7-day free trial on Premium plans • 🔒 100% secure • 💚 Student-friendly pricing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
