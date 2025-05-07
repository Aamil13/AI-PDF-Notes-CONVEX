"use client"
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CgArrowsExchangeAltV } from "react-icons/cg";
// Dummy data type
type PDF = {
  id: string;
  filename: string;
  size: string;
  lastModified: string;
  author: string;
  pages: number;
};

// Sample data
const data: PDF[] = [
  {
    id: '1',
    filename: 'Annual Report 2024.pdf',
    size: '2.4 MB',
    lastModified: '2024-01-15',
    author: 'John Doe',
    pages: 45,
  },
  {
    id: '2',
    filename: 'Project Proposal.pdf',
    size: '1.8 MB',
    lastModified: '2024-01-20',
    author: 'Jane Smith',
    pages: 12,
  },
  {
    id: '3',
    filename: 'Financial Statement.pdf',
    size: '3.2 MB',
    lastModified: '2024-01-25',
    author: 'Mike Johnson',
    pages: 28,
  },
  {
    id: '4',
    filename: 'Technical Documentation.pdf',
    size: '5.1 MB',
    lastModified: '2024-01-30',
    author: 'Sarah Williams',
    pages: 76,
  },
  {
    id: '5',
    filename: 'Meeting Minutes.pdf',
    size: '0.8 MB',
    lastModified: '2024-02-01',
    author: 'Robert Brown',
    pages: 8,
  },
];

const columnHelper = createColumnHelper<PDF>();

const PDFTable = () => {
  const columns = [
    columnHelper.accessor('filename', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Filename
          <CgArrowsExchangeAltV className="h-4 w-4" />
        </button>
      ),
      cell: info => <div className="font-medium">{info.getValue()}</div>,
    }),
    columnHelper.accessor('size', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <CgArrowsExchangeAltV className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor('lastModified', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Last Modified
          <CgArrowsExchangeAltV className="h-4 w-4" />
        </button>
      ),
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('author', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Author
          <CgArrowsExchangeAltV className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor('pages', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Pages
          <CgArrowsExchangeAltV className="h-4 w-4" />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-3xl  w-11/12">
    <table className="w-full overflow-hidden rounded-3xl">
        <thead className="border-b bg-neutral-100 rounded-3xl">
          {table.getHeaderGroups().map(headerGroup => (
            <tr  key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id}
                  className="px-6 py-3  text-left text-sm font-semibold text-gray-900"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id}
              className="border-b bg-slate-50 hover:bg-slate-100"
            >
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PDFTable;