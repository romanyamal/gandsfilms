import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import "yup-phone-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import contactImg from "../../assets/DSC01260.jpg";
import isEmailValidator from "validator/lib/isEmail";

import { RevealOnScroll } from "../RevealOnScroll";
import { DatePicker } from "../DatePicker";
import { Modal } from "../Modal";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
          : new yup.ValidationError("Invalid email format")
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
      dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true).isValid()
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
      }
    )
    .test(
      "max-3.5-years",
      "Wedding date cannot be more than 3.5 years from today",
      (value) => {
        const date = dayjs(value, ["MMDDYYYY", "MM/DD/YYYY"], true);
        return date.isBefore(dayjs().add(3.5, "year"), "day");
      }
    ),
  location: yup.string().required("Please enter venue location"),
  insta: yup
    .string()
    .notRequired()
    .matches(
      /^@([A-Za-z0-9._]{1,30})$/,
      "Invalid Instagram handle (e.g. @username)"
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

  const containerRef = useRef(null);
  const datePickerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (
          containerRef.current &&
          !containerRef.current.contains(document.activeElement) &&
          (!datePickerRef.current ||
            !datePickerRef.current.contains(event.target))
        ) {
          setIsActive(false);
          setShowDatePicker(false);
        }
      }, 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputBlur = () => {
    const date = dayjs(weddingDate, ["MMDDYYYY", "MM/DD/YYYY"], true);
    if (date.isValid()) {
      setWeddingDate(date.format("MM/DD/YYYY"));
      setValue("weddingDate", date.format("MM/DD/YYYY"));
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
      <RevealOnScroll>
        <div className="grid grid-col-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col p-8 space-y-8 justify-center text-primaryft text-center w-full max-w-lg">
            <h1 className="text-xl">Tell me your story!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil cum
              velit temporibus provident quia. Expedita magni iusto, enim
              sapiente, adipisci soluta placeat delectus in praesentium repellat
              quo doloribus tempora culpa.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, neque dolores magni molestiae animi error corporis.
              Adipisci tempore sint quae ad dolor. Molestias consectetur,
              placeat aperiam velit libero corporis provident.
            </p>
            <h3>Preserve your moment to last a lifetime!</h3>
            <div className="p-8 md:pl-10 flex items-center">
              <img src={contactImg} className="rounded" />
            </div>
          </div>

          <div className="bg-contactform border rounded-lg border-transparent md:mr-8 text-primaryft">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pt-1">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm pt-1">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm pt-1">
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
                      ref={containerRef}
                      className={`flex border-b transition-colors duration-300 ${
                        isActive ? "border-action" : "border-thirdft"
                      }`}
                    >
                      <input
                        {...field}
                        type="text"
                        placeholder="mm/dd/yyyy"
                        value={weddingDate}
                        onFocus={() => setIsActive(true)}
                        onBlur={(e) => {
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
                        className="appearance-none cursor-text bg-transparent w-full text-thirdft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft"
                      />
                      <button
                        type="button"
                        className="ml-2 px-3 py-1 cursor-pointer text-white rounded"
                        onClick={() => {
                          setIsActive(true);
                          setShowDatePicker((prev) => !prev);
                        }}
                      >
                        📅
                      </button>
                      {showDatePicker && (
                        <div className="absolute z-10 ml-5 mt-10 ">
                          <div
                            className="shadow-md rounded-xl"
                            ref={datePickerRef}
                          >
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
                  )}
                />
                {errors.weddingDate && (
                  <p className="text-red-500 text-sm pt-1">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm pt-1">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
                {errors.insta && (
                  <p className="text-red-500 text-sm pt-1">
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
                        className="mr-2 accent-action"
                      />
                      {label}
                    </label>
                  ))}
                  {errors.hearAbout && (
                    <p className="text-red-500 text-sm pt-1">
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
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
              </div>
              <div className="pl-6 pr-6 pb-2">
                <span>What about my work speaks to you the most? *</span>
                <input
                  type="text"
                  {...register("values")}
                  placeholder="Luxury, emotional storytelling"
                  className="appearance-none cursor-text bg-transparent w-full border-b border-thirdft text-secondaryft mr-3 py-1 px-2 leading-tight focus:outline-none focus:text-primaryft focus:border-action"
                />
              </div>
              <div className="pl-6 pr-6">
                <label className="block text-sm font-medium">
                  Tell me your story! *
                  <textarea
                    {...register("story")}
                    rows={5}
                    placeholder="What is your story?"
                    className="mt-2 mr-3 py-1 px-2 block w-full rounded-sm border border-thirdft text-secondaryft focus:text-primaryft focus:outline-none focus:border-action sm:text-sm"
                  />
                </label>
                {errors.story && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.story.message}
                  </p>
                )}
              </div>
              <div className="pl-6 pr-6 pb-2">
                <label className="flex items-center text-sm text-secondaryft space-x-2">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="accent-action"
                  />
                  <span>
                    I give consent to be contacted by phone, email, or instagram
                    *
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm pt-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="m-8 inline-block rounded-sm text-lg font-action text-black px-6 py-1 text-center bg-action hover:bg-action-hvr"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </RevealOnScroll>
      <Modal
        isVisible={showModal}
        bgColor={"bg-green-100"}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col justify-center text-center items-center text-primaryft m-8">
          <h1 className="text-xl bold pb-2">Thank you for choosing us!</h1>
          <p>We will contact you shortly!</p>
        </div>
      </Modal>
    </section>
  );
};
