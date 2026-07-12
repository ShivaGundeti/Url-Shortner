import {z} from "zod";

const LoginSchema = z.object(
    {
        email: z.string().email("Must be a valid email").endsWith("@gmail.com","only gmail is allowed"),
        password: z.string().min(6,"Password must be 6 characters")
    }
)

export default LoginSchema