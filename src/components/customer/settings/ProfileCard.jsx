import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSave,
  FiUpload,
  FiUser,
} from "react-icons/fi";

const API_URL = "http://localhost:1337";

// ======================================================
// Get Strapi Image URL
// ======================================================
const getImageUrl = (image) => {
  if (!image) return "";

  // Direct URL
  if (typeof image === "string") {
    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  }

  // Strapi media object
  if (image.url) {
    return image.url.startsWith("http")
      ? image.url
      : `${API_URL}${image.url}`;
  }

  // Strapi formats
  if (image.formats) {
    const format =
      image.formats.medium ||
      image.formats.small ||
      image.formats.thumbnail;

    if (format?.url) {
      return format.url.startsWith("http")
        ? format.url
        : `${API_URL}${format.url}`;
    }
  }

  // Strapi data wrapper
  if (image.data) {
    return getImageUrl(image.data);
  }

  return "";
};

// ======================================================
// Normalize Image Orientation
// ======================================================
const normalizeImageOrientation = async (file) => {
  try {
    if ("createImageBitmap" in window) {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });

      const canvas = document.createElement("canvas");

      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        bitmap.close();
        return file;
      }

      // Apply EXIF orientation
      ctx.drawImage(bitmap, 0, 0);

      bitmap.close();

      const mimeType =
        file.type || "image/jpeg";

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          (result) => resolve(result),
          mimeType,
          mimeType === "image/jpeg" ||
          mimeType === "image/webp"
            ? 0.92
            : undefined
        );
      });

      if (!blob) {
        return file;
      }

      return new File(
        [blob],
        file.name,
        {
          type: blob.type || mimeType,
          lastModified: Date.now(),
        }
      );
    }

    return file;
  } catch (error) {
    console.error(
      "IMAGE ORIENTATION NORMALIZATION ERROR:",
      error
    );

    return file;
  }
};

// ======================================================
// Component
// ======================================================
export default function ProfileCard() {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ======================================================
  // Load Current Customer
  // ======================================================
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("لم يتم العثور على تسجيل الدخول");
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

      const currentUser = response.data;

      console.log(
        "CUSTOMER USER:",
        currentUser
      );

      setUser(currentUser);

      setUsername(
        currentUser?.username || ""
      );

      setEmail(
        currentUser?.email || ""
      );

      if (currentUser?.avatar) {
        const avatarUrl = getImageUrl(
          currentUser.avatar
        );

        console.log(
          "CUSTOMER AVATAR URL:",
          avatarUrl
        );

        setAvatarPreview(avatarUrl);
      } else {
        setAvatarPreview("");
      }
    } catch (err) {
      console.error(
        "FETCH CUSTOMER PROFILE ERROR:",
        err.response?.data || err
      );

      setError(
        err.response?.data?.error?.message ||
          "حدث خطأ أثناء تحميل بيانات الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Select Avatar
  // ======================================================
  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    // Check image
    if (!file.type.startsWith("image/")) {
      setError("من فضلك اختر صورة صحيحة");
      return;
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "حجم الصورة يجب ألا يتجاوز 5 ميجابايت"
      );
      return;
    }

    try {
      console.log(
        "===================================="
      );

      console.log(
        "STARTING AVATAR PROCESSING"
      );

      console.log(
        "ORIGINAL FILE:",
        file
      );

      console.log(
        "ORIGINAL TYPE:",
        file.type
      );

      console.log(
        "ORIGINAL SIZE:",
        file.size
      );

      console.log(
        "===================================="
      );

      setUploadingAvatar(true);

      // Normalize image orientation
      const normalizedFile =
        await normalizeImageOrientation(file);

      console.log(
        "NORMALIZED FILE:",
        normalizedFile
      );

      console.log(
        "NORMALIZED SIZE:",
        normalizedFile.size
      );

      // Show corrected preview
      const previewUrl =
        URL.createObjectURL(
          normalizedFile
        );

      setAvatarPreview(previewUrl);

      setAvatar(normalizedFile);

      console.log(
        "IMAGE PREVIEW CREATED:",
        previewUrl
      );
    } catch (err) {
      console.error(
        "AVATAR PROCESSING ERROR:",
        err
      );

      setError(
        "حدث خطأ أثناء تجهيز الصورة"
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ======================================================
  // Upload Avatar
  // ======================================================
  const uploadAvatar = async () => {
    if (!avatar) {
      return null;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Authentication token not found"
      );
    }

    try {
      console.log(
        "===================================="
      );

      console.log(
        "STARTING CUSTOMER AVATAR UPLOAD..."
      );

      console.log(
        "FILE TO UPLOAD:",
        avatar
      );

      console.log(
        "TOKEN EXISTS:",
        !!token
      );

      console.log(
        "===================================="
      );

      const formData = new FormData();

      formData.append(
        "files",
        avatar
      );

      const response = await axios.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "CUSTOMER UPLOAD RESPONSE:",
        response.data
      );

      const uploadedImage =
        response.data?.[0];

      if (!uploadedImage?.id) {
        throw new Error(
          "Image uploaded but no image ID returned"
        );
      }

      console.log(
        "UPLOADED CUSTOMER IMAGE ID:",
        uploadedImage.id
      );

      return uploadedImage;
    } catch (err) {
      console.error(
        "CUSTOMER AVATAR UPLOAD ERROR:",
        err.response?.data || err
      );

      console.error(
        "UPLOAD STATUS:",
        err.response?.status
      );

      console.error(
        "UPLOAD MESSAGE:",
        err.response?.data?.error?.message
      );

      throw err;
    }
  };

  // ======================================================
  // Save Profile
  // ======================================================
  const handleSave = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    // ==================================================
    // Validation
    // ==================================================

    if (!username.trim()) {
      setError("اسم المستخدم مطلوب");
      return;
    }

    if (!email.trim()) {
      setError(
        "البريد الإلكتروني مطلوب"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(
        "من فضلك أدخل بريدًا إلكترونيًا صحيحًا"
      );
      return;
    }

    if (password) {
      if (password.length < 6) {
        setError(
          "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
        );
        return;
      }

      if (
        password !==
        passwordConfirmation
      ) {
        setError(
          "تأكيد كلمة المرور غير متطابق"
        );
        return;
      }
    }

    try {
      setSaving(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "انتهت جلسة تسجيل الدخول"
        );
        return;
      }

      // ==================================================
      // Upload Avatar First
      // ==================================================

      let uploadedAvatar = null;

      if (avatar) {
        console.log(
          "Uploading normalized customer avatar..."
        );

        uploadedAvatar =
          await uploadAvatar();

        console.log(
          "UPLOADED AVATAR:",
          uploadedAvatar
        );
      }

      // ==================================================
      // Prepare Update Data
      // ==================================================

      const updateData = {
        username: username.trim(),
        email: email.trim(),
      };

      if (password) {
        updateData.password = password;
      }

      if (uploadedAvatar?.id) {
        updateData.avatar =
          uploadedAvatar.id;
      }

      console.log(
        "CUSTOMER UPDATE DATA:",
        updateData
      );

      // ==================================================
      // Update User
      // ==================================================

      const response = await axios.put(
        `${API_URL}/api/users/${user.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "CUSTOMER UPDATED SUCCESSFULLY:",
        response.data
      );

      const updatedUser =
        response.data;

      // ==================================================
      // Get Updated User With Avatar
      // ==================================================

      let finalUser = updatedUser;

      try {
        const refreshedResponse =
          await axios.get(
            `${API_URL}/api/users/me?populate=avatar`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        finalUser =
          refreshedResponse.data;

        console.log(
          "UPDATED CUSTOMER:",
          finalUser
        );

        console.log(
          "UPDATED CUSTOMER AVATAR:",
          finalUser?.avatar
        );
      } catch (refreshError) {
        console.error(
          "REFRESH CUSTOMER ERROR:",
          refreshError.response?.data ||
            refreshError
        );
      }

      // ==================================================
      // Update Local Storage
      // ==================================================

      localStorage.setItem(
        "user",
        JSON.stringify(finalUser)
      );

      console.log(
        "LOCAL STORAGE USER UPDATED:",
        finalUser
      );

      // ==================================================
      // Update State
      // ==================================================

      setUser(finalUser);

      setUsername(
        finalUser?.username || ""
      );

      setEmail(
        finalUser?.email || ""
      );

      if (finalUser?.avatar) {
        const finalAvatarUrl =
          getImageUrl(
            finalUser.avatar
          );

        setAvatarPreview(
          finalAvatarUrl
        );
      }

      // Clear password
      setPassword("");
      setPasswordConfirmation("");

      // Clear selected file
      setAvatar(null);

      setMessage(
        "تم تحديث بيانات الحساب بنجاح"
      );
    } catch (err) {
      console.error(
        "SAVE CUSTOMER PROFILE ERROR:",
        err.response?.data || err
      );

      const apiMessage =
        err.response?.data?.error?.message;

      setError(
        apiMessage ||
          "حدث خطأ أثناء حفظ بيانات الحساب"
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // Loading
  // ======================================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[300px] w-full items-center justify-center rounded-xl border border-zinc-800 bg-[#171717] p-4 sm:min-h-[400px] sm:rounded-2xl sm:p-6"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500 sm:h-10 sm:w-10" />

          <p className="text-xs text-zinc-400 sm:text-sm">
            جاري تحميل بيانات الحساب...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================
  return (
    <div
      dir="rtl"
      className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#171717] p-3 shadow-xl sm:rounded-2xl sm:p-5 md:p-6 lg:p-8"
    >
      {/* ==================================================
          Header
      ================================================== */}
      <div className="mb-5 border-b border-zinc-800 pb-5 sm:mb-8 sm:pb-6">
        <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
          الملف الشخصي
        </h2>

        <p className="mt-1.5 text-xs leading-5 text-zinc-400 sm:mt-2 sm:text-sm sm:leading-6">
          تحديث معلومات الحساب والصورة الشخصية
        </p>
      </div>

      {/* ==================================================
          Messages
      ================================================== */}
      {message && (
        <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2.5 text-xs leading-5 text-green-400 sm:mb-6 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 break-words rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-xs leading-5 text-red-400 sm:mb-6 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
          {error}
        </div>
      )}

      {/* ==================================================
          Profile
      ================================================== */}
      <form
        onSubmit={handleSave}
        className="space-y-6 sm:space-y-8"
      >
        {/* ==================================================
            Avatar
        ================================================== */}
        <div className="flex flex-col items-center gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:gap-5 sm:pb-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-900 sm:h-28 sm:w-28">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="الصورة الشخصية"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />
              ) : (
                <FiUser
                  className="text-zinc-500"
                  size={38}
                />
              )}
            </div>

            {uploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70">
                <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-zinc-600 border-t-blue-500 sm:h-7 sm:w-7" />
              </div>
            )}
          </div>

          {/* Avatar Info */}
          <div className="min-w-0 text-center sm:text-right">
            <h3 className="text-sm font-semibold text-white sm:text-base">
              الصورة الشخصية
            </h3>

            <p className="mt-1 max-w-xs text-[11px] leading-5 text-zinc-500 sm:text-xs">
              يمكنك استخدام صور JPG أو PNG أو
              WEBP بحجم أقصى 5 ميجابايت
            </p>

            <label
              className={`mt-3 inline-flex max-w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:border-blue-500 hover:bg-zinc-800 sm:mt-4 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm ${
                uploadingAvatar
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <FiUpload
                className="shrink-0"
                size={15}
              />

              <span className="truncate">
                {uploadingAvatar
                  ? "جاري تجهيز الصورة..."
                  : "تغيير الصورة"}
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={
                  handleAvatarChange
                }
                disabled={
                  uploadingAvatar
                }
              />
            </label>
          </div>
        </div>

        {/* ==================================================
            Username
        ================================================== */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300 sm:mb-2 sm:text-sm">
            اسم المستخدم
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full min-w-0 rounded-lg border border-zinc-700 bg-[#111111] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 sm:rounded-xl sm:px-4 sm:py-3"
            placeholder="أدخل اسم المستخدم"
          />
        </div>

        {/* ==================================================
            Email
        ================================================== */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300 sm:mb-2 sm:text-sm">
            البريد الإلكتروني
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            dir="ltr"
            className="w-full min-w-0 rounded-lg border border-zinc-700 bg-[#111111] px-3 py-2.5 text-left text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 sm:rounded-xl sm:px-4 sm:py-3"
            placeholder="example@email.com"
          />
        </div>

        {/* ==================================================
            Role
        ================================================== */}
        {user?.role && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300 sm:mb-2 sm:text-sm">
              نوع الحساب
            </label>

            <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-zinc-800 bg-[#111111] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl sm:px-4">
              <span className="text-xs text-zinc-400 sm:text-sm">
                نوع المستخدم
              </span>

              <span className="w-fit max-w-full truncate rounded-lg bg-blue-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-blue-400 sm:px-3 sm:text-xs">
                {user.role.name ||
                  user.role.type ||
                  "مستخدم"}
              </span>
            </div>
          </div>
        )}

        {/* ==================================================
            Password
        ================================================== */}
        <div className="border-t border-zinc-800 pt-6 sm:pt-8">
          <h3 className="mb-4 text-base font-semibold text-white sm:mb-5 sm:text-lg">
            تغيير كلمة المرور
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {/* New Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300 sm:mb-2 sm:text-sm">
                كلمة المرور الجديدة
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                dir="ltr"
                className="w-full min-w-0 rounded-lg border border-zinc-700 bg-[#111111] px-3 py-2.5 text-left text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 sm:rounded-xl sm:px-4 sm:py-3"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-300 sm:mb-2 sm:text-sm">
                تأكيد كلمة المرور
              </label>

              <input
                type="password"
                value={
                  passwordConfirmation
                }
                onChange={(e) =>
                  setPasswordConfirmation(
                    e.target.value
                  )
                }
                dir="ltr"
                className="w-full min-w-0 rounded-lg border border-zinc-700 bg-[#111111] px-3 py-2.5 text-left text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-500 sm:rounded-xl sm:px-4 sm:py-3"
                placeholder="••••••••"
              />
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-zinc-500 sm:mt-3 sm:text-xs sm:leading-6">
            اترك الحقول فارغة إذا كنت لا تريد
            تغيير كلمة المرور.
          </p>
        </div>

        {/* ==================================================
            Save Button
        ================================================== */}
        <div className="flex border-t border-zinc-800 pt-5 sm:justify-start sm:pt-6">
          <button
            type="submit"
            disabled={
              saving || uploadingAvatar
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:rounded-xl sm:px-6 sm:py-3"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                جاري الحفظ...
              </>
            ) : (
              <>
                <FiSave
                  className="shrink-0"
                  size={17}
                />

                حفظ التغييرات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}