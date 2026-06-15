import { createContext, useContext, useState, ReactNode } from 'react';
import { KanbanItem, NewItemInput, Status, Character } from '../types/kanban';

// This is the "shape" of our context - what data and functions it provides
interface KanbanContextType {
  items: KanbanItem[];
  addItem: (input: NewItemInput, character: Character) => void;
  moveItem: (itemId: string, newStatus: Status) => void;
  reorderItems: (items: KanbanItem[]) => void;
}

// Create the context with undefined as initial value
const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

// Provider component that wraps our app and provides the state
export function KanbanProvider({ children }: { children: ReactNode }) {
  // All our items live here in state
  // IMPORTANT: This is where "fake persistence" happens - data lives only in memory
  // To add real persistence later, just add useEffect hooks here to sync with localStorage or API
  const [items, setItems] = useState<KanbanItem[]>([]);

  // Add a new item to the board
  // Items always start in the "todo" column
  const addItem = (input: NewItemInput, character: Character) => {
    const newItem: KanbanItem = {
      id: crypto.randomUUID(), // Generate unique ID
      title: input.title,
      description: input.description,
      status: 'todo',
      character: character,
      createdAt: new Date(),
    };

    setItems((prev) => [...prev, newItem]);

    // TO ADD PERSISTENCE LATER, JUST ADD THIS LINE:
    // localStorage.setItem('kanban-items', JSON.stringify([...items, newItem]));
    // Or: await api.post('/items', newItem);
  };

  // Move an item to a different column (status)
  const moveItem = (itemId: string, newStatus: Status) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );

    // TO ADD PERSISTENCE LATER:
    // const updated = items.map(item => item.id === itemId ? {...item, status: newStatus} : item);
    // localStorage.setItem('kanban-items', JSON.stringify(updated));
  };

  // Replace the entire items array (used for drag-and-drop reordering)
  const reorderItems = (newItems: KanbanItem[]) => {
    setItems(newItems);

    // TO ADD PERSISTENCE LATER:
    // localStorage.setItem('kanban-items', JSON.stringify(newItems));
  };

  // Provide the state and functions to all child components
  return (
    <KanbanContext.Provider value={{ items, addItem, moveItem, reorderItems }}>
      {children}
    </KanbanContext.Provider>
  );
}

// Custom hook to use the Kanban context
// This hook makes it easy for components to access our shared state
export function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}
