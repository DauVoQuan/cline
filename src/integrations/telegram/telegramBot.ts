import TelegramBot from 'node-telegram-bot-api';

let bot: TelegramBot | null = null;

export function initTelegramBot(token: string) {
  if (bot) return bot;
  bot = new TelegramBot(token, { polling: false });
  return bot;
}

export function sendHelloMessage(chatId: string) {
  if (!bot) throw new Error('Telegram bot not initialized');
  return bot.sendMessage(chatId, 'hello');
}
