import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/modules';

export const loginPage = new AuthLayout({
  title: 'Login',
  children: new LoginForm(),
});
