'use client';
import React, { useState } from 'react';
import { useQuery } from 'convex/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';
import {
  BiSortAlt2,
  BiFirstPage,
  BiLastPage,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi';
import { api } from '../../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Type definition matching your schema
type PDF = {
  _id: string;
  _creationTime: number;
  storageId: string;
  fileId: string;
  fileName: string;
  fileUrl: string;
  createdBy: string;
};

// Format date consistently
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const columnHelper = createColumnHelper<PDF>();

export const ALLPDFTable = () => {
  const userData = useUser();
  const navigate = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });

  // Map sorting state to sortBy and sortOrder
  const sortBy = sorting.length > 0 ? sorting[0].id : '_creationTime';
  const sortOrder = sorting.length > 0 && sorting[0].desc ? 'desc' : 'asc';

  // Fetch data from Convex API
  const result = useQuery(api.pdf_storage.getUserAllFiles, {
    createdBy: userData.user?.primaryEmailAddress?.emailAddress || '',
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sortBy: sortBy as any,
    sortOrder: sortOrder as any,
  });

  const handleNavigate = (fileID: string) => {
    navigate.push(`/chat/${fileID}`);
  };

  const columns = [
    columnHelper.accessor('fileName', {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          File Name
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
      cell: (info) => (
        <div className="font-medium truncate max-w-xs">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('_creationTime', {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <BiSortAlt2 className="h-4 w-4" />
        </button>
      ),
      cell: (info) => formatDate(info.getValue()),
    }),
    columnHelper.accessor('fileId', {
      header: 'File ID',
      cell: (info) => (
        <div className="truncate max-w-xs text-xs text-gray-500">
          {info.getValue()}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: result?.data ?? [],
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
    manualPagination: true,
    rowCount: result?.totalCount ?? 0,
    pageCount: result?.totalPages ?? 0,
  });

  const isLoading = result === undefined;

  return (
    <div className="w-full sm:min-h-96">
      <div className="rounded-xl overflow-x-auto max-md:h-5/6 border-neutral-300 dark:border-neutral-600 border">
        <table className="w-full rounded-xl">
          <thead className="border-b dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm max-lg:text-xs font-semibold dark:text-white text-neutral-900"
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
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">
                  No files found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b cursor-pointer dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800 hover:bg-slate-100"
                  onClick={() => handleNavigate(row.original.fileId)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm max-lg:text-xs dark:text-white text-neutral-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-2 mt-4">
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
              {(result?.pageIndex ?? 0) + 1} of {result?.totalPages ?? 0}
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
        <div className="text-sm text-gray-500">
          Total: {result?.totalCount ?? 0} files
        </div>
      </div>
    </div>
  );
};
