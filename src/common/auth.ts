import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required')
})

const signInSchema = loginSchema.extend({
  name: z.string().min(1, 'Name is required').min(3).max(32),
  confirm_password: z.string().min(1, 'Please confirm your password')
}).refine(val => val.password === val.confirm_password, {
  message: 'Passwords don\'t match',
  path: ["confirm_password"]
})

type LoginSchema = z.infer<typeof loginSchema>;
type SignUpSchema = z.infer<typeof signInSchema>;

export { loginSchema, signInSchema, LoginSchema, SignUpSchema };