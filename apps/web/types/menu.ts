export interface MenuItem {
  id: string
  name: string
  children?: MenuItem[]
  depth: number
  parentId?: string
}

export interface MenuState {
  selectedItem?: MenuItem
  expandedItems: Set<string>
  items: MenuItem[]
}

