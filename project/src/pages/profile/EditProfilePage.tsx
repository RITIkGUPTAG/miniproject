import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { profileApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SkillBadge from '../../components/ui/SkillBadge';

const EditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Profile form state
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [skills, setSkills] = useState<any[]>([]);
  
  // New skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(3);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.token) {
          navigate('/login');
          return;
        }
        
        const profile = await profileApi.getUserProfile(user.token);
        
        if (profile) {
          // Populate form with existing profile data
          setName(profile.name || user.name || '');
          setTitle(profile.title || '');
          setBio(profile.bio || '');
          setLocation(profile.location || '');
          setGithub(profile.github || '');
          setLinkedin(profile.linkedin || '');
          setWebsite(profile.website || '');
          setAvatarUrl(profile.avatarUrl || '');
          setSkills(profile.skills || []);
        } else {
          // New profile, populate with user data if available
          setName(user.name || '');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user, navigate]);
  
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSkillName.trim()) return;
    
    const newSkill = {
      id: Math.random().toString(36).substring(2, 9),
      name: newSkillName.trim(),
      level: newSkillLevel as any
    };
    
    setSkills([...skills, newSkill]);
    setNewSkillName('');
    setNewSkillLevel(3);
  };
  
  const handleRemoveSkill = (skillId: string) => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    if (!user?.token) {
      navigate('/login');
      return;
    }
    
    try {
      const profileData = {
        name,
        title,
        bio,
        location,
        github,
        linkedin,
        website,
        avatarUrl,
        skills
      };
      
      await profileApi.createOrUpdateProfile(profileData, user.token);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Update your profile information visible to others</p>
          </div>
          
          {error && (
            <div className="m-4 bg-red-50 border-l-4 border-red-400 p-4">
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
          )}
          
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <Input
                    label="Full Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="Professional Title"
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Full Stack Developer"
                    required
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Tell us about yourself, your experience, and what you're looking for"
                      required
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="Location"
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="Avatar URL (optional)"
                    id="avatarUrl"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="GitHub Profile (optional)"
                    id="github"
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="LinkedIn Profile (optional)"
                    id="linkedin"
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <Input
                    label="Personal Website (optional)"
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    fullWidth
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <SkillBadge 
                        key={skill.id} 
                        skill={skill} 
                        onRemove={() => handleRemoveSkill(skill.id)} 
                      />
                    ))}
                    
                    {skills.length === 0 && (
                      <p className="text-sm text-gray-500">No skills added yet. Add your technical skills below.</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <Input
                        label="Add a Skill"
                        id="newSkillName"
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="e.g. JavaScript, React, Python"
                      />
                    </div>
                    
                    <div className="w-24">
                      <label htmlFor="newSkillLevel" className="block text-sm font-medium text-gray-700">
                        Level
                      </label>
                      <select
                        id="newSkillLevel"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      disabled={!newSkillName.trim()}
                      className="mb-0.5"
                    >
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-5 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={saving}
                  disabled={saving}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;