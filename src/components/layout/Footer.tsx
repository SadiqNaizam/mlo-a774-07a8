import React from 'react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-6 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} Dynamic Dots Animator. All Rights Reserved.
        </p>
        <p className="mt-2">
          Built by{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            your-name-here
          </a>
          . Inspired by various metaball animations.
        </p>
      </div>
    </footer>
  );
};

export default Footer;