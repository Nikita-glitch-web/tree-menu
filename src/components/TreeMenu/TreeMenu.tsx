import React, { useState } from "react";
import { FlatTreeType } from "../../types/treeTypes";
import TreeNode from "../TreeNode/TreeNode";
import TreeActions from "../TreeActions/TreeActions";
import styles from "./TreeMenu.module.css";

const initialTreeData: FlatTreeType = {
  tt12378: {
    id: "tt12378",
    label: "Main",
    children: ["qwert456", "3"],
  },
  qwert456: { id: "qwert456", label: "Sub", children: ["5"] },
  "3": { id: "3", label: "Sub", children: ["4"] },
  "4": { id: "4", label: "Sub", children: [] },
  "5": { id: "5", label: "Sub", children: [] },
};

const TreeMenu: React.FC = () => {
  const [treeData, setTreeData] = useState<FlatTreeType>(initialTreeData);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = (parentId?: string) => {
    const newId = Date.now().toString();
    const newNode = {
      id: newId,
      label: parentId ? `Sub ${newId}` : `Main ${newId}`,
      children: [],
    };

    setTreeData((prev) => {
      if (!parentId) {
        return { ...prev, [newId]: newNode };
      }
      return {
        ...prev,
        [newId]: newNode,
        [parentId]: {
          ...prev[parentId],
          children: [...prev[parentId].children, newId],
        },
      };
    });
  };

  const deleteNode = (id: string) => {
    setTreeData((prev) => {
      const newTree = { ...prev };
      delete newTree[id];
      Object.keys(newTree).forEach((key) => {
        newTree[key].children = newTree[key].children.filter(
          (childId) => childId !== id
        );
      });
      return newTree;
    });
  };

  const renderTree = (nodeId: string) => {
    const node = treeData[nodeId];
    if (!node) return null;

    return (
      <TreeNode
        key={node.id}
        node={node}
        treeData={treeData}
        selectedNode={selectedNode}
        onSelect={setSelectedNode}
        onAdd={addNode}
        onDelete={deleteNode}
      />
    );
  };

  return (
    <div className={styles.treeMenu}>
      <h2 className={styles.title}>Tree menu</h2>

      <div className={styles.actionsContainer}>
        <TreeActions onAdd={() => addNode()} onDelete={() => {}} />
      </div>

      <ul className={styles.treeList}>
        {Object.keys(treeData)
          .filter(
            (id) =>
              !Object.values(treeData).some((node) =>
                node.children.includes(id)
              )
          )
          .map((rootId) => renderTree(rootId))}
      </ul>

      {selectedNode && (
        <p className={styles.selectedNode}>Selected {selectedNode}</p>
      )}
    </div>
  );
};

export default TreeMenu;
