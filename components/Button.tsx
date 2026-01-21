import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'evil' | 'good' | 'success';
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative flex items-center justify-center overflow-hidden rounded-full h-16 px-8 text-xl font-bold tracking-wide transition-all active:scale-[0.98] duration-200 shadow-lg";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-hover text-background-dark shadow-[0_0_20px_rgba(244,192,37,0.3)]",
    secondary: "bg-transparent border border-[#393528] text-[#bab29c] hover:bg-white/5",
    evil: "bg-evil hover:bg-red-600 text-white shadow-[0_0_20px_rgba(242,13,13,0.4)]",
    good: "bg-good hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(37,140,244,0.4)]",
    success: "bg-success hover:bg-green-400 text-background-dark shadow-[0_0_20px_rgba(13,242,13,0.4)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined mr-2 text-[24px]">{icon}</span>}
      {children}
    </button>
  );
};
