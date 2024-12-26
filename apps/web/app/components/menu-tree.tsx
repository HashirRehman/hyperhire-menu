'use client'

import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { MenuItem } from '../../types/menu'

interface MenuTreeProps {
  items: MenuItem[]
  onSelect: (item: MenuItem) => void
  onAddItem: (parentId?: string) => void
  expandedItems: Set<string>
  onToggle: (id: string) => void
}

export function MenuTree({
  items,
  onSelect,
  onAddItem,
  expandedItems,
  onToggle,
}: MenuTreeProps) {
  const renderItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)

    return (
      <div key={item.id} className="ml-4 md:ml-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => hasChildren && onToggle(item.id)}
            className="p-2 hover:bg-gray-100 rounded md:p-1"
          >
            {hasChildren && (
              <>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-500 md:h-4 md:w-4" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500 md:h-4 md:w-4" />
                )}
              </>
            )}
          </button>
          <button
            onClick={() => onSelect(item)}
            className="flex-1 rounded px-2 py-2 text-left hover:bg-gray-100 md:py-1"
          >
            {item.name}
          </button>
          <button
            onClick={() => onAddItem(item.id)}
            className="rounded p-2 text-blue-500 hover:bg-blue-50 md:p-1"
          >
            <Plus className="h-5 w-5 md:h-4 md:w-4" />
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="border-l border-gray-200">
            {item.children?.map((child) => renderItem(child))}
          </div>
        )}
      </div>
    )
  }

  return <div className="mt-4">{items.map((item) => renderItem(item))}</div>
}
