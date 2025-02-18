import React from "react";
import { motion } from "framer-motion";
import { TreeNodeType } from "../../types/treeTypes";

type TreeNodeProps = {
  node: TreeNodeType;
  selectedNode: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  expandedNodes: Set<string>;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  selectedNode,
  onSelect,
  onToggle,
  expandedNodes,
}) => {
  const isExpanded = expandedNodes.has(node.id);

  return (
    <li className="ml-4">
      <div
        className={`cursor-pointer hover:bg-gray-200 p-1 rounded flex items-center ${
          selectedNode === node.id ? "bg-blue-300" : ""
        }`}
        onClick={() => onSelect(node.id)}
      >
        {node.children.length > 0 && (
          <button
            className="mr-2 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation(); // Предотвращаем срабатывание onSelect
              onToggle(node.id);
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        {node.label}
      </div>

      {isExpanded && node.children.length > 0 && (
        <motion.ul
          className="ml-4 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              onSelect={onSelect}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </motion.ul>
      )}
    </li>
  );
};

export default TreeNode;
