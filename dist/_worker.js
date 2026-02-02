var ge=Object.defineProperty;var Dt=t=>{throw TypeError(t)};var be=(t,e,o)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var h=(t,e,o)=>be(t,typeof e!="symbol"?e+"":e,o),$t=(t,e,o)=>e.has(t)||Dt("Cannot "+o);var i=(t,e,o)=>($t(t,e,"read from private field"),o?o.call(t):e.get(t)),f=(t,e,o)=>e.has(t)?Dt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),m=(t,e,o,r)=>($t(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o),b=(t,e,o)=>($t(t,e,"access private method"),o);var Ft=(t,e,o,r)=>({set _(n){m(t,e,n,o)},get _(){return i(t,e,r)}});var Nt=(t,e,o)=>(r,n)=>{let s=-1;return a(0);async function a(d){if(d<=s)throw new Error("next() called multiple times");s=d;let c,l=!1,u;if(t[d]?(u=t[d][0][0],r.req.routeIndex=d):u=d===t.length&&n||void 0,u)try{c=await u(r,()=>a(d+1))}catch(p){if(p instanceof Error&&e)r.error=p,c=await e(p,r),l=!0;else throw p}else r.finalized===!1&&o&&(c=await o(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},xe=Symbol(),ye=async(t,e=Object.create(null))=>{const{all:o=!1,dot:r=!1}=e,s=(t instanceof oe?t.raw.headers:t.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?ve(t,{all:o,dot:r}):{}};async function ve(t,e){const o=await t.formData();return o?we(o,e):{}}function we(t,e){const o=Object.create(null);return t.forEach((r,n)=>{e.all||n.endsWith("[]")?Ee(o,n,r):o[n]=r}),e.dot&&Object.entries(o).forEach(([r,n])=>{r.includes(".")&&(Ie(o,r,n),delete o[r])}),o}var Ee=(t,e,o)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(o):t[e]=[t[e],o]:e.endsWith("[]")?t[e]=[o]:t[e]=o},Ie=(t,e,o)=>{let r=t;const n=e.split(".");n.forEach((s,a)=>{a===n.length-1?r[s]=o:((!r[s]||typeof r[s]!="object"||Array.isArray(r[s])||r[s]instanceof File)&&(r[s]=Object.create(null)),r=r[s])})},Xt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Ce=t=>{const{groups:e,path:o}=_e(t),r=Xt(o);return Re(r,e)},_e=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(o,r)=>{const n=`@${r}`;return e.push([n,o]),n}),{groups:e,path:t}},Re=(t,e)=>{for(let o=e.length-1;o>=0;o--){const[r]=e[o];for(let n=t.length-1;n>=0;n--)if(t[n].includes(r)){t[n]=t[n].replace(r,e[o][1]);break}}return t},_t={},Pe=(t,e)=>{if(t==="*")return"*";const o=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(o){const r=`${t}#${e}`;return _t[r]||(o[2]?_t[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,o[1],new RegExp(`^${o[2]}(?=/${e})`)]:[t,o[1],new RegExp(`^${o[2]}$`)]:_t[r]=[t,o[1],!0]),_t[r]}return null},St=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,o=>{try{return e(o)}catch{return o}})}},Ae=t=>St(t,decodeURI),Jt=t=>{const e=t.url,o=e.indexOf("/",e.indexOf(":")+4);let r=o;for(;r<e.length;r++){const n=e.charCodeAt(r);if(n===37){const s=e.indexOf("?",r),a=e.slice(o,s===-1?void 0:s);return Ae(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(n===63)break}return e.slice(o,r)},ke=t=>{const e=Jt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},rt=(t,e,...o)=>(o.length&&(e=rt(e,...o)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Zt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),o=[];let r="";return e.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){o.length===0&&r===""?o.push("/"):o.push(r);const s=n.replace("?","");r+="/"+s,o.push(r)}else r+="/"+n}),o.filter((n,s,a)=>a.indexOf(n)===s)},Ot=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?St(t,ee):t):t,te=(t,e,o)=>{let r;if(!o&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const d=t.charCodeAt(a+e.length+1);if(d===61){const c=a+e.length+2,l=t.indexOf("&",c);return Ot(t.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const n={};r??(r=/[%+]/.test(t));let s=t.indexOf("?",8);for(;s!==-1;){const a=t.indexOf("&",s+1);let d=t.indexOf("=",s);d>a&&a!==-1&&(d=-1);let c=t.slice(s+1,d===-1?a===-1?void 0:a:d);if(r&&(c=Ot(c)),s=a,c==="")continue;let l;d===-1?l="":(l=t.slice(d+1,a===-1?void 0:a),r&&(l=Ot(l))),o?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(l)):n[c]??(n[c]=l)}return e?n[e]:n},je=te,Le=(t,e)=>te(t,e,!0),ee=decodeURIComponent,Ut=t=>St(t,ee),at,A,H,re,ne,qt,U,Vt,oe=(Vt=class{constructor(t,e="/",o=[[]]){f(this,H);h(this,"raw");f(this,at);f(this,A);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});f(this,U,t=>{const{bodyCache:e,raw:o}=this,r=e[t];if(r)return r;const n=Object.keys(e)[0];return n?e[n].then(s=>(n==="json"&&(s=JSON.stringify(s)),new Response(s)[t]())):e[t]=o[t]()});this.raw=t,this.path=e,m(this,A,o),m(this,at,{})}param(t){return t?b(this,H,re).call(this,t):b(this,H,ne).call(this)}query(t){return je(this.url,t)}queries(t){return Le(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((o,r)=>{e[r]=o}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await ye(this,t))}json(){return i(this,U).call(this,"text").then(t=>JSON.parse(t))}text(){return i(this,U).call(this,"text")}arrayBuffer(){return i(this,U).call(this,"arrayBuffer")}blob(){return i(this,U).call(this,"blob")}formData(){return i(this,U).call(this,"formData")}addValidatedData(t,e){i(this,at)[t]=e}valid(t){return i(this,at)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[xe](){return i(this,A)}get matchedRoutes(){return i(this,A)[0].map(([[,t]])=>t)}get routePath(){return i(this,A)[0].map(([[,t]])=>t)[this.routeIndex].path}},at=new WeakMap,A=new WeakMap,H=new WeakSet,re=function(t){const e=i(this,A)[0][this.routeIndex][1][t],o=b(this,H,qt).call(this,e);return o&&/\%/.test(o)?Ut(o):o},ne=function(){const t={},e=Object.keys(i(this,A)[0][this.routeIndex][1]);for(const o of e){const r=b(this,H,qt).call(this,i(this,A)[0][this.routeIndex][1][o]);r!==void 0&&(t[o]=/\%/.test(r)?Ut(r):r)}return t},qt=function(t){return i(this,A)[1]?i(this,A)[1][t]:t},U=new WeakMap,Vt),Be={Stringify:1},se=async(t,e,o,r,n)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const s=t.callbacks;return s!=null&&s.length?(n?n[0]+=t:n=[t],Promise.all(s.map(d=>d({phase:e,buffer:n,context:r}))).then(d=>Promise.all(d.filter(Boolean).map(c=>se(c,e,!1,r,n))).then(()=>n[0]))):Promise.resolve(t)},$e="text/plain; charset=UTF-8",Tt=(t,e)=>({"Content-Type":t,...e}),bt,xt,O,it,T,R,yt,ct,lt,Y,vt,wt,M,nt,Wt,Oe=(Wt=class{constructor(t,e){f(this,M);f(this,bt);f(this,xt);h(this,"env",{});f(this,O);h(this,"finalized",!1);h(this,"error");f(this,it);f(this,T);f(this,R);f(this,yt);f(this,ct);f(this,lt);f(this,Y);f(this,vt);f(this,wt);h(this,"render",(...t)=>(i(this,ct)??m(this,ct,e=>this.html(e)),i(this,ct).call(this,...t)));h(this,"setLayout",t=>m(this,yt,t));h(this,"getLayout",()=>i(this,yt));h(this,"setRenderer",t=>{m(this,ct,t)});h(this,"header",(t,e,o)=>{this.finalized&&m(this,R,new Response(i(this,R).body,i(this,R)));const r=i(this,R)?i(this,R).headers:i(this,Y)??m(this,Y,new Headers);e===void 0?r.delete(t):o!=null&&o.append?r.append(t,e):r.set(t,e)});h(this,"status",t=>{m(this,it,t)});h(this,"set",(t,e)=>{i(this,O)??m(this,O,new Map),i(this,O).set(t,e)});h(this,"get",t=>i(this,O)?i(this,O).get(t):void 0);h(this,"newResponse",(...t)=>b(this,M,nt).call(this,...t));h(this,"body",(t,e,o)=>b(this,M,nt).call(this,t,e,o));h(this,"text",(t,e,o)=>!i(this,Y)&&!i(this,it)&&!e&&!o&&!this.finalized?new Response(t):b(this,M,nt).call(this,t,e,Tt($e,o)));h(this,"json",(t,e,o)=>b(this,M,nt).call(this,JSON.stringify(t),e,Tt("application/json",o)));h(this,"html",(t,e,o)=>{const r=n=>b(this,M,nt).call(this,n,e,Tt("text/html; charset=UTF-8",o));return typeof t=="object"?se(t,Be.Stringify,!1,{}).then(r):r(t)});h(this,"redirect",(t,e)=>{const o=String(t);return this.header("Location",/[^\x00-\xFF]/.test(o)?encodeURI(o):o),this.newResponse(null,e??302)});h(this,"notFound",()=>(i(this,lt)??m(this,lt,()=>new Response),i(this,lt).call(this,this)));m(this,bt,t),e&&(m(this,T,e.executionCtx),this.env=e.env,m(this,lt,e.notFoundHandler),m(this,wt,e.path),m(this,vt,e.matchResult))}get req(){return i(this,xt)??m(this,xt,new oe(i(this,bt),i(this,wt),i(this,vt))),i(this,xt)}get event(){if(i(this,T)&&"respondWith"in i(this,T))return i(this,T);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,T))return i(this,T);throw Error("This context has no ExecutionContext")}get res(){return i(this,R)||m(this,R,new Response(null,{headers:i(this,Y)??m(this,Y,new Headers)}))}set res(t){if(i(this,R)&&t){t=new Response(t.body,t);for(const[e,o]of i(this,R).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=i(this,R).headers.getSetCookie();t.headers.delete("set-cookie");for(const n of r)t.headers.append("set-cookie",n)}else t.headers.set(e,o)}m(this,R,t),this.finalized=!0}get var(){return i(this,O)?Object.fromEntries(i(this,O)):{}}},bt=new WeakMap,xt=new WeakMap,O=new WeakMap,it=new WeakMap,T=new WeakMap,R=new WeakMap,yt=new WeakMap,ct=new WeakMap,lt=new WeakMap,Y=new WeakMap,vt=new WeakMap,wt=new WeakMap,M=new WeakSet,nt=function(t,e,o){const r=i(this,R)?new Headers(i(this,R).headers):i(this,Y)??new Headers;if(typeof e=="object"&&"headers"in e){const s=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,d]of s)a.toLowerCase()==="set-cookie"?r.append(a,d):r.set(a,d)}if(o)for(const[s,a]of Object.entries(o))if(typeof a=="string")r.set(s,a);else{r.delete(s);for(const d of a)r.append(s,d)}const n=typeof e=="number"?e:(e==null?void 0:e.status)??i(this,it);return new Response(t,{status:n,headers:r})},Wt),w="ALL",Te="all",qe=["get","post","put","delete","options","patch"],ae="Can not add a route since the matcher is already built.",ie=class extends Error{},Se="__COMPOSED_HANDLER",He=t=>t.text("404 Not Found",404),Mt=(t,e)=>{if("getResponse"in t){const o=t.getResponse();return e.newResponse(o.body,o)}return console.error(t),e.text("Internal Server Error",500)},k,E,ce,j,G,Rt,Pt,dt,De=(dt=class{constructor(e={}){f(this,E);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");f(this,k,"/");h(this,"routes",[]);f(this,j,He);h(this,"errorHandler",Mt);h(this,"onError",e=>(this.errorHandler=e,this));h(this,"notFound",e=>(m(this,j,e),this));h(this,"fetch",(e,...o)=>b(this,E,Pt).call(this,e,o[1],o[0],e.method));h(this,"request",(e,o,r,n)=>e instanceof Request?this.fetch(o?new Request(e,o):e,r,n):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${rt("/",e)}`,o),r,n)));h(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(b(this,E,Pt).call(this,e.request,e,void 0,e.request.method))})});[...qe,Te].forEach(s=>{this[s]=(a,...d)=>(typeof a=="string"?m(this,k,a):b(this,E,G).call(this,s,i(this,k),a),d.forEach(c=>{b(this,E,G).call(this,s,i(this,k),c)}),this)}),this.on=(s,a,...d)=>{for(const c of[a].flat()){m(this,k,c);for(const l of[s].flat())d.map(u=>{b(this,E,G).call(this,l.toUpperCase(),i(this,k),u)})}return this},this.use=(s,...a)=>(typeof s=="string"?m(this,k,s):(m(this,k,"*"),a.unshift(s)),a.forEach(d=>{b(this,E,G).call(this,w,i(this,k),d)}),this);const{strict:r,...n}=e;Object.assign(this,n),this.getPath=r??!0?e.getPath??Jt:ke}route(e,o){const r=this.basePath(e);return o.routes.map(n=>{var a;let s;o.errorHandler===Mt?s=n.handler:(s=async(d,c)=>(await Nt([],o.errorHandler)(d,()=>n.handler(d,c))).res,s[Se]=n.handler),b(a=r,E,G).call(a,n.method,n.path,s)}),this}basePath(e){const o=b(this,E,ce).call(this);return o._basePath=rt(this._basePath,e),o}mount(e,o,r){let n,s;r&&(typeof r=="function"?s=r:(s=r.optionHandler,r.replaceRequest===!1?n=c=>c:n=r.replaceRequest));const a=s?c=>{const l=s(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};n||(n=(()=>{const c=rt(this._basePath,e),l=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,u)}})());const d=async(c,l)=>{const u=await o(n(c.req.raw),...a(c));if(u)return u;await l()};return b(this,E,G).call(this,w,rt(e,"*"),d),this}},k=new WeakMap,E=new WeakSet,ce=function(){const e=new dt({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,m(e,j,i(this,j)),e.routes=this.routes,e},j=new WeakMap,G=function(e,o,r){e=e.toUpperCase(),o=rt(this._basePath,o);const n={basePath:this._basePath,path:o,method:e,handler:r};this.router.add(e,o,[r,n]),this.routes.push(n)},Rt=function(e,o){if(e instanceof Error)return this.errorHandler(e,o);throw e},Pt=function(e,o,r,n){if(n==="HEAD")return(async()=>new Response(null,await b(this,E,Pt).call(this,e,o,r,"GET")))();const s=this.getPath(e,{env:r}),a=this.router.match(n,s),d=new Oe(e,{path:s,matchResult:a,env:r,executionCtx:o,notFoundHandler:i(this,j)});if(a[0].length===1){let l;try{l=a[0][0][0][0](d,async()=>{d.res=await i(this,j).call(this,d)})}catch(u){return b(this,E,Rt).call(this,u,d)}return l instanceof Promise?l.then(u=>u||(d.finalized?d.res:i(this,j).call(this,d))).catch(u=>b(this,E,Rt).call(this,u,d)):l??i(this,j).call(this,d)}const c=Nt(a[0],this.errorHandler,i(this,j));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return b(this,E,Rt).call(this,l,d)}})()},dt),le=[];function Fe(t,e){const o=this.buildAllMatchers(),r=((n,s)=>{const a=o[n]||o[w],d=a[2][s];if(d)return d;const c=s.match(a[0]);if(!c)return[[],le];const l=c.indexOf("",1);return[a[1][l],c]});return this.match=r,r(t,e)}var kt="[^/]+",ft=".*",gt="(?:|/.*)",st=Symbol(),Ne=new Set(".\\+*[^]$()");function Ue(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===ft||t===gt?1:e===ft||e===gt?-1:t===kt?1:e===kt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var X,J,L,et,Me=(et=class{constructor(){f(this,X);f(this,J);f(this,L,Object.create(null))}insert(e,o,r,n,s){if(e.length===0){if(i(this,X)!==void 0)throw st;if(s)return;m(this,X,o);return}const[a,...d]=e,c=a==="*"?d.length===0?["","",ft]:["","",kt]:a==="/*"?["","",gt]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let p=c[2]||kt;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw st;if(l=i(this,L)[p],!l){if(Object.keys(i(this,L)).some(g=>g!==ft&&g!==gt))throw st;if(s)return;l=i(this,L)[p]=new et,u!==""&&m(l,J,n.varIndex++)}!s&&u!==""&&r.push([u,i(l,J)])}else if(l=i(this,L)[a],!l){if(Object.keys(i(this,L)).some(u=>u.length>1&&u!==ft&&u!==gt))throw st;if(s)return;l=i(this,L)[a]=new et}l.insert(d,o,r,n,s)}buildRegExpStr(){const o=Object.keys(i(this,L)).sort(Ue).map(r=>{const n=i(this,L)[r];return(typeof i(n,J)=="number"?`(${r})@${i(n,J)}`:Ne.has(r)?`\\${r}`:r)+n.buildRegExpStr()});return typeof i(this,X)=="number"&&o.unshift(`#${i(this,X)}`),o.length===0?"":o.length===1?o[0]:"(?:"+o.join("|")+")"}},X=new WeakMap,J=new WeakMap,L=new WeakMap,et),jt,Et,Qt,ze=(Qt=class{constructor(){f(this,jt,{varIndex:0});f(this,Et,new Me)}insert(t,e,o){const r=[],n=[];for(let a=0;;){let d=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${a}`;return n[a]=[l,c],a++,d=!0,l}),!d)break}const s=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=n.length-1;a>=0;a--){const[d]=n[a];for(let c=s.length-1;c>=0;c--)if(s[c].indexOf(d)!==-1){s[c]=s[c].replace(d,n[a][1]);break}}return i(this,Et).insert(s,e,r,i(this,jt),o),r}buildRegExp(){let t=i(this,Et).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const o=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,s,a)=>s!==void 0?(o[++e]=Number(s),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),o,r]}},jt=new WeakMap,Et=new WeakMap,Qt),Ve=[/^$/,[],Object.create(null)],At=Object.create(null);function de(t){return At[t]??(At[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,o)=>o?`\\${o}`:"(?:|/.*)")}$`))}function We(){At=Object.create(null)}function Qe(t){var l;const e=new ze,o=[];if(t.length===0)return Ve;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,y])=>u?1:g?-1:p.length-y.length),n=Object.create(null);for(let u=0,p=-1,g=r.length;u<g;u++){const[y,P,D]=r[u];y?n[P]=[D.map(([_])=>[_,Object.create(null)]),le]:p++;let x;try{x=e.insert(P,p,y)}catch(_){throw _===st?new ie(P):_}y||(o[p]=D.map(([_,F])=>{const It=Object.create(null);for(F-=1;F>=0;F--){const[Ct,B]=x[F];It[Ct]=B}return[_,It]}))}const[s,a,d]=e.buildRegExp();for(let u=0,p=o.length;u<p;u++)for(let g=0,y=o[u].length;g<y;g++){const P=(l=o[u][g])==null?void 0:l[1];if(!P)continue;const D=Object.keys(P);for(let x=0,_=D.length;x<_;x++)P[D[x]]=d[P[D[x]]]}const c=[];for(const u in a)c[u]=o[a[u]];return[s,c,n]}function ot(t,e){if(t){for(const o of Object.keys(t).sort((r,n)=>n.length-r.length))if(de(o).test(e))return[...t[o]]}}var z,V,Lt,ue,Gt,Ge=(Gt=class{constructor(){f(this,Lt);h(this,"name","RegExpRouter");f(this,z);f(this,V);h(this,"match",Fe);m(this,z,{[w]:Object.create(null)}),m(this,V,{[w]:Object.create(null)})}add(t,e,o){var d;const r=i(this,z),n=i(this,V);if(!r||!n)throw new Error(ae);r[t]||[r,n].forEach(c=>{c[t]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[t][l]=[...c[w][l]]})}),e==="/*"&&(e="*");const s=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=de(e);t===w?Object.keys(r).forEach(l=>{var u;(u=r[l])[e]||(u[e]=ot(r[l],e)||ot(r[w],e)||[])}):(d=r[t])[e]||(d[e]=ot(r[t],e)||ot(r[w],e)||[]),Object.keys(r).forEach(l=>{(t===w||t===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([o,s])})}),Object.keys(n).forEach(l=>{(t===w||t===l)&&Object.keys(n[l]).forEach(u=>c.test(u)&&n[l][u].push([o,s]))});return}const a=Zt(e)||[e];for(let c=0,l=a.length;c<l;c++){const u=a[c];Object.keys(n).forEach(p=>{var g;(t===w||t===p)&&((g=n[p])[u]||(g[u]=[...ot(r[p],u)||ot(r[w],u)||[]]),n[p][u].push([o,s-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(i(this,V)).concat(Object.keys(i(this,z))).forEach(e=>{t[e]||(t[e]=b(this,Lt,ue).call(this,e))}),m(this,z,m(this,V,void 0)),We(),t}},z=new WeakMap,V=new WeakMap,Lt=new WeakSet,ue=function(t){const e=[];let o=t===w;return[i(this,z),i(this,V)].forEach(r=>{const n=r[t]?Object.keys(r[t]).map(s=>[s,r[t][s]]):[];n.length!==0?(o||(o=!0),e.push(...n)):t!==w&&e.push(...Object.keys(r[w]).map(s=>[s,r[w][s]]))}),o?Qe(e):null},Gt),W,q,Kt,Ke=(Kt=class{constructor(t){h(this,"name","SmartRouter");f(this,W,[]);f(this,q,[]);m(this,W,t.routers)}add(t,e,o){if(!i(this,q))throw new Error(ae);i(this,q).push([t,e,o])}match(t,e){if(!i(this,q))throw new Error("Fatal error");const o=i(this,W),r=i(this,q),n=o.length;let s=0,a;for(;s<n;s++){const d=o[s];try{for(let c=0,l=r.length;c<l;c++)d.add(...r[c]);a=d.match(t,e)}catch(c){if(c instanceof ie)continue;throw c}this.match=d.match.bind(d),m(this,W,[d]),m(this,q,void 0);break}if(s===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(i(this,q)||i(this,W).length!==1)throw new Error("No active router has been determined yet.");return i(this,W)[0]}},W=new WeakMap,q=new WeakMap,Kt),ht=Object.create(null),Q,C,Z,ut,I,S,K,pt,Ye=(pt=class{constructor(e,o,r){f(this,S);f(this,Q);f(this,C);f(this,Z);f(this,ut,0);f(this,I,ht);if(m(this,C,r||Object.create(null)),m(this,Q,[]),e&&o){const n=Object.create(null);n[e]={handler:o,possibleKeys:[],score:0},m(this,Q,[n])}m(this,Z,[])}insert(e,o,r){m(this,ut,++Ft(this,ut)._);let n=this;const s=Ce(o),a=[];for(let d=0,c=s.length;d<c;d++){const l=s[d],u=s[d+1],p=Pe(l,u),g=Array.isArray(p)?p[0]:l;if(g in i(n,C)){n=i(n,C)[g],p&&a.push(p[1]);continue}i(n,C)[g]=new pt,p&&(i(n,Z).push(p),a.push(p[1])),n=i(n,C)[g]}return i(n,Q).push({[e]:{handler:r,possibleKeys:a.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,ut)}}),n}search(e,o){var c;const r=[];m(this,I,ht);let s=[this];const a=Xt(o),d=[];for(let l=0,u=a.length;l<u;l++){const p=a[l],g=l===u-1,y=[];for(let P=0,D=s.length;P<D;P++){const x=s[P],_=i(x,C)[p];_&&(m(_,I,i(x,I)),g?(i(_,C)["*"]&&r.push(...b(this,S,K).call(this,i(_,C)["*"],e,i(x,I))),r.push(...b(this,S,K).call(this,_,e,i(x,I)))):y.push(_));for(let F=0,It=i(x,Z).length;F<It;F++){const Ct=i(x,Z)[F],B=i(x,I)===ht?{}:{...i(x,I)};if(Ct==="*"){const N=i(x,C)["*"];N&&(r.push(...b(this,S,K).call(this,N,e,i(x,I))),m(N,I,B),y.push(N));continue}const[he,Ht,mt]=Ct;if(!p&&!(mt instanceof RegExp))continue;const $=i(x,C)[he],fe=a.slice(l).join("/");if(mt instanceof RegExp){const N=mt.exec(fe);if(N){if(B[Ht]=N[0],r.push(...b(this,S,K).call(this,$,e,i(x,I),B)),Object.keys(i($,C)).length){m($,I,B);const Bt=((c=N[0].match(/\//))==null?void 0:c.length)??0;(d[Bt]||(d[Bt]=[])).push($)}continue}}(mt===!0||mt.test(p))&&(B[Ht]=p,g?(r.push(...b(this,S,K).call(this,$,e,B,i(x,I))),i($,C)["*"]&&r.push(...b(this,S,K).call(this,i($,C)["*"],e,B,i(x,I)))):(m($,I,B),y.push($)))}}s=y.concat(d.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},Q=new WeakMap,C=new WeakMap,Z=new WeakMap,ut=new WeakMap,I=new WeakMap,S=new WeakSet,K=function(e,o,r,n){const s=[];for(let a=0,d=i(e,Q).length;a<d;a++){const c=i(e,Q)[a],l=c[o]||c[w],u={};if(l!==void 0&&(l.params=Object.create(null),s.push(l),r!==ht||n&&n!==ht))for(let p=0,g=l.possibleKeys.length;p<g;p++){const y=l.possibleKeys[p],P=u[l.score];l.params[y]=n!=null&&n[y]&&!P?n[y]:r[y]??(n==null?void 0:n[y]),u[l.score]=!0}}return s},pt),tt,Yt,Xe=(Yt=class{constructor(){h(this,"name","TrieRouter");f(this,tt);m(this,tt,new Ye)}add(t,e,o){const r=Zt(e);if(r){for(let n=0,s=r.length;n<s;n++)i(this,tt).insert(t,r[n],o);return}i(this,tt).insert(t,e,o)}match(t,e){return i(this,tt).search(t,e)}},tt=new WeakMap,Yt),pe=class extends De{constructor(t={}){super(t),this.router=t.router??new Ke({routers:[new Ge,new Xe]})}},Je=t=>{const o={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(s=>typeof s=="string"?s==="*"?()=>s:a=>s===a?a:null:typeof s=="function"?s:a=>s.includes(a)?a:null)(o.origin),n=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(o.allowMethods);return async function(a,d){var u;function c(p,g){a.res.headers.set(p,g)}const l=await r(a.req.header("origin")||"",a);if(l&&c("Access-Control-Allow-Origin",l),o.credentials&&c("Access-Control-Allow-Credentials","true"),(u=o.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",o.exposeHeaders.join(",")),a.req.method==="OPTIONS"){o.origin!=="*"&&c("Vary","Origin"),o.maxAge!=null&&c("Access-Control-Max-Age",o.maxAge.toString());const p=await n(a.req.header("origin")||"",a);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=o.allowHeaders;if(!(g!=null&&g.length)){const y=a.req.header("Access-Control-Request-Headers");y&&(g=y.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await d(),o.origin!=="*"&&a.header("Vary","Origin",{append:!0})}};const v=new pe;v.use("/api/*",Je());v.post("/api/auth/verify",async t=>{const{password:e}=await t.req.json();return t.json({success:e==="123"})});v.get("/api/products",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM products ORDER BY id DESC").all();return t.json(o)});v.get("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM products WHERE id = ?").bind(o).all();return t.json(r[0]||null)});v.post("/api/products",async t=>{const{DB:e}=t.env,{name:o,price:r,brand:n,stock_quantity:s,image_url:a,cold_quantity:d,hot_quantity:c,unit_type:l}=await t.req.json(),u=await e.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(o,r,n,s||0,a||null,d||0,c||0,l||"Unidade").run();return t.json({id:u.meta.last_row_id,success:!0})});v.put("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,price:n,brand:s,stock_quantity:a,image_url:d,cold_quantity:c,hot_quantity:l,unit_type:u}=await t.req.json();return await e.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ?, cold_quantity = ?, hot_quantity = ?, unit_type = ? WHERE id = ?").bind(r,n,s,a,d,c,l,u,o).run(),t.json({success:!0})});v.delete("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM products WHERE id = ?").bind(o).run(),t.json({success:!0})});v.get("/api/customers",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM customers ORDER BY name").all();return t.json(o)});v.get("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM customers WHERE id = ?").bind(o).all();return t.json(r[0]||null)});v.post("/api/customers",async t=>{const{DB:e}=t.env,{name:o,address:r,neighborhood:n,zip_code:s,city:a,phone:d}=await t.req.json(),c=await e.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(o,r,n,s,a,d).run();return t.json({id:c.meta.last_row_id,success:!0})});v.put("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,address:n,neighborhood:s,zip_code:a,city:d,phone:c}=await t.req.json();return await e.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(r,n,s,a,d,c,o).run(),t.json({success:!0})});v.delete("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM customers WHERE id = ?").bind(o).run(),t.json({success:!0})});v.post("/api/orders",async t=>{const{DB:e}=t.env,{customer_id:o,items:r,payment_method:n,total_amount:s}=await t.req.json(),d=(await e.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(o,s,n).run()).meta.last_row_id;for(const c of r)await e.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(d,c.product_id,c.quantity,c.unit_price,c.total_price).run();return t.json({id:d,success:!0})});v.get("/api/orders/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(o).all();if(!r.length)return t.json(null);const n=r[0],{results:s}=await e.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(o).all();return t.json({...n,items:s})});v.get("/api/settings/logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return t.json({logo_url:((r=o[0])==null?void 0:r.value)||null})});v.post("/api/settings/logo",async t=>{const{DB:e}=t.env,{logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});v.get("/api/settings/footer-logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all();return t.json({footer_logo_url:((r=o[0])==null?void 0:r.value)||null})});v.post("/api/settings/footer-logo",async t=>{const{DB:e}=t.env,{footer_logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});v.post("/api/upload",async t=>{try{const{image:e,filename:o}=await t.req.json(),r=e.split(",")[1]||e,n=atob(r),s=new Uint8Array(n.length);for(let c=0;c<n.length;c++)s[c]=n.charCodeAt(c);const a=`${Date.now()}-${o}`,d=e;return t.json({success:!0,url:d})}catch(e){return console.error("Upload error:",e),t.json({success:!1,error:"Upload failed"},500)}});v.get("/",t=>t.html(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>TopBeer Distribuidora de Bebidas</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            min-height: 100vh;
            color: #fff;
        }
        .btn-red { 
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); 
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);
        }
        .btn-red:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(220, 38, 38, 0.4);
        }
        .btn-yellow { 
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); 
            color: #000;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3);
        }
        .btn-yellow:hover { 
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(251, 191, 36, 0.4);
        }
        .btn-black { 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-black:hover { 
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .product-card {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
            cursor: pointer;
        }
        .product-card:hover {
            transform: translateY(-5px);
            border-color: #dc2626;
            box-shadow: 0 8px 16px rgba(220, 38, 38, 0.3);
        }
        .input-field {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px;
            border-radius: 8px;
            width: 100%;
            margin-bottom: 10px;
        }
        .input-field::placeholder { color: rgba(255, 255, 255, 0.5); }
        .input-field:focus {
            outline: none;
            border-color: #dc2626;
            background: rgba(255, 255, 255, 0.15);
        }
        .banner {
            width: 100%;
            height: 250px;
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #fbbf24 100%);
            border-radius: 12px;
            position: relative;
            overflow: visible;
            margin-bottom: 120px;
        }
        .logo-container {
            position: absolute;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            border-radius: 12px;
            background: white;
            padding: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid #dc2626;
            z-index: 10;
        }
        .logo-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .quantity-control {
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }
        .quantity-btn {
            background: #dc2626;
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        .quantity-btn:hover {
            background: #991b1b;
            transform: scale(1.1);
        }
        .hidden { display: none !important; }
        .cart-badge {
            background: #dc2626;
            color: white;
            border-radius: 50%;
            padding: 2px 8px;
            font-size: 12px;
            position: absolute;
            top: -8px;
            right: -8px;
        }
        .footer {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            text-align: center;
            margin-top: 40px;
            border-top: 2px solid #dc2626;
        }
        .footer-logo {
            width: 60px;
            height: 40px;
            object-fit: contain;
            margin: 10px auto;
            display: block;
        }
        select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 12px;
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
        }
        select option {
            background: #1a1a1a;
            color: white;
        }
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        .modal-content {
            background: #1a1a1a;
            border: 2px solid #dc2626;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .tab-button {
            padding: 12px 24px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 8px 8px 0 0;
            margin-right: 5px;
        }
        .tab-button.active {
            background: #dc2626;
        }
        
        /* RESPONSIVIDADE MOBILE */
        @media (max-width: 640px) {
            body { font-size: 14px; }
            .container { padding: 12px !important; }
            .btn-red, .btn-yellow, .btn-black { padding: 10px 16px; font-size: 14px; }
            .card { padding: 15px; }
            .banner { height: 200px; margin-bottom: 100px; }
            .logo-container { width: 150px; height: 150px; bottom: -75px; }
            h1, h2 { font-size: 1.5rem !important; }
            h3 { font-size: 1.25rem !important; }
            .input-field { font-size: 16px; /* Evita zoom no iOS */ }
            .product-card { padding: 12px; }
            .quantity-btn { width: 32px; height: 32px; font-size: 18px; }
            .modal-content { padding: 20px; }
            .grid.grid-cols-2 { gap: 12px; }
        }
        
        @media (max-width: 480px) {
            .banner { height: 180px; margin-bottom: 80px; }
            .logo-container { width: 120px; height: 120px; bottom: -60px; }
            .footer { padding: 15px; font-size: 13px; }
        }
    </style>
</head>
<body>
    <div id="app" class="container mx-auto px-4 py-6 max-w-md">
        <!-- TELA INICIAL -->
        <div id="home-screen">
            <div class="banner">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 1;">
                    <h1 class="text-3xl font-bold text-white drop-shadow-lg">TopBeer</h1>
                    <p class="text-white text-lg drop-shadow-lg">Distribuidora de Bebidas</p>
                </div>
                <div class="logo-container" id="logoContainer">
                    <img id="logoImage" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' dy='.3em' fill='%23dc2626'%3E🍺%3C/text%3E%3C/svg%3E" alt="Logo">
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mt-4">
                <button onclick="showCatalog()" class="btn-red py-4 text-lg">
                    <i class="fas fa-book mr-2"></i> Catálogo
                </button>
                <button onclick="showCart()" class="btn-yellow py-4 text-lg relative">
                    <i class="fas fa-shopping-cart mr-2"></i> Carrinho
                    <span id="cartBadge" class="cart-badge hidden">0</span>
                </button>
                <button onclick="showAdminLogin()" class="btn-black py-4 text-lg">
                    <i class="fas fa-cog mr-2"></i> Admin
                </button>
                <button onclick="showCustomerForm()" class="btn-red py-4 text-lg">
                    <i class="fas fa-users mr-2"></i> Clientes
                </button>
            </div>
        </div>

        <!-- OUTRAS TELAS SERÃO CARREGADAS AQUI DINAMICAMENTE -->
        <div id="dynamic-content"></div>
    </div>

    <div class="footer">
        <img id="footerLogoImage" class="footer-logo" style="display: none;" alt="Logo Rodapé">
        <p class="text-yellow-400 font-bold text-lg">Vsual Consultoria em Marketing</p>
        <p class="text-white mt-2">18 99667-6409</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script>
        // Estado global
        let cart = [];
        let products = [];
        let customers = [];
        let isAdmin = false;
        let currentProduct = null;
        let currentCustomer = null;
        let logoUrl = null;
        let footerLogoUrl = null;

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes, footerLogoRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo'),
                    axios.get('/api/settings/footer-logo')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                footerLogoUrl = footerLogoRes.data.footer_logo_url;
                
                if (logoUrl) {
                    document.getElementById('logoImage').src = logoUrl;
                }
                
                if (footerLogoUrl) {
                    const footerImg = document.getElementById('footerLogoImage');
                    footerImg.src = footerLogoUrl;
                    footerImg.style.display = 'block';
                }
                
                updateCartBadge();
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        }

        // Atualizar badge do carrinho
        function updateCartBadge() {
            const badge = document.getElementById('cartBadge');
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            if (total > 0) {
                badge.textContent = total;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // Navegação
        function showHome() {
            document.getElementById('home-screen').classList.remove('hidden');
            document.getElementById('dynamic-content').innerHTML = '';
        }

        function hideHome() {
            document.getElementById('home-screen').classList.add('hidden');
        }

        // Mostrar catálogo
        async function showCatalog() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Catálogo de Produtos</h2>
                    <div class="grid grid-cols-2 gap-4" id="productList">
                        \${products.map(p => \`
                            <div class="product-card">
                                <div style="width: 100%; height: 120px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; overflow: hidden;">
                                    \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-4xl text-yellow-400"></i>'}
                                </div>
                                <h3 class="font-bold text-sm mb-1">\${p.name}</h3>
                                <p class="text-xs text-gray-400 mb-1">\${p.brand}</p>
                                <p class="text-yellow-400 font-bold mb-2">R$ \${parseFloat(p.price).toFixed(2)}</p>
                                <div class="quantity-control mb-2">
                                    <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, -1)">-</button>
                                    <span class="font-bold text-lg" id="qty-\${p.id}">0</span>
                                    <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, 1)">+</button>
                                </div>
                                <button onclick="buyProduct(\${p.id})" class="btn-red w-full" style="padding: 8px 12px; font-size: 14px;">
                                    <i class="fas fa-shopping-cart mr-1"></i> Comprar
                                </button>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
            
            // Atualizar quantidades exibidas
            cart.forEach(item => {
                const qtyEl = document.getElementById(\`qty-\${item.product_id}\`);
                if (qtyEl) qtyEl.textContent = item.quantity;
            });
        }

        // Adicionar ao carrinho com quantidade do catálogo
        function addToCartWithQuantity(productId, change) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                existingItem.quantity += change;
                if (existingItem.quantity <= 0) {
                    cart = cart.filter(item => item.product_id !== productId);
                } else {
                    existingItem.total_price = existingItem.quantity * existingItem.unit_price;
                }
            } else if (change > 0) {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: 1,
                    total_price: parseFloat(product.price),
                    image_url: product.image_url
                });
            }
            
            updateCartBadge();
            
            // Atualizar quantidade exibida
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const itemInCart = cart.find(item => item.product_id === productId);
            if (qtyEl) {
                qtyEl.textContent = itemInCart ? itemInCart.quantity : 0;
            }
        }

        // Comprar produto - adiciona ao carrinho e vai para checkout
        function buyProduct(productId) {
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const currentQty = qtyEl ? parseInt(qtyEl.textContent) : 0;
            
            if (currentQty === 0) {
                alert('Por favor, selecione a quantidade usando as setas + e -');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                // Já está no carrinho com a quantidade selecionada
                showCart();
            } else {
                // Adicionar ao carrinho se não existir (não deveria acontecer, mas por garantia)
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: currentQty,
                    total_price: parseFloat(product.price) * currentQty,
                    image_url: product.image_url
                });
                updateCartBadge();
                showCart();
            }
        }

        // Adicionar ao carrinho
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = cart.find(item => item.product_id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
                existingItem.total_price = existingItem.quantity * existingItem.unit_price;
            } else {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(product.price),
                    quantity: 1,
                    total_price: parseFloat(product.price),
                    image_url: product.image_url
                });
            }
            
            updateCartBadge();
            alert('Produto adicionado ao carrinho!');
        }

        // Mostrar carrinho
        async function showCart() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const total = cart.reduce((sum, item) => sum + item.total_price, 0);
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Carrinho de Compras</h2>
                    
                    \${cart.length === 0 ? '<p class="text-center text-gray-400">Carrinho vazio</p>' : \`
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-bold">Selecione o Cliente:</label>
                            <select id="customerSelect" class="input-field">
                                <option value="">-- Selecione um cliente --</option>
                                \${customers.map(c => \`<option value="\${c.id}">\${c.name}</option>\`).join('')}
                            </select>
                            <button onclick="showCustomerFormInCart()" class="btn-yellow w-full mt-2">
                                <i class="fas fa-plus mr-2"></i> Novo Cliente
                            </button>
                        </div>
                        
                        <div class="space-y-4 mb-6">
                            \${cart.map((item, index) => \`
                                <div class="card">
                                    <div class="flex gap-3">
                                        <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                                            \${item.image_url ? \`<img src="\${item.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-2xl text-yellow-400"></i>'}
                                        </div>
                                        <div class="flex-1">
                                            <h3 class="font-bold">\${item.product_name}</h3>
                                            <p class="text-sm text-gray-400">\${item.brand}</p>
                                            <p class="text-yellow-400 font-bold">R$ \${item.unit_price.toFixed(2)}</p>
                                            <div class="quantity-control mt-2">
                                                <button class="quantity-btn" onclick="updateCartQuantity(\${index}, -1)">-</button>
                                                <span class="font-bold text-lg">\${item.quantity}</span>
                                                <button class="quantity-btn" onclick="updateCartQuantity(\${index}, 1)">+</button>
                                                <button class="btn-black ml-2" onclick="removeFromCart(\${index})" style="padding: 8px 12px;">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <p class="text-right mt-2 font-bold">Total: R$ \${item.total_price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            \`).join('')}
                        </div>
                        
                        <div class="card bg-red-900 bg-opacity-30">
                            <h3 class="text-2xl font-bold text-center text-yellow-400">Total: R$ \${total.toFixed(2)}</h3>
                        </div>
                        
                        <div class="mt-6">
                            <label class="block mb-2 text-sm font-bold">Forma de Pagamento:</label>
                            <select id="paymentMethod" class="input-field">
                                <option value="pix">PIX - 123.456.789</option>
                                <option value="cash">À Vista</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mt-6">
                            <button onclick="showCatalog()" class="btn-yellow py-4 text-lg">
                                <i class="fas fa-shopping-basket mr-2"></i> Continuar Comprando
                            </button>
                            <button onclick="finishOrder()" class="btn-red py-4 text-lg">
                                <i class="fas fa-check mr-2"></i> Finalizar Pedido
                            </button>
                        </div>
                    \`}
                </div>
            \`;
            content.innerHTML = html;
        }

        // Atualizar quantidade no carrinho
        function updateCartQuantity(index, change) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            } else {
                cart[index].total_price = cart[index].quantity * cart[index].unit_price;
            }
            updateCartBadge();
            showCart();
        }

        // Remover do carrinho
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartBadge();
            showCart();
        }

        // Finalizar pedido
        async function finishOrder() {
            const customerSelect = document.getElementById('customerSelect');
            const paymentMethod = document.getElementById('paymentMethod').value;
            
            if (!customerSelect.value) {
                alert('Por favor, selecione um cliente!');
                return;
            }
            
            const customer = customers.find(c => c.id == customerSelect.value);
            const total = cart.reduce((sum, item) => sum + item.total_price, 0);
            
            try {
                // Salvar pedido no banco
                const orderData = {
                    customer_id: customer.id,
                    items: cart.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total_price: item.total_price
                    })),
                    payment_method: paymentMethod === 'pix' ? 'PIX - 123.456.789' : 'À Vista',
                    total_amount: total
                };
                
                await axios.post('/api/orders', orderData);
                
                // Preparar mensagem WhatsApp
                let message = \`*NOVO PEDIDO - TopBeer*\\n\\n\`;
                message += \`*Cliente:* \${customer.name}\\n\`;
                message += \`*Telefone:* \${customer.phone}\\n\`;
                message += \`*Endereço:* \${customer.address}, \${customer.neighborhood}\\n\`;
                message += \`*Cidade:* \${customer.city} - CEP: \${customer.zip_code}\\n\\n\`;
                message += \`*ITENS DO PEDIDO:*\\n\`;
                
                cart.forEach(item => {
                    message += \`\\n• \${item.product_name} (\${item.brand})\\n\`;
                    message += \`  Qtd: \${item.quantity} x R$ \${item.unit_price.toFixed(2)} = R$ \${item.total_price.toFixed(2)}\\n\`;
                });
                
                message += \`\\n*TOTAL: R$ \${total.toFixed(2)}*\\n\`;
                message += \`*Pagamento:* \${paymentMethod === 'pix' ? 'PIX - 123.456.789' : 'À Vista'}\`;
                
                // Enviar para WhatsApp
                const whatsappUrl = \`https://api.whatsapp.com/send/?phone=5518996676409&text=\${encodeURIComponent(message)}\`;
                window.open(whatsappUrl, '_blank');
                
                // Limpar carrinho
                cart = [];
                updateCartBadge();
                
                alert('Pedido enviado com sucesso!');
                showHome();
            } catch (error) {
                console.error('Erro ao finalizar pedido:', error);
                alert('Erro ao finalizar pedido. Tente novamente.');
            }
        }

        // Mostrar formulário de cliente no carrinho
        function showCustomerFormInCart() {
            showCustomerForm(true);
        }

        // Mostrar formulário de cliente
        async function showCustomerForm(fromCart = false) {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="\${fromCart ? 'showCart()' : 'showHome()'}" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Cadastro de Clientes</h2>
                    
                    <div class="card">
                        <input type="text" id="customerName" placeholder="Nome do Cliente" class="input-field">
                        <input type="text" id="customerAddress" placeholder="Endereço" class="input-field">
                        <input type="text" id="customerNeighborhood" placeholder="Bairro" class="input-field">
                        <input type="text" id="customerZipCode" placeholder="CEP" class="input-field">
                        <input type="text" id="customerCity" placeholder="Cidade" class="input-field">
                        <input type="tel" id="customerPhone" placeholder="Telefone" class="input-field">
                        
                        <div class="grid grid-cols-2 gap-2 mt-4">
                            <button onclick="saveCustomer(\${fromCart})" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Gravar
                            </button>
                            <button onclick="clearCustomerForm()" class="btn-black">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mt-6 mb-4 text-yellow-400">Clientes Cadastrados</h3>
                    <div class="space-y-2">
                        \${customers.map(c => \`
                            <div class="card flex justify-between items-center" style="cursor: pointer;" onclick="editCustomer(\${c.id})">
                                <div>
                                    <p class="font-bold">\${c.name}</p>
                                    <p class="text-sm text-gray-400">\${c.phone}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="event.stopPropagation(); editCustomer(\${c.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="event.stopPropagation(); deleteCustomer(\${c.id})" class="btn-red" style="padding: 8px 12px;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar cliente
        async function saveCustomer(returnToCart = false) {
            const name = document.getElementById('customerName').value;
            const address = document.getElementById('customerAddress').value;
            const neighborhood = document.getElementById('customerNeighborhood').value;
            const zip_code = document.getElementById('customerZipCode').value;
            const city = document.getElementById('customerCity').value;
            const phone = document.getElementById('customerPhone').value;
            
            if (!name || !address || !neighborhood || !zip_code || !city || !phone) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            try {
                if (currentCustomer) {
                    await axios.put(\`/api/customers/\${currentCustomer}\`, {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente atualizado com sucesso!');
                } else {
                    await axios.post('/api/customers', {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente cadastrado com sucesso!');
                }
                
                const res = await axios.get('/api/customers');
                customers = res.data;
                currentCustomer = null;
                
                if (returnToCart) {
                    showCart();
                } else {
                    showCustomerForm();
                }
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
                alert('Erro ao salvar cliente. Tente novamente.');
            }
        }

        // Editar cliente
        async function editCustomer(id) {
            const customer = customers.find(c => c.id === id);
            if (!customer) return;
            
            currentCustomer = id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerAddress').value = customer.address;
            document.getElementById('customerNeighborhood').value = customer.neighborhood;
            document.getElementById('customerZipCode').value = customer.zip_code;
            document.getElementById('customerCity').value = customer.city;
            document.getElementById('customerPhone').value = customer.phone;
        }

        // Deletar cliente
        async function deleteCustomer(id) {
            if (!confirm('Deseja realmente excluir este cliente?')) return;
            
            try {
                await axios.delete(\`/api/customers/\${id}\`);
                const res = await axios.get('/api/customers');
                customers = res.data;
                alert('Cliente excluído com sucesso!');
                showCustomerForm();
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente. Tente novamente.');
            }
        }

        // Limpar formulário de cliente
        function clearCustomerForm() {
            currentCustomer = null;
            document.getElementById('customerName').value = '';
            document.getElementById('customerAddress').value = '';
            document.getElementById('customerNeighborhood').value = '';
            document.getElementById('customerZipCode').value = '';
            document.getElementById('customerCity').value = '';
            document.getElementById('customerPhone').value = '';
        }

        // Mostrar login admin
        function showAdminLogin() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Acesso Administrativo</h2>
                    
                    <div class="card">
                        <input type="password" id="adminPassword" placeholder="Digite a senha" class="input-field">
                        <button onclick="verifyAdmin()" class="btn-red w-full mt-4">
                            <i class="fas fa-lock mr-2"></i> Entrar
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Verificar senha admin
        async function verifyAdmin() {
            const password = document.getElementById('adminPassword').value;
            
            try {
                const res = await axios.post('/api/auth/verify', { password });
                if (res.data.success) {
                    isAdmin = true;
                    showAdminPanel();
                } else {
                    alert('Senha incorreta!');
                }
            } catch (error) {
                alert('Senha incorreta!');
            }
        }

        // Mostrar painel admin
        function showAdminPanel() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="logout()" class="btn-black mb-4">
                        <i class="fas fa-sign-out-alt mr-2"></i> Sair
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Painel Administrativo</h2>
                    
                    <div class="space-y-4">
                        <button onclick="showProductForm()" class="btn-red w-full py-4">
                            <i class="fas fa-box mr-2"></i> Gerenciar Produtos
                        </button>
                        <button onclick="showLogoUpload()" class="btn-yellow w-full py-4">
                            <i class="fas fa-image mr-2"></i> Alterar Logo Principal
                        </button>
                        <button onclick="showFooterLogoUpload()" class="btn-yellow w-full py-4">
                            <i class="fas fa-image mr-2"></i> Alterar Logo Rodapé
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Logout admin
        function logout() {
            isAdmin = false;
            showHome();
        }

        // Mostrar upload de logo
        function showLogoUpload() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Alterar Logo</h2>
                    
                    <div class="card">
                        <p class="text-sm mb-4 text-gray-400">Selecione uma imagem 200x200 pixels</p>
                        <input type="file" id="logoInput" accept="image/*" class="input-field">
                        <button onclick="uploadLogo()" class="btn-red w-full mt-4">
                            <i class="fas fa-upload mr-2"></i> Upload Logo
                        </button>
                    </div>
                    
                    <div class="card mt-4 text-center">
                        <p class="mb-4 font-bold">Logo Atual:</p>
                        <div class="logo-container" style="position: relative; margin: 0 auto; bottom: 0;">
                            <img id="currentLogo" src="\${logoUrl || 'data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 200 200\\'%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' font-size=\\'60\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23dc2626\\'%3E🍺%3C/text%3E%3C/svg%3E'}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Upload logo
        async function uploadLogo() {
            const input = document.getElementById('logoInput');
            if (!input.files || !input.files[0]) {
                alert('Por favor, selecione uma imagem!');
                return;
            }
            
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const base64 = e.target.result;
                    const res = await axios.post('/api/upload', {
                        image: base64,
                        filename: file.name
                    });
                    
                    if (res.data.success) {
                        await axios.post('/api/settings/logo', { logo_url: res.data.url });
                        logoUrl = res.data.url;
                        document.getElementById('logoImage').src = logoUrl;
                        alert('Logo atualizado com sucesso!');
                        showLogoUpload();
                    }
                } catch (error) {
                    console.error('Erro ao fazer upload:', error);
                    alert('Erro ao fazer upload do logo.');
                }
            };
            
            reader.readAsDataURL(file);
        }

        // Mostrar upload de logo do rodapé
        function showFooterLogoUpload() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Alterar Logo do Rodapé</h2>
                    
                    <div class="card">
                        <p class="text-sm mb-4 text-gray-400">Selecione uma imagem 60x40 pixels</p>
                        <input type="file" id="footerLogoInput" accept="image/*" class="input-field">
                        <button onclick="uploadFooterLogo()" class="btn-red w-full mt-4">
                            <i class="fas fa-upload mr-2"></i> Upload Logo Rodapé
                        </button>
                    </div>
                    
                    <div class="card mt-4 text-center">
                        <p class="mb-4 font-bold">Logo Rodapé Atual:</p>
                        <img id="currentFooterLogo" src="\${footerLogoUrl || ''}" style="width: 60px; height: 40px; object-fit: contain; margin: 0 auto; \${footerLogoUrl ? '' : 'display: none;'}" alt="Logo Rodapé">
                        \${!footerLogoUrl ? '<p class="text-gray-400">Nenhum logo configurado</p>' : ''}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Upload logo do rodapé
        async function uploadFooterLogo() {
            const input = document.getElementById('footerLogoInput');
            if (!input.files || !input.files[0]) {
                alert('Por favor, selecione uma imagem!');
                return;
            }
            
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = async (e) => {
                try {
                    const base64 = e.target.result;
                    const res = await axios.post('/api/upload', {
                        image: base64,
                        filename: file.name
                    });
                    
                    if (res.data.success) {
                        await axios.post('/api/settings/footer-logo', { footer_logo_url: res.data.url });
                        footerLogoUrl = res.data.url;
                        const footerImg = document.getElementById('footerLogoImage');
                        footerImg.src = footerLogoUrl;
                        footerImg.style.display = 'block';
                        alert('Logo do rodapé atualizado com sucesso!');
                        showFooterLogoUpload();
                    }
                } catch (error) {
                    console.error('Erro ao fazer upload:', error);
                    alert('Erro ao fazer upload do logo do rodapé.');
                }
            };
            
            reader.readAsDataURL(file);
        }

        // Mostrar formulário de produtos
        async function showProductForm() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Produtos</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Nome do Produto</label>
                        <input type="text" id="productName" placeholder="Ex: Cerveja Heineken" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Preço Unitário</label>
                        <input type="number" step="0.01" id="productPrice" placeholder="Ex: 5.50" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Marca</label>
                        <input type="text" id="productBrand" placeholder="Ex: Heineken" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Quantidade</label>
                        <input type="number" id="productQuantity" placeholder="Ex: 100" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Gelada</label>
                        <input type="number" id="productCold" placeholder="Quantidade gelada" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Quente</label>
                        <input type="number" id="productHot" placeholder="Quantidade quente" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Tipo</label>
                        <select id="productType" class="input-field">
                            <option value="Unidade">Unidade</option>
                            <option value="Caixa">Caixa</option>
                            <option value="Fardo">Fardo</option>
                        </select>
                        
                        <label class="block mb-2 text-sm font-bold">Imagem do Produto</label>
                        <input type="file" id="productImage" accept="image/*" class="input-field">
                        
                        <div class="grid grid-cols-2 gap-2 mt-4">
                            <button onclick="saveProduct()" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Gravar
                            </button>
                            <button onclick="clearProductForm()" class="btn-black">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mt-6 mb-4 text-yellow-400">Produtos Cadastrados</h3>
                    <div class="space-y-2">
                        \${products.map(p => \`
                            <div class="card flex justify-between items-center">
                                <div class="flex gap-3 items-center flex-1">
                                    <div style="width: 50px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                        \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-xl text-yellow-400"></i>'}
                                    </div>
                                    <div>
                                        <p class="font-bold">\${p.name}</p>
                                        <p class="text-sm text-gray-400">\${p.brand} - R$ \${parseFloat(p.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editProduct(\${p.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteProduct(\${p.id})" class="btn-red" style="padding: 8px 12px;">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar produto
        async function saveProduct() {
            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const brand = document.getElementById('productBrand').value;
            const quantity = document.getElementById('productQuantity').value;
            const cold = document.getElementById('productCold').value;
            const hot = document.getElementById('productHot').value;
            const type = document.getElementById('productType').value;
            const imageInput = document.getElementById('productImage');
            
            if (!name || !price || !brand) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            try {
                let image_url = null;
                
                // Upload da imagem se houver
                if (imageInput.files && imageInput.files[0]) {
                    const file = imageInput.files[0];
                    const reader = new FileReader();
                    
                    const uploadPromise = new Promise((resolve, reject) => {
                        reader.onload = async (e) => {
                            try {
                                const res = await axios.post('/api/upload', {
                                    image: e.target.result,
                                    filename: file.name
                                });
                                resolve(res.data.url);
                            } catch (error) {
                                reject(error);
                            }
                        };
                        reader.onerror = reject;
                    });
                    
                    reader.readAsDataURL(file);
                    image_url = await uploadPromise;
                } else if (currentProduct) {
                    // Manter imagem atual se estiver editando
                    const product = products.find(p => p.id === currentProduct);
                    image_url = product?.image_url;
                }
                
                const productData = {
                    name,
                    price: parseFloat(price),
                    brand,
                    stock_quantity: parseInt(quantity) || 0,
                    cold_quantity: parseInt(cold) || 0,
                    hot_quantity: parseInt(hot) || 0,
                    unit_type: type || 'Unidade',
                    image_url
                };
                
                if (currentProduct) {
                    await axios.put(\`/api/products/\${currentProduct}\`, productData);
                    alert('Produto atualizado com sucesso!');
                } else {
                    await axios.post('/api/products', productData);
                    alert('Produto cadastrado com sucesso!');
                }
                
                const res = await axios.get('/api/products');
                products = res.data;
                currentProduct = null;
                showProductForm();
            } catch (error) {
                console.error('Erro ao salvar produto:', error);
                alert('Erro ao salvar produto. Tente novamente.');
            }
        }

        // Editar produto
        async function editProduct(id) {
            const product = products.find(p => p.id === id);
            if (!product) return;
            
            currentProduct = id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productBrand').value = product.brand;
            document.getElementById('productQuantity').value = product.stock_quantity || 0;
            document.getElementById('productCold').value = product.cold_quantity || 0;
            document.getElementById('productHot').value = product.hot_quantity || 0;
            document.getElementById('productType').value = product.unit_type || 'Unidade';
            
            // Scroll para o formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Deletar produto
        async function deleteProduct(id) {
            if (!confirm('Deseja realmente excluir este produto?')) return;
            
            try {
                await axios.delete(\`/api/products/\${id}\`);
                const res = await axios.get('/api/products');
                products = res.data;
                alert('Produto excluído com sucesso!');
                showProductForm();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto. Tente novamente.');
            }
        }

        // Limpar formulário de produto
        function clearProductForm() {
            currentProduct = null;
            document.getElementById('productName').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productBrand').value = '';
            document.getElementById('productQuantity').value = '';
            document.getElementById('productCold').value = '';
            document.getElementById('productHot').value = '';
            document.getElementById('productType').value = 'Unidade';
            document.getElementById('productImage').value = '';
        }

        // Inicializar app
        loadInitialData();
    <\/script>
</body>
</html>
  `));const zt=new pe,Ze=Object.assign({"/src/index.tsx":v});let me=!1;for(const[,t]of Object.entries(Ze))t&&(zt.all("*",e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),zt.notFound(e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),me=!0);if(!me)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{zt as default};
