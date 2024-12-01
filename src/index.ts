import { ChangePasswordPage } from '@/pages/ChangePasswordPage';
import { ChatPage } from '@/pages/ChatPage';
import { EditProfilePage } from '@/pages/EditProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RegisterPage } from '@/pages/RegisterPage';

import { Router } from '@/entites/Router';
import { ROOT_SELECTOR } from '@/model/const';
import { ROUTES } from '@/model/routes';

import '@/styles/global.scss';

import '../src/entites/HTTPTransport';

const router = new Router(ROOT_SELECTOR);

router
  .use(ROUTES.LOGIN, LoginPage)
  .use(ROUTES.REGISTRATION, RegisterPage)
  .use(ROUTES.PROFILE, ProfilePage)
  .use(ROUTES.EDIT_PROFILE, EditProfilePage)
  .use(ROUTES.CHAT, ChatPage)
  .use(ROUTES.CHANGE_PASSWORD, ChangePasswordPage);

router.start();
