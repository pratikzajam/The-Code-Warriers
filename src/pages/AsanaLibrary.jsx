

import { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaFilter, FaCheckCircle } from 'react-icons/fa';
import { asanas } from '../data/mockData'; // Mock data of asanas
import { useUserStats } from '../components/usercontexts/UserStatsContext';

const AsanaLibrary = () => {
  const { addPracticeSession } = useUserStats();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);
  const [filteredAsanas, setFilteredAsanas] = useState(asanas);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAsana, setSelectedAsana] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['All', 'Standing', 'Seated', 'Prone', 'Supine'];

  useEffect(() => {
    let results = asanas;

    if (searchTerm) {
      results = results.filter(asana =>
        asana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asana.sanskrit.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(asana => asana.category === selectedCategory);
    }

    if (selectedDifficulty > 0) {
      results = results.filter(asana => asana.difficulty === selectedDifficulty);
    }

    setFilteredAsanas(results);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handleAddToPractice = (asana) => {
    addPracticeSession(asana);
    setSelectedAsana(null);
    setSuccessMessage(`${asana.name} successfully added to practice!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const renderStars = (difficulty) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar
        key={index}
        className={`inline ${index < difficulty ? 'text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-12 relative">
      {successMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
          <FaCheckCircle />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Asana Library</h1>
          <p className="text-gray-600">Explore and learn about different yoga poses</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search asanas by name or sanskrit..."
                className="w-full pl-10 p-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAsanas.map(asana => (
            <div key={asana.id} className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg" onClick={() => setSelectedAsana(asana)}>
              <img src={asana.image} alt={asana.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{asana.name}</h3>
                <div className="font-semibold text-lg">In second {asana.avgDuration}</div>
                <p className="text-sm text-gray-500 italic">{asana.sanskrit}</p>
                <div className="mt-2">{renderStars(asana.difficulty)}</div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{asana.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAsana && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6">
            <h2 className="text-2xl font-bold">{selectedAsana.name}</h2>
            <p className="text-gray-500 italic">{selectedAsana.sanskrit}</p>
            <p className="mt-4">{selectedAsana.description}</p>
            <button
              onClick={() => handleAddToPractice(selectedAsana)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add to Practice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsanaLibrary;
