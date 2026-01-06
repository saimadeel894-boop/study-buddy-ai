import { Link } from "react-router-dom";
import { GraduationCap, Heart, Coffee } from "lucide-react";

export function StudentFooter() {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Study<span className="text-gradient">AI</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/chat" className="hover:text-foreground transition-colors">AI Assistant</Link>
            <Link to="/library" className="hover:text-foreground transition-colors">Study Hub</Link>
            <Link to="/solver" className="hover:text-foreground transition-colors">Homework Solver</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium">
              <Coffee className="w-4 h-4" />
              Support Us
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for students everywhere
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Free to use • No signup required • Learn anything, anytime
          </p>
        </div>
      </div>
    </footer>
  );
}
