const { createLogger, format, transports } = require('winston');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const { combine, timestamp, label, printf, simple, colorize, json, align } = format;

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

// const myFormat = printf((info) => {
//   return Object.entries(info).map(([key, val]) => `${key}=${val}`).join('|')
// });

const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    align(),
    simple()
  ),
  defaultMeta: { service: 'user-service', custom: 'custom-field' },
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

const lorem = new LoremIpsum();


const methods = ["debug", "info", "warn", "error"];

while(true) {
  const method = methods[Math.floor(Math.random() * methods.length)];
  logger[method](lorem.generateSentences(1));
  msleep(Math.random() * 1000)
}
