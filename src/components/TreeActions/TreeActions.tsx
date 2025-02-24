import React from "react";
import styles from "./TreeActions.module.css";

type TreeActionsProps = {
  onAdd: () => void;
  onDelete: () => void;
};

const TreeActions: React.FC<TreeActionsProps> = ({ onAdd, onDelete }) => {
  return (
    <div className={styles.actionsContainer}>
      <button className={styles.actionButton} onClick={onAdd} title="Додати">
        +
      </button>
      <button
        className={styles.actionButton}
        onClick={onDelete}
        title="Видалити"
      >
        -
      </button>
    </div>
  );
};

export default TreeActions;
