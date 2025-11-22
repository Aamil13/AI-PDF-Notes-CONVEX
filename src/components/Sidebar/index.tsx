'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../ui/button';
import { BsChatLeftQuoteFill, BsChatLeftDots } from 'react-icons/bs';
import { CiClock2, CiTrash, CiStar } from 'react-icons/ci';
import { LiaFilePdf } from 'react-icons/lia';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import useAppStore from '@/Store/useAppStore';
import { motion } from 'framer-motion';
import { Skeleton } from '../ui/skeleton';
import useDeviceType from '@/Hooks/useDeviceType';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import UploadTrigger from '../UploadTrigger';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { PricingModal } from '../PricingModal/PricingModal';

const tabs = [
  { icon: CiClock2, title: 'Recent' },
  { icon: LiaFilePdf, title: 'All PDF' },
  { icon: CiStar, title: 'Starred', status: 'coming soon' },
  { icon: CiTrash, title: 'Trash', status: 'coming soon' },
];

const Sidebar = () => {
  const {
    isNavbarCollapsed,
    theme,
    showSideBarOnMobile,
    toggleShowSideBarOnMobile,
    toggleNavbar,
    totalFilesUploaded,
    setTotalFilesUploaded,
  } = useAppStore();
  const userData = useUser();
  const totalFiles = useQuery(api.pdf_storage.getUserFileCount, {
    createdBy: userData.user?.primaryEmailAddress?.emailAddress || '',
  });
  const userDetails =
    useQuery(api.user.getUserDataByEmail, {
      email: userData.user?.primaryEmailAddress?.emailAddress || '',
    }) || [];

  const { isMobile } = useDeviceType();

  const segment = useSelectedLayoutSegment();
  const [currentTab, setCurrentTab] = useState('Recent');
  const navigate = useRouter();
  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  useEffect(() => {
    if (totalFiles?.totalCount && setTotalFilesUploaded) {
      setTotalFilesUploaded(totalFiles.totalCount);
    }
  }, [totalFiles, setTotalFilesUploaded]);

  useEffect(() => {
    if (!segment) return;

    const capitalizedSegment = capitalize(segment);

    if (capitalizedSegment !== currentTab) {
      if (capitalizedSegment == 'All') {
        setCurrentTab('All PDF');
      } else {
        setCurrentTab(capitalizedSegment);
      }
    }
  }, [segment]);

  const handleTabChange = (
    e: React.MouseEvent,
    value: string,
    status: string
  ) => {
    if (status === 'coming soon') {
      toast.warning('This feature is coming soon!', {
        position: 'top-center',
      });
      return;
    }
    setCurrentTab(value);
    e.stopPropagation();
    const routeToNavigate = value.replace(' ', '').toLowerCase();

    if (routeToNavigate === 'allpdf') {
      navigate.push(`/all`);
    } else {
      navigate.push(`/${routeToNavigate}`);
    }
  };

  const handleResumeClick = () => {
    return;
    navigate.push('/resume');
  };

  useEffect(() => {
    if (isNavbarCollapsed == null) {
      toggleNavbar();
    }
  }, []);

  if (isNavbarCollapsed == null) {
    return (
      <div
        className={` ${!isNavbarCollapsed ? ' w-14 ' : 'w-52'} h-full transition-all duration-1000  flex flex-col items-center gap-8`}
      >
        <div className="flex items-center gap-2 justify-center p-4">
          <BsChatLeftQuoteFill color="#24AFFC" size={24} />
        </div>

        <div className="flex flex-col w-full gap-4 justify-between h-full">
          <div className="flex flex-col gap-4 items-center w-11/12">
            <Skeleton className="bg-neutral-200 w-10 h-10 rounded-xl" />
            <Skeleton className="bg-neutral-200 w-10 h-10 rounded-xl" />
          </div>

          <div className="flex flex-col gap-4 w-full ">
            {tabs.map((item) => (
              <div
                key={item.title}
                className={`cursor-pointer flex items-center relative py-2 transition-all duration-100  justify-center
           `}
              >
                <Skeleton className="bg-neutral-200 w-10 h-10 rounded-xl" />
              </div>
            ))}
          </div>
          <div className="m-4 rounded-xl flex flex-col gap-4 items-center justify-between pb-5">
            <Skeleton className="bg-neutral-200 w-10 h-10 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile && showSideBarOnMobile && (
        <div
          onClick={() => toggleShowSideBarOnMobile()}
          className="bg-black opacity-35 absolute w-screen h-full "
        ></div>
      )}

      <div
        className={` ${isNavbarCollapsed ? ' w-14 ' : 'w-52'} h-full transition-all duration-100 ${showSideBarOnMobile ? 'left-0 z-20' : '-left-72'} ${isMobile && 'absolute bg-white dark:bg-neutral-900'}  flex flex-col items-center gap-8`}
      >
        <div className="flex items-center gap-2 justify-center p-4">
          {isMobile && (
            <MdKeyboardDoubleArrowLeft
              onClick={() => toggleShowSideBarOnMobile()}
              className="absolute left-0 animate-pulse"
              color="#24AFFC"
              size={20}
            />
          )}
          <BsChatLeftQuoteFill color="#24AFFC" size={24} />
          {!isNavbarCollapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-nowrap"
            >
              PDF-Chat
            </motion.p>
          )}
          {isMobile && isNavbarCollapsed && (
            <IoIosArrowForward
              onClick={() => toggleNavbar()}
              className="absolute right-0 animate-pulse"
              color="#24AFFC"
              size={20}
            />
          )}
          {isMobile && !isNavbarCollapsed && (
            <IoIosArrowBack
              onClick={() => toggleNavbar()}
              className="absolute right-0 animate-pulse"
              color="#24AFFC"
              size={20}
            />
          )}
        </div>

        <div className="flex flex-col w-full gap-4 justify-between h-full">
          <div className="flex flex-col gap-4 items-center w-11/12">
            <UploadTrigger
              isNavbarCollapsed={isNavbarCollapsed}
              canUploadMore={
                Number(totalFilesUploaded) < 5 ||
                (Array.isArray(userDetails)
                  ? 0
                  : (userDetails?.planActiveTill ?? 0)) > Date.now()
              }
            />
            {/* <Button
              onClick={() => handleResumeClick()}
              style={{ borderRadius: 10 }}
              className={`bg-white text-neutral-800 hover:bg-[#24AFFC] hover:text-white active:bg-[#000000] text-lg font-poppins flex items-center gap-2 ${isNavbarCollapsed ? 'w-2/3 ' : 'mx-4 w-11/12 h-12'}`}
            >
              <BsChatLeftDots size={32} /> {!isNavbarCollapsed && 'Resume'}
            </Button> */}
          </div>

          <div className="flex flex-col gap-4 w-full ">
            {tabs.map((item) => (
              <motion.div
                key={item.title}
                onClick={(e) =>
                  handleTabChange(e, item.title, item.status || '')
                }
                initial={{ opacity: 0.6 }}
                animate={{
                  opacity: 1,
                  color: currentTab === item.title ? '#24AFFC' : '#737373',
                  borderLeftColor:
                    currentTab === item.title ? '#24AFFC' : 'transparent',
                }}
                //   whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`cursor-pointer flex items-center relative py-2 transition-all duration-100 ${
                  isNavbarCollapsed ? 'justify-center' : 'gap-10'
                } border-l-4`}
              >
                <motion.div
                  animate={{
                    rotate: currentTab === item.title ? 360 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  // className={isNavbarCollapsed   ? "bg-white" : ""}
                >
                  <item.icon
                    className={
                      theme == 'dark' && currentTab !== item.title
                        ? 'text-white'
                        : currentTab === item.title
                          ? 'text-[#24AFFC]'
                          : ''
                    }
                    size={26}
                  />
                </motion.div>
                {!isNavbarCollapsed && (
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={
                      theme == 'dark' && currentTab !== item.title
                        ? 'text-white font-medium'
                        : currentTab === item.title
                          ? 'text-[#24AFFC] font-medium'
                          : 'font-medium'
                    }
                  >
                    {item.title}
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <div
            className={`${isNavbarCollapsed ? '' : 'h-40 bg-[#24AFFC]'} m-4 rounded-xl flex flex-col gap-4 items-center justify-between pb-5`}
          >
            {/* {!isNavbarCollapsed && (
              <div className="w-full flex flex-col items-center">
                <Progress
                  className="bg-[#3CC0FC] my-2 w-2/3"
                  value={((totalFilesUploaded as number) / 5) * 100}
                />
                <p className="text-white text-sm">
                  Free {totalFilesUploaded} out of 5
                </p>
              </div>
            )} */}

            {!isNavbarCollapsed && (
              <div className="w-full flex flex-col items-center text-white text-sm my-2">
                {Array.isArray(userDetails) === false &&
                userDetails?.planType === 'pro' &&
                userDetails?.planActiveTill ? (
                  <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold text-[#3CC0FC]">PRO</p>
                    <p>
                      Valid till{' '}
                      {new Date(userDetails?.planActiveTill).toLocaleDateString(
                        undefined,
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                ) : (
                  <>
                    <Progress
                      className="bg-[#3CC0FC] my-2 w-2/3"
                      value={((totalFilesUploaded as number) / 5) * 100}
                    />
                    <p>Free {totalFilesUploaded} out of 5</p>
                  </>
                )}
              </div>
            )}
            {/*<Button
              style={{ borderRadius: 10 }}
              className={`bg-white text-neutral-800 hover:bg-white active:bg-[#000000] font-poppins flex items-center gap-2 ${isNavbarCollapsed ? 'w-2/3' : 'mx-4 w-11/12 h-12'}`}
            >
              <FaFileInvoiceDollar size={32} />{' '}
              {!isNavbarCollapsed && 'Upgrade for 4$'}
            </Button>*/}

            <PricingModal
              isNavbarCollapsed={isNavbarCollapsed}
              isPlanValid={
                !Array.isArray(userDetails) && userDetails?.planActiveTill
                  ? (userDetails?.planActiveTill ?? 0) > Date.now()
                  : false
              }
              planType={
                !Array.isArray(userDetails) ? userDetails?.planType : undefined
              }
              planActiveTill={
                !Array.isArray(userDetails)
                  ? userDetails?.planActiveTill
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
