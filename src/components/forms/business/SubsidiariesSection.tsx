import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface Subsidiary {
  name: string;
  countryOfIncorporation: string;
}

interface Props {
  hasSubsidiaries: boolean;
  subsidiaries: Subsidiary[];
  onToggleHasSubsidiaries: (value: boolean) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

const SubsidiariesSection: React.FC<Props> = ({
  hasSubsidiaries,
  subsidiaries,
  onToggleHasSubsidiaries,
  onAdd,
  onRemove,
  onUpdate
}) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">List of Subsidiaries</h3>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">
          Do you have any business subsidiaries?
          <span className="italic text-gray-500 ml-2">Please tick as appropriate</span>
        </p>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="hasSubsidiaries"
              checked={hasSubsidiaries === true}
              onChange={() => onToggleHasSubsidiaries(true)}
              className="mr-2 text-red-600 focus:ring-red-500"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hasSubsidiaries"
              checked={hasSubsidiaries === false}
              onChange={() => onToggleHasSubsidiaries(false)}
              className="mr-2 text-red-600 focus:ring-red-500"
            />
            No
          </label>
        </div>
      </div>

      {hasSubsidiaries && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium text-gray-700">Subsidiary</div>
            <div className="font-medium text-gray-700">Country of Inc</div>
          </div>

          {subsidiaries.map((subsidiary, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 items-center">
              <input
                type="text"
                value={subsidiary.name}
                onChange={(e) => onUpdate(index, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Subsidiary name"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={subsidiary.countryOfIncorporation}
                  onChange={(e) => onUpdate(index, 'countryOfIncorporation', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Country"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Subsidiary</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SubsidiariesSection;
