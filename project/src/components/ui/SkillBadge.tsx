import React from 'react';
import { Skill } from '../../types';

interface SkillBadgeProps {
  skill: Skill;
  onRemove?: () => void;
  clickable?: boolean;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ 
  skill, 
  onRemove,
  clickable = false
}) => {
  // Color based on skill level
  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-100 text-gray-800', // Level 1
      'bg-blue-100 text-blue-800', // Level 2
      'bg-green-100 text-green-800', // Level 3
      'bg-purple-100 text-purple-800', // Level 4
      'bg-indigo-100 text-indigo-800', // Level 5
    ];
    return colors[level - 1] || colors[0];
  };

  const skillColor = getLevelColor(skill.level);
  
  return (
    <span 
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${skillColor}
        ${clickable ? 'cursor-pointer hover:opacity-80' : ''}
        transition-all duration-200
      `}
    >
      {skill.name}
      {skill.level && <span className="ml-1.5 text-xs opacity-70">Lv{skill.level}</span>}
      {onRemove && (
        <button
          type="button"
          className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-xs text-current opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ✕
        </button>
      )}
    </span>
  );
};

export default SkillBadge;