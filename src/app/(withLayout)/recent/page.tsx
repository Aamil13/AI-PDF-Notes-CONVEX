import PDFTable from "@/components/tables/recent";
import React from "react";
import { BsFilePdfFill } from "react-icons/bs";

type Props = {};
const data: any[] = [
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
];
const Recent = (props: Props) => {
  return (
    <div className=" overflow-auto bg-white dark:bg-neutral-600 w-full h-full rounded-3xl flex flex-col p-4 gap-4">
      <h1 className="text-lg font-bold">Recent</h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
          <div className="col-span-1">Name</div>
          <div className="col-span-1 text-center">Size</div>
          <div className="col-span-1 text-center">Last Opened</div>
        </div>

        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-center">
            <div className="flex items-center gap-4 col-span-1">
              <BsFilePdfFill className="w-6 h-6 min-w-[24px] text-red-500" />
              <p className="max-sm:text-xs truncate">{item.filename}</p>
            </div>
            <p className="col-span-1 text-center max-sm:text-xs">{item.size}</p>
            <p className="col-span-1 text-center max-sm:text-xs">
              {item.lastModified}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
