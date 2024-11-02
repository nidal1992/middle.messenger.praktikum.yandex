import { AuthLayout } from '@/layouts/AuthLayout';
import { RegisterForm } from '@/modules/RegisterForm';

export const RegisterPage = new AuthLayout({
  title: 'REGISTER',
  children: new RegisterForm(),
});
