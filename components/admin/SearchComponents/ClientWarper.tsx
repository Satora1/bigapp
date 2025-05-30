"use client";

import React, { useState } from "react";
import InputAdmin from "../InputAdmin";

interface AdminBooksWrapperProps {
  children: (search: string) => React.ReactNode;
}

const AdminBooksWrapper = ({ children }: AdminBooksWrapperProps) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex justify-end mb-4">
        <InputAdmin search={search} onSearchChange={setSearch} />
      </div>
      {children(search)}
    </div>
  );
};

export default AdminBooksWrapper;
