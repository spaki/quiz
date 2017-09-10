function getEndpoint(ep) {
    if(!window.location.hostname.includes('localhost'))
      return ep; // 'http://www.almocando.com.br/' + ep;
      
    return 'http://localhost:5000/' + ep;
  }

module.exports = {
    getEndpoint: getEndpoint
}