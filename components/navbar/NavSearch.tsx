"use client";

import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="mt-4 dark:bg-muted"
    />
  );
}
export default NavSearch;
