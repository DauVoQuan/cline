
import TelegramBot, { Message } from 'node-telegram-bot-api';

let bot: TelegramBot | null = null;
let messageCallback: ((msg: Message) => void) | null = null;

// Khởi tạo bot, chỉ gọi 1 lần
export function initTelegramBot(token: string, polling = false) {
  if (bot) return bot;
  bot = new TelegramBot(token, { polling });
  if (polling) {
    bot.on('message', (msg) => {
      if (messageCallback) messageCallback(msg);
    });
  }
  return bot;
}

// Gửi message bất kỳ
export function sendTelegramMessage(chatId: string, text: string) {
  if (!bot) throw new Error('Telegram bot not initialized');
  return bot.sendMessage(chatId, text);
}

// Đăng ký callback khi nhận message mới
export function onTelegramMessage(callback: (msg: Message) => void) {
  messageCallback = callback;
}

// Dừng bot (nếu cần)
export function stopTelegramBot() {
  if (bot) {
    bot.stopPolling();
    bot = null;
  }
}

// Gửi message hello (giữ lại cho tương thích)
export function sendHelloMessage(chatId: string) {
  return sendTelegramMessage(chatId, 'hello');
}
