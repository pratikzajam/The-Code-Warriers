import { FaHeart, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { GiMeditation } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <GiMeditation className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-display font-semibold">Yogasanas</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Transform Your Practice, Together
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/asana-library" className="text-gray-300 hover:text-white">Asana Library</Link></li>
              <li><Link to="/community" className="text-gray-300 hover:text-white">Community</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Challenges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Progress Tracking</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Yoga Guides</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Meditation Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Wellness Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} Yogasanas Tracker. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0 text-sm text-gray-300 flex items-center">
            Made with <FaHeart className="mx-1 text-accent" /> for yoga enthusiasts worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer