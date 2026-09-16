
import { Link, useNavigate } from "react-router-dom";
import img_login from "../assets/images/img_login.png";
import { ImArrowLeft2 } from "react-icons/im";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import * as YUP from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../store/Auth.jsx";

const API_URL = "http://localhost:1337";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  // =====================================================
  // Handle Login
  // =====================================================

  const handleLogin = async (values) => {
    try {
      // =================================================
      // 1. Login
      // =================================================

      const res = await axios.post(
        `${API_URL}/api/auth/local`,
        {
          identifier: values.email,
          password: values.password,
        }
      );

      // =================================================
      // 2. Get JWT
      // =================================================

      const token = res.data?.jwt;

      if (!token) {
        toast.error("لم يتم الحصول على Token");
        return;
      }

      // =================================================
      // 3. Save JWT
      // =================================================

      localStorage.setItem("token", token);

      // =================================================
      // 4. Get Current User + Role
      // =================================================

      const userRes = await axios.get(
        `${API_URL}/api/users/me?populate=role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // =================================================
      // 5. Get User
      // =================================================

      const user = userRes.data;

      console.log("LOGIN USER:", user);
      console.log("LOGIN ROLE:", user?.role);
      console.log("LOGIN ROLE TYPE:", user?.role?.type);

      // =================================================
      // 6. Validate Role
      // =================================================

      const role = user?.role?.type;

      if (role !== "admin" && role !== "customer") {
        localStorage.removeItem("token");

        toast.error("دور المستخدم غير معروف");

        return;
      }

      // =================================================
      // 7. Save User In AuthContext
      // =================================================

      login(user);

      // =================================================
      // 8. Save User In LocalStorage
      // =================================================

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // =================================================
      // 9. Redirect According To Role
      // =================================================

      if (role === "admin") {
        navigate("/dashboard", {
          replace: true,
        });
      } else if (role === "customer") {
        navigate("/home", {
          replace: true,
        });
      }

      // =================================================
      // 10. Success
      // =================================================

      toast.success("تم تسجيل الدخول بنجاح");

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.error?.message ||
          "فشل تسجيل الدخول"
      );
    }
  };

  // =====================================================
  // Validation
  // =====================================================

  const loginSchema = YUP.object({
    email: YUP.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

    password: YUP.string()
      .required("كلمة المرور مطلوبة"),
  });

  // =====================================================
  // Render
  // =====================================================

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* ================================================= */}
        {/* Left Image */}
        {/* ================================================= */}

        <div className="relative hidden lg:col-span-7 lg:block">

          <img
            src={img_login}
            alt="Super Car"
            className="h-screen w-full object-cover"
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-black/30" />

          {/* Left Gradient */}

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#131313]" />

          {/* Bottom Gradient */}

          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#131313] to-transparent" />

          {/* Text */}

          <div className="absolute top-1/2 w-3/4 p-10">

            <h2 className="text-4xl font-bold text-white">
              مستقبل{" "}
              <span className="text-[#B3C5FF]">
                قيادة السيارات
              </span>{" "}
              بين يديك الآن.
            </h2>

            <p className="text-[#B7B5B4]">
              تحكم في مخزونك، مبيعاتك، وعملياتك
              اللوجستية من خلال منصة Apex Auto
              المتطورة. صُممت خصيصاً لتناسب
              تطلعاتك نحو التميز.
            </p>

          </div>
        </div>

        {/* ================================================= */}
        {/* Login Form */}
        {/* ================================================= */}

        <div className="flex flex-col justify-center bg-surface p-8 text-center lg:col-span-5 lg:p-12">

          {/* Logo */}

          <h1 className="mb-4 text-4xl font-bold text-[#B3C5FF]">
            زيدان
          </h1>

          <div>

            <h2 className="text-3xl font-semibold text-[#E5E2E1]">
              أهلاً بك مجدداً
            </h2>

            <p className="text-sm font-normal text-[#C2C6D8]">
              الرجاء تسجيل الدخول لمتابعة أعمالك
            </p>

          </div>

          <div className="mt-[25px]">

            <div className="card-body">

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
              >

                <Form>

                  <fieldset className="fieldset rounded-xl border border-[#ffffff62] bg-[#1A1A1A] p-4 lg:p-8">

                    {/* ================================================= */}
                    {/* Email */}
                    {/* ================================================= */}

                    <div className="mb-6 flex flex-col">

                      <label className="label mb-2 text-start text-xs font-medium text-[#C2C6D8]">
                        البريد الإلكتروني
                      </label>

                      <Field
                        name="email"
                        type="email"
                        className="input rounded-lg border border-[#424656] bg-[#1C1B1B] py-1 placeholder:text-sm placeholder:text-[#8C90A1]"
                        placeholder="zidan@email.com"
                      />

                    </div>

                    {/* ================================================= */}
                    {/* Password */}
                    {/* ================================================= */}

                    <div className="mb-6 flex flex-col">

                      <label className="label mb-2 text-start text-xs font-medium text-[#C2C6D8]">
                        كلمة المرور
                      </label>

                      <Field
                        name="password"
                        type="password"
                        className="input rounded-lg border border-[#424656] bg-[#1C1B1B] py-1 placeholder:text-[#8C90A1]"
                        placeholder="كلمة المرور"
                      />

                    </div>

                    {/* ================================================= */}
                    {/* Login Button */}
                    {/* ================================================= */}

                    <div className="mt-4 flex justify-center rounded-lg bg-[#0066FF]">

                      <button
                        type="submit"
                        className="flex items-center gap-2 p-2 text-lg font-bold text-white"
                      >
                        تسجيل الدخول

                        <ImArrowLeft2 />

                      </button>

                    </div>

                  </fieldset>

                </Form>

              </Formik>

              {/* ================================================= */}
              {/* Divider */}
              {/* ================================================= */}

              <div className="mt-5 flex items-center justify-center gap-2">

                <span className="h-0.5 w-100 bg-[#ffffff74]" />

                <p className="text-lg font-bold text-[#eeeaea89]">
                  &&
                </p>

                <span className="h-0.5 w-100 bg-[#ffffff74]" />

              </div>

              {/* ================================================= */}
              {/* Register */}
              {/* ================================================= */}

              <Link
                to="/"
                className="mt-[23px] flex justify-center text-sm font-bold text-[#B3C5FF]"
              >
                <p className="font-normal text-[#C2C6D8]">
                  ليس لديك حساب؟
                </p>

                إنشاء الحساب
              </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

