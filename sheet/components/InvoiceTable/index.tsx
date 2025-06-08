'use client';

import useSWR from 'swr';
import { mockFetch } from '@/app/api/mock';
import EyeIcon from '@/components/icons/EyeIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import Pagination from './Pagination';
import TableSkeleton from './TableSkeleton';
import { useCallback, useRef, useState } from 'react';
import {
  AccountData,
  AccountDataRequestInput,
  AccountDataResult,
  PageParams,
  RefreshData,
} from '@/types';
import ErrorContent from './ErrorContent';
import {
  formatCurrency,
  formatTimestampToDate,
  getAvatarIndex,
} from '@/lib/utils';
import EmptyContent from './EmptyContent';

type HandleDeleteAction = (id: number[]) => void;

interface TableContainerProps {
  isFetching: boolean;
  responseData: AccountDataResult | undefined;
  shouldShowError: boolean;
  handleDeleteAction: HandleDeleteAction;
  handleToggleAll: () => void;
  selectedIds: number[];
  onSelectedIdsChange: (selectedId: number) => void;
  requestParams: AccountDataRequestInput;
  onPaginationChange: (params: PageParams) => void;
}

interface TableRowProps
  extends Pick<
    TableContainerProps,
    'handleDeleteAction' | 'selectedIds' | 'onSelectedIdsChange'
  > {
  invoice: AccountData;
}

const PaidStatus = ({ hasPaid }: { hasPaid: boolean }) => {
  return (
    <span
      className={clsx('rounded-full px-2.5 py-[3px]', {
        'text-success-main bg-[#4CAF501A]': hasPaid,
        'bg-[#FE7272] text-white': !hasPaid,
      })}
    >
      {hasPaid ? 'Paid' : 'Unpaid'}
    </span>
  );
};

const TableHeaderCell: React.FC<
  React.PropsWithChildren<{ className: string }>
> = ({ children, className }) => {
  return (
    <th
      className={`text-secondary-68 after:bg-other-divider relative pr-7 pl-5 text-xs font-semibold tracking-[0.17px] after:absolute after:top-1/2 after:right-4 after:h-3.5 after:w-0.5 after:-translate-y-1/2 after:content-[''] last:pr-4 last:after:content-none ${className}`}
    >
      {children}
    </th>
  );
};

const TableRow: React.FC<TableRowProps> = ({
  invoice,
  handleDeleteAction,
  selectedIds,
  onSelectedIdsChange,
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const { id, name, mail, totalBalance, issueDate, balance, hasPaid } = invoice;
  const isChecked = selectedIds.includes(id);

  return (
    <tr className="border-other-divider border-b">
      <td>
        <input
          type="checkbox"
          className="border-secondary-68"
          checked={isChecked}
          onChange={() => onSelectedIdsChange(id)}
        />
      </td>
      <td className="text-primary-main text-sm font-normal">
        #{id.toString().padStart(4, '0')}
      </td>
      <td>
        <div className="flex items-center justify-center">
          <div className="mr-3">
            <Avatar index={getAvatarIndex(id)} width={34} height={34} />
          </div>
          <div>
            <div className="text-primary-87 text-sm font-medium">{name}</div>
            <div className="text-secondary-68 text-xs font-medium">{mail}</div>
          </div>
        </div>
      </td>
      <td className="text-secondary-68 text-sm font-medium">
        {formatCurrency(totalBalance)}
      </td>
      <td className="text-secondary-68 text-sm font-medium">
        {formatTimestampToDate(issueDate)}
      </td>
      <td>
        {isBalanceVisible ? (
          <span className="text-primary-87 text-sm font-normal">
            {formatCurrency(balance)}
          </span>
        ) : (
          <PaidStatus hasPaid={hasPaid} />
        )}
      </td>
      <td>
        <div className="flex space-x-2">
          <button
            title="delete"
            className="cursor-pointer"
            onClick={() => handleDeleteAction([id])}
          >
            <DeleteIcon />
          </button>
          <button
            title="view"
            className="cursor-pointer"
            onClick={() => setIsBalanceVisible((prev) => !prev)}
          >
            <EyeIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

const TableContainer: React.FC<TableContainerProps> = ({
  isFetching,
  responseData,
  shouldShowError,
  handleDeleteAction,
  handleToggleAll,
  selectedIds,
  onSelectedIdsChange,
  requestParams,
  onPaginationChange,
}) => {
  if (shouldShowError) return null;

  const isEmptyData = responseData?.data.length === 0;
  const isHiddenCheckbox = isEmptyData || shouldShowError || isFetching;
  const { data } = responseData || {};

  return (
    <div>
      <table className="w-full">
        {/* Table Header */}
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr className="h-13.5">
            <th className="pl-2">
              {!isHiddenCheckbox && (
                <input
                  type="checkbox"
                  className="border-secondary-68 h-4.5 w-4.5"
                  onClick={handleToggleAll}
                />
              )}
            </th>
            <TableHeaderCell className="text-center">ID</TableHeaderCell>
            <TableHeaderCell className="text-center">CLIENT</TableHeaderCell>
            <TableHeaderCell className="text-left">TOTAL</TableHeaderCell>
            <TableHeaderCell className="text-left">ISSUED DATE</TableHeaderCell>
            <TableHeaderCell className="text-center">BALANCE</TableHeaderCell>
            <TableHeaderCell className="text-center">ACTION</TableHeaderCell>
          </tr>
        </thead>
        {isFetching ? (
          <TableSkeleton />
        ) : (
          <tbody>
            {data?.map((invoice) => (
              <TableRow
                key={invoice.id}
                invoice={invoice}
                handleDeleteAction={handleDeleteAction}
                onSelectedIdsChange={onSelectedIdsChange}
                selectedIds={selectedIds}
              />
            ))}
          </tbody>
        )}
      </table>
      {isEmptyData && <EmptyContent />}
      {!shouldShowError && (
        <Pagination
          total={responseData?.total}
          isFetching={isFetching}
          page={requestParams.page}
          pageSize={requestParams.pageSize}
          onChange={onPaginationChange}
        />
      )}
    </div>
  );
};

const ActionBar = ({
  onDeleteSelectedId,
  onSearchChange,
  refreshData,
}: {
  onDeleteSelectedId: () => void;
  onSearchChange: (value: string) => void;
  refreshData: RefreshData;
}) => {
  return (
    <div className="flex items-center justify-end space-x-4 p-5">
      {/* Search Invoice */}
      <input
        type="text"
        placeholder="Search Invoice"
        className="border-primary-87 h-10 w-[150px] rounded-md border py-2 pl-[17px] tracking-[0.15px]"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/* Delete Button */}
      <button
        className="flex w-[150px] cursor-pointer items-center justify-center rounded-[5px] bg-[#FD5558] py-2 text-[15px] leading-6.5 font-medium tracking-[0.46px] text-white"
        onClick={() => onDeleteSelectedId()}
      >
        DELETE
      </button>
      {/* Refresh Invoice Button */}
      <button
        className="bg-primary-main flex w-[150px] cursor-pointer items-center justify-center rounded-[5px] py-2 text-[15px] leading-6.5 font-medium tracking-[0.46px] text-white"
        onClick={() => refreshData()}
      >
        REFRESH INVOICE
      </button>
    </div>
  );
};

export default function InvoiceTable() {
  const debounceRef = useRef<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [requestParams, setRequestParams] = useState<AccountDataRequestInput>({
    value: '',
    page: 1,
    pageSize: 10,
  });
  const {
    data: responseData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    [
      'accounts',
      requestParams.page,
      requestParams.pageSize,
      requestParams.value,
    ],
    () => mockFetch(requestParams),
    {
      // error時不retry
      errorRetryCount: 0,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  const isFetching = isLoading || isValidating;
  const shouldShowError = error && !isFetching;

  const handleDeleteAction = useCallback(
    (idsToDelete?: number[]) => {
      if (!responseData?.data || !idsToDelete?.length) return;

      const updatedData = responseData.data.filter(
        (item) => !idsToDelete.includes(item.id)
      );

      mutate(
        {
          ...responseData,
          data: updatedData,
        },
        false
      );
    },
    [mutate, responseData]
  );

  const onPaginationChange = (params: PageParams) => {
    setRequestParams((prev) => ({ ...prev, ...params }));
  };

  const onSelectedIdsChange = (selectedId: number) => {
    setSelectedIds((prev) =>
      prev.includes(selectedId)
        ? prev.filter((id) => id !== selectedId)
        : [...prev, selectedId]
    );
  };

  const handleToggleAll = () => {
    if (!responseData?.data) return;
    const allIds = responseData.data.map((item) => item.id);
    const isAllSelected = selectedIds.length === allIds.length;

    setSelectedIds(isAllSelected ? [] : allIds);
  };

  const onSearchChange = (value: string) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(
      () => {
        setRequestParams((prev) => ({
          ...prev,
          value,
        }));
      },
      // 300ms debounce
      300
    );
  };

  return (
    <div className="w-full">
      <ActionBar
        onDeleteSelectedId={() => handleDeleteAction(selectedIds)}
        onSearchChange={onSearchChange}
        refreshData={mutate}
      />
      <TableContainer
        isFetching={isFetching}
        responseData={responseData}
        handleDeleteAction={handleDeleteAction}
        shouldShowError={shouldShowError}
        handleToggleAll={handleToggleAll}
        onSelectedIdsChange={onSelectedIdsChange}
        selectedIds={selectedIds}
        requestParams={requestParams}
        onPaginationChange={onPaginationChange}
      />
      {shouldShowError && <ErrorContent onRetry={mutate} />}
    </div>
  );
}
