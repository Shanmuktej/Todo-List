"use strict";(()=>{var e={};e.id=453,e.ids=[453],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},8145:(e,a,n)=>{n.r(a),n.d(a,{config:()=>o,default:()=>l,routeModule:()=>s});var r={};n.r(r),n.d(r,{default:()=>handler});var t=n(1802),i=n(7153),d=n(6249);function handler(e,a){fetch("URL").then(e=>e.json()),a.status(200).json({name:"John Doe"})}let l=(0,d.l)(r,"default"),o=(0,d.l)(r,"config"),s=new t.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/hello",pathname:"/api/hello",bundlePath:"",filename:""},userland:r})}};var a=require("../../webpack-api-runtime.js");a.C(e);var __webpack_exec__=e=>a(a.s=e),n=a.X(0,[222],()=>__webpack_exec__(8145));module.exports=n})();