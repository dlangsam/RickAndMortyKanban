import { NewItemForm } from './NewItemForm';
import { BoardColumns } from './BoardColumns';

export function KanbanBoard() {
  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Rick & Morty Kanban Board
      </h1>

      {/* New item form */}
      <div className="max-w-2xl mx-auto mb-8">
        <NewItemForm />
      </div>

      {/* Board with columns */}
      <div className="container mx-auto">
        <BoardColumns />
      </div>
    </div>
  );
}
