import { FC } from "react";
import { useForm } from "../useForm";

type Gender = "male" | "female" | "non-binary";

interface User {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  password: string;
}

const Registration: FC = () => {
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<User>({
    validations: {
      name: {
        pattern: {
          value: "^[A-Za-z]*$",
          message:
            "You're not allowed to use special characters or numbers in your name.",
        },
      },
      age: {
        custom: {
          isValid: (value) => parseInt(value, 10) > 17,
          message: "You have to be at least 18 years old.",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
    },
    onSubmit: () => alert("User submitted!"),
  });

  return (
    <div className="flex flex-column justify-center items-center">
      <form className="registration-wrapper" onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <div>
          {" "}
          <input
            placeholder="Name*"
            value={user.name || ""}
            onChange={handleChange("name")}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <input
            placeholder="Age"
            type="number"
            value={user.age || ""}
            onChange={handleChange<number>("age", (value) =>
              parseInt(value, 10)
            )}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <input
            placeholder="Email*"
            type="email"
            value={user.email || ""}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <input
            placeholder="Password*"
            type="password"
            value={user.password || ""}
            onChange={handleChange("password")}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <select onChange={handleChange("gender")} required>
            <option value="" disabled>
              Select gender*
            </option>
            <option value="male" selected={user.gender === "male"}>
              Male
            </option>
            <option value="female" selected={user.gender === "female"}>
              Female
            </option>
            <option value="non-binary" selected={user.gender === "non-binary"}>
              Non-binary
            </option>
          </select>
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
