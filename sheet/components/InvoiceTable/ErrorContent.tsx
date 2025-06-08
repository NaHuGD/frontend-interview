import { RefreshData } from '@/types';

const ErrorContent = ({ onRetry }: { onRetry: RefreshData }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-red-600">
      <p className="text-xl font-semibold">無法載入資料</p>
      <p className="mt-2 text-sm text-gray-500">
        伺服器暫時無回應，請稍後再試或點擊
        <span className="cursor-pointer underline" onClick={() => onRetry()}>
          重新取得資料
        </span>
        。
      </p>
    </div>
  );
};

export default ErrorContent;
