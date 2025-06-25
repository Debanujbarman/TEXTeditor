// src/app/documents/[documentId]/ToolbarButton.tsx

import React from "react";

interface ToolbarButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-2 py-1 rounded hover:bg-neutral-200 transition"
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
};

export default ToolbarButton;
