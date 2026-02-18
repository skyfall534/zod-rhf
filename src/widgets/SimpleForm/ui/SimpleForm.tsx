import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { parsePhoneNumber } from "libphonenumber-js/min";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z
    .string("Неверный формат")
    .nonempty("Введите имя")
    .min(2, "Ваше имя слишком короткое")
    .max(20, "Ваше имя слишком длинное"),
  surname: z
    .string("Неверный формат")
    .nonempty("Введите фамилию")
    .min(2, "Ваша фамилия слишком короткая")
    .max(20, "Ваша фамилия слишком длинная"),
  email: z.email("Введите корректный email"),
  phone: z
    .string()
    .nonempty("Введите номер телефона")
    .refine(isValidPhoneNumber, "Введите корректный номер телефона")
    .transform((value) => parsePhoneNumber(value).number.toString()),
  age: z
    .number("Введите число")
    .min(18, "Введите возраст от 18 до 65")
    .max(65, "Введите возраст от 18 до 65"),
});

export const SimpleForm = () => {
  const {
    watch,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <div style={{ width: "23%" }}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Имя</span>
          <input
            type="text"
            placeholder="Введите имя"
            {...register("name")}
            aria-invalid={true}
          />
          {errors.name && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Фамилия</span>
          <input
            type="text"
            placeholder="Введите фамилию"
            {...register("surname")}
          />
          {errors.surname && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.surname.message}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Возраст</span>
          <input
            type="text"
            placeholder="Введите ваш возраст"
            {...register("age")}
          />
          {errors.age && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.age.message}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Почта</span>
          <input
            type="email"
            placeholder="Введите почту"
            {...register("email")}
          />
          {errors.email && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Мобильный телефон</span>
          <input
            type="tel"
            placeholder="Введите мобильный телефон"
            {...register("phone")}
          />
          {errors.phone && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.phone.message}
            </span>
          )}
        </div>
        <input
          type="submit"
          style={{ border: "1px solid grey", marginTop: "20px" }}
          value="Подтвердить отправку"
        />
      </form>
    </div>
  );
};
