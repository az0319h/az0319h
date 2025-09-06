"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContact } from "@/api/createContact.actions";
import { ContactFormData, contactSchema } from "@/schemas";
import { useNotification } from "@/context/NotificationContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const { showNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await createContact(data);
    if (result.success) {
      showNotification(result.message, true);
      reset();
    } else {
      showNotification(result.message, false);
    }
  };

  return (
    <div className="max-w-125 mx-auto">
      <h2 className="text-center text-24-bold mb-10">{t("title")}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 lg:gap-12 w-full [&_input]:placeholder:text-black-100 [&_input]:w-full [&_input]:py-2 [&_input]:border-b [&_input]:border-black-100"
      >
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder={t("form.name")}
            className={`${
              errors.name &&
              "text-red-500 !border-red-500 placeholder:!text-red-500"
            }`}
          />
        </div>

        <div>
          <input
            type="text"
            {...register("email")}
            placeholder={t("form.email")}
            className={`${
              errors.email &&
              "text-red-500 !border-red-500 placeholder:!text-red-500"
            }`}
          />
        </div>

        <div>
          <input
            type="text"
            {...register("phone")}
            placeholder={t("form.phone")}
            className={`${
              errors.phone &&
              "text-red-500 !border-red-500 placeholder:!text-red-500"
            }`}
          />
        </div>

        <div>
          <label className=" block text-14-regular mb-3 md:mb-4">
            {t("form.type")}
          </label>
          <div className="relative">
            <select
              {...register("type")}
              onClick={() => setIsOpen((prev) => !prev)}
              onBlur={() => setIsOpen(false)}
              className=" cursor-pointer text-center w-full  outline-none appearance-none border border-black-100 px-4 py-3 rounded-3xl"
            >
              <option value="COLLABORATION">
                {" "}
                {t("form.types.collaboration")}
              </option>
              <option value="JOB INQUIRY">{t("form.types.job")}</option>
              <option value="DEVELOPMENT REQUEST">
                {t("form.types.devRequest")}
              </option>
              <option value="OTHER">{t("form.types.other")}</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <IoMdArrowDropdown
                size={22}
                className={`md:size-6 ${isOpen ? "rotate-180" : ""}`}
              />
            </span>
          </div>
        </div>

        <div>
          <label
            className={`block text-14-regular mb-3 md:mb-4 ${
              errors.message && "text-red-500"
            }`}
          >
            {t("form.messageLabel")}
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder={t("form.messagePlaceholder")}
            className={`${
              errors.message &&
              "text-red-500 !border-red-500 placeholder:!text-red-500"
            } w-full border placeholder:text-black-100 border-black-100 p-2 resize-none max-h-40 overflow-y-auto`}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className={`w-full border border-black-100 text-black-100 py-3 px-4 rounded-3xl text-16-semibold transition-all duration-300 hover:bg-black-100 hover:text-white
            ${isSubmitting ? "cursor-not-allowed" : ""}`}
          >
            {t("form.reset")}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black-100 text-white py-3.25 px-4 rounded-3xl text-16-semibold hover:opacity-80 transition-all duration-300
            ${isSubmitting ? "cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? t("form.sending") : t("form.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
