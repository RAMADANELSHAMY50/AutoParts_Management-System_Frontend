import {
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

export default function SupportEmptyState({
  onNewConversation,
}) {
  return (
    <div
      dir="rtl"
      className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-[#131313] px-4 text-center sm:min-h-[600px] sm:rounded-2xl sm:px-6"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-500 sm:mb-5 sm:h-20 sm:w-20">
        <LifebuoyIcon className="h-8 w-8 sm:h-10 sm:w-10" />
      </div>

      <h2 className="text-lg font-bold text-white sm:text-xl">
        أهلاً بك في الدعم
      </h2>

      <p className="mt-3 max-w-md text-xs leading-6 text-zinc-500 sm:text-sm sm:leading-7">
        اختر محادثة من القائمة لعرض الرسائل، أو
        ابدأ محادثة جديدة مع فريق الدعم.
      </p>

      <button
        onClick={onNewConversation}
        className="mt-5 w-full max-w-xs rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 sm:mt-6 sm:px-5 sm:py-3 sm:text-sm"
      >
        بدء محادثة جديدة
      </button>
    </div>
  );
}