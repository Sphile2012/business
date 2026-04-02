import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Nail Course", to: "/nail-course" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <ul className="flex justify-between items-center px-4 sm:px-6">
        <li><a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
        <li><a href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a></li>
        <li><a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
      </ul>

      {/* Mobile toggle */}
      <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </nav>
  );
}