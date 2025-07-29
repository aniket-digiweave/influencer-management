import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;