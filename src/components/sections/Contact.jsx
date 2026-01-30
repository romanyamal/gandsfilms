import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "yup-phone-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import reel from "../../assets/Contact_Reel.mp4";
import isEmailValidator from "validator/lib/isEmail";

import { DatePicker } from "../DatePicker";
import { Modal } from "../Modal";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useClickOutside } from "../../utils/useClickOutside";
dayjs.extend(customParseFormat);

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .test(
      "is-valid",
      () => "Invalid email format",
      (value) =>
        value
          ? isEmailValidator(value)
          : new yup.ValidationError("Invalid email format"),
    ),
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .phone("US", "Phone number is not valid for US"),
  weddingDate: yup
    .string()
    .required("Wedding date is required")
    .test("valid-date", "Invalid date format (use mm/dd/yyyy)", (value) =>
      dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true).isValid(),
    )
    .test("not-today", "Wedding date cannot be today", (value) => {
      const date = dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true);
      return !date.isSame(dayjs(), "day");
    })
    .test(
      "one-week-ahead",
      "Wedding date must be at least one week in the future",
      (value) => {
        const date = dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true);
        return date.isAfter(dayjs().add(6, "day"), "day");
      },
    )
    .test(
      "max-3.5-years",
      "Wedding date cannot be more than 3.5 years from today",
      (value) => {
        const date = dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true);
        return date.isBefore(dayjs().add(3.5, "year"), "day");
      },
    ),
  location: yup.string().required("Please enter venue location"),
  insta: yup.string(),
  // .notRequired()
  // .matches(
  //   /^@([A-Za-z0-9._]{1,30})$/,
  //   "Invalid Instagram handle (e.g. @username)",
  // ),
  hearAbout: yup.array().min(1, "You must select at least one"),
  referral: yup.string(),
  values: yup.string(),
  needtoknow: yup.string(),
  terms: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const hearAboutOptions = [
  { label: "Friend", value: "friend" },
  { label: "Vendor", value: "vendor" },
  { label: "Google", value: "google" },
  { label: "Instagram", value: "insta" },
  { label: "Facebook", value: "facebook" },
  { label: "Other", value: "other" },
];

export const Contact = () => {
  const [isActive, setIsActive] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weddingDate, setWeddingDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const datePickerRef = useRef(null);

  useClickOutside(datePickerRef, () => {
    setShowDatePicker(false);
    setIsActive(false);
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      weddingDate: "",
      location: "",
      insta: "",
      hearAbout: [],
      referral: "",
      values: "",
      needtoknow: "",
      terms: false,
    },
  });

  const handleInputBlur = () => {
    const date = dayjs(weddingDate, ["MMDDYYYY", "MM/DD/YYYY"], true);
    if (date.isValid()) {
      setWeddingDate(date.format("MM/DD/YYYY"));
      setValue("weddingDate", date.format("MM/DD/YYYY"));
      setIsActive(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", JSON.parse(JSON.stringify(data)));
    setShowModal(true);
    reset();
    setWeddingDate("");
    setValue("weddingDate", "");
  };

  return (
    <section
      id="contact"
      className=" flex items-center justify-center w-full pt-20"
    >
      <div className="grid grid-col-1 gap-5 2xl:gap-10 md:grid-cols-2 lg:grid-cols-[30%_70%] overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="w-full px-8 pb-4 md:pl-10 lg:pb-10 2xl:pl-0">
            <video
              src={reel}
              // style={{ width: videoWidth }}
              autoPlay
              playsInline
              loop
              muted
            />
          </div>
        </div>

        <div className="font-normal text-sm md:text-base text-blk">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl space-y-1 m-auto px-4 md:pr-8 lg:pr-12"
          >
            <div className="pl-6 pr-6 pb-2 pt-6">
              <span className="uppercase">Email address: *</span>
              <input
                type="email"
                {...register("email")}
                placeholder="me@email.com"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
              {errors.email && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">Full name: *</span>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
              {errors.name && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">Phone number: *</span>
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="(123) 456-7890"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
              {errors.phoneNumber && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">Wedding Date: *</span>
              <Controller
                name="weddingDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div
                    className={`flex border-b transition-colors duration-300 ${
                      isActive ? "border-active" : "border-blk"
                    }`}
                  >
                    <input
                      {...field}
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={weddingDate}
                      onFocus={() => setIsActive(true)}
                      onBlur={(_) => {
                        handleInputBlur();
                        field.onBlur();
                      }}
                      onChange={(e) => {
                        setWeddingDate(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.target.blur();
                        }
                      }}
                      className="appearance-none cursor-text bg-transparent w-full text-gr mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-blk"
                    />
                    <div ref={datePickerRef} className="relative">
                      <button
                        type="button"
                        className="ml-2 px-3 py-1 cursor-pointer text-wht rounded"
                        onClick={() => {
                          setIsActive(true);
                          setShowDatePicker((prev) => !prev);
                        }}
                      >
                        📅
                      </button>
                      {showDatePicker && (
                        <div
                          style={{ width: 280 }}
                          className="absolute z-10 ml-5 right-0 top-0 mt-10"
                        >
                          <div className="shadow-md rounded-xl">
                            <DatePicker
                              onDateSelect={(date) => {
                                const formatted =
                                  dayjs(date).format("MM/DD/YYYY");
                                setWeddingDate(formatted);
                                field.onChange(formatted);
                                setShowDatePicker(false);
                                setIsActive(false);
                                document.activeElement?.blur();
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
              {errors.weddingDate && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.weddingDate.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">Location: *</span>
              <input
                type="text"
                {...register("location")}
                placeholder="City and Venue"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
              {errors.location && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">Instagram Handle:</span>
              <input
                type="text"
                {...register("insta")}
                placeholder="@glimpseandsmilefilms"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
              {/* {errors.insta && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.insta.message}
                </p>
              )} */}
            </div>
            {/* <div className="pl-6 pr-6 pb-2">
              <span className="uppercase">How did you hear about me? *</span>
              <div className="flex flex-col space-y-1 pt-1">
                {hearAboutOptions.map(({ label, value }) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      {...register("hearAbout")}
                      className="mr-2 appearance-none w-3 h-3 border-1 checked:bg-checkbox-active"
                    />
                    {label}
                  </label>
                ))}
                {errors.hearAbout && (
                  <p className="text-checkbox-error text-xs pt-1.5">
                    {errors.hearAbout.message}
                  </p>
                )}
              </div>
            </div> */}
            <div className="pl-6 pr-6 pb-2">
              <span
                className="uppercase text-sm font-semibold"
                id="hear-about-label"
              >
                How did you hear about me? *
              </span>
              <div
                className="flex flex-col space-y-2 pt-2"
                role="group"
                aria-labelledby="hear-about-label"
              >
                {hearAboutOptions.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center justify-left font-normal cursor-pointer group relative"
                  >
                    <input
                      type="checkbox"
                      value={value}
                      {...register("hearAbout")}
                      className="peer sr-only"
                    />
                    <div
                      className="w-3.5 h-3.5 border-2 border-blk flex items-center justify-center 
                        transition-all duration-200 
                        peer-checked:bg-checkbox-active 
                        peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
                    ></div>
                    <span className="ml-3 text-blk select-none">{label}</span>
                  </label>
                ))}
                {errors.hearAbout && (
                  <p className="text-checkbox-error text-xs pt-1.5">
                    {errors.hearAbout.message}
                  </p>
                )}
              </div>
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>If a friend or Vendor, tell me who!</span>
              <input
                type="text"
                {...register("referral")}
                placeholder="E.g. Montage Healdsburg"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>What about my work speaks to you the most? *</span>
              <input
                type="text"
                {...register("values")}
                placeholder="Luxury, emotional storytelling"
                className="cursor-text w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-1 focus:outline-none focus:border-active"
              />
            </div>
            <div className="pl-6 pr-6">
              <label className="block text-sm md:text-base font-medium">
                Anything else you would like me to know before we chat?
                <textarea
                  {...register("needtoknow")}
                  rows={2}
                  className="mt-2 mr-3 py-1 px-2 block w-full border border-blk text-gr focus:text-blk focus:outline-none focus:border-active sm:text-sm"
                />
              </label>
            </div>
            {/* <div className="pl-6 pr-6 pb-2">
              <label className="flex items-center text-xs space-x-2">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="accent-checkbox-active"
                />
                <span>
                  I give consent to be contacted by phone, email, or instagram *
                </span>
              </label>
              {errors.terms && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.terms.message}
                </p>
              )}
            </div> */}
            <div className="pl-6 pr-6 pb-2">
              <label className="flex items-center justify-left font-light text-sm cursor-pointer group relative">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="peer sr-only"
                />
                <div
                  className="w-3 h-3 border-1 border-blk flex-none 
                        transition-all duration-200 
                        peer-checked:bg-checkbox-active 
                        peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
                ></div>
                <span className="ml-3 text-blk select-none">
                  I give consent to be contacted by phone, email, or instagram *
                </span>
              </label>
              {errors.terms && (
                <p className="text-checkbox-error text-xs pt-1.5">
                  {errors.terms.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="m-8 inline-block rounded-sm text-lg font-blk text-blk px-6 py-1 text-center bg-body hover:bg-btn1"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isVisible={showModal}
        bgColor={"bg-green-100"}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col justify-center text-center items-center text-blk font-body m-8">
          <h1 className="text-xl bold pb-2">Thank you for choosing us!</h1>
          <p>We will contact you shortly!</p>
        </div>
      </Modal>
    </section>
  );
};
