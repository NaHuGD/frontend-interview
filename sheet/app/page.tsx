import Avatar from '@/components/Avatar';
import InvoiceTable from '@/components/InvoiceTable';

const ActionBar = () => {
  return (
    <div className="flex items-center justify-end space-x-4 p-5">
      {/* Search Invoice */}
      <input
        type="text"
        placeholder="Search Invoice"
        className="border-primary-87 h-10 w-[150px] rounded-md border py-2 pl-[17px] tracking-[0.15px]"
      />
      {/* Delete Button */}
      <button className="flex w-[150px] items-center justify-center rounded-[5px] bg-[#FD5558] py-2 text-[15px] leading-6.5 font-medium tracking-[0.46px] text-white transition-colors">
        DELETE
      </button>
      {/* Refresh Invoice Button */}
      <button className="bg-primary-main flex w-[150px] items-center justify-center rounded-[5px] py-2 text-[15px] leading-6.5 font-medium tracking-[0.46px] text-white transition-colors">
        REFRESH INVOICE
      </button>
    </div>
  );
};

export default async function Home() {
  return (
    <main className="px-6">
      <div className="flex justify-end py-3">
        {/* Avatar */}
        <div className="relative inset-0">
          <Avatar index={1} width={40} height={40} />
          <div className="bg-success-main absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white" />
        </div>
      </div>
      {/* Table Content */}
      <div className="bg-paper my-6 rounded-md shadow-[0px_2px_10px_0px_#3A35411A]">
        <ActionBar />
        <InvoiceTable />
      </div>
    </main>
  );
}
