import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";

const API_URL = "http://localhost:1337";

// =====================================================
// Normalize Image Orientation
// =====================================================
// Fixes images that appear rotated after uploading to Strapi
// because of EXIF orientation.
// =====================================================

const normalizeImageOrientation = async (file) => {
  try {
    console.log("====================================");
    console.log("STARTING IMAGE ORIENTATION FIX");
    console.log("ORIGINAL FILE:", file);
    console.log("ORIGINAL TYPE:", file.type);
    console.log("ORIGINAL SIZE:", file.size);
    console.log("====================================");

    // Modern browser
    if ("createImageBitmap" in window) {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });

      console.log("BITMAP SIZE:", {
        width: bitmap.width,
        height: bitmap.height,
      });

      const canvas = document.createElement("canvas");

      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        bitmap.close();
        console.warn(
          "Canvas context unavailable. Using original file."
        );
        return file;
      }

      // Draw the image after applying EXIF orientation
      ctx.drawImage(bitmap, 0, 0);

      bitmap.close();

      const mimeType = file.type || "image/jpeg";

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          (result) => {
            resolve(result);
          },
          mimeType,
          mimeType === "image/jpeg" ||
            mimeType === "image/webp"
            ? 0.92
            : undefined
        );
      });

      if (!blob) {
        console.warn(
          "Could not create normalized image blob."
        );

        return file;
      }

      const normalizedFile = new File(
        [blob],
        file.name,
        {
          type: blob.type || mimeType,
          lastModified: Date.now(),
        }
      );

      console.log("====================================");
      console.log("IMAGE ORIENTATION FIXED");
      console.log("NORMALIZED FILE:", normalizedFile);
      console.log(
        "NORMALIZED SIZE:",
        normalizedFile.size
      );
      console.log("====================================");

      return normalizedFile;
    }

    // Fallback
    console.warn(
      "createImageBitmap is not supported. Using original file."
    );

    return file;
  } catch (error) {
    console.error(
      "IMAGE ORIENTATION NORMALIZATION ERROR:",
      error
    );

    // Don't stop upload if orientation processing fails
    return file;
  }
};

const ProfileCard = () => {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // Get Token
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // =====================================================
  // Get Image URL
  // =====================================================

  const getImageUrl = (avatarData) => {
    if (!avatarData) return "";

    // String URL
    if (typeof avatarData === "string") {
      return avatarData.startsWith("http")
        ? avatarData
        : `${API_URL}${avatarData}`;
    }

    const imageUrl =
      avatarData.url ||
      avatarData.formats?.large?.url ||
      avatarData.formats?.medium?.url ||
      avatarData.formats?.small?.url ||
      avatarData.formats?.thumbnail?.url ||
      "";

    if (!imageUrl) return "";

    return imageUrl.startsWith("http")
      ? imageUrl
      : `${API_URL}${imageUrl}`;
  };

  // =====================================================
  // Get Current Admin
  // =====================================================

  useEffect(() => {
    const getCurrentAdmin = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        if (!token) {
          setError(
            "لم يتم العثور على جلسة تسجيل الدخول"
          );
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/users/me?populate=avatar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentAdmin = response.data;

        console.log(
          "CURRENT ADMIN:",
          currentAdmin
        );

        console.log(
          "CURRENT ADMIN FULL:",
          JSON.stringify(
            currentAdmin,
            null,
            2
          )
        );

        setUser(currentAdmin);

        setFormData({
          username: currentAdmin.username || "",
          email: currentAdmin.email || "",
          password: "",
        });

        // =================================================
        // Avatar
        // =================================================

        const imageUrl = getImageUrl(
          currentAdmin.avatar
        );

        if (imageUrl) {
          setAvatarPreview(imageUrl);
        } else {
          setAvatarPreview("");
        }
      } catch (err) {
        console.error(
          "GET ADMIN ERROR:",
          err
        );

        console.log(
          "STATUS:",
          err.response?.status
        );

        console.log(
          "DATA:",
          err.response?.data
        );

        setError(
          err.response?.data?.error?.message ||
          "حدث خطأ أثناء تحميل بيانات المسؤول"
        );
      } finally {
        setLoading(false);
      }
    };

    getCurrentAdmin();
  }, []);

  // =====================================================
  // Input Change
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =====================================================
  // Select Image
  // =====================================================

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    // =================================================
    // Check image type
    // =================================================

    if (!file.type.startsWith("image/")) {
      setError(
        "من فضلك اختر ملف صورة صحيح"
      );

      return;
    }

    // =================================================
    // Max 5MB
    // =================================================

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "حجم الصورة يجب ألا يتجاوز 5MB"
      );

      return;
    }

    try {
      console.log(
        "STARTING ADMIN IMAGE PROCESSING..."
      );

      // =================================================
      // IMPORTANT:
      // Fix image orientation BEFORE upload
      // =================================================

      const normalizedFile =
        await normalizeImageOrientation(file);

      console.log(
        "ADMIN NORMALIZED FILE:",
        normalizedFile
      );

      // =================================================
      // Save normalized file
      // =================================================

      setAvatar(normalizedFile);

      // =================================================
      // Create preview from normalized file
      // =================================================

      const previewUrl =
        URL.createObjectURL(normalizedFile);

      setAvatarPreview(previewUrl);

      console.log(
        "ADMIN IMAGE PREVIEW:",
        previewUrl
      );
    } catch (err) {
      console.error(
        "ADMIN IMAGE PROCESSING ERROR:",
        err
      );

      setError(
        "حدث خطأ أثناء تجهيز الصورة"
      );
    }
  };

  // =====================================================
  // Upload Avatar
  // =====================================================

  const uploadAvatar = async () => {
    if (!avatar) {
      return null;
    }

    const token = getToken();

    if (!token) {
      throw new Error(
        "لم يتم العثور على جلسة تسجيل الدخول"
      );
    }

    const imageData = new FormData();

    imageData.append("files", avatar);

    console.log(
      "===================================="
    );

    console.log(
      "UPLOADING NORMALIZED ADMIN AVATAR..."
    );

    console.log(
      "FILE TO UPLOAD:",
      avatar
    );

    console.log(
      "FILE NAME:",
      avatar.name
    );

    console.log(
      "FILE TYPE:",
      avatar.type
    );

    console.log(
      "FILE SIZE:",
      avatar.size
    );

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    console.log(
      "===================================="
    );

    // IMPORTANT:
    // Don't manually set Content-Type.
    // Browser/Axios will add multipart boundary automatically.

    const response = await axios.post(
      `${API_URL}/api/upload`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "UPLOAD RESPONSE:",
      response.data
    );

    const uploadedImage =
      response.data?.[0];

    if (!uploadedImage?.id) {
      throw new Error(
        "لم يتم الحصول على ID للصورة"
      );
    }

    console.log(
      "UPLOADED IMAGE ID:",
      uploadedImage.id
    );

    return uploadedImage;
  };

  // =====================================================
  // Save
  // =====================================================

  const handleSave = async () => {
    try {
      setSaving(true);

      setMessage("");
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "لم يتم العثور على جلسة تسجيل الدخول"
        );

        return;
      }

      if (!user?.id) {
        setError(
          "لم يتم العثور على بيانات المسؤول"
        );

        return;
      }

      // =================================================
      // Validate Username
      // =================================================

      if (!formData.username.trim()) {
        setError(
          "اسم المستخدم مطلوب"
        );

        return;
      }

      // =================================================
      // Validate Email
      // =================================================

      if (!formData.email.trim()) {
        setError(
          "البريد الإلكتروني مطلوب"
        );

        return;
      }

      // =================================================
      // User Data
      // =================================================

      const updateData = {
        username:
          formData.username.trim(),

        email:
          formData.email.trim(),
      };

      // =================================================
      // Password
      // =================================================

      if (
        formData.password.trim() !== ""
      ) {
        if (
          formData.password.length < 6
        ) {
          setError(
            "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"
          );

          return;
        }

        updateData.password =
          formData.password;
      }

      // =================================================
      // Upload Avatar
      // =================================================

      if (avatar) {
        console.log(
          "Starting normalized admin avatar upload..."
        );

        const uploadedImage =
          await uploadAvatar();

        if (!uploadedImage?.id) {
          setError(
            "فشل رفع الصورة"
          );

          return;
        }

        updateData.avatar =
          uploadedImage.id;

        console.log(
          "Avatar ID to save:",
          uploadedImage.id
        );
      }

      // =================================================
      // Update User
      // =================================================

      console.log(
        "UPDATE DATA:",
        updateData
      );

      await axios.put(
        `${API_URL}/api/users/${user.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "USER UPDATED SUCCESSFULLY"
      );

      // =================================================
      // Get Updated Admin Again
      // =================================================

      const updatedAdminResponse =
        await axios.get(
          `${API_URL}/api/users/me?populate=avatar`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const updatedAdmin =
        updatedAdminResponse.data;

      console.log(
        "UPDATED ADMIN FULL:",
        JSON.stringify(
          updatedAdmin,
          null,
          2
        )
      );

      console.log(
        "UPDATED AVATAR:",
        updatedAdmin.avatar
      );

      // =================================================
      // Update State
      // =================================================

      setUser(updatedAdmin);

      setFormData({
        username:
          updatedAdmin.username || "",

        email:
          updatedAdmin.email || "",

        password: "",
      });

      setAvatar(null);

      // =================================================
      // Update Avatar Preview
      // =================================================

      const imageUrl =
        getImageUrl(
          updatedAdmin.avatar
        );

      if (imageUrl) {
        setAvatarPreview(
          imageUrl
        );
      } else {
        setAvatarPreview("");
      }

      // =================================================
      // Update LocalStorage
      // =================================================

      const storedUser =
        JSON.parse(
          localStorage.getItem(
            "user"
          ) || "{}"
        );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          ...updatedAdmin,
        })
      );

      // =================================================
      // Success Message
      // =================================================

      setMessage(
        "تم حفظ بيانات المسؤول بنجاح"
      );
    } catch (err) {
      console.error(
        "SAVE USER ERROR:",
        err
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      console.log(
        "DATA:",
        err.response?.data
      );

      console.log(
        "MESSAGE:",
        err.response?.data?.error?.message
      );

      setError(
        err.response?.data?.error?.message ||
        err.message ||
        "حدث خطأ أثناء حفظ التغييرات"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (loading) {
    return (
      <div
        dir="rtl"
        className="
        rounded-xl
        border
        border-zinc-800
        bg-[#171717]
        p-5
        text-center
        text-sm
        text-zinc-400
        sm:rounded-2xl
        sm:p-6
      "
      >
        جاري تحميل بيانات المسؤول...
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
      rounded-xl
      border
      border-zinc-800
      bg-[#171717]
      p-4
      sm:rounded-2xl
      sm:p-6
    "
    >
      {/* Header */}
      <div
        className="
        mb-6
        flex
        items-start
        justify-between
        gap-3
        sm:mb-8
        sm:items-center
      "
      >
        <HiOutlineUserCircle
          className="
          shrink-0
          text-3xl
          text-indigo-300
          sm:text-4xl
        "
        />

        <div className="min-w-0 text-right">
          <h2
            className="
            break-words
            text-lg
            font-semibold
            text-white
            sm:text-xl
          "
          >
            الملف الشخصي للمسؤول
          </h2>

          <p
            className="
            mt-1
            break-words
            text-xs
            leading-5
            text-zinc-400
            sm:text-sm
          "
          >
            إدارة معلومات الحساب وكلمة المرور الخاصة بك
          </p>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div
          className="
          mb-5
          rounded-xl
          border
          border-green-500/30
          bg-green-500/10
          px-3
          py-3
          text-xs
          leading-5
          text-green-400
          sm:mb-6
          sm:px-4
          sm:text-sm
        "
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="
          mb-5
          rounded-xl
          border
          border-red-500/30
          bg-red-500/10
          px-3
          py-3
          text-xs
          leading-5
          text-red-400
          sm:mb-6
          sm:px-4
          sm:text-sm
        "
        >
          {error}
        </div>
      )}

      {/* Content */}
      <div
        className="
        grid
        grid-cols-1
        gap-6
        lg:grid-cols-12
      "
      >
        {/* Avatar */}
        <div className="lg:col-span-3">
          <div className="flex flex-col items-center">
            <div className="group relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Admin Avatar"
                  className="
                  h-28
                  w-28
                  rounded-2xl
                  border-2
                  border-indigo-300
                  object-cover
                  sm:h-36
                  sm:w-36
                "
                  onError={(e) => {
                    console.error(
                      "IMAGE LOAD ERROR:",
                      avatarPreview
                    );

                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <div
                  className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-zinc-700
                  bg-[#1d1d1d]
                  sm:h-36
                  sm:w-36
                "
                >
                  <HiOutlineUserCircle
                    className="
                    text-6xl
                    text-zinc-500
                    sm:text-7xl
                  "
                  />
                </div>
              )}

              {/* Camera Overlay */}
              <label
                htmlFor="avatar"
                className="
                absolute
                inset-0
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                bg-black/60
                text-white
                opacity-0
                transition
                group-hover:opacity-100
              "
              >
                <FiCamera className="mb-2 text-2xl" />

                <span className="text-xs sm:text-sm">
                  تغيير الصورة
                </span>
              </label>

              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p
              className="
              mt-3
              text-center
              text-xs
              leading-5
              text-zinc-500
              sm:mt-4
            "
            >
              JPG, PNG أو WEBP
              <br />
              الحد الأقصى 5MB
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="min-w-0 lg:col-span-9">
          <div
            className="
            grid
            grid-cols-1
            gap-4
            sm:gap-5
            md:grid-cols-2
          "
          >
            {/* Username */}
            <div className="min-w-0">
              <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
                اسم المستخدم
              </label>

              <div className="relative">
                <FiUser
                  className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                  sm:right-4
                "
                />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-[#1d1d1d]
                  px-10
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  focus:border-indigo-400
                  sm:px-12
                "
                  placeholder="اسم المستخدم"
                />
              </div>
            </div>

            {/* Email */}
            <div className="min-w-0">
              <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
                البريد الإلكتروني
              </label>

              <div className="relative">
                <FiMail
                  className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                  sm:right-4
                "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-[#1d1d1d]
                  px-10
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  focus:border-indigo-400
                  sm:px-12
                "
                  placeholder="البريد الإلكتروني"
                />
              </div>
            </div>

            {/* Password */}
            <div className="min-w-0 md:col-span-2">
              <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
                كلمة المرور الجديدة
              </label>

              <div className="relative">
                <FiLock
                  className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                  sm:right-4
                "
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-[#1d1d1d]
                  px-10
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  focus:border-indigo-400
                  sm:px-12
                "
                  placeholder="اتركها فارغة إذا لم ترد تغيير كلمة المرور"
                />
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                اكتب كلمة مرور جديدة فقط إذا كنت تريد تغييرها.
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="mt-6 flex w-full justify-start sm:mt-8">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="
              w-full
              rounded-xl
              bg-indigo-300
              px-6
              py-3
              text-sm
              font-semibold
              text-[#181818]
              shadow-lg
              shadow-indigo-400/20
              transition
              hover:bg-indigo-200
              disabled:bg-indigo-300/50
              sm:w-auto
              sm:px-8
              sm:text-base
            "
            >
              {saving
                ? "جاري الحفظ..."
                : "حفظ التغييرات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;