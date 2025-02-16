import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ to, onClick, children }: ButtonProps) {
  const buttonClass =
    'dark:bg-primary-dark bg-primary-light dark:text-primary-light text-secondary-light py-2 px-4 rounded-md text-center text-2xl mb-4 hover:bg-primary-light hover:text-primary-dark transition duration-300';

  if (to) {
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
