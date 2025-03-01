import { useState, useEffect } from 'react'
import { FaSearch, FaStar, FaFilter, FaInfoCircle } from 'react-icons/fa'
import { asanas } from '../data/mockData'

const AsanaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState(0)
  const [filteredAsanas, setFilteredAsanas] = useState(asanas)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAsana, setSelectedAsana] = useState(null)
  
  const categories = ['All', 'Standing', 'Seated', 'Prone', 'Supine']
  
  useEffect(() => {
    let results = asanas
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(asana => 
        asana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asana.sanskrit.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(asana => asana.category === selectedCategory)
    }
    
    // Apply difficulty filter
    if (selectedDifficulty > 0) {
      results = results.filter(asana => asana.difficulty === selectedDifficulty)
    }
    
    setFilteredAsanas(results)
  }, [searchTerm, selectedCategory, selectedDifficulty])
  
  const handleAsanaClick = (asana) => {
    setSelectedAsana(asana)
  }
  
  const renderStars = (difficulty) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar 
        key={index} 
        className={`inline ${index < difficulty ? 'text-accent' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="bg-background-light min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Asana Library</h1>
          <p className="text-gray-600">Explore and learn about different yoga poses</p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search asanas by name or sanskrit..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'bg-background-light text-gray-700 hover:bg-background-dark'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDifficulty(0)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedDifficulty === 0
                        ? 'bg-primary text-white'
                        : 'bg-background-light text-gray-700 hover:bg-background-dark'
                    }`}
                  >
                    All
                  </button>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedDifficulty === level
                          ? 'bg-primary text-white'
                          : 'bg-background-light text-gray-700 hover:bg-background-dark'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Asanas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAsanas.map((asana) => (
            <div 
              key={asana.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleAsanaClick(asana)}
            >
              <img 
                src={asana.image} 
                alt={asana.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{asana.name}</h3>
                    <p className="text-sm text-gray-500 italic">{asana.sanskrit}</p>
                  </div>
                  <span className="badge badge-primary">{asana.category}</span>
                </div>
                <div className="mt-2">
                  {renderStars(asana.difficulty)}
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{asana.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {asana.muscleGroups.slice(0, 3).map((muscle, index) => (
                    <span key={index} className="badge badge-secondary text-xs">{muscle}</span>
                  ))}
                  {asana.muscleGroups.length > 3 && (
                    <span className="badge badge-secondary text-xs">+{asana.muscleGroups.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAsanas.length === 0 && (
          <div className="text-center py-12">
            <FaInfoCircle className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No asanas found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      {/* Asana Detail Modal */}
      {selectedAsana && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedAsana.image} 
                alt={selectedAsana.name} 
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setSelectedAsana(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedAsana.name}</h2>
                  <p className="text-gray-500 italic">{selectedAsana.sanskrit}</p>
                </div>
                <span className="badge badge-primary">{selectedAsana.category}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Difficulty:</p>
                <div>
                  {renderStars(selectedAsana.difficulty)}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Description:</p>
                <p className="text-gray-600">{selectedAsana.description}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Benefits:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedAsana.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Muscle Groups:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAsana.muscleGroups.map((muscle, index) => (
                    <span key={index} className="badge badge-secondary">{muscle}</span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-1">Average Duration:</p>
                <p className="text-gray-600">{selectedAsana.avgDuration} seconds</p>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button className="btn btn-primary flex-1">Add to Practice</button>
                <button className="btn btn-outline flex-1">Save to Favorites</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AsanaLibrary