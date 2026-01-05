import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, 
  FlaskConical, 
  Globe, 
  BookText, 
  Code, 
  Languages,
  Music,
  Palette
} from "lucide-react";

const subjects = [
  { icon: Calculator, name: "Mathematics", topics: "Algebra, Calculus, Statistics", color: "bg-blue-500" },
  { icon: FlaskConical, name: "Science", topics: "Physics, Chemistry, Biology", color: "bg-green-500" },
  { icon: Globe, name: "History", topics: "World History, Civics, Geography", color: "bg-amber-500" },
  { icon: BookText, name: "Literature", topics: "Essays, Analysis, Creative Writing", color: "bg-rose-500" },
  { icon: Code, name: "Computer Science", topics: "Programming, Algorithms, Web Dev", color: "bg-purple-500" },
  { icon: Languages, name: "Languages", topics: "English, Spanish, French, German", color: "bg-teal-500" },
  { icon: Music, name: "Music", topics: "Theory, History, Composition", color: "bg-pink-500" },
  { icon: Palette, name: "Arts", topics: "Art History, Design, Architecture", color: "bg-orange-500" },
];

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Master Any <span className="text-gradient">Subject</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI is trained across all major academic subjects and can help you 
            from elementary school through university level.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-border/50">
                <CardContent className="p-5 text-center">
                  <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <subject.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {subject.topics}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
