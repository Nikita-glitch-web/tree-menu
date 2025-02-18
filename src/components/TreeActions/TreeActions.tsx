import React from "react";
import { motion } from "framer-motion";

type TreeActionsProps = {
  onAdd: () => void;
  onDelete: () => void;
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  tap: { scale: 0.9, transition: { duration: 0.1 } },
};

const TreeActions: React.FC<TreeActionsProps> = ({ onAdd, onDelete }) => {
  return (
    <div className="flex gap-0.5">
      <motion.button
        className="w-5 h-5 text-xs bg-gray-300 rounded hover:bg-gray-400 transition flex items-center justify-center"
        onClick={onAdd}
        title="Додати"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileTap="tap"
      >
        +
      </motion.button>
      <motion.button
        className="w-5 h-5 text-xs bg-gray-300 rounded hover:bg-gray-400 transition flex items-center justify-center"
        onClick={onDelete}
        title="Видалити"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileTap="tap"
      >
        -
      </motion.button>
    </div>
  );
};

export default TreeActions;
