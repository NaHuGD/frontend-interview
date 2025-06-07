import { AccountData, mockFetch } from '@/app/api/mock';
import EyeIcon from '@/components/icons/EyeIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';
import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import Pagination from './Pagination';

const getAvatarIndex = (id: number) => {
  const numericId = Math.abs(id);
  const avatarIndex = (numericId % 8) + 1;
  return avatarIndex;
};

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

const TableCheckboxCell = () => (
  <th className="pl-2">
    <input type="checkbox" className="border-secondary-68 h-4.5 w-4.5" />
  </th>
);

const TableRow = ({ invoice }: { invoice: AccountData }) => {
  const { id, name, mail, totalBalance, issueDate, balance, hasPaid } = invoice;

  return (
    <tr className="border-other-divider border-b">
      <td>
        <input type="checkbox" className="border-secondary-68" />
      </td>
      <td className="text-primary-main px-4 py-4 text-sm font-normal">
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
      <td className="text-secondary-68 text-sm font-medium">{totalBalance}</td>
      <td className="text-secondary-68 text-sm font-medium">{issueDate}</td>
      <td>
        {/* TODO: status */}
        {false ? (
          <span className="text-primary-87 text-sm font-normal">{balance}</span>
        ) : (
          <PaidStatus hasPaid={hasPaid} />
        )}
      </td>
      <td>
        <div className="flex space-x-2">
          <button title="delete">
            <DeleteIcon />
          </button>
          <button title="view">
            <EyeIcon />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default async function InvoiceTable() {
  const res = await mockFetch({ page: 1, pageSize: 100 });

  return (
    <div className="w-full">
      <table className="w-full">
        {/* Table Header */}
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr className="h-13.5">
            <TableCheckboxCell />
            <TableHeaderCell className="text-center">ID</TableHeaderCell>
            <TableHeaderCell className="text-center">CLIENT</TableHeaderCell>
            <TableHeaderCell className="text-left">TOTAL</TableHeaderCell>
            <TableHeaderCell className="text-left">ISSUED DATE</TableHeaderCell>
            <TableHeaderCell className="text-center">BALANCE</TableHeaderCell>
            <TableHeaderCell className="text-center">ACTION</TableHeaderCell>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {res.map((invoice) => (
            <TableRow key={invoice.id} invoice={invoice} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
