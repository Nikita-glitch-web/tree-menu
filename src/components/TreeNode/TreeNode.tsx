import React, { useState } from "react";
import { TreeNodeType } from "../../types/treeTypes";
import TreeActions from "../TreeActions/TreeActions";

type TreeNodeProps = {
  node: TreeNodeType;
  selectedNode: string | null;
  onSelect: (id: string) => void;
  onAdd: (parentId: string) => void;
  onDelete: (id: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selectedNode,
  onSelect,
  onAdd,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="ml-4">
      <div
        className={`cursor-pointer hover:bg-gray-200 p-1 rounded flex items-center gap-1 ${
          selectedNode === node.id ? "bg-blue-300" : ""
        }`}
        onClick={() => onSelect(node.id)}
      >
        {node.children.length > 0 && (
          <span className="mr-1" onClick={() => setExpanded(!expanded)}>
            {expanded ? "▼" : "▶"}
          </span>
        )}
        {node.label}
        <TreeActions
          onAdd={() => onAdd(node.id)}
          onDelete={() => onDelete(node.id)}
        />
      </div>
      {expanded && node.children.length > 0 && (
        <ul className="ml-4">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              onSelect={onSelect}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
