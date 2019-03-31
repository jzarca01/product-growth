const axios = require('axios');

const getProxy = async () => {
  const proxy = await axios({
    method: 'GET',
    url: 'https://api.getproxylist.com/proxy',
    params: {
      protocol: 'http',
      allowsHttps: 1,
      minUptime: 75,
      maxConnectTime: 1
    }
  });
  return proxy.data;
};

module.exports = {
  getProxy
};
