import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, User, Code } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="pt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Showcase Your Skills.</span>
              <span className="block">Connect with Talent.</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Create your professional profile, showcase your technical skills, and discover talented developers.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      <User className="h-5 w-5 mr-2" />
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/profiles">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                      <Search className="h-5 w-5 mr-2" />
                      Browse Profiles
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/profiles">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                      <Search className="h-5 w-5 mr-2" />
                      Browse Profiles
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="h-32 bg-gradient-to-b from-blue-600 to-transparent"></div>
      </div>
      
      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Designed for Tech Professionals
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Highlighting your technical skills has never been easier. Create a profile that showcases what you can do.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                <UserPlus className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Create Your Profile</h3>
              <p className="mt-2 text-gray-600">
                Build a comprehensive profile that highlights your technical abilities, projects, and experience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Showcase Your Skills</h3>
              <p className="mt-2 text-gray-600">
                Detail your technical skills with proficiency levels to give visitors a clear picture of your expertise.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Find Talent</h3>
              <p className="mt-2 text-gray-600">
                Search for professionals based on specific skills, making it easy to find the perfect match for your team.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-100">Create your profile today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to={isAuthenticated ? "/profile" : "/register"}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  {isAuthenticated ? "Go to My Profile" : "Get Started"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Link to="/" className="text-white font-bold text-xl flex items-center">
                <User className="h-6 w-6 mr-2" />
                TechTalent
              </Link>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
              <Link to="/profiles" className="text-gray-300 hover:text-white">
                Browse Profiles
              </Link>
              {isAuthenticated ? (
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  My Profile
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-300 hover:text-white">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} TechTalent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;