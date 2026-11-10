'use strict';
window.ONIC_PRODUCT_LINK=(address,product,route)=>{
  const url=new URL(address);
  url.pathname=url.pathname.slice(0,url.pathname.lastIndexOf('/')+1)+(product?product+'.html':'');
  url.hash=route||'';
  return url.href;
};
