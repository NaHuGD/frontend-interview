import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/ArrowIcon';

const Pagination = () => {
  return (
    <div className="flex items-center justify-end space-x-2 py-[5px]">
      <button className="p-2">
        <ArrowLeftIcon />
      </button>
      <button className="p-2">
        <ArrowRightIcon active />
      </button>
    </div>
  );
};

export default Pagination;
