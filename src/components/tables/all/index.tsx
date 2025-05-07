"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  BiSortAlt2,
  BiFirstPage,
  BiLastPage,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";

// Dummy data type
type PDF = {
  id: string;
  filename: string;
  size: string;
  lastModified: string;
  author: string;
  pages: number;
};

// Format date consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Sample data
const data: PDF[] = [
  {
    id: "1",
    filename: "Annual Report 2024.pdf",
    size: "2.4 MB",
    lastModified: "2024-01-15",
    author: "John Doe",
    pages: 45,
  },
  {
    id: "2",
    filename: "Project Proposal.pdf",
    size: "1.8 MB",
    lastModified: "2024-01-20",
    author: "Jane Smith",
    pages: 12,
  },
  {
    id: "3",
    filename: "Financial Statement.pdf",
    size: "3.2 MB",
    lastModified: "2024-01-25",
    author: "Mike Johnson",
    pages: 28,
  },
  {
    id: "4",
    filename: "Technical Documentation.pdf",
    size: "5.1 MB",
    lastModified: "2024-01-30",
    author: "Sarah Williams",
    pages: 76,
  },
  {
    id: "5",
    filename: "Meeting Minutes.pdf",
    size: "0.8 MB",
    lastModified: "2024-02-01",
    author: "Robert Brown",
    pages: 8,
  },
  {
    id: "6",
    filename: "Research Paper.pdf",
    size: "4.2 MB",
    lastModified: "2024-02-02",
    author: "Emily Chen",
    pages: 52,
  },
  {
    id: "7",
    filename: "Marketing Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Tom Wilson",
    pages: 34,
  },
  {
    id: "8",
    filename: "eight Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Wilson Tom",
    pages: 34,
  },
  {
    id: "9",
    filename: "ninth Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Wil",
    pages: 34,
  },
  {
    id: "10",
    filename: "test Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Tom Wilson",
    pages: 34,
  },
  {
    id: "11",
    filename: "test Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Tom Wilson",
    pages: 34,
  },
  {
    id: "12",
    filename: "test Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Tom Wilson",
    pages: 34,
  },
  {
    id: "13",
    filename: "test Plan.pdf",
    size: "2.1 MB",
    lastModified: "2024-02-03",
    author: "Tom Wilson",
    pages: 34,
  },
];

const columnHelper = createColumnHelper<PDF>();

const ALLPDFTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  const columns = [
    columnHelper.accessor("filename", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filename
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
      cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    }),
    columnHelper.accessor("size", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor("lastModified", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor("author", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor("pages", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pages
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  return (
    <div className="w-full sm:min-h-96   ">
      <div className="rounded-xl overflow-x-auto  max-md:h-5/6 border-neutral-300 dark:border-neutral-600 border">
        <table className="w-full  rounded-xl ">
          <thead className="border-b dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm max-lg:text-xs font-semibold  dark:text-white text-neutral-900"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b dark:border-neutral-700  bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-sm max-lg:text-xs dark:text-white text-neutral-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2  mt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded border p-1 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <BiFirstPage className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded border p-1 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <BiChevronLeft className="h-4 w-4" />
          </button>
          <span className="flex items-center gap-1 text-sm">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            type="button"
            className="rounded border p-1 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <BiChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded border p-1 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <BiLastPage className="h-4 w-4" />
          </button>
        </div>

        {/* <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded border p-1 text-sm"
        >
          {[9, 18, 35, 44, 55, 64].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default ALLPDFTable;
