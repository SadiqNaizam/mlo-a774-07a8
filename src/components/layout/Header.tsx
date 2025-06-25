import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github, Droplets } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Dynamic Dots Animator</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;