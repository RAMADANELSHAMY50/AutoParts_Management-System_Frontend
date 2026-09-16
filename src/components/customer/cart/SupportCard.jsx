import { Headset, MessageCircle } from "lucide-react";

const SupportCard = () => {
  return (
    <div
      className="
        rounded-xl
        border border-zinc-800
        bg-[#181818]
        p-4

        sm:rounded-2xl
        sm:p-5

        lg:p-6
      "
    >

      {/* Header */}

      <div
        className="
          mb-5
          flex
          items-center
          gap-2.5

          sm:mb-6
          sm:gap-3
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-blue-600/20

            sm:h-11
            sm:w-11
            sm:rounded-xl

            lg:h-12
            lg:w-12
          "
        >
          <Headset
            className="
              h-5
              w-5
              text-blue-500

              sm:h-6
              sm:w-6
            "
          />
        </div>

        <div>

          <h3
            className="
              text-base
              font-semibold
              text-white

              sm:text-lg

              lg:text-xl
            "
          >
            تحتاج إلى مساعدة؟
          </h3>

          <p
            className="
              text-xs
              text-zinc-400

              sm:text-sm
            "
          >
            فريق الدعم متواجد على مدار الساعة.
          </p>

        </div>

      </div>

      {/* Contact Options */}

      <div className="space-y-3">

        <button
          className="
            flex
            w-full
            items-center
            justify-between
            rounded-lg
            border border-zinc-700
            bg-[#111111]
            p-3
            transition
            hover:border-blue-500
            hover:bg-zinc-900

            sm:rounded-xl
            sm:p-4
          "
        >
          <MessageCircle
            className="
              h-4
              w-4
              text-blue-500

              sm:h-5
              sm:w-5
            "
          />

          <span
            className="
              text-sm
              text-white

              sm:text-base
            "
          >
            الدردشة المباشرة
          </span>

        </button>

      </div>

      {/* Footer */}

      <div
        className="
          mt-5
          rounded-lg
          border border-blue-500/20
          bg-blue-500/10
          p-3

          sm:mt-6
          sm:rounded-xl
          sm:p-4
        "
      >
        <p
          className="
            text-center
            text-xs
            leading-5
            text-zinc-300

            sm:text-sm
            sm:leading-6
          "
        >
          إذا واجهت أي مشكلة أثناء إتمام الطلب،
          لا تتردد في التواصل معنا.
        </p>
      </div>

    </div>
  );
};

export default SupportCard;