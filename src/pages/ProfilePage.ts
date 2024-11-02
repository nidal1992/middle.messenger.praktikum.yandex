import { Button } from '@/components/Button';
import { KeyValue } from '@/components/KeyValue/KeyValue';
import { Link } from '@/components/Link';
import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { Avatar } from '@/components/Avatar';
import { ROUTES } from '@/routes.ts';
import { parseUserData } from '@/utils/parseUserData.ts';

const { avatar, ...user } = parseUserData({
  avatar: '/images/empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
});

const rows = Object.entries(user).map(
  ([key, value]) =>
    new KeyValue({
      key,
      value,
    }),
);

export const ProfilePage = new SettingsPageLayout({
  link: new Link({
    href: ROUTES.MAIN,
    variant: 'arrow',
    label: 'back to chats',
  }),
  children: rows,
  avatar: new Avatar({
    big: true,
    src: avatar,
  }),
  controls: [
    new Link({
      href: ROUTES.CHANGE_PASSWORD,
      label: 'CHANGE PASSWORD',
    }),
    new Link({
      href: ROUTES.EDIT_PROFILE,
      label: 'EDIT PROFILE',
    }),
    new Button({
      children: 'EXIT',
      variant: 'failure',
    }),
  ],
});
