import { Link, useNavigate } from "react-router-dom";
import img_register from "../assets/images/img_register.jpg";
import { ImArrowLeft2 } from "react-icons/im";
import { Field, Form, Formik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const handleRegister = async (value) => {
    try {
      if (value.password !== value.Confirm_password) {
        alert("not match password");
      } else {
        const res = await axios.post(
          "http://localhost:1337/api/auth/local/register",
          {
            username: value.username,
            email: value.email,
            password: value.password,
          },
        );
        toast.success("Successfully registered!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to register.");
    }
  };

  let registerSchema = YUP.object({
    username: YUP.string().required("Empty username..!"),
    email: YUP.string().email().required("Empty email..!"),
    password: YUP.string().required("Empty password..!"),
    Confirm_password: YUP.string().required("Empty Confirm_password..!"),
  });
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative hidden lg:block lg:col-span-7">
          <img
            src={img_register}
            alt="Super Car"
            className="w-full h-screen object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Left Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#131313]" />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#131313] to-transparent" />

          <div className="absolute bottom-0 p-10 w-3/4">
            <h2 className="text-4xl font-bold text-[#B3C5FF]">قوة الأداء. </h2>
            <p className="text-[#B7B5B4]">
              اختبر الجيل القادم من التميز في عالم السيارات مع أبيكس أوتو. دقة
              التصميم تلتقي مع متعة القيادة.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface p-8 lg:p-5 text-center flex flex-col justify-center">
          <h1 className="text-[#B3C5FF] font-bold text-4xl">زيدان</h1>
          <div className="">
            <h2 className=" text-[#E5E2E1] text-3xl font-semibold">
              إنشاء حساب جديد
            </h2>
            <p className="text-[#C2C6D8] text-sm font-normal">
              انضم إلى مجتمع النخبة لإدارة سيارتك باحترافية
            </p>
          </div>
          <div className="mt-[25px]">
            <div className="card-body">
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  Confirm_password: "",
                  policyConfirmed: false
                }}
                validationSchema={registerSchema}
                onSubmit={(value) => {
                  console.log("Formik Submit");
                  console.log(value);
                  handleRegister(value);
                }}
              >
                <Form>
                  <fieldset className="fieldset bg-[#1A1A1A] p-4 lg:p-6 rounded-xl border border-[#ffffff62]">
                    <div className="flex flex-col mb-[12px]">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start ">
                        الاسم الكامل
                      </label>
                      <Field
                        name="username"
                        type="text"
                        className="input bg-[#1C1B1B] border text-white border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder=" ادخل اسمك الكامل"
                      />
                    </div>
                    <div className="flex flex-col mb-[12px]">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start">
                        البريد الإلكتروني
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="input bg-[#1C1B1B] border text-white border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder="zidan@email.com"
                      />
                    </div>

                    <div className="flex flex-col mb-[12px]">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start">
                        كلمة المرور
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="input bg-[#1C1B1B] border text-white border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder="  كلمة المرور"
                      />
                    </div>

                    <div className="flex flex-col mb-[12px]">
                      <label className="label text-xs font-medium text-[#C2C6D8] text-start">
                        تأكيد كلمة المرور
                      </label>
                      <Field
                        name="Confirm_password"
                        type="password"
                        className="input bg-[#1C1B1B] border text-white border-[#424656] rounded-lg placeholder:text-[#8C90A1] placeholder:text-sm py-1"
                        placeholder=" تأكيد كلمة المرور"
                      />
                    </div>
                    <div className="checkbox flex gap-1">
                      <Field
                        type="checkbox"
                        name="policyConfirmed"
                        className="accent-blue-600"
                      />
                      <p htmlFor="" className="text-[#ffffffc1] text-sm">
                        أوافق على شروط الخدمة و سياسة الخصوصية لأبيكس أوتو.
                      </p>
                    </div>
                    <div className="bg-[#0066FF] mt-4 flex justify-center rounded-lg">
                      <button
                        type="submit"
                        className="flex items-center p-2 gap-2 font-bold text-white text-lg"
                      >
                        إنشاء الحساب
                        <ImArrowLeft2 />
                      </button>
                    </div>
                  </fieldset>
                </Form>
              </Formik>
              <Link
                to="/login"
                className="text-[#B3C5FF] text-sm font-bold flex justify-center mt-[23px]"
              >
                <p className="font-normal text-[#C2C6D8]">لديك حساب بالفعل؟ </p>
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
