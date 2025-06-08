import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons/ArrowIcon';
import { PageParams } from '@/types';
import { clsx } from 'clsx';

interface PaginationProps extends PageParams {
  total: number | undefined;
  isFetching: boolean;
}

const PaginationInfo: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize,
  isFetching,
}) => {
  if (!total || isFetching) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="text-primary-87 text-sm">{`${start}-${end} of ${total}`}</div>
  );
};

const Pagination: React.FC<
  PaginationProps & { onChange: (pageParams: PageParams) => void }
> = ({ total = 0, page, pageSize, isFetching, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const isAtFirstPage = page <= 1;
  const isAtLastPage = page >= totalPages;
  const isPrevEnabled = !isFetching && !isAtFirstPage;
  const isNextEnabled = !isFetching && !isAtLastPage;

  const handlePrev = () => {
    if (isPrevEnabled) {
      onChange({ page: page - 1, pageSize });
    }
  };

  const handleNext = () => {
    if (isNextEnabled) {
      onChange({ page: page + 1, pageSize });
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-[5px]">
      <PaginationInfo
        page={page}
        pageSize={pageSize}
        total={total}
        isFetching={isFetching}
      />
      <button
        className={clsx('p-2', {
          'cursor-pointer': isPrevEnabled,
        })}
        onClick={handlePrev}
      >
        <ArrowLeftIcon active={isPrevEnabled} />
      </button>
      <button
        className={clsx('p-2', {
          'cursor-pointer': isNextEnabled,
        })}
        onClick={handleNext}
      >
        <ArrowRightIcon active={isNextEnabled} />
      </button>
    </div>
  );
};

export default Pagination;
