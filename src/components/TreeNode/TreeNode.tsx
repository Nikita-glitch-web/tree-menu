import React, { useState } from "react";
import { TreeNodeType, FlatTreeType } from "../../types/treeTypes";
import TreeActions from "../TreeActions/TreeActions";
import styles from "./TreeNode.module.css";

type TreeNodeProps = {
  node: TreeNodeType;
  treeData: FlatTreeType;
  selectedNode: string | null;
  onSelect: (id: string) => void;
  onAdd: (parentId: string) => void;
  onDelete: (id: string) => void;
};

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  treeData,
  selectedNode,
  onSelect,
  onAdd,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const children = node.children
    .map((childId) => treeData[childId])
    .filter(Boolean);

  return (
    <li className={styles.treeNode}>
      <div
        className={`${styles.node} ${
          selectedNode === node.id ? styles.selected : ""
        }`}
        onClick={() => onSelect(node.id)}
      >
        {children.length > 0 && (
          <span
            className={styles.toggle}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? "▼" : "▶"}
          </span>
        )}
        {node.label}
        <TreeActions
          onAdd={() => onAdd(node.id)}
          onDelete={() => onDelete(node.id)}
        />
      </div>
      {expanded && children.length > 0 && (
        <ul className={`${styles.children} ${expanded ? styles.open : ""}`}>
          {children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              treeData={treeData}
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
