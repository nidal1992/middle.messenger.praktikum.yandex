import { Button } from '@/components/Button';
import { KeyValue } from '@/components/KeyValue/KeyValue';
import { Block } from '@/entites/Block';
import { Router } from '@/entites/Router';
import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { Avatar } from '@/components/Avatar';
import { ROOT_SELECTOR } from '@/model/const';
import { ROUTES } from '@/model/routes';
import { parseUserData } from '@/utils/parseUserData';

const { avatar, ...user } = parseUserData({
  avatar: '/images/Empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
});

const router = new Router(ROOT_SELECTOR);

const rows = Object.entries(user).map(
  ([key, value]) =>
    new KeyValue({
      key,
      value,
    }),
);

export const profilePage = new SettingsPageLayout({
  link: new Button({
    onClick: () => router.go(ROUTES.CHAT),
    variant: 'link',
    children: 'Back to chats',
  }),
  children: rows,
  avatar: new Avatar({
    big: true,
    src: avatar,
  }),
  controls: [
    new Button({
      onClick: () => router.go(ROUTES.CHANGE_PASSWORD),
      children: 'CHANGE PASSWORD',
      variant: 'link',
    }),
    new Button({
      onClick: () => router.go(ROUTES.EDIT_PROFILE),
      children: 'EDIT PROFILE',
      variant: 'link',
    }),
    new Button({
      children: 'EXIT',
      variant: 'failure',
    }),
  ],
});

export class ProfilePage extends Block {
  render(): HTMLElement | string {
    return profilePage.getContent();
  }
}
