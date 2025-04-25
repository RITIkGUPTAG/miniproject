import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Edit, Github as GitHub, Linkedin, Globe, MapPin } from 'lucide-react';
import { profileApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import SkillBadge from '../../components/ui/SkillBadge';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const isOwnProfile = !id; // if no ID is provided, it's the user's own profile
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let fetchedProfile;
        
        if (isOwnProfile) {
          // Fetch current user's profile
          if (!user?.token) {
            navigate('/login');
            return;
          }
          
          fetchedProfile = await profileApi.getUserProfile(user.token);
          
          if (!fetchedProfile) {
            navigate('/profile/edit');
            return;
          }
        } else {
          // Fetch profile by ID
          fetchedProfile = await profileApi.getProfileById(id!);
        }
        
        setProfile(fetchedProfile);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [id, user, navigate, isOwnProfile]);
  
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Profile not found</h2>
          <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile header */}
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{profile.title}</p>
            </div>
            
            {isOwnProfile && (
              <Link to="/profile/edit">
                <Button variant="outline" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            )}
          </div>
          
          {/* Profile content */}
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-6">
              {/* Left column */}
              <div className="col-span-1">
                <div className="flex flex-col items-center">
                  <img 
                    className="h-32 w-32 rounded-full object-cover" 
                    src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=random`} 
                    alt={profile.name} 
                  />
                  
                  {profile.location && (
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.location}
                    </div>
                  )}
                  
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
                </div>
              </div>
              
              {/* Right column */}
              <div className="col-span-1 md:col-span-2">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">About</h2>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>{profile.bio}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-gray-900">Skills</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.skills.map((skill: any) => (
                      <SkillBadge key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;