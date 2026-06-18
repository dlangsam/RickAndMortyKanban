import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Column } from './Column';
import { KanbanItem as KanbanItemComponent } from './KanbanItem';
import { useKanban } from '../context/KanbanContext';
import { ColumnConfig, Status, KanbanItem } from '../types/kanban';

// Column configuration
const COLUMNS: ColumnConfig[] = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-100' },
  { id: 'doing', title: 'Doing', color: 'bg-yellow-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
];

// Extract column IDs for type checking
const COLUMN_IDS = COLUMNS.map(col => col.id) as string[];

export function BoardColumns() {
  const { items, moveItem, reorderItems } = useKanban();
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);

  // Configure drag sensors (how drag is initiated)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag starts after moving 8px
      },
    })
  );

  // Called when drag starts
  const handleDragStart = (event: DragStartEvent) => {
    const item = items.find((item) => item.id === event.active.id);
    setActiveItem(item || null);
  };

  // Called when item is dragged over a droppable area
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active item
    const activeItem = items.find((item) => item.id === activeId);
    if (!activeItem) return;

    // Check if over is a column (Status) or another item
    const overIsColumn = COLUMN_IDS.includes(overId);

    if (overIsColumn) {
      // Dropped on a column - move to that status
      const newStatus = overId as Status;
      if (activeItem.status !== newStatus) {
        moveItem(activeId, newStatus);
      }
    } else {
      // Dropped on another item - get that item's status
      const overItem = items.find((item) => item.id === overId);
      if (overItem && activeItem.status !== overItem.status) {
        moveItem(activeId, overItem.status);
      }
    }
  };

  // Called when drag ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Save the original status before clearing activeItem
    const originalStatus = activeItem?.status;
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the items (with current/updated status)
    const updatedItem = items.find((item) => item.id === activeId);
    const overItem = items.find((item) => item.id === overId);

    if (!updatedItem) return;

    // If dropped on another item in the same column, reorder
    if (overItem && updatedItem.status === overItem.status) {
      const columnItems = items.filter((item) => item.status === updatedItem.status);
      const activeIndex = columnItems.findIndex((item) => item.id === activeId);
      const overIndex = columnItems.findIndex((item) => item.id === overId);

      if (activeIndex !== overIndex) {
        const reordered = arrayMove(columnItems, activeIndex, overIndex);
        const otherItems = items.filter((item) => item.status !== updatedItem.status);
        reorderItems([...otherItems, ...reordered]);
      }
    }

    // CELEBRATION: If moved TO "done" column (not just reordering within it)
    if (originalStatus !== 'done' && updatedItem.status === 'done') {
      triggerConfetti();
    }
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
          />
        ))}
      </div>

      {/* DragOverlay shows a preview of the item being dragged */}
      <DragOverlay>
        {activeItem ? <KanbanItemComponent item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
