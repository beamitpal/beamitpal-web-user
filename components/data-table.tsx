"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  editHref: (item: T) => string;
  onDelete: (item: T) => Promise<void>;
  idAccessor: keyof T;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  editHref,
  onDelete,
  idAccessor,
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} className={col.className}>
                {col.header}
              </TableHead>
            ))}
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={String(item[idAccessor])}>
                {columns.map((col, i) => (
                  <TableCell key={i} className={col.className}>
                    {typeof col.accessor === "function"
                      ? col.accessor(item)
                      : String(item[col.accessor] ?? "")}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={editHref(item)}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await onDelete(item);
                        }
                      }}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
