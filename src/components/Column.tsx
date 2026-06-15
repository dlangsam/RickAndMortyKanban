import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { KanbanItem as KanbanItemComponent } from './KanbanItem';
import { KanbanItem, Status } from '../types/kanban';
import { useKanban } from '../context/KanbanContext';

interface ColumnProps {
  id: Status;
  title: string;
  color: string;
}

export function Column({ id, title, color }: ColumnProps) {
  const { items } = useKanban();

  // Filter items for this specific column
  const columnItems = items.filter((item) => item.status === id);

  // useDroppable makes this column a drop target
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={`flex-1 min-w-[300px] ${color} rounded-lg p-4`}>
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-sm font-semibold">
          {columnItems.length}
        </span>
      </div>

      {/* Droppable area */}
      <div
        ref={setNodeRef}
        className="min-h-[400px] bg-gray-50/50 rounded-lg p-2"
      >
        {/* SortableContext enables reordering within this column */}
        <SortableContext
          items={columnItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {columnItems.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No tasks yet
            </div>
          ) : (
            columnItems.map((item) => (
              <KanbanItemComponent key={item.id} item={item} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
