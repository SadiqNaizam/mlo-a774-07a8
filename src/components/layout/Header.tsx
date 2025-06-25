import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  console.log('Header loaded');
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        >
          <Link to="/" className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Dynamic Dots Animator</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;