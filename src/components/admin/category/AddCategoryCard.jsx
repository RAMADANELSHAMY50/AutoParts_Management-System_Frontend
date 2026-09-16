import { MdAdd } from "react-icons/md";

const AddCategoryCard = ({
  onAddClick,
}) => {
  return (
    <button
      type="button"
      onClick={onAddClick}
      className="
        group
        flex
        min-h-[300px]
        w-full
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        border-white/10
        bg-[#141414]
        px-4
        py-6
        transition-all
        duration-500
        hover:border-blue-500
        hover:bg-[#181818]
        sm:min-h-[360px]
        sm:rounded-3xl
        sm:px-6
        lg:h-[430px]
        lg:min-h-0
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-[#1E1E1E]
          transition-all
          duration-500
          group-hover:scale-110
          group-hover:bg-blue-600
          sm:h-16
          sm:w-16
          lg:h-20
          lg:w-20
        "
      >
        <MdAdd
          className="
            text-4xl
            text-gray-300
            group-hover:text-white
            sm:text-5xl
          "
        />
      </div>

      {/* Title */}
      <h2
        className="
          mt-5
          text-xl
          font-bold
          text-white
          sm:mt-7
          sm:text-2xl
          lg:mt-8
        "
      >
        إضافة قسم
      </h2>

      {/* Description */}
      <p
        className="
          mt-2
          max-w-[260px]
          px-2
          text-center
          text-xs
          leading-6
          text-gray-400
          sm:mt-3
          sm:text-sm
          sm:leading-7
        "
      >
        أنشئ تصنيفًا جديدًا لتنظيم
        <br />
        منتجاتك بشكل أفضل
      </p>
    </button>
  );
};

export default AddCategoryCard;