import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calculator, 
  FlaskConical, 
  Globe, 
  BookText, 
  Code, 
  Languages,
  FileText,
  Clock,
  Users,
  ChevronRight,
  Star
} from "lucide-react";

const categories = [
  { id: "all", name: "All Subjects", icon: null },
  { id: "math", name: "Mathematics", icon: Calculator },
  { id: "science", name: "Science", icon: FlaskConical },
  { id: "history", name: "History", icon: Globe },
  { id: "literature", name: "Literature", icon: BookText },
  { id: "coding", name: "Coding", icon: Code },
  { id: "languages", name: "Languages", icon: Languages },
];

const resources = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    level: "Beginner",
    type: "Notes",
    duration: "15 min read",
    students: 2340,
    rating: 4.8,
    icon: Calculator,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Photosynthesis Deep Dive",
    subject: "Science",
    level: "Intermediate",
    type: "Notes",
    duration: "20 min read",
    students: 1856,
    rating: 4.9,
    icon: FlaskConical,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "World War II Timeline",
    subject: "History",
    level: "All Levels",
    type: "Summary",
    duration: "10 min read",
    students: 3210,
    rating: 4.7,
    icon: Globe,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Python for Beginners",
    subject: "Coding",
    level: "Beginner",
    type: "Tutorial",
    duration: "30 min read",
    students: 4521,
    rating: 4.9,
    icon: Code,
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "Essay Writing Guide",
    subject: "Literature",
    level: "All Levels",
    type: "Guide",
    duration: "25 min read",
    students: 2890,
    rating: 4.6,
    icon: BookText,
    color: "bg-rose-500",
  },
  {
    id: 6,
    title: "Spanish Vocabulary 101",
    subject: "Languages",
    level: "Beginner",
    type: "Flashcards",
    duration: "15 min practice",
    students: 1678,
    rating: 4.8,
    icon: Languages,
    color: "bg-teal-500",
  },
];

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory === "all" || 
      resource.subject.toLowerCase().includes(selectedCategory);
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Content <span className="text-gradient">Library</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access structured learning materials, notes, and practice questions 
              organized by subject and level.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for topics, subjects..."
                  className="pl-12 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="lg" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Resources Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <resource.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <Badge variant="secondary">{resource.type}</Badge>
                    </div>
                    
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span>{resource.subject}</span>
                      <span>•</span>
                      <span>{resource.level}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {resource.students.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-sm font-medium text-foreground">{resource.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Resources
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
