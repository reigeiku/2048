(()=>{"use strict";({142:function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}var t,n,l,r,o,a,u,i,c,s=this&&this.__classPrivateFieldSet||function(e,t,n,l,r){if("m"===l)throw new TypeError("Private method is not writable");if("a"===l&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===l?r.call(e,n):r?r.value=n:t.set(e,n),n},f=this&&this.__classPrivateFieldGet||function(e,t,n,l){if("a"===n&&!l)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!l:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?l:"a"===n?l.call(e):l?l.value:t.get(e)},v=document.getElementById("score-board"),d=document.getElementById("best-score"),h=document.getElementById("tile-box"),y=document.querySelectorAll(".col"),b=document.querySelectorAll(".gameover-screen")[0],x=document.querySelectorAll(".win-screen")[0],g={2:"#cd6155",4:"#a569bd",8:"#5499c7",16:"#45b39d",32:"#52be80",64:"#f5b041",128:"#dc7633",256:"#cacfd2",512:"#99a3a4",1024:"#566573",2048:"#ec7063",4096:"#af7ac5",8192:"#5dade2",16384:"#48c9b0",32768:"#58d68d",65536:"#f4d03f",131072:"#eb984e",262144:"#f0f3f4",524288:"#aab7b8",1048576:"#5d6d7e"},m=[[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],p=[[{y:1,x:1},{y:1,x:2},{y:1,x:3},{y:1,x:4}],[{y:2,x:1},{y:2,x:2},{y:2,x:3},{y:2,x:4}],[{y:3,x:1},{y:3,x:2},{y:3,x:3},{y:3,x:4}],[{y:4,x:1},{y:4,x:2},{y:4,x:3},{y:4,x:4}]],w=0,k=0,S=!1,T=!0,E=function(){function i(e,c,v,d,h){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),t.add(this),n.set(this,void 0),l.set(this,void 0),r.set(this,0),o.set(this,{y:0,x:0}),a.set(this,{y:0,x:0}),s(this,n,e,"f"),s(this,l,c,"f"),this.placement=v,this.coords=d,this.value=h,f(this,t,"m",u).call(this)}var c,v;return c=i,(v=[{key:"box",get:function(){return f(this,n,"f")}},{key:"placement",get:function(){return f(this,a,"f")},set:function(e){f(this,n,"f").style.gridRow=e.y.toString(),f(this,n,"f").style.gridColumn=e.x.toString(),s(this,a,e,"f")}},{key:"coords",get:function(){return f(this,o,"f")},set:function(e){f(this,n,"f").style.left=e.x+"px",f(this,n,"f").style.top=e.y+"px",s(this,o,e,"f")}},{key:"value",get:function(){return f(this,r,"f")},set:function(e){f(this,n,"f").innerText=e.toString(),s(this,r,e,"f"),f(this,t,"m",u).call(this)}}])&&e(c.prototype,v),Object.defineProperty(c,"prototype",{writable:!1}),i}();n=new WeakMap,l=new WeakMap,r=new WeakMap,o=new WeakMap,a=new WeakMap,t=new WeakSet,u=function(){for(var e=Object.keys(f(this,l,"f")),t=Object.values(f(this,l,"f")),o=f(this,r,"f").toString(),a="",u=0;u<e.length;u++)e[u]===o&&(a=t[u]);f(this,n,"f").style.backgroundColor=a};var I,M=function(){return Math.round(3*Math.random())},A=function(){var e=[[],[],[],[]],t=0,n=0;return y.forEach((function(l){4===n&&(t++,n=0),e[t].push({x:l.offsetLeft,y:l.offsetTop}),n++})),e},L=function(){for(var e,t,n,l,r,o,a=M(),u=M(),c=M(),s=[],f=null!==m[a][u],v=Math.round(10*Math.random())/10<1?2:4;f;){if(c>=16)return;s.includes("".concat(a).concat(u))||(s.push("".concat(a).concat(u)),c++),a=M(),u=M(),f=null!==m[a][u]}t=u,n=v,l=i[e=a][t],r=p[e][t],(o=document.createElement("div")).classList.add("tile"),m[e][t]=new E(o,g,r,l,n),h.appendChild(o),m[e][t],function(){for(var e=0,t=!1,n=0;n<m.length;n++)for(var l=0,r=0;r<m[n].length;r++){var o=m[n][r],a=m[n+1]?m[n+1][r]:null;o&&(o.value===l&&(t=!0),a&&o.value===a.value&&(t=!0),e++,l=o.value)}return!(e>=16&&!t)}()||(b.style.display="flex")},P=function(e,t){setTimeout((function(){e.box.remove(),t.box.style.zIndex="0"}),100)},j=function(e){2048!==e||S||(T=!1,x.style.display="flex",S=!0)};window.addEventListener("resize",(function(){i=A();for(var e=0;e<3;e++)for(var t=0;t<3;t++){var n=m[e][t],l=i[e][t];n&&(n.coords=l)}})),i=A(),I=localStorage.getItem("bestScore"),c=I?(d.innerText=I,parseInt(I)):(localStorage.setItem("bestScore","0"),d.innerText="0",0),L(),L();var z=function(e){e.classList.add("moving")},C=function(e){setTimeout((function(){e.classList.remove("moving")}),100)},W=function(){for(var e=1;e<m.length;e++)for(var t=m[e],n=m[e-1],l=0;l<t.length;l++)for(var r=t[l],o=n[l],a=1;!(null!==o||null===r||e-a<0||e-a==0&&null!==m[e-a][l]||null!==m[e-a][l]);){var u=p[e-a][l],c=i[e-a][l];z(r.box),r.coords=c,r.placement=u,m[e-a][l]=r,m[e-(a-1)][l]=null,a++,w++,C(r.box)}},O=function(){for(var e=m.length-2;e>-1;e--)for(var t=m[e],n=m[e+1],l=0;l<t.length;l++)for(var r=t[l],o=n[l],a=1;!(null!==o||null===r||e+a>3||e+a===3&&null!==m[e+a][l]||null!==m[e+a][l]);){var u=p[e+a][l],c=i[e+a][l];z(r.box),r.coords=c,r.placement=u,m[e+a][l]=r,m[e+(a-1)][l]=null,a++,w++,C(r.box)}},_=function(){for(var e=0;e<m.length;e++)for(var t=m[e],n=1;n<t.length;n++)for(var l=t[n],r=t[n-1],o=1;!(null!==r||null===l||n-o<0||n-o==0&&null!==m[e][n-o]||null!==m[e][n-o]);){var a=p[e][n-o],u=i[e][n-o];z(l.box),l.coords=u,l.placement=a,m[e][n-o]=l,m[e][n-(o-1)]=null,o++,w++,C(l.box)}},q=function(){for(var e=0;e<m.length;e++)for(var t=m[e],n=t.length-2;n>-1;n--)for(var l=t[n],r=t[n+1],o=1;!(null!==r||null===l||n+o>3||n+o===3&&null!==m[e][n+o]||null!==m[e][n+o]);){var a=p[e][n+o],u=i[e][n+o];z(l.box),l.coords=u,l.placement=a,m[e][n+o]=l,m[e][n+(o-1)]=null,o++,w++,C(l.box)}},B=function(){T&&document.addEventListener("keydown",F,{once:!0})},F=function(e){switch(e.key){case"ArrowUp":W(),function(){for(var e=0;e<m.length;e++){var t=m[e],n=m[e+1];if(!n)break;for(var l=0;l<t.length;l++){var r=t[l],o=n[l];if(null!==r&&null!==o&&r.value===o.value){var a=p[e][l],u=i[e][l];z(o.box),o.box.style.zIndex="99",o.coords=u,o.placement=a,o.value=2*o.value,j(o.value),m[e][l]=o,m[e+1][l]=null,P(r,o),w++,k+=o.value,C(o.box)}}W()}}();break;case"ArrowDown":O(),function(){for(var e=m.length-1;e>-1;e--){var t=m[e],n=m[e-1];if(!n)break;for(var l=0;l<t.length;l++){var r=t[l],o=n[l];if(null!==r&&null!==o&&r.value===o.value){var a=p[e][l],u=i[e][l];z(o.box),o.box.style.zIndex="99",o.coords=u,o.placement=a,o.value=2*o.value,j(o.value),m[e][l]=o,m[e-1][l]=null,P(r,o),w++,k+=o.value,C(o.box)}}O()}}();break;case"ArrowLeft":_(),function(){for(var e=0;e<m.length;e++){for(var t=m[e],n=0;n<t.length;n++){var l=t[n],r=t[n+1];if(!r)break;if(null!==l&&null!==r&&l.value===r.value){var o=p[e][n],a=i[e][n];z(r.box),r.box.style.zIndex="99",r.coords=a,r.placement=o,r.value=2*r.value,j(r.value),m[e][n]=r,m[e][n+1]=null,P(l,r),w++,k+=r.value,C(r.box)}}_()}}();break;case"ArrowRight":q(),function(){for(var e=0;e<m.length;e++){for(var t=m[e],n=t.length-1;n>-1;n--){var l=t[n],r=t[n-1];if(!r)break;if(null!==l&&null!==r&&l.value===r.value){var o=p[e][n],a=i[e][n];z(r.box),r.box.style.zIndex="99",r.coords=a,r.placement=o,r.value=2*r.value,j(r.value),m[e][n]=r,m[e][n-1]=null,P(l,r),w++,k+=r.value,C(r.box)}}q()}}();break;default:return void B()}w>0&&(setTimeout((function(){L()}),150),w=0,v.innerText=k.toString(),k>c&&(d.innerText=k.toString(),localStorage.setItem("bestScore",k.toString()))),B()};window.onload=B}})[142]()})();
//# sourceMappingURL=main.js.map