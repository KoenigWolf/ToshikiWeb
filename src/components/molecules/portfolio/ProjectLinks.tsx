import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

// Props for ProjectLinks component
export interface ProjectLinksProps {
  githubUrl?: string; // GitHub repository URL
  demoUrl?: string;   // Demo site URL
  className?: string; // Additional CSS classes
}

// Component to display project links (GitHub & Live Demo)
// Returns null if neither URL is provided.
export function ProjectLinks({
  githubUrl,
  demoUrl,
  className = "mb-12",
}: ProjectLinksProps) {
  // If no URLs are provided, render nothing.
  if (!githubUrl && !demoUrl) {
    return null;
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      {githubUrl && (
        // Button linking to GitHub repository
        <Button asChild>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub リポジトリを表示" // Accessibility label
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </a>
        </Button>
      )}

      {demoUrl && (
        // Button linking to the demo site
        <Button asChild variant="outline">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="デモサイトを表示" // Accessibility label
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        </Button>
      )}
    </div>
  );
}
