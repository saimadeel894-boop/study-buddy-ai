import { Header } from "@/components/Header";
import { ChatInterface } from "@/components/ChatInterface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  History, 
  BookMarked, 
  Settings,
  ChevronRight,
  MessageSquare,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const recentChats = [
  { id: 1, title: "Quadratic equations help", time: "2 hours ago" },
  { id: 2, title: "Essay writing tips", time: "Yesterday" },
  { id: 3, title: "Python basics", time: "2 days ago" },
];

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex pt-16">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden lg:flex w-72 border-r border-border bg-card/50 flex-col">
          <div className="p-4 border-b border-border">
            <Button variant="hero" className="w-full" size="lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Recent Chats */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Chats
              </h3>
              <ul className="space-y-1">
                {recentChats.map((chat) => (
                  <li key={chat.id}>
                    <button className="w-full text-left p-2.5 rounded-lg hover:bg-secondary transition-colors group">
                      <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{chat.time}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Saved */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <BookMarked className="w-4 h-4" />
                Saved Answers
              </h3>
              <p className="text-xs text-muted-foreground p-2">
                Save helpful answers for quick reference
              </p>
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">Upgrade to Premium</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get unlimited AI help and advanced features
              </p>
              <Button variant="accent" size="sm" className="w-full" asChild>
                <Link to="/pricing">
                  Upgrade Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-border px-4 py-3 bg-card/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-semibold text-foreground">AI Study Assistant</h1>
                <p className="text-xs text-muted-foreground">Ask me anything about your studies</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              Online
            </Badge>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </main>
      </div>
    </div>
  );
}
