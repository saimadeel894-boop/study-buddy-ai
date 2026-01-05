import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Calculator, 
  FlaskConical, 
  BookText,
  Code,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: Calculator, text: "Explain quadratic equations step by step" },
  { icon: FlaskConical, text: "What is photosynthesis and how does it work?" },
  { icon: BookText, text: "Help me analyze Shakespeare's themes" },
  { icon: Code, text: "How do I create a for loop in Python?" },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI study assistant. 📚 I can help you with math, science, history, coding, and more. What would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (this will be replaced with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gradient-primary text-primary-foreground shadow-glow"
              }`}>
                {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                <Card className={`p-4 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card border-border/50"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </Card>
                {message.role === "assistant" && (
                  <div className="flex gap-2 mt-2">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <Card className="p-4 bg-card border-border/50">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </Card>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            Try asking:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSuggestedQuestion(q.text)}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary text-left transition-colors group"
              >
                <q.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
                  {q.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card/50">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask any study question..."
              className="pr-12 h-12"
            />
            <Badge variant="secondary" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI
            </Badge>
          </div>
          <Button 
            variant="hero" 
            size="icon" 
            className="h-12 w-12" 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          StudyAI can make mistakes. Always verify important information.
        </p>
      </div>
    </div>
  );
}

function generateMockResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes("quadratic") || q.includes("equation")) {
    return `Great question! Let me explain **quadratic equations** step by step:

📐 **What is a Quadratic Equation?**
A quadratic equation has the form: ax² + bx + c = 0

🔢 **The Quadratic Formula**
x = (-b ± √(b² - 4ac)) / 2a

📝 **Example**
Solve: x² + 5x + 6 = 0

Step 1: Identify a=1, b=5, c=6
Step 2: Calculate discriminant: 5² - 4(1)(6) = 25 - 24 = 1
Step 3: Apply formula: x = (-5 ± √1) / 2
Step 4: x = -2 or x = -3

Would you like me to work through another example?`;
  }
  
  if (q.includes("photosynthesis")) {
    return `Excellent question! Here's how **photosynthesis** works:

🌱 **What is Photosynthesis?**
It's how plants convert sunlight into food (glucose).

⚗️ **The Chemical Equation**
6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

📍 **Where it Happens**
In the chloroplasts, specifically the thylakoids and stroma.

🔬 **Two Main Stages**
1. **Light Reactions**: Capture sunlight, split water, produce ATP
2. **Calvin Cycle**: Use ATP to convert CO₂ into glucose

🌍 **Why it Matters**
- Produces oxygen we breathe
- Creates food for plants (and us!)
- Removes CO₂ from atmosphere

Want me to explain either stage in more detail?`;
  }

  return `That's a great question! Let me help you understand this topic.

📚 **Key Points:**
- I'll break this down into simple, understandable parts
- Each concept builds on the previous one
- Practice is key to mastering this topic

💡 **Here's my explanation:**
This is where I would provide a detailed, step-by-step explanation of your specific question. I'd include examples, diagrams descriptions, and practice problems.

📝 **Next Steps:**
1. Review the main concepts
2. Try some practice problems
3. Ask me if you get stuck!

Would you like me to go deeper into any specific part?`;
}
