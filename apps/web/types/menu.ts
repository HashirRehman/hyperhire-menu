export interface MenuItem {
  id: string;
  name: string;
  parentId?: string;
  children?: MenuItem[];
  depth: number;  // Use depth instead of level
}

export interface MenuState {
  selectedItem?: MenuItem
  expandedItems: Set<string>
  items: MenuItem[]
}
