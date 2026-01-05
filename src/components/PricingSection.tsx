import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      "5 AI questions per day",
      "Basic explanations",
      "Access to content library",
      "1 subject focus",
      "Community support",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "Best for serious students",
    icon: Sparkles,
    features: [
      "Unlimited AI questions",
      "Advanced step-by-step solutions",
      "Full content library access",
      "All subjects unlocked",
      "Study planner & reminders",
      "Progress tracking",
      "Priority support",
    ],
    cta: "Start 7-Day Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Premium+",
    price: "$19.99",
    period: "per month",
    description: "For power learners",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Downloadable notes & PDFs",
      "1-on-1 AI tutoring sessions",
      "Exam prep mode",
      "Parent progress reports",
      "Early access to new features",
      "Dedicated support",
    ],
    cta: "Start 7-Day Trial",
    variant: "accent" as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. All plans include a 7-day 
            free trial with no credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-primary text-primary-foreground shadow-glow px-4">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`h-full ${plan.popular ? "border-primary shadow-glow ring-1 ring-primary/20" : "border-border/50"} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${plan.popular ? "bg-gradient-primary" : "bg-secondary"} flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`} />
                  </div>
                  <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="pt-4">
                    <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.variant} size="lg" className="w-full" asChild>
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            💳 No credit card required for free trial • Cancel anytime • 
            <a href="#" className="text-primary hover:underline ml-1">Educational discounts available</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
