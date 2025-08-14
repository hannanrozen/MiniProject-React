import React, { memo, useMemo } from "react";
import UserCard from "./UserCard";

const VirtualizedUserGrid = memo(
  ({ users, onUserClick, containerHeight = 600 }) => {
    const CARD_HEIGHT = 300; // Approximate height of each UserCard
    const CARDS_PER_ROW = 3; // Based on grid layout
    const ROW_HEIGHT = CARD_HEIGHT + 32; // Include margins

    const visibleRows = Math.ceil(containerHeight / ROW_HEIGHT) + 2; // Buffer rows

    const userRows = useMemo(() => {
      const rows = [];
      for (let i = 0; i < users.length; i += CARDS_PER_ROW) {
        rows.push(users.slice(i, i + CARDS_PER_ROW));
      }
      return rows;
    }, [users]);

    // Only render visible rows for better performance
    const visibleUserRows = useMemo(() => {
      return userRows.slice(0, Math.min(visibleRows, userRows.length));
    }, [userRows, visibleRows]);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {visibleUserRows.flat().map((user) => (
          <div key={user.id} className="w-full">
            <UserCard user={user} onClick={onUserClick} />
          </div>
        ))}
      </div>
    );
  }
);

VirtualizedUserGrid.displayName = "VirtualizedUserGrid";

export default VirtualizedUserGrid;
