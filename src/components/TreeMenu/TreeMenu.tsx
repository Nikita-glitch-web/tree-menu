import React, { useState } from "react";
import { TreeNodeType } from "../../types/treeTypes";
import TreeNode from "../TreeNode/TreeNode";

const treeData: TreeNodeType[] = [
  {
    id: "1",
    label: "Clothes",
    children: [
      { id: "2", label: "Pants", children: [] },
      { id: "3", label: "Shirts", children: [] },
      { id: "4", label: "Hoodies", children: [] },
    ],
  },
  {
    id: "5",
    label: "Shoes",
    children: [
      { id: "6", label: "Sneakers", children: [] },
      { id: "7", label: "Classic", children: [] },
      { id: "8", label: "Boots", children: [] },
    ],
  },
  {
    id: "9",
    label: "Accessories",
    children: [
      { id: "10", label: "Jewerly", children: [] },
      { id: "11", label: "Caps", children: [] },
      { id: "12", label: "Watches", children: [] },
    ],
  },
];

const TreeMenu: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Catalog</h2>
      <ul>
        {treeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedNode={selectedNode}
            onSelect={setSelectedNode}
            onToggle={toggleNode}
            expandedNodes={expandedNodes}
          />
        ))}
      </ul>
      {selectedNode && <p className="mt-2">Вибрано: {selectedNode}</p>}
    </div>
  );
};

export default TreeMenu;
