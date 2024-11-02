import { Avatar } from '@/components/Avatar';
import { Link } from '@/components/Link';

import { SettingsPageLayout } from '@/layouts/SettingsPageLayout';
import { IUser } from '@/model/interfaces.ts';
import { EditProfileForm } from '@/modules/EditProfileForm';
import { ROUTES } from '@/model/routes';

const { avatar, ...user } = {
  avatar: '/images/empty-img.png',
  first_name: 'John',
  second_name: 'Dow',
  display_name: 'John Dow',
  login: 'john_dow',
  email: 'john_dow@gmail.com',
  phone: '+7 999 999-99-99',
};

export const EditProfilePage = new SettingsPageLayout({
  avatar: new Avatar({
    src: avatar,
    big: true,
  }),
  link: new Link({
    href: ROUTES.PROFILE,
    label: 'Back to Profile',
    variant: 'arrow',
  }),
  children: [new EditProfileForm(user as IUser)],
});
