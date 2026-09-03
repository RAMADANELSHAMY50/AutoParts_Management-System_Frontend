import { MdAdd } from "react-icons/md";

const AddCategoryCard = ({ onAddClick }) => {
  return (
    <button
      type="button"
      onClick={onAddClick}
      className="
        group
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-[430px]
        rounded-3xl
        border-2
        border-dashed
        border-white/10
        bg-[#141414]
        hover:border-blue-500
        hover:bg-[#181818]
        transition-all
        duration-500
      "
    >
      <div
        className="
          w-20
          h-20
          rounded-full
          border
          border-white/10
          bg-[#1E1E1E]
          flex
          items-center
          justify-center
          group-hover:bg-blue-600
          group-hover:scale-110
          transition-all
          duration-500
        "
      >
        <MdAdd className="text-5xl text-gray-300 group-hover:text-white" />
      </div>

      <h2 className="mt-8 text-2xl font-bold text-white">
        إضافة قسم
      </h2>

      <p className="mt-3 text-center text-gray-400 leading-7 px-8">
        أنشئ تصنيفًا جديدًا لتنظيم
        <br />
        منتجاتك بشكل أفضل
      </p>
    </button>
  );
};

export default AddCategoryCard;