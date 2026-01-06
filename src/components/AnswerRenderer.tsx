import { motion } from "framer-motion";

interface AnswerRendererProps {
  content: string;
}

export function AnswerRenderer({ content }: AnswerRendererProps) {
  // Parse markdown-like sections and render with proper styling
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listKey = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-1 my-2">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmedLine = line.trim();

      // Headers with emojis
      if (trimmedLine.startsWith('## ')) {
        flushList();
        const headerText = trimmedLine.slice(3);
        const hasEmoji = /^[\p{Emoji}]/u.test(headerText);
        elements.push(
          <h3
            key={`h-${i}`}
            className={`font-display font-semibold text-foreground mt-4 mb-2 first:mt-0 ${
              hasEmoji ? 'text-base' : 'text-sm'
            }`}
          >
            {headerText}
          </h3>
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        flushList();
        const stepContent = trimmedLine.replace(/^\d+\.\s/, '');
        elements.push(
          <div key={`step-${i}`} className="flex items-start gap-3 my-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
              {trimmedLine.match(/^\d+/)?.[0]}
            </span>
            <p className="text-sm text-foreground/90 pt-0.5">{renderInlineStyles(stepContent)}</p>
          </div>
        );
        return;
      }

      // Bullet points
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        currentList.push(trimmedLine.slice(2));
        return;
      }

      // Code blocks
      if (trimmedLine.startsWith('```')) {
        flushList();
        return;
      }

      // Regular paragraphs
      if (trimmedLine) {
        flushList();
        elements.push(
          <p key={`p-${i}`} className="text-sm text-foreground/90 my-2 leading-relaxed">
            {renderInlineStyles(trimmedLine)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  const renderInlineStyles = (text: string) => {
    // Handle bold text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Handle inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((codePart, j) => {
        if (codePart.startsWith('`') && codePart.endsWith('`')) {
          return (
            <code key={`${i}-${j}`} className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono text-primary">
              {codePart.slice(1, -1)}
            </code>
          );
        }
        return codePart;
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose-sm max-w-none"
    >
      {renderContent()}
    </motion.div>
  );
}
