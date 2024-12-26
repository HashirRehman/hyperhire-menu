import React, { useState } from 'react';
import { MenuItem } from "../../types/menu";
import { MdAdd, MdChevronRight, MdExpandMore } from 'react-icons/md';

interface MenuTreeProps {
  items: MenuItem[];
  expandedItems: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (item: MenuItem | null) => void;
  onAddItem: (name: string, parentId?: string) => void;
  level?: number;
  children?: React.ReactNode; // Ensure this is optional and correctly typed
}


export const MenuTree = ({ items, expandedItems, onToggle, onSelect, onAddItem, level = 0, children }: MenuTreeProps) => {
  const [addingToParentId, setAddingToParentId] = useState<string | null>(null);

  const buildTree = (items: MenuItem[]): MenuItem[] => {
    if (!items || items.length === 0) {
      return [];
    }

    const itemMap = new Map<string, MenuItem>();
    const roots: MenuItem[] = [];

    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: [] });
    });

    items.forEach(item => {
      if (item.parentId) {
        const parent = itemMap.get(item.parentId);
        if (parent && parent.children) {
          parent.children.push(itemMap.get(item.id)!);
        }
      } else {
        roots.push(itemMap.get(item.id)!);
      }
    });

    return roots;
  };

  const handleAddItem = (parentId?: string) => {
    const newItemName = parentId ? prompt("Enter new item name:") : "New Root Item";
    if (newItemName) {
      onAddItem(newItemName.trim(), parentId);
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id} className="relative">
        {level > 0 && (
          <div
            className="absolute -left-4 top-3 h-px w-4 bg-gray-200"
            aria-hidden="true"
          />
        )}

        <div className="group flex items-center gap-1 rounded-md py-1 pl-1 hover:bg-gray-100">
          <button
            onClick={() => hasChildren && onToggle(item.id)}
            className={`flex h-4 w-4 items-center justify-center rounded hover:bg-gray-200 ${!hasChildren && 'invisible'}`}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <MdExpandMore className="h-3 w-3" />
            ) : (
              <MdChevronRight className="h-3 w-3" />
            )}
          </button>

          <button
            onClick={() => onSelect(item)}
            className="flex-1 truncate text-left text-sm"
          >
            {item.name}
          </button>

          <button
            onClick={() => handleAddItem(item.id)}
            className="invisible mr-2 rounded-full p-0.5 hover:bg-gray-200 group-hover:visible"
            aria-label={`Add item under ${item.name}`}
          >
            <MdAdd className="h-3 w-3" />
          </button>
        </div>

        {isExpanded && hasChildren && (
          <ul className="border-l border-gray-200 ml-4 pl-4 space-y-0.5">
            {item.children!.map(child => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  const treeItems = buildTree(items);

  return (
    <ul className={`space-y-0.5 ${level > 0 ? 'border-l border-gray-200 ml-4 pl-4' : ''}`}>
      {treeItems.map(item => renderMenuItem(item))}
      {children}
    </ul>
  );
};
