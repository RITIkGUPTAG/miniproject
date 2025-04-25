import React from 'react';
import { Link } from 'react-router-dom';
import { Github as GitHub, Linkedin, Globe, MapPin } from 'lucide-react';
import { Profile } from '../../types';
import SkillBadge from '../ui/SkillBadge';

interface ProfileCardProps {
  profile: Profile;
  compact?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, compact = false }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-16 w-16">
            <img 
              className="h-16 w-16 rounded-full object-cover" 
              src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`} 
              alt={profile.name} 
            />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">
              <Link to={`/profiles/${profile.id}`} className="hover:text-blue-600">
                {profile.name}
              </Link>
            </h2>
            <p className="text-sm text-gray-600">{profile.title}</p>
            {profile.location && (
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {profile.location}
              </div>
            )}
          </div>
        </div>
        
        {!compact && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
          </div>
        )}
        
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.slice(0, compact ? 4 : 8).map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
          {profile.skills.length > (compact ? 4 : 8) && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{profile.skills.length - (compact ? 4 : 8)} more
            </span>
          )}
        </div>
        
        {!compact && (
          <div className="mt-4 flex space-x-3">
            {profile.github && (
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {profile.linkedin && (
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
            {profile.website && (
              <a 
                href={profile.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;