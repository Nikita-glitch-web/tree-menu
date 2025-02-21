import React, { useState } from "react";
import { TreeNodeType } from "../../types/treeTypes";
import TreeActions from "../TreeActions/TreeActions";
import styles from "./TreeNode.module.css";

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
    <li className={styles.treeNode}>
      <div
        className={`${styles.node} ${
          selectedNode === node.id ? styles.selected : ""
        }`}
        onClick={() => onSelect(node.id)}
      >
        {node.children.length > 0 && (
          <span
            className={styles.toggle}
            onClick={() => setExpanded(!expanded)}
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
      {expanded && node.children.length > 0 && (
        <ul className={styles.children}>
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
