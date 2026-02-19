import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { parsePhoneNumber } from "libphonenumber-js/min";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@consta/uikit/DatePicker";

import z from "zod";

const reservedEmails = [
  "test123@gmail.com",
  "test345@gmail.com",
  "test456@gmail.com",
];

const formSchema = z
  .object({
    name: z
      .string("Неверный формат")
      .nonempty("Введите имя")
      .min(2, "Слишком мало символов")
      .max(32, "Превышено максимально кол-во символов")
      .nonempty("Поле обязательно к заполнению"),
    surname: z
      .string("Неверный формат")
      .nonempty("Введите фамилию")
      .min(2, "Слишком мало символов")
      .max(32, "Превышено максимально кол-во символов")
      .nonempty("Поле обязательно к заполнению"),
    email: z
      .email("Введите корректный email")
      .refine((value) => {
        return !reservedEmails.includes(value);
      }, "Email уже используется")
      .nonempty("Поле обязательно к заполнению"),
    password: z
      .string()
      .nonempty("Поле обязательно к заполнению")
      .min(8, "Пароль должен содеражть минимум 8 символов")
      .refine(
        (val) => /[A-Z]/.test(val),
        "Пароль должен включать минимум одну заглавную букву"
      )
      .refine(
        (val) => /[^A-Za-zd]/.test(val),
        "Пароль должен включать хотя бы один спец символ"
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "Пароль должен включать хотя бы одну цифру"
      ),
    confirmPassword: z
      .string()
      .nonempty("Поле обязательно к заполнению")
      .min(8, "Пароль должен содеражть минимум 8 символов")
      .refine(
        (val) => /[A-Z]/.test(val),
        "Пароль должен включать минимум одну заглавную букву"
      )
      .refine(
        (val) => /[^A-Za-zd]/.test(val),
        "Пароль должен включать хотя бы один спец символ"
      )
      .refine(
        (val) => /[0-9]/.test(val),
        "Пароль должен включать хотя бы одну цифру"
      ),
    phone: z
      .string()
      .nonempty("Введите номер телефона")
      .refine(isValidPhoneNumber, "Введите корректный номер телефона")
      .transform((value) => parsePhoneNumber(value).number.toString()),
    age: z
      .number("Введите число")
      .min(18, "Введите возраст от 18 до 65")
      .max(65, "Введите возраст от 18 до 65"),
    gender: z.enum(["W", "M"]),
    newsletter: z.boolean().optional().default(false),
    birthdate: z.date(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    "Пароли не совпадают"
  );

export const SimpleForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div style={{ width: "23%" }}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Имя</span>
          <input type="text" placeholder="Введите имя" {...register("name")} />
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
          <span style={{ textAlign: "left" }}>Пароль</span>
          <input
            type="password"
            placeholder="Введите пароль"
            {...register("password")}
          />
          {errors.password && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.password.message}
            </span>
          )}
          {errors.root && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.root.message}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Подтвержение пароля</span>
          <input
            type="password"
            placeholder="Введите пароль"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.confirmPassword.message}
            </span>
          )}
          {errors.root && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.root.message}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span style={{ textAlign: "left" }}>Пол</span>
          <div>
            <input
              type="radio"
              id="genderM"
              value="M"
              {...register("gender")}
            />
            <label htmlFor="genderM">M</label>
          </div>
          <div>
            <input
              type="radio"
              id="genderW"
              value="W"
              {...register("gender")}
            />
            <label htmlFor="genderW">Ж</label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span style={{ textAlign: "left" }}>Подписка на новости</span>
          <div>
            <input
              type="checkbox"
              id="newsletter"
              {...register("newsletter")}
            />
            <label htmlFor="newsletter">Подписка</label>
          </div>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ textAlign: "left" }}>Дата рождения</span>
          <Controller
            name="birthdate"
            render={({ field }) => <DatePicker {...field} />}
            control={control}
          />
          {errors.birthdate && (
            <span style={{ textAlign: "left", fontSize: "12px" }}>
              {errors.birthdate.message}
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
