import { useState } from "react";
import {
  MdSearch,
  MdMenu,
} from "react-icons/md";

const HeaderCategoryNotification = ({
  allCategories = [],
  setCategories,
  status = [],
  onMenuClick,
}) => {
  const [search, setSearch] = useState("");

  // ==========================================
  // Search
  // ==========================================
  const handleChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim() === "") {
      setCategories(allCategories);
      return;
    }

    const result = allCategories.filter(
      (category) =>
        category.name
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    setCategories(result);
  };

  return (
    <header className="w-full min-w-0">
      {status.map((item, index) => (
        <div
          key={index}
          className="
            flex
            w-full
            min-w-0
            flex-col
            gap-4
            sm:gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-6
          "
        >
          {/* ==========================================
              Title + Menu
          ========================================== */}
          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
              sm:gap-3
            "
          >
            {/* Menu */}
            <button
              type="button"
              onClick={() => onMenuClick?.()}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-[#181818]
                text-white
                shadow-md
                transition
                hover:bg-[#222]
                active:scale-95
                lg:hidden
              "
              aria-label="فتح القائمة"
              title="فتح القائمة"
            >
              <MdMenu size={24} />
            </button>

            {/* Title */}
            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-xl
                  font-bold
                  text-white
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                {item.headerName}
              </h1>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  text-gray-400
                  sm:text-sm
                "
              >
                {item.headerPara}
              </p>
            </div>
          </div>

          {/* ==========================================
              Search
          ========================================== */}
          <div
            className="
              relative
              w-full
              sm:max-w-md
              lg:w-[380px]
              lg:max-w-none
            "
          >
            <MdSearch
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-lg
                text-gray-500
                sm:left-4
                sm:text-xl
              "
            />

            <input
              type="text"
              placeholder={item.placeholder}
              value={search}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#181818]
                py-2.5
                pl-10
                pr-4
                text-sm
                text-white
                placeholder:text-gray-500
                outline-none
                transition
                focus:border-blue-500
                sm:h-12
                sm:rounded-2xl
                sm:pl-12
                sm:pr-5
                sm:text-sm
              "
            />
          </div>
        </div>
      ))}
    </header>
  );
};

export default HeaderCategoryNotification;