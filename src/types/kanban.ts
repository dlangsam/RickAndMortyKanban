// Status represents the three columns in our Kanban board
export type Status = 'todo' | 'doing' | 'done';

// Character from Rick and Morty API
export interface Character {
  id: string;
  name: string;
  image: string;
}

// A Kanban item/card that belongs to a column
export interface KanbanItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  character: Character;
  createdAt: Date;
}

// Data needed to create a new item (before it gets an id and createdAt)
export interface NewItemInput {
  title: string;
  description: string;
  characterId: string;
}

// Column configuration for rendering
export interface ColumnConfig {
  id: Status;
  title: string;
  color: string; // Tailwind color class
}
