import { Headset, Phone, Mail, MessageCircle } from "lucide-react";

const SupportCard = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
          <Headset className="h-6 w-6 text-blue-500" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            تحتاج إلى مساعدة؟
          </h3>

          <p className="text-sm text-zinc-400">
            فريق الدعم متواجد على مدار الساعة.
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="space-y-3">

        <button className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-[#111111] p-4 transition hover:border-blue-500 hover:bg-zinc-900">
          <MessageCircle className="h-5 w-5 text-blue-500" />

          <span className="text-white">
            الدردشة المباشرة
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-center text-sm leading-6 text-zinc-300">
          إذا واجهت أي مشكلة أثناء إتمام الطلب، لا تتردد في التواصل معنا.
        </p>
      </div>
    </div>
  );
};

export default SupportCard;