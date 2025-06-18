
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromotionalBannerProps {
  type: "top" | "content";
  content?: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundColor?: string;
    textColor?: string;
  };
  isVisible?: boolean;
  onClose?: () => void;
}

export const PromotionalBanner = ({ 
  type, 
  content, 
  isVisible = true, 
  onClose 
}: PromotionalBannerProps) => {
  const [isVisible2, setIsVisible] = useState(isVisible);

  if (!isVisible2 || !content) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (type === "top") {
    return (
      <div 
        className="w-full py-3 px-4 text-center relative animate-slide-down"
        style={{ 
          backgroundColor: content.backgroundColor || "var(--brand-primary)",
          color: content.textColor || "white"
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <span className="text-sm font-medium">
              {content.title} - 
              <a 
                href={content.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 underline hover:no-underline transition-all duration-300"
              >
                {content.ctaText}
              </a>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 p-1 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 my-8 animate-fade-in-up">
      <div 
        className="rounded-2xl p-8 text-center relative overflow-hidden"
        style={{ 
          backgroundColor: content.backgroundColor || "var(--brand-primary)",
          color: content.textColor || "white"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">{content.title}</h3>
          <p className="text-lg mb-6 opacity-90">{content.description}</p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <a href={content.ctaLink} target="_blank" rel="noopener noreferrer">
              {content.ctaText}
            </a>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
