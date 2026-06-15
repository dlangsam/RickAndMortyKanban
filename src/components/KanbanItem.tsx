import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { KanbanItem as KanbanItemType } from '../types/kanban';

interface KanbanItemProps {
  item: KanbanItemType;
}

export function KanbanItem({ item }: KanbanItemProps) {
  // useSortable hook makes this item draggable and provides drag state
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  // Apply drag transform to the element
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-md p-4 mb-3 cursor-grab active:cursor-grabbing
        hover:shadow-lg transition-shadow
        ${isDragging ? 'ring-2 ring-purple-500' : ''}
      `}
    >
      {/* Character section */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={item.character.image}
          alt={item.character.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <p className="text-xs text-gray-500">{item.character.name}</p>
        </div>
      </div>

      {/* Task content */}
      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
      {item.description && (
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
      )}

      {/* Timestamp */}
      <div className="mt-2 text-xs text-gray-400">
        {new Date(item.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
