import express from 'express';
import config from './config';

import serverRender from './serverRender';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  const initData = serverRender();
  res.render('index', { initData});
});

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`);
});