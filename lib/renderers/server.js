import React from 'react';
import axios from 'axios';
import ReactDomServer from 'react-dom/server';
import config from 'config';

import App from 'components/App';
import StateApi from 'state-api';

const serverRender = async ()=>{
  const resp = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(resp.data);

  return {
    initContent: ReactDomServer.renderToString(
        <App store={ store }/>
      ),
    initData:resp.data
  };
};

export default serverRender;
