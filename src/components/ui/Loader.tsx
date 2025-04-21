import React from 'react';
import clsx from 'clsx';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-e-transparent',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
        },
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};