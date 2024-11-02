import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/modules/LoginForm';

export const LoginPage = new AuthLayout({
  title: 'Login',
  children: new LoginForm(),
});
