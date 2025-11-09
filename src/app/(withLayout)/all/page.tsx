// import ALLPDFTable from "@/components/tables/all";
import { ALLPDFTable } from '@/components/tables/all';
import React from 'react';

const All = () => {
  return (
    <div className="lg:bg-white bg-neutral-50 dark:bg-neutral-600 dark:max-lg:bg-neutral-800 w-full h-full rounded-3xl flex justify-center lg:p-5  ">
      <ALLPDFTable />
    </div>
  );
};

export default All;
