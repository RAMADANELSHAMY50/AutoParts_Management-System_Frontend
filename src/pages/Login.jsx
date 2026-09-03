import { Link, useNavigate } from "react-router-dom";
import img_login from "../assets/images/img_login.png";
import { ImArrowLeft2 } from "react-icons/im";
import { Field, Formik, Form } from "formik";
import axios from "axios";
import * as YUP from "yup";
import toast from "react-hot-toast";
export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      // 1. Login
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });

      // 2. Get JWT
      const token = res.data.jwt;

      // 3. Save JWT
      localStorage.setItem("token", token);



      // 4. Get current user + role
      const userRes = await axios.get(
        "http://localhost:1337/api/users/me?populate=role",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 5. Get user

      const user = userRes.data;

      console.log("USER:", user);
      console.log("ROLE:", user.role);


      // 6. Save user
      localStorage.setItem("user", JSON.stringify(user));

      // 7. Redirect according to role
      if (user.role.name === "Admin") {
        navigate("/dashboard");
      } else if (user.role.name === "Customer") {
        navigate("/home");
      } else {
        toast.error("Unknown user role");
      }

      toast.success("Login successful!");
    } catch (error) {

      toast.error(error.response?.data?.error?.message || "Failed to login.");

    }
  };

  let loginSchema = YUP.object({
    email: YUP.string().email().required("Empty email..!"),
    password: YUP.string().required("Empty password..!"),
  });
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative hidden lg:block lg:col-span-7">
          <img
            src={img_login}
            alt="Super Car"
            className="w-full h-screen object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Left Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#131313]" />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#131313] to-transparent" />

          <div className="absolute top-1/2 p-10 w-3/4">
            <h2 className="text-4xl font-bold text-white">
              مستقبل <span className="text-[#B3C5FF]"> قيادة السيارات </span>بين
              يديك الآن.{" "}
            </h2>
            <p className="text-[#B7B5B4]">
              تحكم في مخزونك، مبيعاتك، وعملياتك اللوجستية من خلال منصة Apex Auto
              المتطورة. صُممت خصيصاً لتناسب تطلعاتك نحو التميز.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface p-8 lg:p-12 text-center flex flex-col justify-center">
          <h1 className="text-[#B3C5FF] font-bold text-4xl mb-4">زيدان</h1>
          <div className="">
            <h2 className=" text-[#E5E2E1] text-3xl font-semibold">
              أهلاً بك مجدداً
            </h2>
            <p className="text-[#C2C6D8] text-sm font-normal">
              الرجاء تسجيل الدخول لمتابعة أعمالك
            </p>
          </div>
          <div className="mt-[25px]">
            <div className="card-body">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  handleLogin(values);
                }}
              >
                <Form>
                  <fieldset className="fieldset bg-[#1A1A1A] p-4 lg:p-8 rounded-xl border border-[#ffffff62]">
                    <div className="flex flex-col mb-6">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start mb-2">
                        البريد الإلكتروني
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="input bg-[#1C1B1B] border border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder="zidan@email.com"
                      />
                    </div>

                    <div className="flex flex-col mb-6">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start mb-2">
                        كلمة المرور
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="input bg-[#1C1B1B] border border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder="  كلمة المرور"
                      />
                    </div>

                    <div className="bg-[#0066FF] mt-4 flex justify-center rounded-lg">
                      <button
                        type="submit"
                        className="flex items-center p-2 gap-2 font-bold text-white text-lg"
                      >
                        تسجيل الدخول
                        <ImArrowLeft2 />
                      </button>
                    </div>
                  </fieldset>
                </Form>
              </Formik>
              <div className="mt-5 flex justify-center items-center gap-2">
                <span className=" bg-[#ffffff74] h-0.5 w-100"></span>
                <p className="text-[#eeeaea89] font-bold text-lg">&&</p>
                <span className=" bg-[#ffffff74] h-0.5 w-100"></span>
              </div>
              <Link
                to="/"
                className="text-[#B3C5FF] text-sm font-bold flex justify-center mt-[23px]"
              >
                <p className="font-normal text-[#C2C6D8]">لديك حساب بالفعل؟ </p>
                إنشاء الحساب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
