import React from 'react';
import { Github } from 'lucide-react';

interface CircularGithubIconProps {
  size?: number; // Size of the icon inside the circle
  circleSize?: number; // Size of the circle
  // Removed iconColorClass and circleBgClass as they will be default
}

const CircularGithubIcon: React.FC<CircularGithubIconProps> = ({
  size = 16, // Default icon size
  circleSize = 24, // Default circle size
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors`} // Changed background and added hover
      style={{ width: circleSize, height: circleSize }}
    >
      <Github className={`text-black`} size={size} /> {/* Changed icon color to black */}
    </div>
  );
};

export default CircularGithubIcon;