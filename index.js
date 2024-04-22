const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const TelegramBot = require('node-telegram-bot-api');

const token = '6413955490:AAGSk-S2enRTLiHlmvngDSDGcAjvT67x0Vg';




const bot = new TelegramBot(token, {polling: true});


var onHold;




bot.onText(/\/echo (.+)/, (msg, match) => {
 
  const chatId = msg.chat.id;
  const resp = match[1];






  bot.sendMessage(chatId, resp);
});



bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  var text = msg.text;
  var dateUnix = msg.date;
  var date = new Date(dateUnix * 1000)
  var hours = date.getHours();
  
  console.log(onHold);
  if(hours >= 9 && hours <= 18){
    bot.sendMessage(chatId, 'https://uvv.br');
  }
  if (onHold == 1 && text.includes("@") == true){
    bot.sendMessage(chatId, "Email recebido")
    await prisma.usuario.create({
        data: {
            email: text
        }
    })
  }
  if (onHold == 1 && text.includes("@") == false){
    bot.sendMessage(chatId, "Email inválido. Por favor, envie o seu email.")
    
  }
  else if (onHold !=1 && (hours < 9 || hours > 18)){
    bot.sendMessage(chatId, 'Esta empresa funciona apenas entre as 9 da manã e 6 da tarde. Por favor envie o seu email, para que possamos entrar em contato');
    onHold = 1;
  }
  
});
