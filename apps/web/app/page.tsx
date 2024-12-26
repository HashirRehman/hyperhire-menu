"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./components/sidebar";
import { MenuTree } from "./components/menu-tree";
import { DetailsPanel } from "./components/details-panel";
import { Grid } from "lucide-react";
import { MenuItem } from "../types/menu";

interface User {
  name: string;
  email: string;
}

const initialItems: MenuItem[] = [
  {
    id: "1",
    name: "system management",
    depth: 0,
    children: [
      {
        id: "2",
        name: "System Management",
        depth: 1,
        parentId: "1",
        children: [
          {
            id: "3",
            name: "Systems",
            depth: 2,
            parentId: "2",
          },
        ],
      },
    ],
  },
];

export default function MenuPage() {
  const [apiResponse, setApiResponse] = useState<User[] | null>(null);

  const [state, setState] = useState<any>({
    items: initialItems,
    expandedItems: new Set(["1", "2"]),
    selectedItem: undefined,
  });

  const handleToggle = (id: string) => {
    const newExpanded = new Set(state.expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setState({ ...state, expandedItems: newExpanded });
  };

  const handleExpandAll = () => {
    const getAllIds = (items: MenuItem[]): string[] => {
      return items.reduce<string[]>((acc, item) => {
        acc.push(item.id);
        if (item.children) {
          acc.push(...getAllIds(item.children));
        }
        return acc;
      }, []);
    };

    setState({
      ...state,
      expandedItems: new Set(getAllIds(state.items)),
    });
  };

  const handleCollapseAll = () => {
    setState({
      ...state,
      expandedItems: new Set(),
    });
  };

  const handleAddItem = (parentId?: string) => {
    const newItem: MenuItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Item",
      depth: parentId ? state.items[0].depth + 1 : 0,
      parentId,
    };

    const addToChildren = (items: MenuItem[], pid?: string): MenuItem[] => {
      if (!pid) return [...items, newItem];

      return items.map((item) => {
        if (item.id === pid) {
          return {
            ...item,
            children: [...(item.children || []), newItem],
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addToChildren(item.children, pid),
          };
        }
        return item;
      });
    };

    setState({
      ...state,
      items: addToChildren(state.items, parentId),
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
      const text = await response.json();
      console.log("Response Text", text);
      setApiResponse(text);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="pl-0 md:pl-[240px]">
        <div className="flex items-center gap-3 border-b p-4">
          <Grid className="h-8 w-8 rounded-lg bg-blue-500 p-1.5 text-white" />
          <h1 className="text-2xl font-semibold">Menus</h1>
        </div>
        <div>
          {apiResponse?.map((user) => (
            <h1 key={user.email} className="border rounded text-red-900">
              {user.name} {user.email}
            </h1>
          ))}
        </div>
        <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6">
          <div className="w-full md:flex-1">
            <div className="rounded-lg border bg-gray-50/50 p-4">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-sm font-medium">Menu</h2>
                <div className="flex w-full gap-2 sm:w-auto">
                  <button
                    onClick={handleExpandAll}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:flex-none"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={handleCollapseAll}
                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:flex-none"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
              <MenuTree
                items={state.items}
                expandedItems={state.expandedItems}
                onToggle={handleToggle}
                onSelect={(item) => setState({ ...state, selectedItem: item })}
                onAddItem={handleAddItem}
              />
            </div>
          </div>
          <div className="w-full md:w-[400px]">
            <div className="rounded-lg border">
              <DetailsPanel
                item={state.selectedItem}
                onSave={() => console.log("Saving...")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
