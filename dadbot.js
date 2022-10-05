const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');
require('dotenv').config();

const client = new Snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

const comments = new CommentStream(client, {
  subreddit: 'testingground4bots',
  limit: 25,
});

comments.on('item', (item) => {
  console.log(item.body);
  const arr = item.body.split(' ');
  if (arr[0] === "I'm" && arr.length === 2) {
    let word = arr[1];
    if (word.search(/[^a-z]$/)) {
      word = word.slice(0, word.length - 1);
    }
    item.reply(`Hi ${word}, I'm dad!`);
  } else {
    return false;
  }
});
