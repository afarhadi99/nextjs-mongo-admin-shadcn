"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, EditIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<T extends { id: any }> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    render?: (item: T) => React.ReactNode;
  }[];
  onEdit: (item: T) => void;
  onDelete?: (item: T) => void;
  searchable: boolean;
  className?: string;
}

function DataTable<T extends { id: any }>({
  data,
  columns,
  onEdit,
  onDelete,
  searchable,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    if (!searchable) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item) =>
      columns.some((column) => {
        const value = item[column.accessor];
        if (value === null || value === undefined) return false;
        const strValue = String(value).toLowerCase();
        return strValue.includes(searchTerm.toLowerCase());
      })
    );
    setFilteredData(filtered);
  }, [data, searchTerm, columns, searchable]);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      {searchable && (
        <div className="mb-4 flex items-center space-x-2">
          <SearchIcon className="h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.header}>{column.header}</TableHead>
            ))}
             <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={String(item.id)}>
              {columns.map((column) => (
                <TableCell key={column.header}>
                  {column.render ? column.render(item) : String(item[column.accessor])}
                </TableCell>
              ))}
               <TableCell className="text-right flex space-x-2 justify-end">
                <Button size="sm" onClick={() => onEdit(item)}>
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
               {onDelete && (
                <Button size="sm" variant="destructive" onClick={() => onDelete(item)}>
                   <Trash2Icon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;