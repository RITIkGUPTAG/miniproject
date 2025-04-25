import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { profileApi } from '../../services/api';
import ProfileCard from '../../components/profile/ProfileCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const BrowseProfilesPage: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSkillFilter, setCurrentSkillFilter] = useState('');
  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await profileApi.getProfiles();
        setProfiles(fetchedProfiles);
        setFilteredProfiles(fetchedProfiles);
      } catch (err: any) {
        setError(err.message || 'Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProfiles(searchTerm);
  };
  
  const handleSkillFilter = async (skill: string) => {
    setLoading(true);
    setCurrentSkillFilter(skill);
    
    try {
      const fetchedProfiles = await profileApi.getProfiles(skill);
      setFilteredProfiles(fetchedProfiles);
    } catch (err: any) {
      setError(err.message || 'Failed to filter profiles');
    } finally {
      setLoading(false);
    }
  };
  
  const clearFilters = async () => {
    setLoading(true);
    setCurrentSkillFilter('');
    setSearchTerm('');
    
    try {
      const fetchedProfiles = await profileApi.getProfiles();
      setFilteredProfiles(fetchedProfiles);
    } catch (err: any) {
      setError(err.message || 'Failed to clear filters');
    } finally {
      setLoading(false);
    }
  };
  
  const filterProfiles = (term: string) => {
    if (!term.trim()) {
      setFilteredProfiles(profiles);
      return;
    }
    
    const lowerCaseTerm = term.toLowerCase();
    
    const filtered = profiles.filter(
      profile => 
        profile.name.toLowerCase().includes(lowerCaseTerm) || 
        profile.title.toLowerCase().includes(lowerCaseTerm) || 
        profile.bio.toLowerCase().includes(lowerCaseTerm) ||
        profile.skills.some((skill: any) => 
          skill.name.toLowerCase().includes(lowerCaseTerm)
        )
    );
    
    setFilteredProfiles(filtered);
  };
  
  // Extract all unique skills from all profiles
  const allSkills = [...new Set(
    profiles.flatMap(profile => 
      profile.skills.map((skill: any) => skill.name)
    )
  )].sort();
  
  if (loading && !filteredProfiles.length) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Talent</h1>
          <p className="mt-2 text-gray-600">Find talented professionals with the skills you need</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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
        
        <div className="mb-8 bg-white shadow-sm rounded-lg p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-grow">
              <Input
                id="search"
                type="search"
                placeholder="Search by name, title, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </div>
            <Button type="submit" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            {(searchTerm || currentSkillFilter) && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </form>
          
          {/* Skill filters */}
          {allSkills.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Filter by skill:</p>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 20).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillFilter(skill)}
                    className={`
                      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${currentSkillFilter === skill 
                        ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-600' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      transition-all duration-200
                    `}
                  >
                    {skill}
                  </button>
                ))}
                {allSkills.length > 20 && (
                  <span className="text-xs text-gray-500 self-center">
                    +{allSkills.length - 20} more skills
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {!loading && filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No profiles found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseProfilesPage;