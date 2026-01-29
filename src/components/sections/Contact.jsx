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
  insta: yup
    .string()
    .notRequired()
    .matches(
      /^@([A-Za-z0-9._]{1,30})$/,
      "Invalid Instagram handle (e.g. @username)",
    ),
  hearAbout: yup.array().min(1, "You must select at least one"),
  referral: yup.string(),
  values: yup.string(),
  story: yup.string().required("This is a required field"),
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
      story: "",
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
      className="min--h-2/3 flex items-center justify-center w-full py-20"
    >
      <div className="grid grid-col-1 gap-16 lg:grid-cols-2">
        <div className="flex flex-col p-8 space-y-8 justify-center text-center font-body text-blk w-full max-w-lg">
          <div className=" p-8 md:pl-10 flex items-center">
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

        <div className="bg-contactform border rounded-lg border-transparent md:mr-8 font-body text-blk">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4 m-auto md:pr-8"
          >
            <div className="pl-6 pr-6 pb-2 pt-6">
              <span>Email address: *</span>
              <input
                type="email"
                {...register("email")}
                placeholder="me@email.com"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
              {errors.email && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>Full name: *</span>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
              {errors.name && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>Phone number: *</span>
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="(123) 456-7890"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
              {errors.phoneNumber && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>Wedding Date: *</span>
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
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.weddingDate.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>Location: *</span>
              <input
                type="text"
                {...register("location")}
                placeholder="City and Venue"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
              {errors.location && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>Instagram Handle:</span>
              <input
                type="text"
                {...register("insta")}
                placeholder="@glimpseandsmilefilms"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
              {errors.insta && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.insta.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>How did you hear about me? *</span>
              <div className="flex flex-col space-y-1">
                {hearAboutOptions.map(({ label, value }) => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      {...register("hearAbout")}
                      className="mr-2 accent-checkbox-active"
                    />
                    {label}
                  </label>
                ))}
                {errors.hearAbout && (
                  <p className="text-checkbox-error text-sm pt-1">
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
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
            </div>
            <div className="pl-6 pr-6 pb-2">
              <span>What about my work speaks to you the most? *</span>
              <input
                type="text"
                {...register("values")}
                placeholder="Luxury, emotional storytelling"
                className="appearance-none cursor-text bg-transparent w-full border-b border-blk text-blk mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-active"
              />
            </div>
            <div className="pl-6 pr-6">
              <label className="block text-sm font-medium">
                Tell me your story! *
                <textarea
                  {...register("story")}
                  rows={5}
                  placeholder="What is your story?"
                  className="mt-2 mr-3 py-1 px-2 block w-full rounded-sm border border-blk text-gr focus:text-blk focus:outline-none focus:border-active sm:text-sm"
                />
              </label>
              {errors.story && (
                <p className="text-checkbox-error text-sm pt-1">
                  {errors.story.message}
                </p>
              )}
            </div>
            <div className="pl-6 pr-6 pb-2">
              <label className="flex items-center text-sm text-secondaryft space-x-2">
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
                <p className="text-checkbox-error text-sm pt-1">
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
