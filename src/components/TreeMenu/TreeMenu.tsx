import React, { useState } from "react";
import { TreeNodeType } from "../../types/treeTypes";
import TreeNode from "../TreeNode/TreeNode";
import TreeActions from "../TreeActions/TreeActions";
import { motion, AnimatePresence } from "framer-motion";

const TreeMenu: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNodeType[]>([
    {
      id: "1",
      label: "Головний розділ 1",
      children: [
        { id: "2", label: "Підрозділ 1.1", children: [] },
        { id: "3", label: "Підрозділ 1.2", children: [] },
        { id: "4", label: "Підрозділ 1.3", children: [] },
      ],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = (parentId?: string) => {
    setTreeData((prev) => {
      const newNode: TreeNodeType = {
        id: Date.now().toString(),
        label: parentId
          ? `Підрозділ ${Date.now()}`
          : `Головний розділ ${Date.now()}`,
        children: [],
      };

      if (!parentId) {
        return [...prev, newNode];
      }

      const updateTree = (nodes: TreeNodeType[]): TreeNodeType[] =>
        nodes.map((node) => {
          if (node.id === parentId) {
            return { ...node, children: [...node.children, newNode] };
          }
          return { ...node, children: updateTree(node.children) };
        });

      return updateTree(prev);
    });
  };

  const deleteNode = (id: string) => {
    setTreeData((prev) => {
      const removeNode = (nodes: TreeNodeType[]): TreeNodeType[] =>
        nodes
          .filter((node) => node.id !== id)
          .map((node) => ({ ...node, children: removeNode(node.children) }));

      return removeNode(prev);
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Дерево меню</h2>

      {/* Анімація для кнопок */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TreeActions onAdd={() => addNode()} onDelete={() => {}} />
      </motion.div>

      <ul>
        <AnimatePresence>
          {treeData.map((node) => (
            <motion.li
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <TreeNode
                node={node}
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                onAdd={addNode}
                onDelete={deleteNode}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {selectedNode && (
        <motion.p
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Вибрано: {selectedNode}
        </motion.p>
      )}
    </div>
  );
};

export default TreeMenu;
