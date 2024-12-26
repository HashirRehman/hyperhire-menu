import { MenuItem } from "../../types/menu"

interface DetailsPanelProps {
  item: MenuItem | null;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({ item }) => {
  if (!item) {
    return <div>No item selected</div>;
  }

  return (
    <div className="space-y-4 p-4 md:space-y-6 md:p-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Menu ID</label>
        <input
          type="text"
          value={item.id}
          readOnly
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Depth</label>
        <input
          type="text"
          value={item.depth}
          readOnly
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Parent Data
        </label>
        <input
          type="text"
          value={item.parentId || 'Root'}
          readOnly
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={item.name}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  )
}
