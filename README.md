# Rick & Morty Kanban Board

A drag-and-drop Kanban board application built with React, TypeScript, and the Rick and Morty GraphQL API.

## Features

- 📋 Three-column Kanban board (To Do, Doing, Done)
- 🎭 Rick and Morty character assignment for each task
- 🎯 Drag and drop items between columns
- ↕️ Reorder items within columns
- 🎉 Confetti celebration when tasks are completed
- 📱 Responsive design with Tailwind CSS

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kanban-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

## Usage

1. **Create a Task:** Fill out the form at the top with a title, description, and select a Rick and Morty character
2. **Drag Tasks:** Click and drag tasks between columns to change their status
3. **Reorder Tasks:** Drag tasks up or down within the same column to reorder
4. **Complete Tasks:** When you move a task to the "Done" column, enjoy the confetti!

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag and drop functionality
- **Apollo Client** - GraphQL client
- **canvas-confetti** - Celebration effects

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx      # Main board container
│   ├── BoardColumns.tsx     # Drag-and-drop wrapper with columns
│   ├── Column.tsx           # Individual column (To Do, Doing, Done)
│   ├── KanbanItem.tsx       # Draggable task card
│   └── NewItemForm.tsx      # Form to create new tasks
├── context/
│   └── KanbanContext.tsx    # Global state management
├── hooks/
│   └── useCharacters.ts     # GraphQL hook for fetching characters
├── types/
│   └── kanban.ts            # TypeScript type definitions
├── apollo/
│   └── client.ts            # Apollo Client configuration
├── App.tsx                  # Root component with providers
└── main.tsx                 # Application entry point
```

## Architecture Highlights

### State Management
- Uses React Context API for centralized state management
- All state logic is contained in `KanbanContext.tsx`
- Components remain unaware of data source (easy to swap in API/localStorage later)

### Data Flow
```
User Action → Context Function → State Update → React Re-render → UI Update
```

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API

This project uses the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) to fetch character data.

## Notes

- Data is stored in memory only (resets on page refresh)
- Designed for easy extension with persistence and filtering features
- No backend required - fully frontend implementation
