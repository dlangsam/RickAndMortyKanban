import { useState, FormEvent } from 'react';
import { useKanban } from '../context/KanbanContext';
import { useCharacters } from '../hooks/useCharacters';

export function NewItemForm() {
  // Get the addItem function from context to create new items
  const { addItem } = useKanban();

  // Fetch characters from Rick and Morty API
  const { characters, loading, error } = useCharacters();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !selectedCharacterId) {
      alert('Please enter a title and select a character');
      return;
    }

    // Find the selected character object
    const character = characters.find((c) => c.id === selectedCharacterId);
    if (!character) return;

    // Call context function to add the item
    addItem(
      {
        title: title.trim(),
        description: description.trim(),
        characterId: selectedCharacterId,
      },
      character
    );

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedCharacterId('');
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading characters: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., Fix the portal gun"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add more details..."
          />
        </div>

        <div>
          <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1">
            Assign Character *
          </label>
          {loading ? (
            <div className="text-gray-500">Loading characters...</div>
          ) : (
            <div className="relative">
              <select
                id="character"
                value={selectedCharacterId}
                onChange={(e) => setSelectedCharacterId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a character</option>
                {characters.map((character) => (
                  <option key={character.id} value={character.id}>
                    {character.name}
                  </option>
                ))}
              </select>

              {/* Show character avatar when selected */}
              {selectedCharacterId && (
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={characters.find((c) => c.id === selectedCharacterId)?.image}
                    alt="Character"
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    {characters.find((c) => c.id === selectedCharacterId)?.name}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
