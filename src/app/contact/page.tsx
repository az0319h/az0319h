"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContact } from "@/api/createContact.actions";
import { ContactFormData, contactSchema } from "@/schemas";
import { useNotification } from "@/context/NotificationContext";

export default function ContactPage() {
  const { showNotification } = useNotification();

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
      showNotification("Your message has been sent successfully.", true);
      reset();
    } else {
      showNotification("An error occurred while sending your message.", false);
    }
  };

  return (
    <div className="max-w-125 mx-auto">
      <h2 className="text-center text-24-bold mb-10">
        Hello. Let&apos;s talk.
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 lg:gap-12 w-full [&_input]:placeholder:text-black-100 [&_input]:w-full [&_input]:py-2 [&_input]:border-b [&_input]:border-black-100"
      >
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Y O U R&nbsp;&nbsp;&nbsp;N A M E *"
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
            placeholder="Y O U R&nbsp;&nbsp;&nbsp;E M A I L *"
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
            placeholder="Y O U R   P H O N E   N U M B E R"
            className={`${
              errors.phone &&
              "text-red-500 !border-red-500 placeholder:!text-red-500"
            }`}
          />
        </div>

        <div>
          <label className=" block text-14-regular mb-3 md:mb-4">
            I N Q U I R Y&nbsp;&nbsp;&nbsp;T Y P E *
          </label>
          <select
            {...register("type")}
            className="cursor-pointer text-center w-full relative outline-none appearance-none border border-black-100 px-4 py-3 rounded-3xl"
          >
            <option value="COLLABORATION">C O L L A B O R A T I O N</option>
            <option value="JOB INQUIRY">
              J O B&nbsp;&nbsp;&nbsp;I N Q U I R Y
            </option>
            <option value="DEVELOPMENT REQUEST">
              D E V E L O P M E N T&nbsp;&nbsp;&nbsp;R E Q U E S T
            </option>
            <option value="OTHER">O T H E R</option>
          </select>
        </div>

        <div>
          <label
            className={`block text-14-regular mb-3 md:mb-4 ${
              errors.message && "text-red-500"
            }`}
          >
            Y O U R&nbsp;&nbsp;&nbsp;M E S S A G E *
          </label>
          <textarea
            {...register("message")}
            rows={5}
            placeholder="E N T E R   Y O U R   M E S S A G E"
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
            R E S E T
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black-100 text-white py-3.25 px-4 rounded-3xl text-16-semibold hover:opacity-80 transition-all duration-300
            ${isSubmitting ? "cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "S E N D I N G . . ." : "S E N D"}
          </button>
        </div>
      </form>
    </div>
  );
}
