var gt=Object.defineProperty;var je=e=>{throw TypeError(e)};var bt=(e,t,o)=>t in e?gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var f=(e,t,o)=>bt(e,typeof t!="symbol"?t+"":t,o),$e=(e,t,o)=>t.has(e)||je("Cannot "+o);var i=(e,t,o)=>($e(e,t,"read from private field"),o?o.call(e):t.get(e)),g=(e,t,o)=>t.has(e)?je("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),m=(e,t,o,r)=>($e(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o),y=(e,t,o)=>($e(e,t,"access private method"),o);var De=(e,t,o,r)=>({set _(a){m(e,t,a,o)},get _(){return i(e,t,r)}});var Fe=(e,t,o)=>(r,a)=>{let s=-1;return n(0);async function n(d){if(d<=s)throw new Error("next() called multiple times");s=d;let c,l=!1,u;if(e[d]?(u=e[d][0][0],r.req.routeIndex=d):u=d===e.length&&a||void 0,u)try{c=await u(r,()=>n(d+1))}catch(p){if(p instanceof Error&&t)r.error=p,c=await t(p,r),l=!0;else throw p}else r.finalized===!1&&o&&(c=await o(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},yt=Symbol(),xt=async(e,t=Object.create(null))=>{const{all:o=!1,dot:r=!1}=t,s=(e instanceof ot?e.raw.headers:e.headers).get("Content-Type");return s!=null&&s.startsWith("multipart/form-data")||s!=null&&s.startsWith("application/x-www-form-urlencoded")?vt(e,{all:o,dot:r}):{}};async function vt(e,t){const o=await e.formData();return o?wt(o,t):{}}function wt(e,t){const o=Object.create(null);return e.forEach((r,a)=>{t.all||a.endsWith("[]")?Et(o,a,r):o[a]=r}),t.dot&&Object.entries(o).forEach(([r,a])=>{r.includes(".")&&(Ct(o,r,a),delete o[r])}),o}var Et=(e,t,o)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(o):e[t]=[e[t],o]:t.endsWith("[]")?e[t]=[o]:e[t]=o},Ct=(e,t,o)=>{let r=e;const a=t.split(".");a.forEach((s,n)=>{n===a.length-1?r[s]=o:((!r[s]||typeof r[s]!="object"||Array.isArray(r[s])||r[s]instanceof File)&&(r[s]=Object.create(null)),r=r[s])})},Ye=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},It=e=>{const{groups:t,path:o}=Pt(e),r=Ye(o);return _t(r,t)},Pt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(o,r)=>{const a=`@${r}`;return t.push([a,o]),a}),{groups:t,path:e}},_t=(e,t)=>{for(let o=t.length-1;o>=0;o--){const[r]=t[o];for(let a=e.length-1;a>=0;a--)if(e[a].includes(r)){e[a]=e[a].replace(r,t[o][1]);break}}return e},Pe={},At=(e,t)=>{if(e==="*")return"*";const o=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(o){const r=`${e}#${t}`;return Pe[r]||(o[2]?Pe[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,o[1],new RegExp(`^${o[2]}(?=/${t})`)]:[e,o[1],new RegExp(`^${o[2]}$`)]:Pe[r]=[e,o[1],!0]),Pe[r]}return null},Me=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,o=>{try{return t(o)}catch{return o}})}},Rt=e=>Me(e,decodeURI),Ze=e=>{const t=e.url,o=t.indexOf("/",t.indexOf(":")+4);let r=o;for(;r<t.length;r++){const a=t.charCodeAt(r);if(a===37){const s=t.indexOf("?",r),n=t.slice(o,s===-1?void 0:s);return Rt(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(a===63)break}return t.slice(o,r)},kt=e=>{const t=Ze(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...o)=>(o.length&&(t=re(t,...o)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Je=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),o=[];let r="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){o.length===0&&r===""?o.push("/"):o.push(r);const s=a.replace("?","");r+="/"+s,o.push(r)}else r+="/"+a}),o.filter((a,s,n)=>n.indexOf(a)===s)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Me(e,tt):e):e,et=(e,t,o)=>{let r;if(!o&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const d=e.charCodeAt(n+t.length+1);if(d===61){const c=n+t.length+2,l=e.indexOf("&",c);return Le(e.slice(c,l===-1?void 0:l))}else if(d==38||isNaN(d))return"";n=e.indexOf(`&${t}`,n+1)}if(r=/[%+]/.test(e),!r)return}const a={};r??(r=/[%+]/.test(e));let s=e.indexOf("?",8);for(;s!==-1;){const n=e.indexOf("&",s+1);let d=e.indexOf("=",s);d>n&&n!==-1&&(d=-1);let c=e.slice(s+1,d===-1?n===-1?void 0:n:d);if(r&&(c=Le(c)),s=n,c==="")continue;let l;d===-1?l="":(l=e.slice(d+1,n===-1?void 0:n),r&&(l=Le(l))),o?(a[c]&&Array.isArray(a[c])||(a[c]=[]),a[c].push(l)):a[c]??(a[c]=l)}return t?a[t]:a},St=et,Tt=(e,t)=>et(e,t,!0),tt=decodeURIComponent,Ne=e=>Me(e,tt),ne,R,U,rt,at,qe,N,Qe,ot=(Qe=class{constructor(e,t="/",o=[[]]){g(this,U);f(this,"raw");g(this,ne);g(this,R);f(this,"routeIndex",0);f(this,"path");f(this,"bodyCache",{});g(this,N,e=>{const{bodyCache:t,raw:o}=this,r=t[e];if(r)return r;const a=Object.keys(t)[0];return a?t[a].then(s=>(a==="json"&&(s=JSON.stringify(s)),new Response(s)[e]())):t[e]=o[e]()});this.raw=e,this.path=t,m(this,R,o),m(this,ne,{})}param(e){return e?y(this,U,rt).call(this,e):y(this,U,at).call(this)}query(e){return St(this.url,e)}queries(e){return Tt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((o,r)=>{t[r]=o}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await xt(this,e))}json(){return i(this,N).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,N).call(this,"text")}arrayBuffer(){return i(this,N).call(this,"arrayBuffer")}blob(){return i(this,N).call(this,"blob")}formData(){return i(this,N).call(this,"formData")}addValidatedData(e,t){i(this,ne)[e]=t}valid(e){return i(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[yt](){return i(this,R)}get matchedRoutes(){return i(this,R)[0].map(([[,e]])=>e)}get routePath(){return i(this,R)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,R=new WeakMap,U=new WeakSet,rt=function(e){const t=i(this,R)[0][this.routeIndex][1][e],o=y(this,U,qe).call(this,t);return o&&/\%/.test(o)?Ne(o):o},at=function(){const e={},t=Object.keys(i(this,R)[0][this.routeIndex][1]);for(const o of t){const r=y(this,U,qe).call(this,i(this,R)[0][this.routeIndex][1][o]);r!==void 0&&(e[o]=/\%/.test(r)?Ne(r):r)}return e},qe=function(e){return i(this,R)[1]?i(this,R)[1][e]:e},N=new WeakMap,Qe),Bt={Stringify:1},st=async(e,t,o,r,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const s=e.callbacks;return s!=null&&s.length?(a?a[0]+=e:a=[e],Promise.all(s.map(d=>d({phase:t,buffer:a,context:r}))).then(d=>Promise.all(d.filter(Boolean).map(c=>st(c,t,!1,r,a))).then(()=>a[0]))):Promise.resolve(e)},$t="text/plain; charset=UTF-8",Oe=(e,t)=>({"Content-Type":e,...t}),be,ye,L,ie,O,_,xe,ce,le,X,ve,we,H,ae,We,Lt=(We=class{constructor(e,t){g(this,H);g(this,be);g(this,ye);f(this,"env",{});g(this,L);f(this,"finalized",!1);f(this,"error");g(this,ie);g(this,O);g(this,_);g(this,xe);g(this,ce);g(this,le);g(this,X);g(this,ve);g(this,we);f(this,"render",(...e)=>(i(this,ce)??m(this,ce,t=>this.html(t)),i(this,ce).call(this,...e)));f(this,"setLayout",e=>m(this,xe,e));f(this,"getLayout",()=>i(this,xe));f(this,"setRenderer",e=>{m(this,ce,e)});f(this,"header",(e,t,o)=>{this.finalized&&m(this,_,new Response(i(this,_).body,i(this,_)));const r=i(this,_)?i(this,_).headers:i(this,X)??m(this,X,new Headers);t===void 0?r.delete(e):o!=null&&o.append?r.append(e,t):r.set(e,t)});f(this,"status",e=>{m(this,ie,e)});f(this,"set",(e,t)=>{i(this,L)??m(this,L,new Map),i(this,L).set(e,t)});f(this,"get",e=>i(this,L)?i(this,L).get(e):void 0);f(this,"newResponse",(...e)=>y(this,H,ae).call(this,...e));f(this,"body",(e,t,o)=>y(this,H,ae).call(this,e,t,o));f(this,"text",(e,t,o)=>!i(this,X)&&!i(this,ie)&&!t&&!o&&!this.finalized?new Response(e):y(this,H,ae).call(this,e,t,Oe($t,o)));f(this,"json",(e,t,o)=>y(this,H,ae).call(this,JSON.stringify(e),t,Oe("application/json",o)));f(this,"html",(e,t,o)=>{const r=a=>y(this,H,ae).call(this,a,t,Oe("text/html; charset=UTF-8",o));return typeof e=="object"?st(e,Bt.Stringify,!1,{}).then(r):r(e)});f(this,"redirect",(e,t)=>{const o=String(e);return this.header("Location",/[^\x00-\xFF]/.test(o)?encodeURI(o):o),this.newResponse(null,t??302)});f(this,"notFound",()=>(i(this,le)??m(this,le,()=>new Response),i(this,le).call(this,this)));m(this,be,e),t&&(m(this,O,t.executionCtx),this.env=t.env,m(this,le,t.notFoundHandler),m(this,we,t.path),m(this,ve,t.matchResult))}get req(){return i(this,ye)??m(this,ye,new ot(i(this,be),i(this,we),i(this,ve))),i(this,ye)}get event(){if(i(this,O)&&"respondWith"in i(this,O))return i(this,O);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,O))return i(this,O);throw Error("This context has no ExecutionContext")}get res(){return i(this,_)||m(this,_,new Response(null,{headers:i(this,X)??m(this,X,new Headers)}))}set res(e){if(i(this,_)&&e){e=new Response(e.body,e);for(const[t,o]of i(this,_).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=i(this,_).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of r)e.headers.append("set-cookie",a)}else e.headers.set(t,o)}m(this,_,e),this.finalized=!0}get var(){return i(this,L)?Object.fromEntries(i(this,L)):{}}},be=new WeakMap,ye=new WeakMap,L=new WeakMap,ie=new WeakMap,O=new WeakMap,_=new WeakMap,xe=new WeakMap,ce=new WeakMap,le=new WeakMap,X=new WeakMap,ve=new WeakMap,we=new WeakMap,H=new WeakSet,ae=function(e,t,o){const r=i(this,_)?new Headers(i(this,_).headers):i(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const s=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,d]of s)n.toLowerCase()==="set-cookie"?r.append(n,d):r.set(n,d)}if(o)for(const[s,n]of Object.entries(o))if(typeof n=="string")r.set(s,n);else{r.delete(s);for(const d of n)r.append(s,d)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ie);return new Response(e,{status:a,headers:r})},We),w="ALL",Ot="all",qt=["get","post","put","delete","options","patch"],nt="Can not add a route since the matcher is already built.",it=class extends Error{},Mt="__COMPOSED_HANDLER",Ut=e=>e.text("404 Not Found",404),He=(e,t)=>{if("getResponse"in e){const o=e.getResponse();return t.newResponse(o.body,o)}return console.error(e),t.text("Internal Server Error",500)},k,E,ct,S,G,_e,Ae,de,jt=(de=class{constructor(t={}){g(this,E);f(this,"get");f(this,"post");f(this,"put");f(this,"delete");f(this,"options");f(this,"patch");f(this,"all");f(this,"on");f(this,"use");f(this,"router");f(this,"getPath");f(this,"_basePath","/");g(this,k,"/");f(this,"routes",[]);g(this,S,Ut);f(this,"errorHandler",He);f(this,"onError",t=>(this.errorHandler=t,this));f(this,"notFound",t=>(m(this,S,t),this));f(this,"fetch",(t,...o)=>y(this,E,Ae).call(this,t,o[1],o[0],t.method));f(this,"request",(t,o,r,a)=>t instanceof Request?this.fetch(o?new Request(t,o):t,r,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,o),r,a)));f(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(y(this,E,Ae).call(this,t.request,t,void 0,t.request.method))})});[...qt,Ot].forEach(s=>{this[s]=(n,...d)=>(typeof n=="string"?m(this,k,n):y(this,E,G).call(this,s,i(this,k),n),d.forEach(c=>{y(this,E,G).call(this,s,i(this,k),c)}),this)}),this.on=(s,n,...d)=>{for(const c of[n].flat()){m(this,k,c);for(const l of[s].flat())d.map(u=>{y(this,E,G).call(this,l.toUpperCase(),i(this,k),u)})}return this},this.use=(s,...n)=>(typeof s=="string"?m(this,k,s):(m(this,k,"*"),n.unshift(s)),n.forEach(d=>{y(this,E,G).call(this,w,i(this,k),d)}),this);const{strict:r,...a}=t;Object.assign(this,a),this.getPath=r??!0?t.getPath??Ze:kt}route(t,o){const r=this.basePath(t);return o.routes.map(a=>{var n;let s;o.errorHandler===He?s=a.handler:(s=async(d,c)=>(await Fe([],o.errorHandler)(d,()=>a.handler(d,c))).res,s[Mt]=a.handler),y(n=r,E,G).call(n,a.method,a.path,s)}),this}basePath(t){const o=y(this,E,ct).call(this);return o._basePath=re(this._basePath,t),o}mount(t,o,r){let a,s;r&&(typeof r=="function"?s=r:(s=r.optionHandler,r.replaceRequest===!1?a=c=>c:a=r.replaceRequest));const n=s?c=>{const l=s(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};a||(a=(()=>{const c=re(this._basePath,t),l=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(l)||"/",new Request(p,u)}})());const d=async(c,l)=>{const u=await o(a(c.req.raw),...n(c));if(u)return u;await l()};return y(this,E,G).call(this,w,re(t,"*"),d),this}},k=new WeakMap,E=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,m(t,S,i(this,S)),t.routes=this.routes,t},S=new WeakMap,G=function(t,o,r){t=t.toUpperCase(),o=re(this._basePath,o);const a={basePath:this._basePath,path:o,method:t,handler:r};this.router.add(t,o,[r,a]),this.routes.push(a)},_e=function(t,o){if(t instanceof Error)return this.errorHandler(t,o);throw t},Ae=function(t,o,r,a){if(a==="HEAD")return(async()=>new Response(null,await y(this,E,Ae).call(this,t,o,r,"GET")))();const s=this.getPath(t,{env:r}),n=this.router.match(a,s),d=new Lt(t,{path:s,matchResult:n,env:r,executionCtx:o,notFoundHandler:i(this,S)});if(n[0].length===1){let l;try{l=n[0][0][0][0](d,async()=>{d.res=await i(this,S).call(this,d)})}catch(u){return y(this,E,_e).call(this,u,d)}return l instanceof Promise?l.then(u=>u||(d.finalized?d.res:i(this,S).call(this,d))).catch(u=>y(this,E,_e).call(this,u,d)):l??i(this,S).call(this,d)}const c=Fe(n[0],this.errorHandler,i(this,S));return(async()=>{try{const l=await c(d);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return y(this,E,_e).call(this,l,d)}})()},de),lt=[];function Dt(e,t){const o=this.buildAllMatchers(),r=((a,s)=>{const n=o[a]||o[w],d=n[2][s];if(d)return d;const c=s.match(n[0]);if(!c)return[[],lt];const l=c.indexOf("",1);return[n[1][l],c]});return this.match=r,r(e,t)}var ke="[^/]+",he=".*",ge="(?:|/.*)",se=Symbol(),Ft=new Set(".\\+*[^]$()");function Nt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===he||e===ge?1:t===he||t===ge?-1:e===ke?1:t===ke?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Y,Z,T,te,Ht=(te=class{constructor(){g(this,Y);g(this,Z);g(this,T,Object.create(null))}insert(t,o,r,a,s){if(t.length===0){if(i(this,Y)!==void 0)throw se;if(s)return;m(this,Y,o);return}const[n,...d]=t,c=n==="*"?d.length===0?["","",he]:["","",ke]:n==="/*"?["","",ge]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const u=c[1];let p=c[2]||ke;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw se;if(l=i(this,T)[p],!l){if(Object.keys(i(this,T)).some(h=>h!==he&&h!==ge))throw se;if(s)return;l=i(this,T)[p]=new te,u!==""&&m(l,Z,a.varIndex++)}!s&&u!==""&&r.push([u,i(l,Z)])}else if(l=i(this,T)[n],!l){if(Object.keys(i(this,T)).some(u=>u.length>1&&u!==he&&u!==ge))throw se;if(s)return;l=i(this,T)[n]=new te}l.insert(d,o,r,a,s)}buildRegExpStr(){const o=Object.keys(i(this,T)).sort(Nt).map(r=>{const a=i(this,T)[r];return(typeof i(a,Z)=="number"?`(${r})@${i(a,Z)}`:Ft.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof i(this,Y)=="number"&&o.unshift(`#${i(this,Y)}`),o.length===0?"":o.length===1?o[0]:"(?:"+o.join("|")+")"}},Y=new WeakMap,Z=new WeakMap,T=new WeakMap,te),Se,Ee,Ve,zt=(Ve=class{constructor(){g(this,Se,{varIndex:0});g(this,Ee,new Ht)}insert(e,t,o){const r=[],a=[];for(let n=0;;){let d=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${n}`;return a[n]=[l,c],n++,d=!0,l}),!d)break}const s=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=a.length-1;n>=0;n--){const[d]=a[n];for(let c=s.length-1;c>=0;c--)if(s[c].indexOf(d)!==-1){s[c]=s[c].replace(d,a[n][1]);break}}return i(this,Ee).insert(s,t,r,i(this,Se),o),r}buildRegExp(){let e=i(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const o=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,s,n)=>s!==void 0?(o[++t]=Number(s),"$()"):(n!==void 0&&(r[Number(n)]=++t),"")),[new RegExp(`^${e}`),o,r]}},Se=new WeakMap,Ee=new WeakMap,Ve),Qt=[/^$/,[],Object.create(null)],Re=Object.create(null);function dt(e){return Re[e]??(Re[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,o)=>o?`\\${o}`:"(?:|/.*)")}$`))}function Wt(){Re=Object.create(null)}function Vt(e){var l;const t=new zt,o=[];if(e.length===0)return Qt;const r=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[h,x])=>u?1:h?-1:p.length-x.length),a=Object.create(null);for(let u=0,p=-1,h=r.length;u<h;u++){const[x,A,j]=r[u];x?a[A]=[j.map(([P])=>[P,Object.create(null)]),lt]:p++;let v;try{v=t.insert(A,p,x)}catch(P){throw P===se?new it(A):P}x||(o[p]=j.map(([P,D])=>{const Ce=Object.create(null);for(D-=1;D>=0;D--){const[Ie,B]=v[D];Ce[Ie]=B}return[P,Ce]}))}const[s,n,d]=t.buildRegExp();for(let u=0,p=o.length;u<p;u++)for(let h=0,x=o[u].length;h<x;h++){const A=(l=o[u][h])==null?void 0:l[1];if(!A)continue;const j=Object.keys(A);for(let v=0,P=j.length;v<P;v++)A[j[v]]=d[A[j[v]]]}const c=[];for(const u in n)c[u]=o[n[u]];return[s,c,a]}function oe(e,t){if(e){for(const o of Object.keys(e).sort((r,a)=>a.length-r.length))if(dt(o).test(t))return[...e[o]]}}var z,Q,Te,ut,Ge,Gt=(Ge=class{constructor(){g(this,Te);f(this,"name","RegExpRouter");g(this,z);g(this,Q);f(this,"match",Dt);m(this,z,{[w]:Object.create(null)}),m(this,Q,{[w]:Object.create(null)})}add(e,t,o){var d;const r=i(this,z),a=i(this,Q);if(!r||!a)throw new Error(nt);r[e]||[r,a].forEach(c=>{c[e]=Object.create(null),Object.keys(c[w]).forEach(l=>{c[e][l]=[...c[w][l]]})}),t==="/*"&&(t="*");const s=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=dt(t);e===w?Object.keys(r).forEach(l=>{var u;(u=r[l])[t]||(u[t]=oe(r[l],t)||oe(r[w],t)||[])}):(d=r[e])[t]||(d[t]=oe(r[e],t)||oe(r[w],t)||[]),Object.keys(r).forEach(l=>{(e===w||e===l)&&Object.keys(r[l]).forEach(u=>{c.test(u)&&r[l][u].push([o,s])})}),Object.keys(a).forEach(l=>{(e===w||e===l)&&Object.keys(a[l]).forEach(u=>c.test(u)&&a[l][u].push([o,s]))});return}const n=Je(t)||[t];for(let c=0,l=n.length;c<l;c++){const u=n[c];Object.keys(a).forEach(p=>{var h;(e===w||e===p)&&((h=a[p])[u]||(h[u]=[...oe(r[p],u)||oe(r[w],u)||[]]),a[p][u].push([o,s-l+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,Q)).concat(Object.keys(i(this,z))).forEach(t=>{e[t]||(e[t]=y(this,Te,ut).call(this,t))}),m(this,z,m(this,Q,void 0)),Wt(),e}},z=new WeakMap,Q=new WeakMap,Te=new WeakSet,ut=function(e){const t=[];let o=e===w;return[i(this,z),i(this,Q)].forEach(r=>{const a=r[e]?Object.keys(r[e]).map(s=>[s,r[e][s]]):[];a.length!==0?(o||(o=!0),t.push(...a)):e!==w&&t.push(...Object.keys(r[w]).map(s=>[s,r[w][s]]))}),o?Vt(t):null},Ge),W,q,Ke,Kt=(Ke=class{constructor(e){f(this,"name","SmartRouter");g(this,W,[]);g(this,q,[]);m(this,W,e.routers)}add(e,t,o){if(!i(this,q))throw new Error(nt);i(this,q).push([e,t,o])}match(e,t){if(!i(this,q))throw new Error("Fatal error");const o=i(this,W),r=i(this,q),a=o.length;let s=0,n;for(;s<a;s++){const d=o[s];try{for(let c=0,l=r.length;c<l;c++)d.add(...r[c]);n=d.match(e,t)}catch(c){if(c instanceof it)continue;throw c}this.match=d.match.bind(d),m(this,W,[d]),m(this,q,void 0);break}if(s===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(i(this,q)||i(this,W).length!==1)throw new Error("No active router has been determined yet.");return i(this,W)[0]}},W=new WeakMap,q=new WeakMap,Ke),fe=Object.create(null),V,I,J,ue,C,M,K,pe,Xt=(pe=class{constructor(t,o,r){g(this,M);g(this,V);g(this,I);g(this,J);g(this,ue,0);g(this,C,fe);if(m(this,I,r||Object.create(null)),m(this,V,[]),t&&o){const a=Object.create(null);a[t]={handler:o,possibleKeys:[],score:0},m(this,V,[a])}m(this,J,[])}insert(t,o,r){m(this,ue,++De(this,ue)._);let a=this;const s=It(o),n=[];for(let d=0,c=s.length;d<c;d++){const l=s[d],u=s[d+1],p=At(l,u),h=Array.isArray(p)?p[0]:l;if(h in i(a,I)){a=i(a,I)[h],p&&n.push(p[1]);continue}i(a,I)[h]=new pe,p&&(i(a,J).push(p),n.push(p[1])),a=i(a,I)[h]}return i(a,V).push({[t]:{handler:r,possibleKeys:n.filter((d,c,l)=>l.indexOf(d)===c),score:i(this,ue)}}),a}search(t,o){var c;const r=[];m(this,C,fe);let s=[this];const n=Ye(o),d=[];for(let l=0,u=n.length;l<u;l++){const p=n[l],h=l===u-1,x=[];for(let A=0,j=s.length;A<j;A++){const v=s[A],P=i(v,I)[p];P&&(m(P,C,i(v,C)),h?(i(P,I)["*"]&&r.push(...y(this,M,K).call(this,i(P,I)["*"],t,i(v,C))),r.push(...y(this,M,K).call(this,P,t,i(v,C)))):x.push(P));for(let D=0,Ce=i(v,J).length;D<Ce;D++){const Ie=i(v,J)[D],B=i(v,C)===fe?{}:{...i(v,C)};if(Ie==="*"){const F=i(v,I)["*"];F&&(r.push(...y(this,M,K).call(this,F,t,i(v,C))),m(F,C,B),x.push(F));continue}const[ft,Ue,me]=Ie;if(!p&&!(me instanceof RegExp))continue;const $=i(v,I)[ft],ht=n.slice(l).join("/");if(me instanceof RegExp){const F=me.exec(ht);if(F){if(B[Ue]=F[0],r.push(...y(this,M,K).call(this,$,t,i(v,C),B)),Object.keys(i($,I)).length){m($,C,B);const Be=((c=F[0].match(/\//))==null?void 0:c.length)??0;(d[Be]||(d[Be]=[])).push($)}continue}}(me===!0||me.test(p))&&(B[Ue]=p,h?(r.push(...y(this,M,K).call(this,$,t,B,i(v,C))),i($,I)["*"]&&r.push(...y(this,M,K).call(this,i($,I)["*"],t,B,i(v,C)))):(m($,C,B),x.push($)))}}s=x.concat(d.shift()??[])}return r.length>1&&r.sort((l,u)=>l.score-u.score),[r.map(({handler:l,params:u})=>[l,u])]}},V=new WeakMap,I=new WeakMap,J=new WeakMap,ue=new WeakMap,C=new WeakMap,M=new WeakSet,K=function(t,o,r,a){const s=[];for(let n=0,d=i(t,V).length;n<d;n++){const c=i(t,V)[n],l=c[o]||c[w],u={};if(l!==void 0&&(l.params=Object.create(null),s.push(l),r!==fe||a&&a!==fe))for(let p=0,h=l.possibleKeys.length;p<h;p++){const x=l.possibleKeys[p],A=u[l.score];l.params[x]=a!=null&&a[x]&&!A?a[x]:r[x]??(a==null?void 0:a[x]),u[l.score]=!0}}return s},pe),ee,Xe,Yt=(Xe=class{constructor(){f(this,"name","TrieRouter");g(this,ee);m(this,ee,new Xt)}add(e,t,o){const r=Je(t);if(r){for(let a=0,s=r.length;a<s;a++)i(this,ee).insert(e,r[a],o);return}i(this,ee).insert(e,t,o)}match(e,t){return i(this,ee).search(e,t)}},ee=new WeakMap,Xe),pt=class extends jt{constructor(e={}){super(e),this.router=e.router??new Kt({routers:[new Gt,new Yt]})}},Zt=e=>{const o={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},r=(s=>typeof s=="string"?s==="*"?()=>s:n=>s===n?n:null:typeof s=="function"?s:n=>s.includes(n)?n:null)(o.origin),a=(s=>typeof s=="function"?s:Array.isArray(s)?()=>s:()=>[])(o.allowMethods);return async function(n,d){var u;function c(p,h){n.res.headers.set(p,h)}const l=await r(n.req.header("origin")||"",n);if(l&&c("Access-Control-Allow-Origin",l),o.credentials&&c("Access-Control-Allow-Credentials","true"),(u=o.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",o.exposeHeaders.join(",")),n.req.method==="OPTIONS"){o.origin!=="*"&&c("Vary","Origin"),o.maxAge!=null&&c("Access-Control-Max-Age",o.maxAge.toString());const p=await a(n.req.header("origin")||"",n);p.length&&c("Access-Control-Allow-Methods",p.join(","));let h=o.allowHeaders;if(!(h!=null&&h.length)){const x=n.req.header("Access-Control-Request-Headers");x&&(h=x.split(/\s*,\s*/))}return h!=null&&h.length&&(c("Access-Control-Allow-Headers",h.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await d(),o.origin!=="*"&&n.header("Vary","Origin",{append:!0})}};const b=new pt;b.use("/api/*",Zt());b.post("/api/auth/verify",async e=>{const{password:t}=await e.req.json();return e.json({success:t==="123"})});b.get("/api/products",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT * FROM products ORDER BY id DESC").all();return e.json(o)});b.get("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT * FROM products WHERE id = ?").bind(o).all();return e.json(r[0]||null)});b.post("/api/products",async e=>{const{DB:t}=e.env,{name:o,price:r,brand:a,stock_quantity:s,image_url:n,cold_quantity:d,hot_quantity:c,unit_type:l,category:u,price_cold:p,price_hot:h}=await e.req.json(),x=await t.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url, cold_quantity, hot_quantity, unit_type, category, price_cold, price_hot) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(o,r,a,s||0,n||null,d||0,c||0,l||"Unidade",u||"Bebidas",p||0,h||0).run();return e.json({id:x.meta.last_row_id,success:!0})});b.put("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{name:r,price:a,brand:s,stock_quantity:n,image_url:d,cold_quantity:c,hot_quantity:l,unit_type:u,category:p,price_cold:h,price_hot:x}=await e.req.json();return await t.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ?, cold_quantity = ?, hot_quantity = ?, unit_type = ?, category = ?, price_cold = ?, price_hot = ? WHERE id = ?").bind(r,a,s,n,d,c,l,u,p,h,x,o).run(),e.json({success:!0})});b.delete("/api/products/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id");return await t.prepare("DELETE FROM products WHERE id = ?").bind(o).run(),e.json({success:!0})});b.get("/api/customers",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT * FROM customers ORDER BY name").all();return e.json(o)});b.get("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT * FROM customers WHERE id = ?").bind(o).all();return e.json(r[0]||null)});b.post("/api/customers",async e=>{const{DB:t}=e.env,{name:o,address:r,neighborhood:a,zip_code:s,city:n,phone:d}=await e.req.json(),c=await t.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(o,r,a,s,n,d).run();return e.json({id:c.meta.last_row_id,success:!0})});b.put("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{name:r,address:a,neighborhood:s,zip_code:n,city:d,phone:c}=await e.req.json();return await t.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(r,a,s,n,d,c,o).run(),e.json({success:!0})});b.delete("/api/customers/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id");return await t.prepare("DELETE FROM customers WHERE id = ?").bind(o).run(),e.json({success:!0})});b.post("/api/orders",async e=>{const{DB:t}=e.env,{customer_id:o,items:r,payment_method:a,total_amount:s}=await e.req.json(),d=(await t.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(o,s,a).run()).meta.last_row_id;for(const c of r)await t.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(d,c.product_id,c.quantity,c.unit_price,c.total_price).run();return e.json({id:d,success:!0})});b.get("/api/orders/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{results:r}=await t.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(o).all();if(!r.length)return e.json(null);const a=r[0],{results:s}=await t.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(o).all();return e.json({...a,items:s})});b.get("/api/settings/logo",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return e.json({logo_url:((r=o[0])==null?void 0:r.value)||null})});b.post("/api/settings/logo",async e=>{const{DB:t}=e.env,{logo_url:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});b.get("/api/settings/footer-logo",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'footer_logo_url'").all();return e.json({footer_logo_url:((r=o[0])==null?void 0:r.value)||null})});b.post("/api/settings/footer-logo",async e=>{const{DB:t}=e.env,{footer_logo_url:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('footer_logo_url', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});b.get("/api/settings/branches",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'branches'").all();return e.json({branches:((r=o[0])==null?void 0:r.value)||""})});b.post("/api/settings/branches",async e=>{const{DB:t}=e.env,{branches:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('branches', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});b.get("/api/settings/payment",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT key, value FROM settings WHERE key IN ('pix_key', 'qrcode_url')").all(),r={pix_key:"",qrcode_url:""};return o.forEach(a=>{a.key==="pix_key"&&(r.pix_key=a.value||""),a.key==="qrcode_url"&&(r.qrcode_url=a.value||"")}),e.json(r)});b.post("/api/settings/payment",async e=>{const{DB:t}=e.env,{pix_key:o,qrcode_url:r}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('pix_key', ?, CURRENT_TIMESTAMP)").bind(o||"").run(),await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('qrcode_url', ?, CURRENT_TIMESTAMP)").bind(r||"").run(),e.json({success:!0})});b.post("/api/upload",async e=>{try{const{image:t,filename:o}=await e.req.json(),r=t.split(",")[1]||t,a=atob(r),s=new Uint8Array(a.length);for(let c=0;c<a.length;c++)s[c]=a.charCodeAt(c);const n=`${Date.now()}-${o}`,d=t;return e.json({success:!0,url:d})}catch(t){return console.error("Upload error:",t),e.json({success:!1,error:"Upload failed"},500)}});b.get("/api/users",async e=>{const{DB:t}=e.env,{results:o}=await t.prepare("SELECT id, username, created_at FROM users ORDER BY id").all();return e.json(o)});b.post("/api/users",async e=>{const{DB:t}=e.env,{username:o,password:r}=await e.req.json(),a=await t.prepare("INSERT INTO users (username, password) VALUES (?, ?)").bind(o,r).run();return e.json({id:a.meta.last_row_id,success:!0})});b.put("/api/users/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id"),{username:r,password:a}=await e.req.json();return await t.prepare("UPDATE users SET username = ?, password = ? WHERE id = ?").bind(r,a,o).run(),e.json({success:!0})});b.delete("/api/users/:id",async e=>{const{DB:t}=e.env,o=e.req.param("id");return await t.prepare("DELETE FROM users WHERE id = ?").bind(o).run(),e.json({success:!0})});b.post("/api/users/login",async e=>{const{DB:t}=e.env,{username:o,password:r}=await e.req.json(),{results:a}=await t.prepare("SELECT id, username FROM users WHERE username = ? AND password = ?").bind(o,r).all();return a.length>0?e.json({success:!0,user:a[0]}):e.json({success:!1,message:"Usuário ou senha inválidos"},401)});b.get("/api/settings/system-whatsapp",async e=>{var r;const{DB:t}=e.env,{results:o}=await t.prepare("SELECT value FROM settings WHERE key = 'system_whatsapp'").all();return e.json({system_whatsapp:((r=o[0])==null?void 0:r.value)||"5518996936262"})});b.post("/api/settings/system-whatsapp",async e=>{const{DB:t}=e.env,{system_whatsapp:o}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('system_whatsapp', ?, CURRENT_TIMESTAMP)").bind(o).run(),e.json({success:!0})});b.get("/",e=>e.html(`
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

    <!-- Modal: PIX Copiado -->
    <div id="modalPixCopied" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 40px; color: #25d366;"></i>
                <div style="margin-top: 10px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 18px; font-weight: bold; color: #25d366;">PIX Copiado</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">A chave PIX foi copiada para a área de transferência.</p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalPixCopied')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Pedido Enviado com Sucesso -->
    <div id="modalOrderSuccess" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Pedido enviado com sucesso!
                </p>
                <p style="font-size: 14px; color: #999;">
                    Seu pedido foi enviado para o WhatsApp e em breve será processado.
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModalAndGoHome()">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Produto Atualizado com Sucesso -->
    <div id="modalProductUpdated" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-check-circle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Sucesso!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Produto atualizado com sucesso!
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalProductUpdated')">
                    <i class="fas fa-check mr-2"></i>OK
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Selecione um Cliente -->
    <div id="modalSelectCustomer" class="custom-modal">
        <div class="modal-content-custom">
            <div class="modal-header">
                <i class="fas fa-exclamation-triangle" style="font-size: 50px; color: #fbbf24;"></i>
                <div style="margin-top: 10px; font-size: 22px;">Atenção!</div>
            </div>
            <div class="modal-body">
                <p style="font-size: 20px; font-weight: bold; color: #fbbf24; margin-bottom: 15px;">
                    Por favor, selecione um cliente!
                </p>
                <p style="font-size: 14px; color: #999;">
                    É necessário selecionar um cliente antes de finalizar o pedido.
                </p>
            </div>
            <div class="modal-footer">
                <button class="modal-btn modal-btn-primary" onclick="closeModal('modalSelectCustomer')">
                    <i class="fas fa-check mr-2"></i>OK
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
        let systemWhatsapp = '5518996936262';
        let users = [];

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
        
        function closeModalAndGoHome() {
            closeModal('modalOrderSuccess');
            showHome();
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
                
                // Mostrar modal de sucesso
                openModal('modalPixCopied');
            } else {
                alert('PIX não configurado');
            }
        }

        // ============ CARREGAR DADOS INICIAIS ============

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes, footerLogoRes, paymentRes, whatsappRes, usersRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo'),
                    axios.get('/api/settings/footer-logo'),
                    axios.get('/api/settings/payment'),
                    axios.get('/api/settings/system-whatsapp'),
                    axios.get('/api/users')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                footerLogoUrl = footerLogoRes.data.footer_logo_url;
                paymentSettings = paymentRes.data;
                systemWhatsapp = whatsappRes.data.system_whatsapp;
                users = usersRes.data;
                
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
                                        
                                        <!-- Seleção de Temperatura (ANTES DO PREÇO) -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Gelada ou Quente:</label>
                                            <select id="temp-\${p.id}" class="input-field" style="padding: 6px; font-size: 14px;" onchange="updatePrice(\${p.id})">
                                                <option value="Gelada">Gelada</option>
                                                <option value="Quente">Quente</option>
                                            </select>
                                        </div>
                                        
                                        <!-- Preço dinâmico -->
                                        <p class="text-yellow-400 font-bold text-xl mb-2" id="price-\${p.id}">R$ \${parseFloat(p.price_cold || p.price).toFixed(2)}</p>
                                        
                                        <!-- Tipo (somente leitura) -->
                                        <div class="mb-2">
                                            <label class="text-xs text-gray-400">Tipo:</label>
                                            <div style="padding: 6px; font-size: 14px; color: #fbbf24; font-weight: bold;">
                                                \${p.unit_type}
                                            </div>
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
            const temperature = tempSelect ? tempSelect.value : 'Gelada';
            const type = product.unit_type; // Usar o tipo do produto diretamente
            
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
                        
                        <!-- Mensagem Finalizar Pedido -->
                        <div class="mt-4" style="text-align: center;">
                            <p style="color: #dc2626; font-weight: bold; font-size: 16px;">
                                Por favor, Finalizar Pedido
                            </p>
                        </div>
                        
                        <div class="mt-4">
                            <button onclick="finishOrder()" class="btn-red w-full py-4 text-lg">
                                <i class="fas fa-check mr-2"></i> Finalizar Pedido
                            </button>
                        </div>
                    \`}
                </div>
            \`;
            content.innerHTML = html;
            
            // Selecionar PIX por padrão
            selectPayment('pix');
            
            // Abrir modal PIX automaticamente se houver itens no carrinho
            if (cart.length > 0) {
                // Aguardar um momento para o DOM estar pronto
                setTimeout(() => {
                    showPixModal();
                }, 300);
            }
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
            
            if (!customerSelect.value) {
                openModal('modalSelectCustomer');
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
                    payment_method: selectedPaymentMethod === 'pix' ? \`PIX - \${paymentSettings.pix_key}\` : 'Dinheiro',
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
                    message += \`  \${item.temperature || 'Normal'} - \${item.type || 'Unidade'}\\n\`;
                    message += \`  Qtd: \${item.quantity} x R$ \${item.unit_price.toFixed(2)} = R$ \${item.total_price.toFixed(2)}\\n\`;
                });
                
                message += \`\\n*TOTAL: R$ \${total.toFixed(2)}*\\n\`;
                message += \`*Pagamento:* \${selectedPaymentMethod === 'pix' ? \`PIX - \${paymentSettings.pix_key}\` : 'Dinheiro'}\`;
                
                // Enviar para WhatsApp do SISTEMA (primeiro)
                const systemWhatsappUrl = \`https://wa.me/\${systemWhatsapp}?text=\${encodeURIComponent(message)}\`;
                window.open(systemWhatsappUrl, '_blank');
                
                // Aguardar 1 segundo e enviar para WhatsApp do CLIENTE
                setTimeout(() => {
                    // Remover caracteres não numéricos do telefone do cliente
                    const customerPhone = customer.phone.replace(/D/g, '');
                    const customerWhatsappUrl = \`https://wa.me/55\${customerPhone}?text=\${encodeURIComponent(message)}\`;
                    window.open(customerWhatsappUrl, '_blank');
                }, 1000);
                
                // Limpar carrinho
                cart = [];
                updateCartBadge();
                
                // Mostrar modal de sucesso
                openModal('modalOrderSuccess');
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
                        <label class="block mb-2 text-sm font-bold">Usuário</label>
                        <input type="text" id="adminUsername" placeholder="Digite o usuário" class="input-field mb-4">
                        
                        <label class="block mb-2 text-sm font-bold">Senha</label>
                        <input type="password" id="adminPassword" placeholder="Digite a senha" class="input-field">
                        
                        <button onclick="verifyAdmin()" class="btn-red w-full mt-4">
                            <i class="fas fa-lock mr-2"></i> Entrar
                        </button>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }

        // Verificar usuário e senha admin
        async function verifyAdmin() {
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            if (!username || !password) {
                alert('Por favor, preencha usuário e senha!');
                return;
            }
            
            try {
                const res = await axios.post('/api/users/login', { username, password });
                if (res.data.success) {
                    isAdmin = true;
                    showAdminPanel();
                } else {
                    alert('Usuário ou senha incorretos!');
                }
            } catch (error) {
                alert('Usuário ou senha incorretos!');
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
                        <button onclick="showSystemConfig()" class="btn-yellow w-full py-4">
                            <i class="fas fa-cogs mr-2"></i> Configuração do Sistema
                        </button>
                        <button onclick="showUsersAdmin()" class="btn-yellow w-full py-4">
                            <i class="fas fa-user-lock mr-2"></i> Usuários
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
        // ============ CONFIGURAÇÃO DO SISTEMA ============
        
        let currentSystemConfigId = null;
        
        async function showSystemConfig() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Carregar WhatsApp do sistema
            const response = await axios.get('/api/settings/system-whatsapp');
            const whatsapp = response.data.system_whatsapp;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Configuração do Sistema</h2>
                    
                    <div class="card">
                        <label class="block mb-2 text-sm font-bold">Link do WhatsApp:</label>
                        <input type="text" id="systemWhatsappInput" placeholder="Ex: 5518996936262" class="input-field" value="\${whatsapp}">
                        
                        <div class="grid grid-cols-2 gap-3 mt-4">
                            <button onclick="newSystemConfig()" class="btn-yellow">
                                <i class="fas fa-plus mr-2"></i> Novo
                            </button>
                            <button onclick="saveSystemConfig()" class="btn-red">
                                <i class="fas fa-save mr-2"></i> Salvar
                            </button>
                        </div>
                        
                        <p class="text-sm text-gray-400 mt-4">
                            <i class="fas fa-info-circle mr-1"></i>
                            Este WhatsApp receberá uma cópia de todos os pedidos finalizados.
                        </p>
                    </div>
                </div>
            \`;
            content.innerHTML = html;
        }
        
        function newSystemConfig() {
            document.getElementById('systemWhatsappInput').value = '';
            currentSystemConfigId = null;
        }
        
        async function saveSystemConfig() {
            const whatsapp = document.getElementById('systemWhatsappInput').value;
            
            if (!whatsapp) {
                alert('Por favor, preencha o WhatsApp do sistema');
                return;
            }
            
            try {
                await axios.post('/api/settings/system-whatsapp', {
                    system_whatsapp: whatsapp
                });
                
                systemWhatsapp = whatsapp;
                alert('Configuração salva com sucesso!');
                showSystemConfig();
            } catch (error) {
                console.error('Erro ao salvar configuração:', error);
                alert('Erro ao salvar configuração. Tente novamente.');
            }
        }
        
        // ============ GERENCIAR USUÁRIOS ============
        
        let currentUserId = null;
        
        async function showUsersAdmin() {
            if (!isAdmin) {
                showAdminLogin();
                return;
            }
            
            hideHome();
            const content = document.getElementById('dynamic-content');
            
            // Recarregar lista de usuários
            const response = await axios.get('/api/users');
            users = response.data;
            
            const html = \`
                <div>
                    <button onclick="showAdminPanel()" class="btn-black mb-4">
                        <i class="fas fa-arrow-left mr-2"></i> Voltar
                    </button>
                    <h2 class="text-2xl font-bold text-center mb-6 text-yellow-400">Gerenciar Usuários</h2>
                    
                    <div class="card mb-4">
                        <label class="block mb-2 text-sm font-bold">Usuário:</label>
                        <input type="text" id="userUsername" placeholder="Digite o usuário" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold mt-3">Senha:</label>
                        <input type="password" id="userPassword" placeholder="Digite a senha" class="input-field">
                        
                        <div class="grid grid-cols-4 gap-2 mt-4">
                            <button onclick="newUser()" class="btn-yellow">
                                <i class="fas fa-plus mr-1"></i> Novo
                            </button>
                            <button onclick="saveUser()" class="btn-red">
                                <i class="fas fa-save mr-1"></i> Salvar
                            </button>
                            <button onclick="saveUser()" class="btn-yellow" style="font-size: 13px;">
                                <i class="fas fa-edit mr-1"></i> Alterar
                            </button>
                            <button onclick="deleteCurrentUser()" class="btn-red">
                                <i class="fas fa-trash mr-1"></i> Excluir
                            </button>
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-bold mb-3 text-yellow-400">Usuários Cadastrados</h3>
                    <div class="space-y-2">
                        \${users.map(u => \`
                            <div class="card flex justify-between items-center">
                                <div>
                                    <p class="font-bold">\${u.username}</p>
                                    <p class="text-sm text-gray-400">ID: \${u.id}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editUser(\${u.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteUser(\${u.id})" class="btn-red" style="padding: 8px 12px;">
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
        
        function newUser() {
            document.getElementById('userUsername').value = '';
            document.getElementById('userPassword').value = '';
            currentUserId = null;
        }
        
        async function saveUser() {
            const username = document.getElementById('userUsername').value;
            const password = document.getElementById('userPassword').value;
            
            if (!username || !password) {
                alert('Por favor, preencha todos os campos');
                return;
            }
            
            try {
                if (currentUserId) {
                    // Atualizar usuário existente
                    await axios.put(\`/api/users/\${currentUserId}\`, {
                        username,
                        password
                    });
                    alert('Usuário atualizado com sucesso!');
                } else {
                    // Criar novo usuário
                    await axios.post('/api/users', {
                        username,
                        password
                    });
                    alert('Usuário criado com sucesso!');
                }
                
                showUsersAdmin();
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
                alert('Erro ao salvar usuário. Tente novamente.');
            }
        }
        
        async function editUser(id) {
            const user = users.find(u => u.id === id);
            if (!user) return;
            
            currentUserId = id;
            document.getElementById('userUsername').value = user.username;
            document.getElementById('userPassword').value = '';
            
            // Scroll para o formulário
            window.scrollTo(0, 0);
        }
        
        async function deleteUser(id) {
            if (!confirm('Deseja realmente excluir este usuário?')) return;
            
            try {
                await axios.delete(\`/api/users/\${id}\`);
                alert('Usuário excluído com sucesso!');
                showUsersAdmin();
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                alert('Erro ao excluir usuário. Tente novamente.');
            }
        }
        
        function deleteCurrentUser() {
            if (!currentUserId) {
                alert('Selecione um usuário para excluir');
                return;
            }
            
            deleteUser(currentUserId);
        }

        // ============ GERENCIAR CLIENTES (ADMIN) ============

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
                        
                        <label class="block mb-2 text-sm font-bold">Marca</label>
                        <input type="text" id="productBrand" placeholder="Ex: Heineken" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Quantidade</label>
                        <input type="number" id="productQuantity" placeholder="Ex: 100" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Valor Gelada</label>
                        <input type="number" step="0.01" id="productCold" placeholder="Ex: 38.50" class="input-field">
                        
                        <label class="block mb-2 text-sm font-bold">Valor Quente</label>
                        <input type="number" step="0.01" id="productHot" placeholder="Ex: 36.00" class="input-field">
                        
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
            const brand = document.getElementById('productBrand').value;
            const quantity = document.getElementById('productQuantity').value;
            const cold = document.getElementById('productCold').value;
            const hot = document.getElementById('productHot').value;
            const type = document.getElementById('productType').value;
            const category = document.getElementById('productCategory').value;
            const imageInput = document.getElementById('productImage');
            
            if (!name || !brand || !cold) {
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
                    price: parseFloat(cold) || 0, // Usar valor gelada como preço padrão
                    brand,
                    stock_quantity: parseInt(quantity) || 0,
                    cold_quantity: 0, // Não usado mais
                    hot_quantity: 0, // Não usado mais
                    price_cold: parseFloat(cold) || 0,
                    price_hot: parseFloat(hot) || 0,
                    unit_type: type || 'Unidade',
                    category: category || 'Bebidas',
                    image_url
                };
                
                if (currentProduct) {
                    await axios.put(\`/api/products/\${currentProduct}\`, productData);
                    openModal('modalProductUpdated');
                } else {
                    await axios.post('/api/products', productData);
                    openModal('modalProductUpdated');
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
            document.getElementById('productBrand').value = product.brand;
            document.getElementById('productQuantity').value = product.stock_quantity || 0;
            document.getElementById('productCold').value = product.price_cold || 0;
            document.getElementById('productHot').value = product.price_hot || 0;
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
  `));const ze=new pt,Jt=Object.assign({"/src/index.tsx":b});let mt=!1;for(const[,e]of Object.entries(Jt))e&&(ze.all("*",t=>{let o;try{o=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,o)}),ze.notFound(t=>{let o;try{o=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,o)}),mt=!0);if(!mt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
