import Avatar from '@/components/Avatar';
import InvoiceTable from '@/components/InvoiceTable';

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
        <InvoiceTable />
      </div>
    </main>
  );
}
