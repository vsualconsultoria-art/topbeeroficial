var gt=Object.defineProperty;var Fe=e=>{throw TypeError(e)};var bt=(e,t,o)=>t in e?gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var h=(e,t,o)=>bt(e,typeof t!="symbol"?t+"":t,o),qe=(e,t,o)=>t.has(e)||Fe("Cannot "+o);var i=(e,t,o)=>(qe(e,t,"read from private field"),o?o.call(e):t.get(e)),f=(e,t,o)=>t.has(e)?Fe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),m=(e,t,o,r)=>(qe(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o),b=(e,t,o)=>(qe(e,t,"access private method"),o);var De=(e,t,o,r)=>({set _(a){m(e,t,a,o)},get _(){return i(e,t,r)}});var He=(e,t,o)=>(r,a)=>{let n=-1;return s(0);async function s(d){if(d<=n)throw new Error("next() called multiple times");n=d;let c,l=!1,u;if(e[d]?(u=e[d][0][0],r.req.routeIndex=d):u=d===e.length&&a||void 0,u)try{c=await u(r,()=>s(d+1))}catch(p){if(p instanceof Error&&t)r.error=p,c=await t(p,r),l=!0;else throw p}else r.finalized===!1&&o&&(c=await o(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},yt=Symbol(),xt=async(e,t=Object.create(null))=>{const{all:o=!1,dot:r=!1}=t,n=(e instanceof ot?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?vt(e,{all:o,dot:r}):{}};async function vt(e,t){const o=await e.formData();return o?wt(o,t):{}}function wt(e,t){const o=Object.create(null);return e.forEach((r,a)=>{t.all||a.endsWith("[]")?Et(o,a,r):o[a]=r}),t.dot&&Object.entries(o).forEach(([r,a])=>{r.includes(".")&&(Ct(o,r,a),delete o[r])}),o}var Et=(e,t,o)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(o):e[t]=[e[t],o]:t.endsWith("[]")?e[t]=[o]:e[t]=o},Ct=(e,t,o)=>{let r=e;const a=t.split(".");a.forEach((n,s)=>{s===a.length-1?r[n]=o:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},Ye=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},It=e=>{const{groups:t,path:o}=_t(e),r=Ye(o);return Pt(r,t)},_t=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(o,r)=>{const a=`@${r}`;return t.push([a,o]),a}),{groups:t,path:e}},Pt=(e,t)=>{for(let o=t.length-1;o>=0;o--){const[r]=t[o];for(let a=e.length-1;a>=0;a--)if(e[a].includes(r)){e[a]=e[a].replace(r,t[o][1]);break}}return e},_e={},At=(e,t)=>{if(e==="*")return"*";const o=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(o){const r=`${e}#${t}`;return _e[r]||(o[2]?_e[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,o[1],new RegExp(`^${o[2]}(?=/${t})`)]:[e,o[1],new RegExp(`^${o[2]}$`)]:_e[r]=[e,o[1],!0]),_e[r]}return null},je=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,o=>{try{return t(o)}catch{return o}})}},Rt=e=>je(e,decodeURI),Ze=e=>{const t=e.url,o=t.indexOf("/",t.indexOf(":")+4);let r=o;for(;r<t.length;r++){const a=t.charCodeAt(r);if(a===37){const n=t.indexOf("?",r),s=t.slice(o,n===-1?void 0:n);return Rt(s.includes("%25")?s.replace(/%25/g,"%2525"):s)}else if(a===63)break}return t.slice(o,r)},kt=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...o)=>(o.length&&(t=re(t,...o)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Je=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),o=[];let r="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){o.length===0&&r===""?o.push("/"):o.push(r);const n=a.replace("?","");r+="/"+n,o.push(r)}else r+="/"+a}),o.filter((a,n,s)=>s.indexOf(a)===n)},$e=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?je(e,tt):e):e,et=(e,t,o)=>{let r;if(!o&&t&&!/[%+]/.test(t)){let s=e.indexOf("?",8);if(s===-1)return;for(e.startsWith(t,s+1)||(s=e.indexOf(`&${t}`,s+1));s!==-1;){const d=e.charCodeAt(s+t.length+1);if(d===61){const c=s+t.length+2,l=e.indexOf("&",c);return $e(e.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";s=e.indexOf(`&${t}`,s+1)}if(r=/[%+]/.test(e),!r)return}const a={};r??(r=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const s=e.indexOf("&",n+1);let d=e.indexOf("=",n);d>s&&s!==-1&&(d=-1);let c=e.slice(n+1,d===-1?s===-1?void 0:s:d);if(r&&(c=$e(c)),n=s,c==="")continue;let l;d===-1?l="":(l=e.slice(d+1,s===-1?void 0:s),r&&(l=$e(l))),o?(a[c]&&Array.isArray(a[c])||(a[c]=[]),a[c].push(l)):a[c]??(a[c]=l)}return t?a[t]:a},St=et,Bt=(e,t)=>et(e,t,!0),tt=decodeURIComponent,Ne=e=>je(e,tt),se,R,M,rt,at,Oe,N,Qe,ot=(Qe=class{constructor(e,t="/",o=[[]]){f(this,M);h(this,"raw");f(this,se);f(this,R);h(this,"routeIndex",0);h(this,"path");h(this,"bodyCache",{});f(this,N,e=>{const{bodyCache:t,raw:o}=this,r=t[e];if(r)return r;const a=Object.keys(t)[0];return a?t[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=o[e]()});this.raw=e,this.path=t,m(this,R,o),m(this,se,{})}param(e){return e?b(this,M,rt).call(this,e):b(this,M,at).call(this)}query(e){return St(this.url,e)}queries(e){return Bt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((o,r)=>{t[r]=o}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await xt(this,e))}json(){return i(this,N).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,N).call(this,"text")}arrayBuffer(){return i(this,N).call(this,"arrayBuffer")}blob(){return i(this,N).call(this,"blob")}formData(){return i(this,N).call(this,"formData")}addValidatedData(e,t){i(this,se)[e]=t}valid(e){return i(this,se)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return i(this,R)}get matchedRoutes(){return i(this,R)[0].map(([[,e]])=>e)}get routePath(){return i(this,R)[0].map(([[,e]])=>e)[this.routeIndex].path}},se=new WeakMap,R=new WeakMap,M=new WeakSet,rt=function(e){const t=i(this,R)[0][this.routeIndex][1][e],o=b(this,M,Oe).call(this,t);return o&&/\%/.test(o)?Ne(o):o},at=function(){const e={},t=Object.keys(i(this,R)[0][this.routeIndex][1]);for(const o of t){const r=b(this,M,Oe).call(this,i(this,R)[0][this.routeIndex][1][o]);r!==void 0&&(e[o]=/\%/.test(r)?Ne(r):r)}return e},Oe=function(e){return i(this,R)[1]?i(this,R)[1][e]:e},N=new WeakMap,Qe),Tt={Stringify:1},nt=async(e,t,o,r,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(a?a[0]+=e:a=[e],Promise.all(n.map(d=>d({phase:t,buffer:a,context:r}))).then(d=>Promise.all(d.filter(Boolean).map(c=>nt(c,t,!1,r,a))).then(()=>a[0]))):Promise.resolve(e)},qt="text/plain; charset=UTF-8",Le=(e,t)=>({"Content-Type":e,...t}),be,ye,$,ie,L,P,xe,ce,le,X,ve,we,U,ae,Ve,$t=(Ve=class{constructor(e,t){f(this,U);f(this,be);f(this,ye);h(this,"env",{});f(this,$);h(this,"finalized",!1);h(this,"error");f(this,ie);f(this,L);f(this,P);f(this,xe);f(this,ce);f(this,le);f(this,X);f(this,ve);f(this,we);h(this,"render",(...e)=>(i(this,ce)??m(this,ce,t=>this.html(t)),i(this,ce).call(this,...e)));h(this,"setLayout",e=>m(this,xe,e));h(this,"getLayout",()=>i(this,xe));h(this,"setRenderer",e=>{m(this,ce,e)});h(this,"header",(e,t,o)=>{this.finalized&&m(this,P,new Response(i(this,P).body,i(this,P)));const r=i(this,P)?i(this,P).headers:i(this,X)??m(this,X,new Headers);t===void 0?r.delete(e):o!=null&&o.append?r.append(e,t):r.set(e,t)});h(this,"status",e=>{m(this,ie,e)});h(this,"set",(e,t)=>{i(this,$)??m(this,$,new Map),i(this,$).set(e,t)});h(this,"get",e=>i(this,$)?i(this,$).get(e):void 0);h(this,"newResponse",(...e)=>b(this,U,ae).call(this,...e));h(this,"body",(e,t,o)=>b(this,U,ae).call(this,e,t,o));h(this,"text",(e,t,o)=>!i(this,X)&&!i(this,ie)&&!t&&!o&&!this.finalized?new Response(e):b(this,U,ae).call(this,e,t,Le(qt,o)));h(this,"json",(e,t,o)=>b(this,U,ae).call(this,JSON.stringify(e),t,Le("application/json",o)));h(this,"html",(e,t,o)=>{const r=a=>b(this,U,ae).call(this,a,t,Le("text/html; charset=UTF-8",o));return typeof e=="object"?nt(e,Tt.Stringify,!1,{}).then(r):r(e)});h(this,"redirect",(e,t)=>{const o=String(e);return this.header("Location",/[^\x00-\xFF]/.test(o)?encodeURI(o):o),this.newResponse(null,t??302)});h(this,"notFound",()=>(i(this,le)??m(this,le,()=>new Response),i(this,le).call(this,this)));m(this,be,e),t&&(m(this,L,t.executionCtx),this.env=t.env,m(this,le,t.notFoundHandler),m(this,we,t.path),m(this,ve,t.matchResult))}get req(){return i(this,ye)??m(this,ye,new ot(i(this,be),i(this,we),i(this,ve))),i(this,ye)}get event(){if(i(this,L)&&"respondWith"in i(this,L))return i(this,L);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,L))return i(this,L);throw Error("This context has no ExecutionContext")}get res(){return i(this,P)||m(this,P,new Response(null,{headers:i(this,X)??m(this,X,new Headers)}))}set res(e){if(i(this,P)&&e){e=new Response(e.body,e);for(const[t,o]of i(this,P).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=i(this,P).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of r)e.headers.append("set-cookie",a)}else e.headers.set(t,o)}m(this,P,e),this.finalized=!0}get var(){return i(this,$)?Object.fromEntries(i(this,$)):{}}},be=new WeakMap,ye=new WeakMap,$=new WeakMap,ie=new WeakMap,L=new WeakMap,P=new WeakMap,xe=new WeakMap,ce=new WeakMap,le=new WeakMap,X=new WeakMap,ve=new WeakMap,we=new WeakMap,U=new WeakSet,ae=function(e,t,o){const r=i(this,P)?new Headers(i(this,P).headers):i(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[s,d]of n)s.toLowerCase()==="set-cookie"?r.append(s,d):r.set(s,d)}if(o)for(const[n,s]of Object.entries(o))if(typeof s=="string")r.set(n,s);else{r.delete(n);for(const d of s)r.append(n,d)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ie);return new Response(e,{status:a,headers:r})},Ve),w="ALL",Lt="all",Ot=["get","post","put","delete","options","patch"],st="Can not add a route since the matcher is already built.",it=class extends Error{},jt="__COMPOSED_HANDLER",Mt=e=>e.text("404 Not Found",404),Ue=(e,t)=>{if("getResponse"in e){const o=e.getResponse();return t.newResponse(o.body,o)}return console.error(e),t.text("Internal Server Error",500)},k,E,ct,S,G,Pe,Ae,de,Ft=(de=class{constructor(t={}){f(this,E);h(this,"get");h(this,"post");h(this,"put");h(this,"delete");h(this,"options");h(this,"patch");h(this,"all");h(this,"on");h(this,"use");h(this,"router");h(this,"getPath");h(this,"_basePath","/");f(this,k,"/");h(this,"routes",[]);f(this,S,Mt);h(this,"errorHandler",Ue);h(this,"onError",t=>(this.errorHandler=t,this));h(this,"notFound",t=>(m(this,S,t),this));h(this,"fetch",(t,...o)=>b(this,E,Ae).call(this,t,o[1],o[0],t.method));h(this,"request",(t,o,r,a)=>t instanceof Request?this.fetch(o?new Request(t,o):t,r,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,o),r,a)));h(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,E,Ae).call(this,t.request,t,void 0,t.request.method))})});[...Ot,Lt].forEach(n=>{this[n]=(s,...d)=>(typeof s=="string"?m(this,k,s):b(this,E,G).call(this,n,i(this,k),s),d.forEach(c=>{b(this,E,G).call(this,n,i(this,k),c)}),this)}),this.on=(n,s,...d)=>{for(const c of[s].flat()){m(this,k,c);for(const l of[n].flat())d.map(u=>{b(this,E,G).call(this,l.toUpperCase(),i(this,k),u)})}return this},this.use=(n,...s)=>(typeof n=="string"?m(this,k,n):(m(this,k,"*"),s.unshift(n)),s.forEach(d=>{b(this,E,G).call(this,w,i(this,k),d)}),this);const{strict:r,...a}=t;Object.assign(this,a),this.getPath=r??!0?t.getPath??Ze:kt}route(t,o){const r=this.basePath(t);return o.routes.map(a=>{var s;let n;o.errorHandler===Ue?n=a.handler:(n=async(d,c)=>(await He([],o.errorHandler)(d,()=>a.handler(d,c))).res,n[jt]=a.handler),b(s=r,E,G).call(s,a.method,a.path,n)}),this}basePath(t){const o=b(this,E,ct).call(this);return o._basePath=re(this._basePath,t),o}mount(t,o,r){let a,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?a=c=>c:a=r.replaceRequest));const s=n?c=>{const l=n(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};a||(a=(()=>{const c=re(this._basePath,t),l=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,u)}})());const d=async(c,l)=>{const u=await o(a(c.req.raw),...s(c));if(u)return u;await l()};return b(this,E,G).call(this,w,re(t,"*"),d),this}},k=new WeakMap,E=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,m(t,S,i(this,S)),t.routes=this.routes,t},S=new WeakMap,G=function(t,o,r){t=t.toUpperCase(),o=re(this._basePath,o);const a={basePath:this._basePath,path:o,method:t,handler:r};this.router.add(t,o,[r,a]),this.routes.push(a)},Pe=function(t,o){if(t instanceof Error)return this.errorHandler(t,o);throw t},Ae=function(t,o,r,a){if(a==="HEAD")return(async()=>new Response(null,await b(this,E,Ae).call(this,t,o,r,"GET")))();const n=this.getPath(t,{env:r}),s=this.router.match(a,n),d=new $t(t,{path:n,matchResult:s,env:r,executionCtx:o,notFoundHandler:i(this,S)});if(s[0].length===1){let l;try{l=s[0][0][0][0](d,async()=>{d.res=await i(this,S).call(this,d)})}catch(u){return b(this,E,Pe).call(this,u,d)}return l instanceof Promise?l.then(u=>u||(d.finalized?d.res:i(this,S).call(this,d))).catch(u=>b(this,E,Pe).call(this,u,d)):l??i(this,S).call(this,d)}const c=He(s[0],this.errorHandler,i(this,S));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return b(this,E,Pe).call(this,l,d)}})()},de),lt=[];function Dt(e,t){const o=this.buildAllMatchers(),r=((a,n)=>{const s=o[a]||o[w],d=s[2][n];if(d)return d;const c=n.match(s[0]);if(!c)return[[],lt];const l=c.indexOf("",1);return[s[1][l],c]});return this.match=r,r(e,t)}var ke="[^/]+",fe=".*",ge="(?:|/.*)",ne=Symbol(),Ht=new Set(".\\+*[^]$()");function Nt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===fe||e===ge?1:t===fe||t===ge?-1:e===ke?1:t===ke?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Y,Z,B,te,Ut=(te=class{constructor(){f(this,Y);f(this,Z);f(this,B,Object.create(null))}insert(t,o,r,a,n){if(t.length===0){if(i(this,Y)!==void 0)throw ne;if(n)return;m(this,Y,o);return}const[s,...d]=t,c=s==="*"?d.length===0?["","",fe]:["","",ke]:s==="/*"?["","",ge]:s.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let p=c[2]||ke;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw ne;if(l=i(this,B)[p],!l){if(Object.keys(i(this,B)).some(g=>g!==fe&&g!==ge))throw ne;if(n)return;l=i(this,B)[p]=new te,u!==""&&m(l,Z,a.varIndex++)}!n&&u!==""&&r.push([u,i(l,Z)])}else if(l=i(this,B)[s],!l){if(Object.keys(i(this,B)).some(u=>u.length>1&&u!==fe&&u!==ge))throw ne;if(n)return;l=i(this,B)[s]=new te}l.insert(d,o,r,a,n)}buildRegExpStr(){const o=Object.keys(i(this,B)).sort(Nt).map(r=>{const a=i(this,B)[r];return(typeof i(a,Z)=="number"?`(${r})@${i(a,Z)}`:Ht.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof i(this,Y)=="number"&&o.unshift(`#${i(this,Y)}`),o.length===0?"":o.length===1?o[0]:"(?:"+o.join("|")+")"}},Y=new WeakMap,Z=new WeakMap,B=new WeakMap,te),Se,Ee,We,zt=(We=class{constructor(){f(this,Se,{varIndex:0});f(this,Ee,new Ut)}insert(e,t,o){const r=[],a=[];for(let s=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${s}`;return a[s]=[l,c],s++,d=!0,l}),!d)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let s=a.length-1;s>=0;s--){const[d]=a[s];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(d)!==-1){n[c]=n[c].replace(d,a[s][1]);break}}return i(this,Ee).insert(n,t,r,i(this,Se),o),r}buildRegExp(){let e=i(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const o=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,s)=>n!==void 0?(o[++t]=Number(n),"$()"):(s!==void 0&&(r[Number(s)]=++t),"")),[new RegExp(`^${e}`),o,r]}},Se=new WeakMap,Ee=new WeakMap,We),Qt=[/^$/,[],Object.create(null)],Re=Object.create(null);function dt(e){return Re[e]??(Re[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,o)=>o?`\\${o}`:"(?:|/.*)")}$`))}function Vt(){Re=Object.create(null)}function Wt(e){var l;const t=new zt,o=[];if(e.length===0)return Qt;const r=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,v])=>u?1:g?-1:p.length-v.length),a=Object.create(null);for(let u=0,p=-1,g=r.length;u<g;u++){const[v,A,F]=r[u];v?a[A]=[F.map(([_])=>[_,Object.create(null)]),lt]:p++;let x;try{x=t.insert(A,p,v)}catch(_){throw _===ne?new it(A):_}v||(o[p]=F.map(([_,D])=>{const Ce=Object.create(null);for(D-=1;D>=0;D--){const[Ie,T]=x[D];Ce[Ie]=T}return[_,Ce]}))}const[n,s,d]=t.buildRegExp();for(let u=0,p=o.length;u<p;u++)for(let g=0,v=o[u].length;g<v;g++){const A=(l=o[u][g])==null?void 0:l[1];if(!A)continue;const F=Object.keys(A);for(let x=0,_=F.length;x<_;x++)A[F[x]]=d[A[F[x]]]}const c=[];for(const u in s)c[u]=o[s[u]];return[n,c,a]}function oe(e,t){if(e){for(const o of Object.keys(e).sort((r,a)=>a.length-r.length))if(dt(o).test(t))return[...e[o]]}}var z,Q,Be,ut,Ge,Gt=(Ge=class{constructor(){f(this,Be);h(this,"name","RegExpRouter");f(this,z);f(this,Q);h(this,"match",Dt);m(this,z,{[w]:Object.create(null)}),m(this,Q,{[w]:Object.create(null)})}add(e,t,o){var d;const r=i(this,z),a=i(this,Q);if(!r||!a)throw new Error(st);r[e]||[r,a].forEach(c=>{c[e]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[e][l]=[...c[w][l]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=dt(t);e===w?Object.keys(r).forEach(l=>{var u;(u=r[l])[t]||(u[t]=oe(r[l],t)||oe(r[w],t)||[])}):(d=r[e])[t]||(d[t]=oe(r[e],t)||oe(r[w],t)||[]),Object.keys(r).forEach(l=>{(e===w||e===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([o,n])})}),Object.keys(a).forEach(l=>{(e===w||e===l)&&Object.keys(a[l]).forEach(u=>c.test(u)&&a[l][u].push([o,n]))});return}const s=Je(t)||[t];for(let c=0,l=s.length;c<l;c++){const u=s[c];Object.keys(a).forEach(p=>{var g;(e===w||e===p)&&((g=a[p])[u]||(g[u]=[...oe(r[p],u)||oe(r[w],u)||[]]),a[p][u].push([o,n-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,Q)).concat(Object.keys(i(this,z))).forEach(t=>{e[t]||(e[t]=b(this,Be,ut).call(this,t))}),m(this,z,m(this,Q,void 0)),Vt(),e}},z=new WeakMap,Q=new WeakMap,Be=new WeakSet,ut=function(e){const t=[];let o=e===w;return[i(this,z),i(this,Q)].forEach(r=>{const a=r[e]?Object.keys(r[e]).map(n=>[n,r[e][n]]):[];a.length!==0?(o||(o=!0),t.push(...a)):e!==w&&t.push(...Object.keys(r[w]).map(n=>[n,r[w][n]]))}),o?Wt(t):null},Ge),V,O,Ke,Kt=(Ke=class{constructor(e){h(this,"name","SmartRouter");f(this,V,[]);f(this,O,[]);m(this,V,e.routers)}add(e,t,o){if(!i(this,O))throw new Error(st);i(this,O).push([e,t,o])}match(e,t){if(!i(this,O))throw new Error("Fatal error");const o=i(this,V),r=i(this,O),a=o.length;let n=0,s;for(;n<a;n++){const d=o[n];try{for(let c=0,l=r.length;c<l;c++)d.add(...r[c]);s=d.match(e,t)}catch(c){if(c instanceof it)continue;throw c}this.match=d.match.bind(d),m(this,V,[d]),m(this,O,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,s}get activeRouter(){if(i(this,O)||i(this,V).length!==1)throw new Error("No active router has been determined yet.");return i(this,V)[0]}},V=new WeakMap,O=new WeakMap,Ke),he=Object.create(null),W,I,J,ue,C,j,K,pe,Xt=(pe=class{constructor(t,o,r){f(this,j);f(this,W);f(this,I);f(this,J);f(this,ue,0);f(this,C,he);if(m(this,I,r||Object.create(null)),m(this,W,[]),t&&o){const a=Object.create(null);a[t]={handler:o,possibleKeys:[],score:0},m(this,W,[a])}m(this,J,[])}insert(t,o,r){m(this,ue,++De(this,ue)._);let a=this;const n=It(o),s=[];for(let d=0,c=n.length;d<c;d++){const l=n[d],u=n[d+1],p=At(l,u),g=Array.isArray(p)?p[0]:l;if(g in i(a,I)){a=i(a,I)[g],p&&s.push(p[1]);continue}i(a,I)[g]=new pe,p&&(i(a,J).push(p),s.push(p[1])),a=i(a,I)[g]}return i(a,W).push({[t]:{handler:r,possibleKeys:s.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,ue)}}),a}search(t,o){var c;const r=[];m(this,C,he);let n=[this];const s=Ye(o),d=[];for(let l=0,u=s.length;l<u;l++){const p=s[l],g=l===u-1,v=[];for(let A=0,F=n.length;A<F;A++){const x=n[A],_=i(x,I)[p];_&&(m(_,C,i(x,C)),g?(i(_,I)["*"]&&r.push(...b(this,j,K).call(this,i(_,I)["*"],t,i(x,C))),r.push(...b(this,j,K).call(this,_,t,i(x,C)))):v.push(_));for(let D=0,Ce=i(x,J).length;D<Ce;D++){const Ie=i(x,J)[D],T=i(x,C)===he?{}:{...i(x,C)};if(Ie==="*"){const H=i(x,I)["*"];H&&(r.push(...b(this,j,K).call(this,H,t,i(x,C))),m(H,C,T),v.push(H));continue}const[ht,Me,me]=Ie;if(!p&&!(me instanceof RegExp))continue;const q=i(x,I)[ht],ft=s.slice(l).join("/");if(me instanceof RegExp){const H=me.exec(ft);if(H){if(T[Me]=H[0],r.push(...b(this,j,K).call(this,q,t,i(x,C),T)),Object.keys(i(q,I)).length){m(q,C,T);const Te=((c=H[0].match(/\//))==null?void 0:c.length)??0;(d[Te]||(d[Te]=[])).push(q)}continue}}(me===!0||me.test(p))&&(T[Me]=p,g?(r.push(...b(this,j,K).call(this,q,t,T,i(x,C))),i(q,I)["*"]&&r.push(...b(this,j,K).call(this,i(q,I)["*"],t,T,i(x,C)))):(m(q,C,T),v.push(q)))}}n=v.concat(d.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},W=new WeakMap,I=new WeakMap,J=new WeakMap,ue=new WeakMap,C=new WeakMap,j=new WeakSet,K=function(t,o,r,a){const n=[];for(let s=0,d=i(t,W).length;s<d;s++){const c=i(t,W)[s],l=c[o]||c[w],u={};if(l!==void 0&&(l.params=Object.create(null),n.push(l),r!==he||a&&a!==he))for(let p=0,g=l.possibleKeys.length;p<g;p++){const v=l.possibleKeys[p],A=u[l.score];l.params[v]=a!=null&&a[v]&&!A?a[v]:r[v]??(a==null?void 0:a[v]),u[l.score]=!0}}return n},pe),ee,Xe,Yt=(Xe=class{constructor(){h(this,"name","TrieRouter");f(this,ee);m(this,ee,new Xt)}add(e,t,o){const r=Je(t);if(r){for(let a=0,n=r.length;a<n;a++)i(this,ee).insert(e,r[a],o);return}i(this,ee).insert(e,t,o)}match(e,t){return i(this,ee).search(e,t)}},ee=new WeakMap,Xe),pt=class extends Ft{constructor(e={}){super(e),this.router=e.router??new Kt({routers:[new Gt,new Yt]})}},Zt=e=>{const o={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(n=>typeof n=="string"?n==="*"?()=>n:s=>n===s?s:null:typeof n=="function"?n:s=>n.includes(s)?s:null)(o.origin),a=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(o.allowMethods);return async function(s,d){var u;function c(p,g){s.res.headers.set(p,g)}const l=await r(s.req.header("origin")||"",s);if(l&&c("Access-Control-Allow-Origin",l),o.credentials&&c("Access-Control-Allow-Credentials","true"),(u=o.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",o.exposeHeaders.join(",")),s.req.method==="OPTIONS"){o.origin!=="*"&&c("Vary","Origin"),o.maxAge!=null&&c("Access-Control-Max-Age",o.maxAge.toString());const p=await a(s.req.header("origin")||"",s);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=o.allowHeaders;if(!(g!=null&&g.length)){const v=s.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),s.res.headers.append("Vary","Access-Control-Request-Headers")),s.res.headers.delete("Content-Length"),s.res.headers.delete("Content-Type"),new Response(null,{headers:s.res.headers,status:204,statusText:"No Content"})}await d(),o.origin!=="*"&&s.header("Vary","Origin",{append:!0})}};const y=new pt;y.use("/api/*",Zt());y.post("/api/auth/verify",async e=>{const{password:t}=await e.req.json();return e.json({success:t==="123"})});y.get("/api/products",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT * FROM products ORDER BY id DESC").all();return e.json(o)});y.get("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT * FROM products WHERE id = ?").bind(o).all();return e.json(r[0]||null)});y.post("/api/products",async e=>{const{DB:t}=e.env,{name:o,price:r,brand:a,stock_quantity:n,image_url:s,cold_quantity:d,hot_quantity:c,unit_type:l,category:u}=await e.req.json(),p=await t.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(o,r,a,n||0,s||null,d||0,c||0,l||"Unidade",u||"Bebidas").run();return e.json({id:p.meta.last_row_id,success:!0})});y.put("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{name:r,price:a,brand:n,stock_quantity:s,image_url:d,cold_quantity:c,hot_quantity:l,unit_type:u,category:p}=await e.req.json();return await t.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ?, cold_quantity = ?, hot_quantity = ?, unit_type = ?, category = ? WHERE id = ?").bind(r,a,n,s,d,c,l,u,p,o).run(),e.json({success:!0})});y.delete("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id");return await t.prepare("DELETE FROM products WHERE id = ?").bind(o).run(),e.json({success:!0})});y.get("/api/customers",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT * FROM customers ORDER BY name").all();return e.json(o)});y.get("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT * FROM customers WHERE id = ?").bind(o).all();return e.json(r[0]||null)});y.post("/api/customers",async e=>{const{DB:t}=e.env,{name:o,address:r,neighborhood:a,zip_code:n,city:s,phone:d}=await e.req.json(),c=await t.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(o,r,a,n,s,d).run();return e.json({id:c.meta.last_row_id,success:!0})});y.put("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{name:r,address:a,neighborhood:n,zip_code:s,city:d,phone:c}=await e.req.json();return await t.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(r,a,n,s,d,c,o).run(),e.json({success:!0})});y.delete("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id");return await t.prepare("DELETE FROM customers WHERE id = ?").bind(o).run(),e.json({success:!0})});y.post("/api/orders",async e=>{const{DB:t}=e.env,{customer_id:o,items:r,payment_method:a,total_amount:n}=await e.req.json(),d=(await t.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(o,n,a).run()).meta.last_row_id;for(const c of r)await t.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(d,c.product_id,c.quantity,c.unit_price,c.total_price).run();return e.json({id:d,success:!0})});y.get("/api/orders/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(o).all();if(!r.length)return e.json(null);const a=r[0],{results:n}=await t.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(o).all();return e.json({...a,items:n})});y.get("/api/settings/logo",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return e.json({logo_url:((r=o[0])==null?void 0:r.value)||null})});y.post("/api/settings/logo",async e=>{const{DB:t}=e.env,{logo_url:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});y.get("/api/settings/footer-logo",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all();return e.json({footer_logo_url:((r=o[0])==null?void 0:r.value)||null})});y.post("/api/settings/footer-logo",async e=>{const{DB:t}=e.env,{footer_logo_url:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});y.get("/api/settings/branches",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'branches'").all();return e.json({branches:((r=o[0])==null?void 0:r.value)||""})});y.post("/api/settings/branches",async e=>{const{DB:t}=e.env,{branches:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('branches', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});y.get("/api/settings/payment",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT key, value FROM settings WHERE key IN ('pix_key', 'qrcode_url')").all(),r={pix_key:"",qrcode_url:""};return o.forEach(a=>{a.key==="pix_key"&&(r.pix_key=a.value||""),a.key==="qrcode_url"&&(r.qrcode_url=a.value||"")}),e.json(r)});y.post("/api/settings/payment",async e=>{const{DB:t}=e.env,{pix_key:o,qrcode_url:r}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('pix_key', ?, CURRENT_TIMESTAMP)").bind(o||"").run(),await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('qrcode_url', ?, CURRENT_TIMESTAMP)").bind(r||"").run(),e.json({success:!0})});y.post("/api/upload",async e=>{try{const{image:t,filename:o}=await e.req.json(),r=t.split(",")[1]||t,a=atob(r),n=new Uint8Array(a.length);for(let c=0;c<a.length;c++)n[c]=a.charCodeAt(c);const s=`${Date.now()}-${o}`,d=t;return e.json({success:!0,url:d})}catch(t){return console.error("Upload error:",t),e.json({success:!1,error:"Upload failed"},500)}});y.get("/",e=>e.html(`
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
        
        /* MODAIS FLUTUANTES */
        .custom-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s;
        }
        .custom-modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content-custom {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 2px solid #dc2626;
            border-radius: 12px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
            animation: slideDown 0.3s;
        }
        .modal-header {
            text-align: center;
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: bold;
            color: #fbbf24;
        }
        .modal-body {
            text-align: center;
            margin-bottom: 20px;
            color: #fff;
        }
        .modal-footer {
            display: flex;
            gap: 10px;
            justify-content: center;
        }
        .modal-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        .modal-btn-primary {
            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
            color: white;
        }
        .modal-btn-secondary {
            background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
            color: #000;
        }
        .modal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
        .alert-banner {
            background-color: #dc2626;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            border-radius: 8px;
            margin-top: 15px;
            animation: pulse 2s infinite;
        }
        .success-banner {
            background-color: #25d366;
            color: white;
            padding: 12px;
            text-align: center;
            font-weight: bold;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 16px;
        }
        .modal-qrcode {
            text-align: center;
            margin: 20px 0;
        }
        .modal-qrcode img {
            width: 200px;
            height: 200px;
            border: 3px solid #25d366;
            border-radius: 12px;
            margin: 0 auto;
        }
        .pix-key-display {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-size: 18px;
            font-weight: bold;
            color: #fbbf24;
            word-break: break-all;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    </style>
</head>
<body>
    <!-- MODAIS FLUTUANTES -->
    <!-- Modal: Continuar Comprando ou Ir para Carrinho -->
    <div id="modalContinueShopping" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-shopping-cart" style="font-size: 40px; color: #fbbf24;"></i>
                <div style="margin-top: 10px;">Produto Adicionado!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 16px; margin-bottom: 10px;">O que deseja fazer?</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-secondary" onclick="closeModalAndContinue()">
                    <i class="fas fa-shopping-basket mr-2"></i>Continuar Comprando
                </button>
                <button class="modal-btn modal-btn-primary" onclick="closeModalAndGoCart()">
                    <i class="fas fa-shopping-cart mr-2"></i>Ir para Carrinho
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Quantidade Zero -->
    <div id="modalQuantityZero" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-exclamation-triangle" style="font-size: 40px; color: #fbbf24;"></i>
                <div style="margin-top: 10px;">Atenção!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 16px;">Por favor, selecione a quantidade.</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">Use as setas + e - para escolher a quantidade desejada.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalQuantityZero')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: PIX Payment -->
    <div id="modalPixPayment" class="custom-modal">
        <div class="modal-content-custom" style="max-width: 450px;">
            <div class="modal-header">
                <i class="fas fa-qrcode" style="font-size: 40px; color: #25d366;"></i>
                <div style="margin-top: 10px;">Pagamento PIX</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 14px; color: #999; margin-bottom: 15px;">Chave PIX:</p>
                <div class="pix-key-display" id="modalPixKey">-</div>
                
                <button class="btn-yellow w-full mb-3" onclick="copyPixFromModal()" style="padding: 12px;">
                    <i class="fas fa-copy mr-2"></i>Copiar PIX
                </button>
                
                <div class="modal-qrcode" id="modalQrCodeSection" style="display: none;">
                    <p style="font-size: 14px; color: #999; margin-bottom: 10px;">QR Code:</p>
                    <img id="modalQrCodeImg" src="" alt="QR Code">
                </div>
                
                <div class="alert-banner">
                    <i class="fas fa-paper-plane mr-2"></i>ENVIAR COMPROVANTE DE PAGAMENTO
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalPixPayment')">
                    <i class="fas fa-times mr-2"></i>Fechar
                </button>
            </div>
        </div>
    </div>

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
        let paymentSettings = { pix_key: '', qrcode_url: '' };
        let selectedPaymentMethod = 'pix';
        let isAdmin = false;
        let currentProduct = null;
        let currentCustomer = null;
        let logoUrl = null;
        let footerLogoUrl = null;

        // ============ FUNÇÕES DOS MODAIS FLUTUANTES ============
        
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        }
        
        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
            }
        }
        
        function closeModalAndContinue() {
            closeModal('modalContinueShopping');
            // Permanece no catálogo
        }
        
        function closeModalAndGoCart() {
            closeModal('modalContinueShopping');
            showCart();
        }
        
        function showQuantityZeroModal() {
            openModal('modalQuantityZero');
        }
        
        function showContinueShoppingModal() {
            openModal('modalContinueShopping');
        }
        
        function showPixModal() {
            // Atualizar chave PIX
            const pixKeyEl = document.getElementById('modalPixKey');
            if (pixKeyEl && paymentSettings.pix_key) {
                pixKeyEl.textContent = paymentSettings.pix_key;
            } else if (pixKeyEl) {
                pixKeyEl.textContent = 'PIX não configurado';
            }
            
            // Atualizar QR Code
            const qrSection = document.getElementById('modalQrCodeSection');
            const qrImg = document.getElementById('modalQrCodeImg');
            if (paymentSettings.qrcode_url) {
                qrImg.src = paymentSettings.qrcode_url;
                qrSection.style.display = 'block';
            } else {
                qrSection.style.display = 'none';
            }
            
            openModal('modalPixPayment');
        }
        
        function copyPixFromModal() {
            const pixKey = paymentSettings.pix_key;
            if (pixKey) {
                // Criar elemento temporário para copiar
                const textarea = document.createElement('textarea');
                textarea.value = pixKey;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                alert('Chave PIX copiada!');
            } else {
                alert('PIX não configurado');
            }
        }

        // ============ CARREGAR DADOS INICIAIS ============

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes, footerLogoRes, paymentRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo'),
                    axios.get('/api/settings/footer-logo'),
                    axios.get('/api/settings/payment')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                footerLogoUrl = footerLogoRes.data.footer_logo_url;
                paymentSettings = paymentRes.data;
                
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
                alert('Por favor, selecione a quantidade.');
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
            
            // MODAL FLUTUANTE: Quantidade zero
            if (currentQty === 0) {
                showQuantityZeroModal();
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
            
            // MODAL FLUTUANTE: Continuar comprando ou ir para carrinho
            showContinueShoppingModal();
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
                            <div class="grid grid-cols-2 gap-3 mb-4">
                                <button id="btnPix" onclick="showPixModal()" class="btn-yellow py-3" style="background-color: #25d366; color: white;">
                                    <i class="fas fa-qrcode mr-2"></i> PIX
                                </button>
                                <button id="btnCash" onclick="selectPayment('cash')" class="btn-yellow py-3">
                                    <i class="fas fa-money-bill mr-2"></i> Dinheiro
                                </button>
                            </div>
                        </div>
                        
                        <!-- Tarja Verde WhatsApp -->
                        <div class="success-banner mt-4">
                            <i class="fas fa-whatsapp mr-2"></i>Por favor, Finalizar Pedido
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mt-4">
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
            
            // Selecionar PIX por padrão
            selectPayment('pix');
        }

        // Selecionar forma de pagamento
        function selectPayment(method) {
            selectedPaymentMethod = method;
            
            const btnPix = document.getElementById('btnPix');
            const btnCash = document.getElementById('btnCash');
            
            if (method === 'pix') {
                if (btnPix) {
                    btnPix.style.backgroundColor = '#25d366';
                    btnPix.style.color = 'white';
                }
                if (btnCash) {
                    btnCash.style.backgroundColor = '';
                    btnCash.style.color = '';
                }
            } else {
                if (btnCash) {
                    btnCash.style.backgroundColor = '#25d366';
                    btnCash.style.color = 'white';
                }
                if (btnPix) {
                    btnPix.style.backgroundColor = '';
                    btnPix.style.color = '';
                }
            }
        }

        // Copiar chave PIX

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
                        <button onclick="showPaymentSettings()" class="btn-yellow w-full py-4">
                            <i class="fas fa-money-bill mr-2"></i> Formas de Pagamento
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

        // Mostrar configurações de pagamento
        async function showPaymentSettings() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Carregar configurações atuais
            const response = await axios.get('/api/settings/payment');
            const settings = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Formas de Pagamento</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Chave PIX</label>
                        <input type="text" id="pixKey" placeholder="Digite a chave PIX" class="input-field" value="\${settings.pix_key || ''}">
                        
                        <label class="block mb-2 text-sm font-bold mt-4">QR Code (200x200)</label>
                        <div class="mb-2">
                            <input type="file" id="qrcodeFile" accept="image/*" class="input-field">
                        </div>
                        
                        \${settings.qrcode_url ? \`
                            <div class="mb-4">
                                <label class="block mb-2 text-sm">QR Code Atual:</label>
                                <img src="\${settings.qrcode_url}" style="width: 200px; height: 200px; object-fit: contain; border: 1px solid #333; border-radius: 8px;" />
                            </div>
                        \` : ''}
                        
                        <button onclick="savePaymentSettings()" class="btn-red w-full mt-4">
                            <i class="fas fa-save mr-2"></i> Salvar Configurações
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Salvar configurações de pagamento
        async function savePaymentSettings() {
            const pixKey = document.getElementById('pixKey').value;
            const qrcodeFile = document.getElementById('qrcodeFile').files[0];
            
            try {
                let qrcodeUrl = '';
                
                // Upload do QR Code se houver arquivo
                if (qrcodeFile) {
                    const reader = new FileReader();
                    reader.onload = async function(e) {
                        try {
                            const uploadResponse = await axios.post('/api/upload', {
                                image: e.target.result,
                                filename: 'qrcode.png'
                            });
                            qrcodeUrl = uploadResponse.data.url;
                            
                            // Salvar configurações
                            await axios.post('/api/settings/payment', {
                                pix_key: pixKey,
                                qrcode_url: qrcodeUrl
                            });
                            
                            alert('Configurações salvas com sucesso!');
                            showPaymentSettings();
                        } catch (error) {
                            console.error('Erro ao fazer upload:', error);
                            alert('Erro ao fazer upload do QR Code. Tente novamente.');
                        }
                    };
                    reader.readAsDataURL(qrcodeFile);
                } else {
                    // Salvar apenas a chave PIX
                    const currentSettings = await axios.get('/api/settings/payment');
                    await axios.post('/api/settings/payment', {
                        pix_key: pixKey,
                        qrcode_url: currentSettings.data.qrcode_url || ''
                    });
                    
                    alert('Configurações salvas com sucesso!');
                    showPaymentSettings();
                }
            } catch (error) {
                console.error('Erro ao salvar configurações:', error);
                alert('Erro ao salvar configurações. Tente novamente.');
            }
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
                    
                    <button onclick="showCustomerFormAdmin()" class="btn-yellow w-full mb-4">
                        <i class="fas fa-plus mr-2"></i> Novo Cliente
                    </button>
                    
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
                                    <button onclick="editCustomerAdmin(\${c.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
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

        // Mostrar formulário de cliente no admin
        async function showCustomerFormAdmin(editId = null) {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            let customer = null;
            if (editId) {
                customer = customers.find(c => c.id === editId);
            }
            
            const html = \`
                <div>
                    <button onclick="showCustomersAdmin()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">\${editId ? 'Alterar Cliente' : 'Novo Cliente'}</h2>
                    
                    <div class="card">
                        <input type="text" id="customerNameAdmin" placeholder="Nome do Cliente" class="input-field" value="\${customer ? customer.name : ''}">
                        <input type="text" id="customerAddressAdmin" placeholder="Endereço" class="input-field" value="\${customer ? customer.address : ''}">
                        <input type="text" id="customerNeighborhoodAdmin" placeholder="Bairro" class="input-field" value="\${customer ? customer.neighborhood : ''}">
                        <input type="text" id="customerZipCodeAdmin" placeholder="CEP" class="input-field" value="\${customer ? customer.zip_code : ''}">
                        <input type="text" id="customerCityAdmin" placeholder="Cidade" class="input-field" value="\${customer ? customer.city : ''}">
                        <input type="tel" id="customerPhoneAdmin" placeholder="Telefone" class="input-field" value="\${customer ? customer.phone : ''}">
                        
                        <button onclick="saveCustomerAdmin(\${editId})" class="btn-red w-full mt-4">
                            <i class="fas fa-save mr-2"></i> Gravar
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Editar cliente no admin
        function editCustomerAdmin(id) {
            showCustomerFormAdmin(id);
        }

        // Salvar cliente no admin
        async function saveCustomerAdmin(editId) {
            const name = document.getElementById('customerNameAdmin').value;
            const address = document.getElementById('customerAddressAdmin').value;
            const neighborhood = document.getElementById('customerNeighborhoodAdmin').value;
            const zip_code = document.getElementById('customerZipCodeAdmin').value;
            const city = document.getElementById('customerCityAdmin').value;
            const phone = document.getElementById('customerPhoneAdmin').value;
            
            if (!name || !address || !neighborhood || !zip_code || !city || !phone) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            try {
                if (editId) {
                    await axios.put(\`/api/customers/\${editId}\`, {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente atualizado com sucesso!');
                } else {
                    await axios.post('/api/customers', {
                        name, address, neighborhood, zip_code, city, phone
                    });
                    alert('Cliente cadastrado com sucesso!');
                }
                showCustomersAdmin();
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
                alert('Erro ao salvar cliente. Tente novamente.');
            }
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
  `));const ze=new pt,Jt=Object.assign({"/src/index.tsx":y});let mt=!1;for(const[,e]of Object.entries(Jt))e&&(ze.all("*",t=>{let o;try{o=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,o)}),ze.notFound(t=>{let o;try{o=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,o)}),mt=!0);if(!mt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
