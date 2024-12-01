import { MessageRow } from '@/components/MessageRow';
import { Block } from '@/entites/Block';
import { ChatPageLayout } from '@/layouts/ChatPageLayout';
import { Burger } from '@/modules/Burger';
import { MessageInput } from '@/modules/MessageInput';
import { SearchInput } from '@/modules/SearchInput';
import { ContactRow } from '@/components/ContactRow';

export const chatPage = new ChatPageLayout({
  controls: [new Burger(), new SearchInput()],
  contacts: [
    new ContactRow({
      message: 'asdfasdfasdf',
      avatar: '/images/Empty-img.png',
      login: 'login',
      time: '20:13',
    }),
    new ContactRow({
      message: 'asdfasdfasdf',
      avatar: '/images/Empty-img.png',
      login: 'login',
      time: '20:13',
    }),
    new ContactRow({
      message: 'asdfasdfasdf',
      avatar: '/images/Empty-img.png',
      login: 'login',
      time: '20:13',
    }),
  ],
  messages: [
    new MessageRow({
      message: 'sadfsadf',
      seen: false,
      time: '20:12',
      variant: 'mine',
    }),
    new MessageRow({
      message: 'sadfsadf',
      seen: true,
      time: '20:12',
      variant: 'mine',
    }),
    new MessageRow({
      message: 'sadfsadf',
      seen: true,
      time: '20:12',
    }),
  ],
  input: new MessageInput(),
});

export class ChatPage extends Block {
  render(): HTMLElement | string {
    return chatPage.getContent();
  }
}
