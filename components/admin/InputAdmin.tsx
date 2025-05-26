"use client";
import React from 'react';
import { Input } from '../ui/input';
interface InputAdminProps {
    search: string;
    onSearchChange: (value: string) => void;
}
const InputAdmin = ({ search, onSearchChange }:InputAdminProps) => {
  return (
    <Input
      className="w-[240px]"
      placeholder="🔍 Szukaj..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default InputAdmin;
