import { Brain } from "lucide-react";

/**
 * Footer — hyper-minimal site footer.
 * Logo + copyright + legal links. Nothing else.
 */

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-[1440px] mx-auto px-16 py-8">
        {/* Single row — logo left, legal right */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo + copyright */}
          <div className="flex items-center gap-3">
            <Brain className="w-4 h-4 text-white/40" />
            <span className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Serenity Mind Psychiatry. All rights reserved.
            </span>
          </div>

          {/* Legal links */}
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              HIPAA Notice
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
