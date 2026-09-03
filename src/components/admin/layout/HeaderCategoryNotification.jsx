import { useState } from "react";
import { MdSearch, MdNotificationsNone, MdDarkMode } from "react-icons/md";

const HeaderCategoryNotification = ({ allCategories, setCategories, status = [] }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setCategories(allCategories);
      return;
    }

    const result = allCategories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase()),
    );

    setCategories(result);
  };



  return (
    <header >

      {status.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-8" >
          {/* Right */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white"> {item.headerName}</h1>

            <p className="text-gray-400 mt-1"> {item.headerPara}  </p>
          </div>

          {/* Search */}
          <div className="relative w-[380px]">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

            <input
              type="text"
              placeholder={item.placeholder}
              value={search}
              onChange={handleChange}
              className="
            w-full
            bg-[#181818]
            border
            border-white/10
            rounded-2xl
            py-3
            pl-12
            pr-5
            text-white
            placeholder:text-gray-500
            outline-none
            focus:border-blue-500
            transition
          "
            />
          </div>
        </div>
      ))}

    </header>
  );
};

export default HeaderCategoryNotification;
