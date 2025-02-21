import React, { useState } from "react";
import { TreeNodeType } from "../../types/treeTypes";
import TreeNode from "../TreeNode/TreeNode";
import TreeActions from "../TreeActions/TreeActions";
import styles from "./TreeMenu.module.css";

const TreeMenu: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNodeType[]>([
    {
      id: "1",
      label: "Main",
      children: [
        { id: "2", label: "Sub", children: [] },
        { id: "3", label: "Sub", children: [] },
        { id: "4", label: "Sub", children: [] },
      ],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = (parentId?: string) => {
    setTreeData((prev) => {
      const isTopLevel = !parentId || prev.some((node) => node.id === parentId);

      const newNode: TreeNodeType = {
        id: Date.now().toString(),
        label: isTopLevel ? `Main ${Date.now()}` : `Sub ${Date.now()}`,
        children: [],
      };

      if (!parentId) {
        return [...prev, newNode]; // Добавляем в корень
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
    <div className={styles.treeMenu}>
      <h2 className={styles.title}>Tree menu</h2>

      <div className={styles.actionsContainer}>
        <TreeActions onAdd={() => addNode()} onDelete={() => {}} />
      </div>

      <ul className={styles.treeList}>
        {treeData.map((node) => (
          <li key={node.id} className={styles.treeItem}>
            <TreeNode
              node={node}
              selectedNode={selectedNode}
              onSelect={setSelectedNode}
              onAdd={addNode}
              onDelete={deleteNode}
            />
          </li>
        ))}
      </ul>

      {selectedNode && (
        <p className={styles.selectedNode}>Selected {selectedNode}</p>
      )}
    </div>
  );
};

export default TreeMenu;
