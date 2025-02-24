export interface TreeNodeType {
  id: string;
  label: string;
  children: string[];
}

export interface FlatTreeType {
  [key: string]: TreeNodeType;
}

export interface TreeNodeProps {
  node: TreeNodeType;
  selectedNode: string | null;
  onSelect: (id: string | null) => void;
  onToggle: (id: string) => void;
  expandedNodes: Set<string>;
}
