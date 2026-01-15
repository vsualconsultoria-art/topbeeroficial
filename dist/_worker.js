var ge=Object.defineProperty;var qt=t=>{throw TypeError(t)};var be=(t,e,o)=>e in t?ge(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var h=(t,e,o)=>be(t,typeof e!="symbol"?e+"":e,o),Ot=(t,e,o)=>e.has(t)||qt("Cannot "+o);var i=(t,e,o)=>(Ot(t,e,"read from private field"),o?o.call(t):e.get(t)),f=(t,e,o)=>e.has(t)?qt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),m=(t,e,o,r)=>(Ot(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o),b=(t,e,o)=>(Ot(t,e,"access private method"),o);var Ft=(t,e,o,r)=>({set _(s){m(t,e,s,o)},get _(){return i(t,e,r)}});var Nt=(t,e,o)=>(r,s)=>{let n=-1;return a(0);async function a(l){if(l<=n)throw new Error("next() called multiple times");n=l;let c,d=!1,u;if(t[l]?(u=t[l][0][0],r.req.routeIndex=l):u=l===t.length&&s||void 0,u)try{c=await u(r,()=>a(l+1))}catch(p){if(p instanceof Error&&e)r.error=p,c=await e(p,r),d=!0;else throw p}else r.finalized===!1&&o&&(c=await o(r));return c&&(r.finalized===!1||d)&&(r.res=c),r}},xe=Symbol(),ye=async(t,e=Object.create(null))=>{const{all:o=!1,dot:r=!1}=e,n=(t instanceof oe?t.raw.headers:t.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?ve(t,{all:o,dot:r}):{}};async function ve(t,e){const o=await t.formData();return o?we(o,e):{}}function we(t,e){const o=Object.create(null);return t.forEach((r,s)=>{e.all||s.endsWith("[]")?Ee(o,s,r):o[s]=r}),e.dot&&Object.entries(o).forEach(([r,s])=>{r.includes(".")&&(Ce(o,r,s),delete o[r])}),o}var Ee=(t,e,o)=>{t[e]!==void 0?Array.isArray(t[e])?t[e].push(o):t[e]=[t[e],o]:e.endsWith("[]")?t[e]=[o]:t[e]=o},Ce=(t,e,o)=>{let r=t;const s=e.split(".");s.forEach((n,a)=>{a===s.length-1?r[n]=o:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},Xt=t=>{const e=t.split("/");return e[0]===""&&e.shift(),e},Re=t=>{const{groups:e,path:o}=Ie(t),r=Xt(o);return _e(r,e)},Ie=t=>{const e=[];return t=t.replace(/\{[^}]+\}/g,(o,r)=>{const s=`@${r}`;return e.push([s,o]),s}),{groups:e,path:t}},_e=(t,e)=>{for(let o=e.length-1;o>=0;o--){const[r]=e[o];for(let s=t.length-1;s>=0;s--)if(t[s].includes(r)){t[s]=t[s].replace(r,e[o][1]);break}}return t},It={},Pe=(t,e)=>{if(t==="*")return"*";const o=t.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(o){const r=`${t}#${e}`;return It[r]||(o[2]?It[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,o[1],new RegExp(`^${o[2]}(?=/${e})`)]:[t,o[1],new RegExp(`^${o[2]}$`)]:It[r]=[t,o[1],!0]),It[r]}return null},Ht=(t,e)=>{try{return e(t)}catch{return t.replace(/(?:%[0-9A-Fa-f]{2})+/g,o=>{try{return e(o)}catch{return o}})}},Ae=t=>Ht(t,decodeURI),Jt=t=>{const e=t.url,o=e.indexOf("/",e.indexOf(":")+4);let r=o;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const n=e.indexOf("?",r),a=e.slice(o,n===-1?void 0:n);return Ae(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(o,r)},je=t=>{const e=Jt(t);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},rt=(t,e,...o)=>(o.length&&(e=rt(e,...o)),`${(t==null?void 0:t[0])==="/"?"":"/"}${t}${e==="/"?"":`${(t==null?void 0:t.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),Zt=t=>{if(t.charCodeAt(t.length-1)!==63||!t.includes(":"))return null;const e=t.split("/"),o=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){o.length===0&&r===""?o.push("/"):o.push(r);const n=s.replace("?","");r+="/"+n,o.push(r)}else r+="/"+s}),o.filter((s,n,a)=>a.indexOf(s)===n)},Bt=t=>/[%+]/.test(t)?(t.indexOf("+")!==-1&&(t=t.replace(/\+/g," ")),t.indexOf("%")!==-1?Ht(t,ee):t):t,te=(t,e,o)=>{let r;if(!o&&e&&!/[%+]/.test(e)){let a=t.indexOf("?",8);if(a===-1)return;for(t.startsWith(e,a+1)||(a=t.indexOf(`&${e}`,a+1));a!==-1;){const l=t.charCodeAt(a+e.length+1);if(l===61){const c=a+e.length+2,d=t.indexOf("&",c);return Bt(t.slice(c,d===-1?void 0:d))}else if(l==38||isNaN(l))return"";a=t.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(t),!r)return}const s={};r??(r=/[%+]/.test(t));let n=t.indexOf("?",8);for(;n!==-1;){const a=t.indexOf("&",n+1);let l=t.indexOf("=",n);l>a&&a!==-1&&(l=-1);let c=t.slice(n+1,l===-1?a===-1?void 0:a:l);if(r&&(c=Bt(c)),n=a,c==="")continue;let d;l===-1?d="":(d=t.slice(l+1,a===-1?void 0:a),r&&(d=Bt(d))),o?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(d)):s[c]??(s[c]=d)}return e?s[e]:s},ke=te,Le=(t,e)=>te(t,e,!0),ee=decodeURIComponent,Mt=t=>Ht(t,ee),at,A,D,re,se,St,M,Vt,oe=(Vt=class{constructor(t,e="/",o=[[]]){f(this,D);h(this,"raw");f(this,at);f(this,A);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});f(this,M,t=>{const{bodyCache:e,raw:o}=this,r=e[t];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[t]())):e[t]=o[t]()});this.raw=t,this.path=e,m(this,A,o),m(this,at,{})}param(t){return t?b(this,D,re).call(this,t):b(this,D,se).call(this)}query(t){return ke(this.url,t)}queries(t){return Le(this.url,t)}header(t){if(t)return this.raw.headers.get(t)??void 0;const e={};return this.raw.headers.forEach((o,r)=>{e[r]=o}),e}async parseBody(t){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await ye(this,t))}json(){return i(this,M).call(this,"text").then(t=>JSON.parse(t))}text(){return i(this,M).call(this,"text")}arrayBuffer(){return i(this,M).call(this,"arrayBuffer")}blob(){return i(this,M).call(this,"blob")}formData(){return i(this,M).call(this,"formData")}addValidatedData(t,e){i(this,at)[t]=e}valid(t){return i(this,at)[t]}get url(){return this.raw.url}get method(){return this.raw.method}get[xe](){return i(this,A)}get matchedRoutes(){return i(this,A)[0].map(([[,t]])=>t)}get routePath(){return i(this,A)[0].map(([[,t]])=>t)[this.routeIndex].path}},at=new WeakMap,A=new WeakMap,D=new WeakSet,re=function(t){const e=i(this,A)[0][this.routeIndex][1][t],o=b(this,D,St).call(this,e);return o&&/\%/.test(o)?Mt(o):o},se=function(){const t={},e=Object.keys(i(this,A)[0][this.routeIndex][1]);for(const o of e){const r=b(this,D,St).call(this,i(this,A)[0][this.routeIndex][1][o]);r!==void 0&&(t[o]=/\%/.test(r)?Mt(r):r)}return t},St=function(t){return i(this,A)[1]?i(this,A)[1][t]:t},M=new WeakMap,Vt),$e={Stringify:1},ne=async(t,e,o,r,s)=>{typeof t=="object"&&!(t instanceof String)&&(t instanceof Promise||(t=t.toString()),t instanceof Promise&&(t=await t));const n=t.callbacks;return n!=null&&n.length?(s?s[0]+=t:s=[t],Promise.all(n.map(l=>l({phase:e,buffer:s,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(c=>ne(c,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(t)},Oe="text/plain; charset=UTF-8",Tt=(t,e)=>({"Content-Type":t,...e}),bt,xt,B,it,T,_,yt,ct,lt,Y,vt,wt,U,st,Wt,Be=(Wt=class{constructor(t,e){f(this,U);f(this,bt);f(this,xt);h(this,"env",{});f(this,B);h(this,"finalized",!1);h(this,"error");f(this,it);f(this,T);f(this,_);f(this,yt);f(this,ct);f(this,lt);f(this,Y);f(this,vt);f(this,wt);h(this,"render",(...t)=>(i(this,ct)??m(this,ct,e=>this.html(e)),i(this,ct).call(this,...t)));h(this,"setLayout",t=>m(this,yt,t));h(this,"getLayout",()=>i(this,yt));h(this,"setRenderer",t=>{m(this,ct,t)});h(this,"header",(t,e,o)=>{this.finalized&&m(this,_,new Response(i(this,_).body,i(this,_)));const r=i(this,_)?i(this,_).headers:i(this,Y)??m(this,Y,new Headers);e===void 0?r.delete(t):o!=null&&o.append?r.append(t,e):r.set(t,e)});h(this,"status",t=>{m(this,it,t)});h(this,"set",(t,e)=>{i(this,B)??m(this,B,new Map),i(this,B).set(t,e)});h(this,"get",t=>i(this,B)?i(this,B).get(t):void 0);h(this,"newResponse",(...t)=>b(this,U,st).call(this,...t));h(this,"body",(t,e,o)=>b(this,U,st).call(this,t,e,o));h(this,"text",(t,e,o)=>!i(this,Y)&&!i(this,it)&&!e&&!o&&!this.finalized?new Response(t):b(this,U,st).call(this,t,e,Tt(Oe,o)));h(this,"json",(t,e,o)=>b(this,U,st).call(this,JSON.stringify(t),e,Tt("application/json",o)));h(this,"html",(t,e,o)=>{const r=s=>b(this,U,st).call(this,s,e,Tt("text/html; charset=UTF-8",o));return typeof t=="object"?ne(t,$e.Stringify,!1,{}).then(r):r(t)});h(this,"redirect",(t,e)=>{const o=String(t);return this.header("Location",/[^\x00-\xFF]/.test(o)?encodeURI(o):o),this.newResponse(null,e??302)});h(this,"notFound",()=>(i(this,lt)??m(this,lt,()=>new Response),i(this,lt).call(this,this)));m(this,bt,t),e&&(m(this,T,e.executionCtx),this.env=e.env,m(this,lt,e.notFoundHandler),m(this,wt,e.path),m(this,vt,e.matchResult))}get req(){return i(this,xt)??m(this,xt,new oe(i(this,bt),i(this,wt),i(this,vt))),i(this,xt)}get event(){if(i(this,T)&&"respondWith"in i(this,T))return i(this,T);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,T))return i(this,T);throw Error("This context has no ExecutionContext")}get res(){return i(this,_)||m(this,_,new Response(null,{headers:i(this,Y)??m(this,Y,new Headers)}))}set res(t){if(i(this,_)&&t){t=new Response(t.body,t);for(const[e,o]of i(this,_).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=i(this,_).headers.getSetCookie();t.headers.delete("set-cookie");for(const s of r)t.headers.append("set-cookie",s)}else t.headers.set(e,o)}m(this,_,t),this.finalized=!0}get var(){return i(this,B)?Object.fromEntries(i(this,B)):{}}},bt=new WeakMap,xt=new WeakMap,B=new WeakMap,it=new WeakMap,T=new WeakMap,_=new WeakMap,yt=new WeakMap,ct=new WeakMap,lt=new WeakMap,Y=new WeakMap,vt=new WeakMap,wt=new WeakMap,U=new WeakSet,st=function(t,e,o){const r=i(this,_)?new Headers(i(this,_).headers):i(this,Y)??new Headers;if(typeof e=="object"&&"headers"in e){const n=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,l]of n)a.toLowerCase()==="set-cookie"?r.append(a,l):r.set(a,l)}if(o)for(const[n,a]of Object.entries(o))if(typeof a=="string")r.set(n,a);else{r.delete(n);for(const l of a)r.append(n,l)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??i(this,it);return new Response(t,{status:s,headers:r})},Wt),w="ALL",Te="all",Se=["get","post","put","delete","options","patch"],ae="Can not add a route since the matcher is already built.",ie=class extends Error{},He="__COMPOSED_HANDLER",De=t=>t.text("404 Not Found",404),Ut=(t,e)=>{if("getResponse"in t){const o=t.getResponse();return e.newResponse(o.body,o)}return console.error(t),e.text("Internal Server Error",500)},j,E,ce,k,K,_t,Pt,dt,qe=(dt=class{constructor(e={}){f(this,E);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");f(this,j,"/");h(this,"routes",[]);f(this,k,De);h(this,"errorHandler",Ut);h(this,"onError",e=>(this.errorHandler=e,this));h(this,"notFound",e=>(m(this,k,e),this));h(this,"fetch",(e,...o)=>b(this,E,Pt).call(this,e,o[1],o[0],e.method));h(this,"request",(e,o,r,s)=>e instanceof Request?this.fetch(o?new Request(e,o):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${rt("/",e)}`,o),r,s)));h(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(b(this,E,Pt).call(this,e.request,e,void 0,e.request.method))})});[...Se,Te].forEach(n=>{this[n]=(a,...l)=>(typeof a=="string"?m(this,j,a):b(this,E,K).call(this,n,i(this,j),a),l.forEach(c=>{b(this,E,K).call(this,n,i(this,j),c)}),this)}),this.on=(n,a,...l)=>{for(const c of[a].flat()){m(this,j,c);for(const d of[n].flat())l.map(u=>{b(this,E,K).call(this,d.toUpperCase(),i(this,j),u)})}return this},this.use=(n,...a)=>(typeof n=="string"?m(this,j,n):(m(this,j,"*"),a.unshift(n)),a.forEach(l=>{b(this,E,K).call(this,w,i(this,j),l)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??Jt:je}route(e,o){const r=this.basePath(e);return o.routes.map(s=>{var a;let n;o.errorHandler===Ut?n=s.handler:(n=async(l,c)=>(await Nt([],o.errorHandler)(l,()=>s.handler(l,c))).res,n[He]=s.handler),b(a=r,E,K).call(a,s.method,s.path,n)}),this}basePath(e){const o=b(this,E,ce).call(this);return o._basePath=rt(this._basePath,e),o}mount(e,o,r){let s,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?s=c=>c:s=r.replaceRequest));const a=n?c=>{const d=n(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};s||(s=(()=>{const c=rt(this._basePath,e),d=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,u)}})());const l=async(c,d)=>{const u=await o(s(c.req.raw),...a(c));if(u)return u;await d()};return b(this,E,K).call(this,w,rt(e,"*"),l),this}},j=new WeakMap,E=new WeakSet,ce=function(){const e=new dt({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,m(e,k,i(this,k)),e.routes=this.routes,e},k=new WeakMap,K=function(e,o,r){e=e.toUpperCase(),o=rt(this._basePath,o);const s={basePath:this._basePath,path:o,method:e,handler:r};this.router.add(e,o,[r,s]),this.routes.push(s)},_t=function(e,o){if(e instanceof Error)return this.errorHandler(e,o);throw e},Pt=function(e,o,r,s){if(s==="HEAD")return(async()=>new Response(null,await b(this,E,Pt).call(this,e,o,r,"GET")))();const n=this.getPath(e,{env:r}),a=this.router.match(s,n),l=new Be(e,{path:n,matchResult:a,env:r,executionCtx:o,notFoundHandler:i(this,k)});if(a[0].length===1){let d;try{d=a[0][0][0][0](l,async()=>{l.res=await i(this,k).call(this,l)})}catch(u){return b(this,E,_t).call(this,u,l)}return d instanceof Promise?d.then(u=>u||(l.finalized?l.res:i(this,k).call(this,l))).catch(u=>b(this,E,_t).call(this,u,l)):d??i(this,k).call(this,l)}const c=Nt(a[0],this.errorHandler,i(this,k));return(async()=>{try{const d=await c(l);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,E,_t).call(this,d,l)}})()},dt),le=[];function Fe(t,e){const o=this.buildAllMatchers(),r=((s,n)=>{const a=o[s]||o[w],l=a[2][n];if(l)return l;const c=n.match(a[0]);if(!c)return[[],le];const d=c.indexOf("",1);return[a[1][d],c]});return this.match=r,r(t,e)}var jt="[^/]+",ft=".*",gt="(?:|/.*)",nt=Symbol(),Ne=new Set(".\\+*[^]$()");function Me(t,e){return t.length===1?e.length===1?t<e?-1:1:-1:e.length===1||t===ft||t===gt?1:e===ft||e===gt?-1:t===jt?1:e===jt?-1:t.length===e.length?t<e?-1:1:e.length-t.length}var X,J,L,et,Ue=(et=class{constructor(){f(this,X);f(this,J);f(this,L,Object.create(null))}insert(e,o,r,s,n){if(e.length===0){if(i(this,X)!==void 0)throw nt;if(n)return;m(this,X,o);return}const[a,...l]=e,c=a==="*"?l.length===0?["","",ft]:["","",jt]:a==="/*"?["","",gt]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const u=c[1];let p=c[2]||jt;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw nt;if(d=i(this,L)[p],!d){if(Object.keys(i(this,L)).some(g=>g!==ft&&g!==gt))throw nt;if(n)return;d=i(this,L)[p]=new et,u!==""&&m(d,J,s.varIndex++)}!n&&u!==""&&r.push([u,i(d,J)])}else if(d=i(this,L)[a],!d){if(Object.keys(i(this,L)).some(u=>u.length>1&&u!==ft&&u!==gt))throw nt;if(n)return;d=i(this,L)[a]=new et}d.insert(l,o,r,s,n)}buildRegExpStr(){const o=Object.keys(i(this,L)).sort(Me).map(r=>{const s=i(this,L)[r];return(typeof i(s,J)=="number"?`(${r})@${i(s,J)}`:Ne.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof i(this,X)=="number"&&o.unshift(`#${i(this,X)}`),o.length===0?"":o.length===1?o[0]:"(?:"+o.join("|")+")"}},X=new WeakMap,J=new WeakMap,L=new WeakMap,et),kt,Et,Gt,ze=(Gt=class{constructor(){f(this,kt,{varIndex:0});f(this,Et,new Ue)}insert(t,e,o){const r=[],s=[];for(let a=0;;){let l=!1;if(t=t.replace(/\{[^}]+\}/g,c=>{const d=`@\\${a}`;return s[a]=[d,c],a++,l=!0,d}),!l)break}const n=t.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[l]=s[a];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(l)!==-1){n[c]=n[c].replace(l,s[a][1]);break}}return i(this,Et).insert(n,e,r,i(this,kt),o),r}buildRegExp(){let t=i(this,Et).buildRegExpStr();if(t==="")return[/^$/,[],[]];let e=0;const o=[],r=[];return t=t.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,a)=>n!==void 0?(o[++e]=Number(n),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${t}`),o,r]}},kt=new WeakMap,Et=new WeakMap,Gt),Ve=[/^$/,[],Object.create(null)],At=Object.create(null);function de(t){return At[t]??(At[t]=new RegExp(t==="*"?"":`^${t.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,o)=>o?`\\${o}`:"(?:|/.*)")}$`))}function We(){At=Object.create(null)}function Ge(t){var d;const e=new ze,o=[];if(t.length===0)return Ve;const r=t.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,y])=>u?1:g?-1:p.length-y.length),s=Object.create(null);for(let u=0,p=-1,g=r.length;u<g;u++){const[y,P,q]=r[u];y?s[P]=[q.map(([I])=>[I,Object.create(null)]),le]:p++;let x;try{x=e.insert(P,p,y)}catch(I){throw I===nt?new ie(P):I}y||(o[p]=q.map(([I,F])=>{const Ct=Object.create(null);for(F-=1;F>=0;F--){const[Rt,$]=x[F];Ct[Rt]=$}return[I,Ct]}))}const[n,a,l]=e.buildRegExp();for(let u=0,p=o.length;u<p;u++)for(let g=0,y=o[u].length;g<y;g++){const P=(d=o[u][g])==null?void 0:d[1];if(!P)continue;const q=Object.keys(P);for(let x=0,I=q.length;x<I;x++)P[q[x]]=l[P[q[x]]]}const c=[];for(const u in a)c[u]=o[a[u]];return[n,c,s]}function ot(t,e){if(t){for(const o of Object.keys(t).sort((r,s)=>s.length-r.length))if(de(o).test(e))return[...t[o]]}}var z,V,Lt,ue,Kt,Ke=(Kt=class{constructor(){f(this,Lt);h(this,"name","RegExpRouter");f(this,z);f(this,V);h(this,"match",Fe);m(this,z,{[w]:Object.create(null)}),m(this,V,{[w]:Object.create(null)})}add(t,e,o){var l;const r=i(this,z),s=i(this,V);if(!r||!s)throw new Error(ae);r[t]||[r,s].forEach(c=>{c[t]=Object.create(null),Object.keys(c[w]).forEach(d=>{c[t][d]=[...c[w][d]]})}),e==="/*"&&(e="*");const n=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const c=de(e);t===w?Object.keys(r).forEach(d=>{var u;(u=r[d])[e]||(u[e]=ot(r[d],e)||ot(r[w],e)||[])}):(l=r[t])[e]||(l[e]=ot(r[t],e)||ot(r[w],e)||[]),Object.keys(r).forEach(d=>{(t===w||t===d)&&Object.keys(r[d]).forEach(u=>{c.test(u)&&r[d][u].push([o,n])})}),Object.keys(s).forEach(d=>{(t===w||t===d)&&Object.keys(s[d]).forEach(u=>c.test(u)&&s[d][u].push([o,n]))});return}const a=Zt(e)||[e];for(let c=0,d=a.length;c<d;c++){const u=a[c];Object.keys(s).forEach(p=>{var g;(t===w||t===p)&&((g=s[p])[u]||(g[u]=[...ot(r[p],u)||ot(r[w],u)||[]]),s[p][u].push([o,n-d+c+1]))})}}buildAllMatchers(){const t=Object.create(null);return Object.keys(i(this,V)).concat(Object.keys(i(this,z))).forEach(e=>{t[e]||(t[e]=b(this,Lt,ue).call(this,e))}),m(this,z,m(this,V,void 0)),We(),t}},z=new WeakMap,V=new WeakMap,Lt=new WeakSet,ue=function(t){const e=[];let o=t===w;return[i(this,z),i(this,V)].forEach(r=>{const s=r[t]?Object.keys(r[t]).map(n=>[n,r[t][n]]):[];s.length!==0?(o||(o=!0),e.push(...s)):t!==w&&e.push(...Object.keys(r[w]).map(n=>[n,r[w][n]]))}),o?Ge(e):null},Kt),W,S,Qt,Qe=(Qt=class{constructor(t){h(this,"name","SmartRouter");f(this,W,[]);f(this,S,[]);m(this,W,t.routers)}add(t,e,o){if(!i(this,S))throw new Error(ae);i(this,S).push([t,e,o])}match(t,e){if(!i(this,S))throw new Error("Fatal error");const o=i(this,W),r=i(this,S),s=o.length;let n=0,a;for(;n<s;n++){const l=o[n];try{for(let c=0,d=r.length;c<d;c++)l.add(...r[c]);a=l.match(t,e)}catch(c){if(c instanceof ie)continue;throw c}this.match=l.match.bind(l),m(this,W,[l]),m(this,S,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(i(this,S)||i(this,W).length!==1)throw new Error("No active router has been determined yet.");return i(this,W)[0]}},W=new WeakMap,S=new WeakMap,Qt),ht=Object.create(null),G,R,Z,ut,C,H,Q,pt,Ye=(pt=class{constructor(e,o,r){f(this,H);f(this,G);f(this,R);f(this,Z);f(this,ut,0);f(this,C,ht);if(m(this,R,r||Object.create(null)),m(this,G,[]),e&&o){const s=Object.create(null);s[e]={handler:o,possibleKeys:[],score:0},m(this,G,[s])}m(this,Z,[])}insert(e,o,r){m(this,ut,++Ft(this,ut)._);let s=this;const n=Re(o),a=[];for(let l=0,c=n.length;l<c;l++){const d=n[l],u=n[l+1],p=Pe(d,u),g=Array.isArray(p)?p[0]:d;if(g in i(s,R)){s=i(s,R)[g],p&&a.push(p[1]);continue}i(s,R)[g]=new pt,p&&(i(s,Z).push(p),a.push(p[1])),s=i(s,R)[g]}return i(s,G).push({[e]:{handler:r,possibleKeys:a.filter((l,c,d)=>d.indexOf(l)===c),score:i(this,ut)}}),s}search(e,o){var c;const r=[];m(this,C,ht);let n=[this];const a=Xt(o),l=[];for(let d=0,u=a.length;d<u;d++){const p=a[d],g=d===u-1,y=[];for(let P=0,q=n.length;P<q;P++){const x=n[P],I=i(x,R)[p];I&&(m(I,C,i(x,C)),g?(i(I,R)["*"]&&r.push(...b(this,H,Q).call(this,i(I,R)["*"],e,i(x,C))),r.push(...b(this,H,Q).call(this,I,e,i(x,C)))):y.push(I));for(let F=0,Ct=i(x,Z).length;F<Ct;F++){const Rt=i(x,Z)[F],$=i(x,C)===ht?{}:{...i(x,C)};if(Rt==="*"){const N=i(x,R)["*"];N&&(r.push(...b(this,H,Q).call(this,N,e,i(x,C))),m(N,C,$),y.push(N));continue}const[he,Dt,mt]=Rt;if(!p&&!(mt instanceof RegExp))continue;const O=i(x,R)[he],fe=a.slice(d).join("/");if(mt instanceof RegExp){const N=mt.exec(fe);if(N){if($[Dt]=N[0],r.push(...b(this,H,Q).call(this,O,e,i(x,C),$)),Object.keys(i(O,R)).length){m(O,C,$);const $t=((c=N[0].match(/\//))==null?void 0:c.length)??0;(l[$t]||(l[$t]=[])).push(O)}continue}}(mt===!0||mt.test(p))&&($[Dt]=p,g?(r.push(...b(this,H,Q).call(this,O,e,$,i(x,C))),i(O,R)["*"]&&r.push(...b(this,H,Q).call(this,i(O,R)["*"],e,$,i(x,C)))):(m(O,C,$),y.push(O)))}}n=y.concat(l.shift()??[])}return r.length>1&&r.sort((d,u)=>d.score-u.score),[r.map(({handler:d,params:u})=>[d,u])]}},G=new WeakMap,R=new WeakMap,Z=new WeakMap,ut=new WeakMap,C=new WeakMap,H=new WeakSet,Q=function(e,o,r,s){const n=[];for(let a=0,l=i(e,G).length;a<l;a++){const c=i(e,G)[a],d=c[o]||c[w],u={};if(d!==void 0&&(d.params=Object.create(null),n.push(d),r!==ht||s&&s!==ht))for(let p=0,g=d.possibleKeys.length;p<g;p++){const y=d.possibleKeys[p],P=u[d.score];d.params[y]=s!=null&&s[y]&&!P?s[y]:r[y]??(s==null?void 0:s[y]),u[d.score]=!0}}return n},pt),tt,Yt,Xe=(Yt=class{constructor(){h(this,"name","TrieRouter");f(this,tt);m(this,tt,new Ye)}add(t,e,o){const r=Zt(e);if(r){for(let s=0,n=r.length;s<n;s++)i(this,tt).insert(t,r[s],o);return}i(this,tt).insert(t,e,o)}match(t,e){return i(this,tt).search(t,e)}},tt=new WeakMap,Yt),pe=class extends qe{constructor(t={}){super(t),this.router=t.router??new Qe({routers:[new Ke,new Xe]})}},Je=t=>{const o={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...t},r=(n=>typeof n=="string"?n==="*"?()=>n:a=>n===a?a:null:typeof n=="function"?n:a=>n.includes(a)?a:null)(o.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(o.allowMethods);return async function(a,l){var u;function c(p,g){a.res.headers.set(p,g)}const d=await r(a.req.header("origin")||"",a);if(d&&c("Access-Control-Allow-Origin",d),o.credentials&&c("Access-Control-Allow-Credentials","true"),(u=o.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",o.exposeHeaders.join(",")),a.req.method==="OPTIONS"){o.origin!=="*"&&c("Vary","Origin"),o.maxAge!=null&&c("Access-Control-Max-Age",o.maxAge.toString());const p=await s(a.req.header("origin")||"",a);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=o.allowHeaders;if(!(g!=null&&g.length)){const y=a.req.header("Access-Control-Request-Headers");y&&(g=y.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await l(),o.origin!=="*"&&a.header("Vary","Origin",{append:!0})}};const v=new pe;v.use("/api/*",Je());v.post("/api/auth/verify",async t=>{const{password:e}=await t.req.json();return t.json({success:e==="top@beer10"})});v.get("/api/products",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM products ORDER BY id DESC").all();return t.json(o)});v.get("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM products WHERE id = ?").bind(o).all();return t.json(r[0]||null)});v.post("/api/products",async t=>{const{DB:e}=t.env,{name:o,price:r,brand:s,stock_quantity:n,image_url:a}=await t.req.json(),l=await e.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?)").bind(o,r,s,n||0,a||null).run();return t.json({id:l.meta.last_row_id,success:!0})});v.put("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,price:s,brand:n,stock_quantity:a,image_url:l}=await t.req.json();return await e.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ? WHERE id = ?").bind(r,s,n,a,l,o).run(),t.json({success:!0})});v.delete("/api/products/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM products WHERE id = ?").bind(o).run(),t.json({success:!0})});v.get("/api/customers",async t=>{const{DB:e}=t.env,{results:o}=await e.prepare("SELECT * FROM customers ORDER BY name").all();return t.json(o)});v.get("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT * FROM customers WHERE id = ?").bind(o).all();return t.json(r[0]||null)});v.post("/api/customers",async t=>{const{DB:e}=t.env,{name:o,address:r,neighborhood:s,zip_code:n,city:a,phone:l}=await t.req.json(),c=await e.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(o,r,s,n,a,l).run();return t.json({id:c.meta.last_row_id,success:!0})});v.put("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{name:r,address:s,neighborhood:n,zip_code:a,city:l,phone:c}=await t.req.json();return await e.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(r,s,n,a,l,c,o).run(),t.json({success:!0})});v.delete("/api/customers/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id");return await e.prepare("DELETE FROM customers WHERE id = ?").bind(o).run(),t.json({success:!0})});v.post("/api/orders",async t=>{const{DB:e}=t.env,{customer_id:o,items:r,payment_method:s,total_amount:n}=await t.req.json(),l=(await e.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(o,n,s).run()).meta.last_row_id;for(const c of r)await e.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(l,c.product_id,c.quantity,c.unit_price,c.total_price).run();return t.json({id:l,success:!0})});v.get("/api/orders/:id",async t=>{const{DB:e}=t.env,o=t.req.param("id"),{results:r}=await e.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(o).all();if(!r.length)return t.json(null);const s=r[0],{results:n}=await e.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(o).all();return t.json({...s,items:n})});v.get("/api/settings/logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return t.json({logo_url:((r=o[0])==null?void 0:r.value)||null})});v.post("/api/settings/logo",async t=>{const{DB:e}=t.env,{logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});v.get("/api/settings/footer-logo",async t=>{var r;const{DB:e}=t.env,{results:o}=await e.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all();return t.json({footer_logo_url:((r=o[0])==null?void 0:r.value)||null})});v.post("/api/settings/footer-logo",async t=>{const{DB:e}=t.env,{footer_logo_url:o}=await t.req.json();return await e.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),t.json({success:!0})});v.post("/api/upload",async t=>{try{const{image:e,filename:o}=await t.req.json(),r=e.split(",")[1]||e,s=atob(r),n=new Uint8Array(s.length);for(let c=0;c<s.length;c++)n[c]=s.charCodeAt(c);const a=`${Date.now()}-${o}`,l=e;return t.json({success:!0,url:l})}catch(e){return console.error("Upload error:",e),t.json({success:!1,error:"Upload failed"},500)}});v.get("/",t=>t.html(`
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
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, -1)">-</button>
                                    <span class="font-bold text-lg" id="qty-\${p.id}">0</span>
                                    <button class="quantity-btn" onclick="event.stopPropagation(); addToCartWithQuantity(\${p.id}, 1)">+</button>
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
                    stock_quantity: 100,
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
            document.getElementById('productImage').value = '';
        }

        // Inicializar app
        loadInitialData();
    <\/script>
</body>
</html>
  `));const zt=new pe,Ze=Object.assign({"/src/index.tsx":v});let me=!1;for(const[,t]of Object.entries(Ze))t&&(zt.all("*",e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),zt.notFound(e=>{let o;try{o=e.executionCtx}catch{}return t.fetch(e.req.raw,e.env,o)}),me=!0);if(!me)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{zt as default};
