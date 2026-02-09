var ge=Object.defineProperty;var Ft=t=>{throw TypeError(t)};var be=(t,e,o)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var h=(t,e,o)=>be(t,typeof e!="symbol"?e+"":e,o),Lt=(t,e,o)=>e.has(t)||Ft("Cannot "+o);var i=(t,e,o)=>(Lt(t,e,"read from private field"),o?o.call(t):e.get(t)),f=(t,e,o)=>e.has(t)?Ft("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),m=(t,e,o,r)=>(Lt(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o),b=(t,e,o)=>(Lt(t,e,"access private method"),o);var Dt=(t,e,o,r)=>({set _(a){m(t,e,a,o)},get _(){return i(t,e,r)}});var Mt=(t,e,o)=>(r,a)=>{let n=-1;return s(0);async function s(d){if(d<=n)throw new Error("next() called multiple times");n=d;let c,l=!1,u;if(t[d]?(u=t[d][0][0],r.req.routeIndex=d):u=d===t.length&&a||void 0,u)try{c=await u(r,()=>s(d+1))}catch(p){if(p instanceof Error&&e)r.error=p,c=await e(p,r),l=!0;else throw p}else r.finalized===!1&&o&&(c=await o(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},ye=Symbol(),xe=async(t,e=Object.create(null))=>{const{all:o=!1,dot:r=!1}=e,n=(t instanceof oe?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?ve(t,{all:o,dot:r}):{}};async function ve(t,e){const o=await t.formData();return o?we(o,e):{}}function we(t,e){const o=Object.create(null);return t.forEach((r,a)=>{e.all||a.endsWith("[]")?Ee(o,a,r):o[a]=r}),e.dot&&Object.entries(o).forEach(([r,a])=>{r.includes(".")&&(Ie(o,r,a),delete o[r])}),o}var Ee=(t,e,o)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(o):t[e]=[t[e],o]:e.endsWith("[]")?t[e]=[o]:t[e]=o},Ie=(t,e,o)=>{let r=t;const a=e.split(".");a.forEach((n,s)=>{s===a.length-1?r[n]=o:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},Yt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Ce=t=>{const{groups:e,path:o}=_e(t),r=Yt(o);return Re(r,e)},_e=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(o,r)=>{const a=`@${r}`;return e.push([a,o]),a}),{groups:e,path:t}},Re=(t,e)=>{for(let o=e.length-1;o>=0;o--){const[r]=e[o];for(let a=t.length-1;a>=0;a--)if(t[a].includes(r)){t[a]=t[a].replace(r,e[o][1]);break}}return t},_t={},Pe=(t,e)=>{if(t==="*")return"*";const o=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(o){const r=`${t}#${e}`;return _t[r]||(o[2]?_t[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,o[1],new RegExp(`^${o[2]}(?=/${e})`)]:[t,o[1],new RegExp(`^${o[2]}$`)]:_t[r]=[t,o[1],!0]),_t[r]}return null},qt=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,o=>{try{return e(o)}catch{return o}})}},Ae=t=>qt(t,decodeURI),Jt=t=>{const e=t.url,o=e.indexOf("/",e.indexOf(":")+4);let r=o;for(;r<e.length;r++){const a=e.charCodeAt(r);if(a===37){const n=e.indexOf("?",r),s=e.slice(o,n===-1?void 0:n);return Ae(s.includes("%25")?s.replace(/%25/g,"%2525"):s)}else if(a===63)break}return e.slice(o,r)},Be=t=>{const e=Jt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},rt=(t,e,...o)=>(o.length&&(e=rt(e,...o)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Zt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),o=[];let r="";return e.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){o.length===0&&r===""?o.push("/"):o.push(r);const n=a.replace("?","");r+="/"+n,o.push(r)}else r+="/"+a}),o.filter((a,n,s)=>s.indexOf(a)===n)},jt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?qt(t,ee):t):t,te=(t,e,o)=>{let r;if(!o&&e&&!/[%+]/.test(e)){let s=t.indexOf("?",8);if(s===-1)return;for(t.startsWith(e,s+1)||(s=t.indexOf(`&${e}`,s+1));s!==-1;){const d=t.charCodeAt(s+e.length+1);if(d===61){const c=s+e.length+2,l=t.indexOf("&",c);return jt(t.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";s=t.indexOf(`&${e}`,s+1)}if(r=/[%+]/.test(t),!r)return}const a={};r??(r=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const s=t.indexOf("&",n+1);let d=t.indexOf("=",n);d>s&&s!==-1&&(d=-1);let c=t.slice(n+1,d===-1?s===-1?void 0:s:d);if(r&&(c=jt(c)),n=s,c==="")continue;let l;d===-1?l="":(l=t.slice(d+1,s===-1?void 0:s),r&&(l=jt(l))),o?(a[c]&&Array.isArray(a[c])||(a[c]=[]),a[c].push(l)):a[c]??(a[c]=l)}return e?a[e]:a},ke=te,$e=(t,e)=>te(t,e,!0),ee=decodeURIComponent,Nt=t=>qt(t,ee),st,A,H,re,ae,Ot,N,Qt,oe=(Qt=class{constructor(t,e="/",o=[[]]){f(this,H);h(this,"raw");f(this,st);f(this,A);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});f(this,N,t=>{const{bodyCache:e,raw:o}=this,r=e[t];if(r)return r;const a=Object.keys(e)[0];return a?e[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):e[t]=o[t]()});this.raw=t,this.path=e,m(this,A,o),m(this,st,{})}param(t){return t?b(this,H,re).call(this,t):b(this,H,ae).call(this)}query(t){return ke(this.url,t)}queries(t){return $e(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((o,r)=>{e[r]=o}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await xe(this,t))}json(){return i(this,N).call(this,"text").then(t=>JSON.parse(t))}text(){return i(this,N).call(this,"text")}arrayBuffer(){return i(this,N).call(this,"arrayBuffer")}blob(){return i(this,N).call(this,"blob")}formData(){return i(this,N).call(this,"formData")}addValidatedData(t,e){i(this,st)[t]=e}valid(t){return i(this,st)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[ye](){return i(this,A)}get matchedRoutes(){return i(this,A)[0].map(([[,t]])=>t)}get routePath(){return i(this,A)[0].map(([[,t]])=>t)[this.routeIndex].path}},st=new WeakMap,A=new WeakMap,H=new WeakSet,re=function(t){const e=i(this,A)[0][this.routeIndex][1][t],o=b(this,H,Ot).call(this,e);return o&&/\%/.test(o)?Nt(o):o},ae=function(){const t={},e=Object.keys(i(this,A)[0][this.routeIndex][1]);for(const o of e){const r=b(this,H,Ot).call(this,i(this,A)[0][this.routeIndex][1][o]);r!==void 0&&(t[o]=/\%/.test(r)?Nt(r):r)}return t},Ot=function(t){return i(this,A)[1]?i(this,A)[1][t]:t},N=new WeakMap,Qt),Te={Stringify:1},ne=async(t,e,o,r,a)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(a?a[0]+=t:a=[t],Promise.all(n.map(d=>d({phase:e,buffer:a,context:r}))).then(d=>Promise.all(d.filter(Boolean).map(c=>ne(c,e,!1,r,a))).then(()=>a[0]))):Promise.resolve(t)},Le="text/plain; charset=UTF-8",St=(t,e)=>({"Content-Type":t,...e}),bt,yt,j,it,S,R,xt,ct,lt,X,vt,wt,U,at,Vt,je=(Vt=class{constructor(t,e){f(this,U);f(this,bt);f(this,yt);h(this,"env",{});f(this,j);h(this,"finalized",!1);h(this,"error");f(this,it);f(this,S);f(this,R);f(this,xt);f(this,ct);f(this,lt);f(this,X);f(this,vt);f(this,wt);h(this,"render",(...t)=>(i(this,ct)??m(this,ct,e=>this.html(e)),i(this,ct).call(this,...t)));h(this,"setLayout",t=>m(this,xt,t));h(this,"getLayout",()=>i(this,xt));h(this,"setRenderer",t=>{m(this,ct,t)});h(this,"header",(t,e,o)=>{this.finalized&&m(this,R,new Response(i(this,R).body,i(this,R)));const r=i(this,R)?i(this,R).headers:i(this,X)??m(this,X,new Headers);e===void 0?r.delete(t):o!=null&&o.append?r.append(t,e):r.set(t,e)});h(this,"status",t=>{m(this,it,t)});h(this,"set",(t,e)=>{i(this,j)??m(this,j,new Map),i(this,j).set(t,e)});h(this,"get",t=>i(this,j)?i(this,j).get(t):void 0);h(this,"newResponse",(...t)=>b(this,U,at).call(this,...t));h(this,"body",(t,e,o)=>b(this,U,at).call(this,t,e,o));h(this,"text",(t,e,o)=>!i(this,X)&&!i(this,it)&&!e&&!o&&!this.finalized?new Response(t):b(this,U,at).call(this,t,e,St(Le,o)));h(this,"json",(t,e,o)=>b(this,U,at).call(this,JSON.stringify(t),e,St("application/json",o)));h(this,"html",(t,e,o)=>{const r=a=>b(this,U,at).call(this,a,e,St("text/html; charset=UTF-8",o));return typeof t=="object"?ne(t,Te.Stringify,!1,{}).then(r):r(t)});h(this,"redirect",(t,e)=>{const o=String(t);return this.header("Location",/[^\x00-\xFF]/.test(o)?encodeURI(o):o),this.newResponse(null,e??302)});h(this,"notFound",()=>(i(this,lt)??m(this,lt,()=>new Response),i(this,lt).call(this,this)));m(this,bt,t),e&&(m(this,S,e.executionCtx),this.env=e.env,m(this,lt,e.notFoundHandler),m(this,wt,e.path),m(this,vt,e.matchResult))}get req(){return i(this,yt)??m(this,yt,new oe(i(this,bt),i(this,wt),i(this,vt))),i(this,yt)}get event(){if(i(this,S)&&"respondWith"in i(this,S))return i(this,S);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,S))return i(this,S);throw Error("This context has no ExecutionContext")}get res(){return i(this,R)||m(this,R,new Response(null,{headers:i(this,X)??m(this,X,new Headers)}))}set res(t){if(i(this,R)&&t){t=new Response(t.body,t);for(const[e,o]of i(this,R).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=i(this,R).headers.getSetCookie();t.headers.delete("set-cookie");for(const a of r)t.headers.append("set-cookie",a)}else t.headers.set(e,o)}m(this,R,t),this.finalized=!0}get var(){return i(this,j)?Object.fromEntries(i(this,j)):{}}},bt=new WeakMap,yt=new WeakMap,j=new WeakMap,it=new WeakMap,S=new WeakMap,R=new WeakMap,xt=new WeakMap,ct=new WeakMap,lt=new WeakMap,X=new WeakMap,vt=new WeakMap,wt=new WeakMap,U=new WeakSet,at=function(t,e,o){const r=i(this,R)?new Headers(i(this,R).headers):i(this,X)??new Headers;if(typeof e=="object"&&"headers"in e){const n=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[s,d]of n)s.toLowerCase()==="set-cookie"?r.append(s,d):r.set(s,d)}if(o)for(const[n,s]of Object.entries(o))if(typeof s=="string")r.set(n,s);else{r.delete(n);for(const d of s)r.append(n,d)}const a=typeof e=="number"?e:(e==null?void 0:e.status)??i(this,it);return new Response(t,{status:a,headers:r})},Vt),w="ALL",Se="all",Oe=["get","post","put","delete","options","patch"],se="Can not add a route since the matcher is already built.",ie=class extends Error{},qe="__COMPOSED_HANDLER",He=t=>t.text("404 Not Found",404),Ut=(t,e)=>{if("getResponse"in t){const o=t.getResponse();return e.newResponse(o.body,o)}return console.error(t),e.text("Internal Server Error",500)},B,E,ce,k,G,Rt,Pt,dt,Fe=(dt=class{constructor(e={}){f(this,E);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");f(this,B,"/");h(this,"routes",[]);f(this,k,He);h(this,"errorHandler",Ut);h(this,"onError",e=>(this.errorHandler=e,this));h(this,"notFound",e=>(m(this,k,e),this));h(this,"fetch",(e,...o)=>b(this,E,Pt).call(this,e,o[1],o[0],e.method));h(this,"request",(e,o,r,a)=>e instanceof Request?this.fetch(o?new Request(e,o):e,r,a):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${rt("/",e)}`,o),r,a)));h(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(b(this,E,Pt).call(this,e.request,e,void 0,e.request.method))})});[...Oe,Se].forEach(n=>{this[n]=(s,...d)=>(typeof s=="string"?m(this,B,s):b(this,E,G).call(this,n,i(this,B),s),d.forEach(c=>{b(this,E,G).call(this,n,i(this,B),c)}),this)}),this.on=(n,s,...d)=>{for(const c of[s].flat()){m(this,B,c);for(const l of[n].flat())d.map(u=>{b(this,E,G).call(this,l.toUpperCase(),i(this,B),u)})}return this},this.use=(n,...s)=>(typeof n=="string"?m(this,B,n):(m(this,B,"*"),s.unshift(n)),s.forEach(d=>{b(this,E,G).call(this,w,i(this,B),d)}),this);const{strict:r,...a}=e;Object.assign(this,a),this.getPath=r??!0?e.getPath??Jt:Be}route(e,o){const r=this.basePath(e);return o.routes.map(a=>{var s;let n;o.errorHandler===Ut?n=a.handler:(n=async(d,c)=>(await Mt([],o.errorHandler)(d,()=>a.handler(d,c))).res,n[qe]=a.handler),b(s=r,E,G).call(s,a.method,a.path,n)}),this}basePath(e){const o=b(this,E,ce).call(this);return o._basePath=rt(this._basePath,e),o}mount(e,o,r){let a,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?a=c=>c:a=r.replaceRequest));const s=n?c=>{const l=n(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};a||(a=(()=>{const c=rt(this._basePath,e),l=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,u)}})());const d=async(c,l)=>{const u=await o(a(c.req.raw),...s(c));if(u)return u;await l()};return b(this,E,G).call(this,w,rt(e,"*"),d),this}},B=new WeakMap,E=new WeakSet,ce=function(){const e=new dt({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,m(e,k,i(this,k)),e.routes=this.routes,e},k=new WeakMap,G=function(e,o,r){e=e.toUpperCase(),o=rt(this._basePath,o);const a={basePath:this._basePath,path:o,method:e,handler:r};this.router.add(e,o,[r,a]),this.routes.push(a)},Rt=function(e,o){if(e instanceof Error)return this.errorHandler(e,o);throw e},Pt=function(e,o,r,a){if(a==="HEAD")return(async()=>new Response(null,await b(this,E,Pt).call(this,e,o,r,"GET")))();const n=this.getPath(e,{env:r}),s=this.router.match(a,n),d=new je(e,{path:n,matchResult:s,env:r,executionCtx:o,notFoundHandler:i(this,k)});if(s[0].length===1){let l;try{l=s[0][0][0][0](d,async()=>{d.res=await i(this,k).call(this,d)})}catch(u){return b(this,E,Rt).call(this,u,d)}return l instanceof Promise?l.then(u=>u||(d.finalized?d.res:i(this,k).call(this,d))).catch(u=>b(this,E,Rt).call(this,u,d)):l??i(this,k).call(this,d)}const c=Mt(s[0],this.errorHandler,i(this,k));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return b(this,E,Rt).call(this,l,d)}})()},dt),le=[];function De(t,e){const o=this.buildAllMatchers(),r=((a,n)=>{const s=o[a]||o[w],d=s[2][n];if(d)return d;const c=n.match(s[0]);if(!c)return[[],le];const l=c.indexOf("",1);return[s[1][l],c]});return this.match=r,r(t,e)}var Bt="[^/]+",ft=".*",gt="(?:|/.*)",nt=Symbol(),Me=new Set(".\\+*[^]$()");function Ne(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===ft||t===gt?1:e===ft||e===gt?-1:t===Bt?1:e===Bt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var Y,J,$,et,Ue=(et=class{constructor(){f(this,Y);f(this,J);f(this,$,Object.create(null))}insert(e,o,r,a,n){if(e.length===0){if(i(this,Y)!==void 0)throw nt;if(n)return;m(this,Y,o);return}const[s,...d]=e,c=s==="*"?d.length===0?["","",ft]:["","",Bt]:s==="/*"?["","",gt]:s.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let p=c[2]||Bt;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw nt;if(l=i(this,$)[p],!l){if(Object.keys(i(this,$)).some(g=>g!==ft&&g!==gt))throw nt;if(n)return;l=i(this,$)[p]=new et,u!==""&&m(l,J,a.varIndex++)}!n&&u!==""&&r.push([u,i(l,J)])}else if(l=i(this,$)[s],!l){if(Object.keys(i(this,$)).some(u=>u.length>1&&u!==ft&&u!==gt))throw nt;if(n)return;l=i(this,$)[s]=new et}l.insert(d,o,r,a,n)}buildRegExpStr(){const o=Object.keys(i(this,$)).sort(Ne).map(r=>{const a=i(this,$)[r];return(typeof i(a,J)=="number"?`(${r})@${i(a,J)}`:Me.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof i(this,Y)=="number"&&o.unshift(`#${i(this,Y)}`),o.length===0?"":o.length===1?o[0]:"(?:"+o.join("|")+")"}},Y=new WeakMap,J=new WeakMap,$=new WeakMap,et),kt,Et,Wt,ze=(Wt=class{constructor(){f(this,kt,{varIndex:0});f(this,Et,new Ue)}insert(t,e,o){const r=[],a=[];for(let s=0;;){let d=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const l=`@\\${s}`;return a[s]=[l,c],s++,d=!0,l}),!d)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let s=a.length-1;s>=0;s--){const[d]=a[s];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(d)!==-1){n[c]=n[c].replace(d,a[s][1]);break}}return i(this,Et).insert(n,e,r,i(this,kt),o),r}buildRegExp(){let t=i(this,Et).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const o=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,s)=>n!==void 0?(o[++e]=Number(n),"$()"):(s!==void 0&&(r[Number(s)]=++e),"")),[new RegExp(`^${t}`),o,r]}},kt=new WeakMap,Et=new WeakMap,Wt),Qe=[/^$/,[],Object.create(null)],At=Object.create(null);function de(t){return At[t]??(At[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,o)=>o?`\\${o}`:"(?:|/.*)")}$`))}function Ve(){At=Object.create(null)}function We(t){var l;const e=new ze,o=[];if(t.length===0)return Qe;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,v])=>u?1:g?-1:p.length-v.length),a=Object.create(null);for(let u=0,p=-1,g=r.length;u<g;u++){const[v,P,F]=r[u];v?a[P]=[F.map(([_])=>[_,Object.create(null)]),le]:p++;let x;try{x=e.insert(P,p,v)}catch(_){throw _===nt?new ie(P):_}v||(o[p]=F.map(([_,D])=>{const It=Object.create(null);for(D-=1;D>=0;D--){const[Ct,T]=x[D];It[Ct]=T}return[_,It]}))}const[n,s,d]=e.buildRegExp();for(let u=0,p=o.length;u<p;u++)for(let g=0,v=o[u].length;g<v;g++){const P=(l=o[u][g])==null?void 0:l[1];if(!P)continue;const F=Object.keys(P);for(let x=0,_=F.length;x<_;x++)P[F[x]]=d[P[F[x]]]}const c=[];for(const u in s)c[u]=o[s[u]];return[n,c,a]}function ot(t,e){if(t){for(const o of Object.keys(t).sort((r,a)=>a.length-r.length))if(de(o).test(e))return[...t[o]]}}var z,Q,$t,ue,Gt,Ge=(Gt=class{constructor(){f(this,$t);h(this,"name","RegExpRouter");f(this,z);f(this,Q);h(this,"match",De);m(this,z,{[w]:Object.create(null)}),m(this,Q,{[w]:Object.create(null)})}add(t,e,o){var d;const r=i(this,z),a=i(this,Q);if(!r||!a)throw new Error(se);r[t]||[r,a].forEach(c=>{c[t]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[t][l]=[...c[w][l]]})}),e==="/*"&&(e="*");const n=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=de(e);t===w?Object.keys(r).forEach(l=>{var u;(u=r[l])[e]||(u[e]=ot(r[l],e)||ot(r[w],e)||[])}):(d=r[t])[e]||(d[e]=ot(r[t],e)||ot(r[w],e)||[]),Object.keys(r).forEach(l=>{(t===w||t===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([o,n])})}),Object.keys(a).forEach(l=>{(t===w||t===l)&&Object.keys(a[l]).forEach(u=>c.test(u)&&a[l][u].push([o,n]))});return}const s=Zt(e)||[e];for(let c=0,l=s.length;c<l;c++){const u=s[c];Object.keys(a).forEach(p=>{var g;(t===w||t===p)&&((g=a[p])[u]||(g[u]=[...ot(r[p],u)||ot(r[w],u)||[]]),a[p][u].push([o,n-l+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(i(this,Q)).concat(Object.keys(i(this,z))).forEach(e=>{t[e]||(t[e]=b(this,$t,ue).call(this,e))}),m(this,z,m(this,Q,void 0)),Ve(),t}},z=new WeakMap,Q=new WeakMap,$t=new WeakSet,ue=function(t){const e=[];let o=t===w;return[i(this,z),i(this,Q)].forEach(r=>{const a=r[t]?Object.keys(r[t]).map(n=>[n,r[t][n]]):[];a.length!==0?(o||(o=!0),e.push(...a)):t!==w&&e.push(...Object.keys(r[w]).map(n=>[n,r[w][n]]))}),o?We(e):null},Gt),V,O,Kt,Ke=(Kt=class{constructor(t){h(this,"name","SmartRouter");f(this,V,[]);f(this,O,[]);m(this,V,t.routers)}add(t,e,o){if(!i(this,O))throw new Error(se);i(this,O).push([t,e,o])}match(t,e){if(!i(this,O))throw new Error("Fatal error");const o=i(this,V),r=i(this,O),a=o.length;let n=0,s;for(;n<a;n++){const d=o[n];try{for(let c=0,l=r.length;c<l;c++)d.add(...r[c]);s=d.match(t,e)}catch(c){if(c instanceof ie)continue;throw c}this.match=d.match.bind(d),m(this,V,[d]),m(this,O,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,s}get activeRouter(){if(i(this,O)||i(this,V).length!==1)throw new Error("No active router has been determined yet.");return i(this,V)[0]}},V=new WeakMap,O=new WeakMap,Kt),ht=Object.create(null),W,C,Z,ut,I,q,K,pt,Xe=(pt=class{constructor(e,o,r){f(this,q);f(this,W);f(this,C);f(this,Z);f(this,ut,0);f(this,I,ht);if(m(this,C,r||Object.create(null)),m(this,W,[]),e&&o){const a=Object.create(null);a[e]={handler:o,possibleKeys:[],score:0},m(this,W,[a])}m(this,Z,[])}insert(e,o,r){m(this,ut,++Dt(this,ut)._);let a=this;const n=Ce(o),s=[];for(let d=0,c=n.length;d<c;d++){const l=n[d],u=n[d+1],p=Pe(l,u),g=Array.isArray(p)?p[0]:l;if(g in i(a,C)){a=i(a,C)[g],p&&s.push(p[1]);continue}i(a,C)[g]=new pt,p&&(i(a,Z).push(p),s.push(p[1])),a=i(a,C)[g]}return i(a,W).push({[e]:{handler:r,possibleKeys:s.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,ut)}}),a}search(e,o){var c;const r=[];m(this,I,ht);let n=[this];const s=Yt(o),d=[];for(let l=0,u=s.length;l<u;l++){const p=s[l],g=l===u-1,v=[];for(let P=0,F=n.length;P<F;P++){const x=n[P],_=i(x,C)[p];_&&(m(_,I,i(x,I)),g?(i(_,C)["*"]&&r.push(...b(this,q,K).call(this,i(_,C)["*"],e,i(x,I))),r.push(...b(this,q,K).call(this,_,e,i(x,I)))):v.push(_));for(let D=0,It=i(x,Z).length;D<It;D++){const Ct=i(x,Z)[D],T=i(x,I)===ht?{}:{...i(x,I)};if(Ct==="*"){const M=i(x,C)["*"];M&&(r.push(...b(this,q,K).call(this,M,e,i(x,I))),m(M,I,T),v.push(M));continue}const[he,Ht,mt]=Ct;if(!p&&!(mt instanceof RegExp))continue;const L=i(x,C)[he],fe=s.slice(l).join("/");if(mt instanceof RegExp){const M=mt.exec(fe);if(M){if(T[Ht]=M[0],r.push(...b(this,q,K).call(this,L,e,i(x,I),T)),Object.keys(i(L,C)).length){m(L,I,T);const Tt=((c=M[0].match(/\//))==null?void 0:c.length)??0;(d[Tt]||(d[Tt]=[])).push(L)}continue}}(mt===!0||mt.test(p))&&(T[Ht]=p,g?(r.push(...b(this,q,K).call(this,L,e,T,i(x,I))),i(L,C)["*"]&&r.push(...b(this,q,K).call(this,i(L,C)["*"],e,T,i(x,I)))):(m(L,I,T),v.push(L)))}}n=v.concat(d.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},W=new WeakMap,C=new WeakMap,Z=new WeakMap,ut=new WeakMap,I=new WeakMap,q=new WeakSet,K=function(e,o,r,a){const n=[];for(let s=0,d=i(e,W).length;s<d;s++){const c=i(e,W)[s],l=c[o]||c[w],u={};if(l!==void 0&&(l.params=Object.create(null),n.push(l),r!==ht||a&&a!==ht))for(let p=0,g=l.possibleKeys.length;p<g;p++){const v=l.possibleKeys[p],P=u[l.score];l.params[v]=a!=null&&a[v]&&!P?a[v]:r[v]??(a==null?void 0:a[v]),u[l.score]=!0}}return n},pt),tt,Xt,Ye=(Xt=class{constructor(){h(this,"name","TrieRouter");f(this,tt);m(this,tt,new Xe)}add(t,e,o){const r=Zt(e);if(r){for(let a=0,n=r.length;a<n;a++)i(this,tt).insert(t,r[a],o);return}i(this,tt).insert(t,e,o)}match(t,e){return i(this,tt).search(t,e)}},tt=new WeakMap,Xt),pe=class extends Fe{constructor(t={}){super(t),this.router=t.router??new Ke({routers:[new Ge,new Ye]})}},Je=t=>{const o={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(n=>typeof n=="string"?n==="*"?()=>n:s=>n===s?s:null:typeof n=="function"?n:s=>n.includes(s)?s:null)(o.origin),a=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(o.allowMethods);return async function(s,d){var u;function c(p,g){s.res.headers.set(p,g)}const l=await r(s.req.header("origin")||"",s);if(l&&c("Access-Control-Allow-Origin",l),o.credentials&&c("Access-Control-Allow-Credentials","true"),(u=o.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",o.exposeHeaders.join(",")),s.req.method==="OPTIONS"){o.origin!=="*"&&c("Vary","Origin"),o.maxAge!=null&&c("Access-Control-Max-Age",o.maxAge.toString());const p=await a(s.req.header("origin")||"",s);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=o.allowHeaders;if(!(g!=null&&g.length)){const v=s.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),s.res.headers.append("Vary","Access-Control-Request-Headers")),s.res.headers.delete("Content-Length"),s.res.headers.delete("Content-Type"),new Response(null,{headers:s.res.headers,status:204,statusText:"No Content"})}await d(),o.origin!=="*"&&s.header("Vary","Origin",{append:!0})}};const y=new pe;y.use("/api/*",Je());y.post("/api/auth/verify",async t=>{const{password:e}=await t.req.json();return t.json({success:e==="123"})});y.get("/api/products",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM products ORDER BY id DESC").all();return t.json(o)});y.get("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM products WHERE id = ?").bind(o).all();return t.json(r[0]||null)});y.post("/api/products",async t=>{const{DB:e}=t.env,{name:o,price:r,brand:a,stock_quantity:n,image_url:s,cold_quantity:d,hot_quantity:c,unit_type:l,category:u}=await t.req.json(),p=await e.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(o,r,a,n||0,s||null,d||0,c||0,l||"Unidade",u||"Bebidas").run();return t.json({id:p.meta.last_row_id,success:!0})});y.put("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,price:a,brand:n,stock_quantity:s,image_url:d,cold_quantity:c,hot_quantity:l,unit_type:u,category:p}=await t.req.json();return await e.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ?, cold_quantity = ?, hot_quantity = ?, unit_type = ?, category = ? WHERE id = ?").bind(r,a,n,s,d,c,l,u,p,o).run(),t.json({success:!0})});y.delete("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM products WHERE id = ?").bind(o).run(),t.json({success:!0})});y.get("/api/customers",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM customers ORDER BY name").all();return t.json(o)});y.get("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM customers WHERE id = ?").bind(o).all();return t.json(r[0]||null)});y.post("/api/customers",async t=>{const{DB:e}=t.env,{name:o,address:r,neighborhood:a,zip_code:n,city:s,phone:d}=await t.req.json(),c=await e.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(o,r,a,n,s,d).run();return t.json({id:c.meta.last_row_id,success:!0})});y.put("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,address:a,neighborhood:n,zip_code:s,city:d,phone:c}=await t.req.json();return await e.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(r,a,n,s,d,c,o).run(),t.json({success:!0})});y.delete("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM customers WHERE id = ?").bind(o).run(),t.json({success:!0})});y.post("/api/orders",async t=>{const{DB:e}=t.env,{customer_id:o,items:r,payment_method:a,total_amount:n}=await t.req.json(),d=(await e.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(o,n,a).run()).meta.last_row_id;for(const c of r)await e.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(d,c.product_id,c.quantity,c.unit_price,c.total_price).run();return t.json({id:d,success:!0})});y.get("/api/orders/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(o).all();if(!r.length)return t.json(null);const a=r[0],{results:n}=await e.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(o).all();return t.json({...a,items:n})});y.get("/api/settings/logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return t.json({logo_url:((r=o[0])==null?void 0:r.value)||null})});y.post("/api/settings/logo",async t=>{const{DB:e}=t.env,{logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});y.get("/api/settings/footer-logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all();return t.json({footer_logo_url:((r=o[0])==null?void 0:r.value)||null})});y.post("/api/settings/footer-logo",async t=>{const{DB:e}=t.env,{footer_logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});y.get("/api/settings/branches",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'branches'").all();return t.json({branches:((r=o[0])==null?void 0:r.value)||""})});y.post("/api/settings/branches",async t=>{const{DB:e}=t.env,{branches:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('branches', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});y.post("/api/upload",async t=>{try{const{image:e,filename:o}=await t.req.json(),r=e.split(",")[1]||e,a=atob(r),n=new Uint8Array(a.length);for(let c=0;c<a.length;c++)n[c]=a.charCodeAt(c);const s=`${Date.now()}-${o}`,d=e;return t.json({success:!0,url:d})}catch(e){return console.error("Upload error:",e),t.json({success:!1,error:"Upload failed"},500)}});y.get("/",t=>t.html(`
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
                <button onclick="showBranches()" class="btn-yellow py-4 text-lg">
                    <i class="fas fa-store mr-2"></i> Filiais
                </button>
                <button onclick="showCustomerForm()" class="btn-red py-4 text-lg">
                    <i class="fas fa-users mr-2"></i> Clientes
                </button>
                <button onclick="showAdminLogin()" class="btn-black py-4 text-lg col-span-2">
                    <i class="fas fa-cog mr-2"></i> Admin
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
        async function showCatalog(filterCategory = '') {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Obter categorias únicas
            const categories = ['Todas', ...new Set(products.map(p => p.category).filter(c => c))];
            
            // Filtrar produtos
            let filteredProducts = products;
            if (filterCategory && filterCategory !== 'Todas') {
                filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
            }
            
            const html = \`
                <div>
                    <button onclick="showHome()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Catálogo de Produtos</h2>
                    
                    <!-- Filtro APENAS por Categoria -->
                    <div class="card mb-4">
                        <label class="block mb-2 text-sm font-bold">Filtrar por Categoria</label>
                        <select id="filterCategory" class="input-field" onchange="showCatalog(this.value)">
                            \${categories.map(cat => \`<option value="\${cat}" \${filterCategory === cat ? 'selected' : ''}>\${cat}</option>\`).join('')}
                        </select>
                    </div>
                    
                    <!-- Produtos em coluna única -->
                    <div class="space-y-4" id="productList">
                        \${filteredProducts.map(p => \`
                            <div class="card">
                                <!-- IMAGEM EM CIMA -->
                                <div style="width: 100%; height: 150px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 12px;">
                                    \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-5xl text-yellow-400"></i>'}
                                </div>
                                
                                <!-- INFORMAÇÕES EMBAIXO -->
                                <div>
                                    <h3 class="font-bold text-lg mb-1">\${p.name}</h3>
                                    <p class="text-sm text-gray-400 mb-1">\${p.brand} \${p.category ? '• ' + p.category : ''}</p>
                                    <p class="text-yellow-400 font-bold text-xl mb-2" id="price-\${p.id}">R$ \${parseFloat(p.price).toFixed(2)}</p>
                                        
                                        <!-- Seleção de Temperatura -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Gelada ou Quente:</label>
                                            <select id="temp-\${p.id}" class="input-field" style="padding: 6px; font-size: 14px;" onchange="updatePrice(\${p.id})">
                                                <option value="Gelada">Gelada</option>
                                                <option value="Quente">Quente</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Seleção de Tipo -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Tipo:</label>
                                            <select id="type-\${p.id}" class="input-field" style="padding: 6px; font-size: 14px;">
                                                <option value="\${p.unit_type}">\${p.unit_type}</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Controle de Quantidade -->
                                        <div class="flex items-center gap-3 mb-2">
                                            <label class="text-xs text-gray-400">Quantidade:</label>
                                            <div class="quantity-control">
                                                <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, -1)">-</button>
                                                <span class="font-bold text-lg" id="qty-\${p.id}">0</span>
                                                <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, 1)">+</button>
                                            </div>
                                        </div>
                                        
                                        <!-- Botão Comprar -->
                                        <button onclick="buyProductWithOptions(\${p.id})" class="btn-red w-full" style="padding: 10px; font-size: 16px;">
                                            <i class="fas fa-shopping-cart mr-2"></i> Comprar
                                        </button>
                                    </div>
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
            
            // Atualizar preços iniciais baseados na temperatura padrão (Gelada)
            filteredProducts.forEach(p => {
                updatePrice(p.id);
            });
        }

        // Atualizar preço baseado na temperatura selecionada
        function updatePrice(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const tempSelect = document.getElementById('temp-' + productId);
            const priceEl = document.getElementById('price-' + productId);
            
            if (tempSelect && priceEl) {
                const temperature = tempSelect.value;
                let displayPrice = product.price;
                
                if (temperature === 'Gelada' && product.price_cold) {
                    displayPrice = product.price_cold;
                } else if (temperature === 'Quente' && product.price_hot) {
                    displayPrice = product.price_hot;
                }
                
                priceEl.textContent = 'R$ ' + parseFloat(displayPrice).toFixed(2);
            }
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

        // Comprar produto com opções (temperatura e tipo)
        function buyProductWithOptions(productId) {
            const qtyEl = document.getElementById(\`qty-\${productId}\`);
            const currentQty = qtyEl ? parseInt(qtyEl.textContent) : 0;
            
            // MODAL: Quantidade zero
            if (currentQty === 0) {
                alert('Por favor, selecione a quantidade usando as setas + e -');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Pegar as opções selecionadas
            const tempSelect = document.getElementById(\`temp-\${productId}\`);
            const typeSelect = document.getElementById(\`type-\${productId}\`);
            const temperature = tempSelect ? tempSelect.value : 'Gelada';
            const type = typeSelect ? typeSelect.value : product.unit_type;
            
            // Determinar preço baseado na temperatura
            let finalPrice = product.price;
            if (temperature === 'Gelada' && product.price_cold) {
                finalPrice = product.price_cold;
            } else if (temperature === 'Quente' && product.price_hot) {
                finalPrice = product.price_hot;
            }
            
            // Verificar disponibilidade
            const availableQty = temperature === 'Gelada' ? (product.cold_quantity || 0) : (product.hot_quantity || 0);
            if (currentQty > availableQty) {
                alert(\`Apenas \${availableQty} unidades disponíveis como \${temperature}!\`);
                return;
            }
            
            const existingItem = cart.find(item => 
                item.product_id === productId && 
                item.temperature === temperature && 
                item.type === type
            );
            
            if (existingItem) {
                existingItem.quantity += currentQty;
                existingItem.total_price = existingItem.quantity * existingItem.unit_price;
            } else {
                cart.push({
                    product_id: productId,
                    product_name: product.name,
                    brand: product.brand,
                    unit_price: parseFloat(finalPrice),
                    quantity: currentQty,
                    total_price: parseFloat(finalPrice) * currentQty,
                    image_url: product.image_url,
                    temperature: temperature,
                    type: type,
                    category: product.category
                });
            }
            updateCartBadge();
            
            // MODAL: Continuar comprando ou ir para carrinho
            if (confirm('Continuar Comprando?')) {
                // Continuar comprando - não faz nada, continua no catálogo
                return;
            } else {
                // Ir para o carrinho
                showCart();
            }
        }
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
                        <button onclick="showCustomersAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-users mr-2"></i> Gerenciar Clientes
                        </button>
                        <button onclick="showBranchesAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-store mr-2"></i> Gerenciar Filiais
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

        // Mostrar lista de clientes no admin
        async function showCustomersAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Recarregar lista de clientes
            const response = await axios.get('/api/customers');
            customers = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Clientes Cadastrados</h2>
                    
                    <div class="space-y-2">
                        \${customers.map(c => \`
                            <div class="card flex justify-between items-center">
                                <div>
                                    <p class="font-bold">\${c.name}</p>
                                    <p class="text-sm text-gray-400">\${c.address}, \${c.neighborhood}</p>
                                    <p class="text-sm text-gray-400">\${c.city} - CEP: \${c.zip_code}</p>
                                    <p class="text-sm text-gray-400">Tel: \${c.phone}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="deleteCustomerAdmin(\${c.id})" class="btn-red" style="padding: 8px 12px;">
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

        // Deletar cliente no admin
        async function deleteCustomerAdmin(id) {
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                try {
                    await axios.delete(\`/api/customers/\${id}\`);
                    alert('Cliente excluído com sucesso!');
                    showCustomersAdmin();
                } catch (error) {
                    console.error('Erro ao excluir cliente:', error);
                    alert('Erro ao excluir cliente. Tente novamente.');
                }
            }
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
                        
                        <label class="block mb-2 text-sm font-bold">Categoria</label>
                        <input type="text" id="productCategory" placeholder="Ex: Cervejas, Refrigerantes, Águas" class="input-field">
                        
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
            const category = document.getElementById('productCategory').value;
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
                    category: category || 'Bebidas',
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
            document.getElementById('productCategory').value = product.category || 'Bebidas';
            
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
            document.getElementById('productCategory').value = '';
            document.getElementById('productImage').value = '';
        }

        // Mostrar informações de filiais (público)
        async function showBranches() {
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            try {
                const res = await axios.get('/api/settings/branches');
                const branchesText = res.data.branches || 'Nenhuma informação de filiais cadastrada.';
                
                const html = \`
                    <div>
                        <button onclick="showHome()" class="btn-black mb-4">
                            <i class="fas fa-arrow-left mr-2"></i> Voltar
                        </button>
                        <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Nossas Filiais</h2>
                        
                        <div class="card">
                            <div style="white-space: pre-wrap; line-height: 1.8;">\${branchesText}</div>
                        </div>
                    </div>
                \`;
                content.innerHTML = html;
            } catch (error) {
                console.error('Erro ao carregar filiais:', error);
            }
        }

        // Gerenciar filiais (admin)
        async function showBranchesAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            try {
                const res = await axios.get('/api/settings/branches');
                const branchesText = res.data.branches || '';
                
                const html = \`
                    <div>
                        <button onclick="showAdminPanel()" class="btn-black mb-4">
                            <i class="fas fa-arrow-left mr-2"></i> Voltar
                        </button>
                        <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Filiais</h2>
                        
                        <div class="card">
                            <label class="block mb-2 text-sm font-bold">Informações das Filiais</label>
                            <p class="text-sm text-gray-400 mb-2">Digite as informações das filiais (endereços, telefones, horários, etc.)</p>
                            <textarea id="branchesText" class="input-field" rows="10" placeholder="Ex:&#10;Filial Centro&#10;Rua Principal, 123&#10;Tel: (18) 1234-5678&#10;Horário: Seg-Sex 8h-18h&#10;&#10;Filial Bairro&#10;Av. Secundária, 456&#10;Tel: (18) 8765-4321&#10;Horário: Seg-Sáb 8h-20h">\${branchesText}</textarea>
                            
                            <button onclick="saveBranches()" class="btn-red w-full mt-4">
                                <i class="fas fa-save mr-2"></i> Salvar Informações
                            </button>
                        </div>
                    </div>
                \`;
                content.innerHTML = html;
            } catch (error) {
                console.error('Erro ao carregar filiais:', error);
            }
        }

        // Salvar informações de filiais
        async function saveBranches() {
            const branchesText = document.getElementById('branchesText').value;
            
            try {
                await axios.post('/api/settings/branches', { branches: branchesText });
                alert('Informações de filiais salvas com sucesso!');
                showBranchesAdmin();
            } catch (error) {
                console.error('Erro ao salvar filiais:', error);
                alert('Erro ao salvar informações de filiais.');
            }
        }

        // Inicializar app
        loadInitialData();
    <\/script>
</body>
</html>
  `));const zt=new pe,Ze=Object.assign({"/src/index.tsx":y});let me=!1;for(const[,t]of Object.entries(Ze))t&&(zt.all("*",e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),zt.notFound(e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),me=!0);if(!me)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{zt as default};
