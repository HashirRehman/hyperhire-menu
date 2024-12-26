"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { MenuTree } from "./components/menu-tree";
import { DetailsPanel } from "./components/details-panel";
import { Grid, Plus } from "lucide-react";
import { MenuItem } from "../types/menu";

const fetchMenus = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`);
  const data = await response.json();
  return data.map((item: MenuItem) => ({
    ...item,
    depth: item.depth || 0,
  }));
};

const addMenu = async (menu: { name: string; parentId?: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menu),
  });
  return response.json();
};

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleToggle = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddItem = async (
    name: string,
    parentId?: string,
    depth?: number
  ) => {
    const newItem = await addMenu({ name, parentId });
    newItem.depth = depth;
    setMenus((prevMenus) => [...prevMenus, newItem]);
  };

  const handleAddRootItem = () => {
    handleAddItem("New Root Item");
  };

  useEffect(() => {
    fetchMenus().then(setMenus);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="pl-0 md:pl-[240px]">
        <div className="flex items-center gap-3 border-b p-4">
          <Grid className="h-8 w-8 rounded-lg bg-blue-500 p-1.5 text-white" />
          <h1 className="text-2xl font-semibold">Menus</h1>
        </div>
        <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6">
          <div className="w-full md:flex-1">
            <div className="rounded-lg border bg-gray-50/50 p-4">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-medium">Menu</h2>
                <button
                  onClick={handleAddRootItem}
                  className="flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                  Add Root Item
                </button>
              </div>
              <div className="mt-4">
                <MenuTree
                  items={menus}
                  expandedItems={expandedItems}
                  onToggle={handleToggle}
                  onSelect={setSelectedItem}
                  onAddItem={handleAddItem}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-[400px]">
            {selectedItem ? <DetailsPanel item={selectedItem} /> : "Empty"}
          </div>
        </div>
      </div>
    </div>
  );
}
