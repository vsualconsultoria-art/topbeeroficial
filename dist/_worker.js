var gt=Object.defineProperty;var Fe=e=>{throw TypeError(e)};var bt=(e,t,r)=>t in e?gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var m=(e,t,r)=>bt(e,typeof t!="symbol"?t+"":t,r),Be=(e,t,r)=>t.has(e)||Fe("Cannot "+r);var i=(e,t,r)=>(Be(e,t,"read from private field"),r?r.call(e):t.get(e)),f=(e,t,r)=>t.has(e)?Fe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),h=(e,t,r,o)=>(Be(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r),b=(e,t,r)=>(Be(e,t,"access private method"),r);var Ne=(e,t,r,o)=>({set _(s){h(e,t,s,r)},get _(){return i(e,t,o)}});var Me=(e,t,r)=>(o,s)=>{let n=-1;return a(0);async function a(l){if(l<=n)throw new Error("next() called multiple times");n=l;let c,d=!1,u;if(e[l]?(u=e[l][0][0],o.req.routeIndex=l):u=l===e.length&&s||void 0,u)try{c=await u(o,()=>a(l+1))}catch(p){if(p instanceof Error&&t)o.error=p,c=await t(p,o),d=!0;else throw p}else o.finalized===!1&&r&&(c=await r(o));return c&&(o.finalized===!1||d)&&(o.res=c),o}},xt=Symbol(),yt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:o=!1}=t,n=(e instanceof rt?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?vt(e,{all:r,dot:o}):{}};async function vt(e,t){const r=await e.formData();return r?wt(r,t):{}}function wt(e,t){const r=Object.create(null);return e.forEach((o,s)=>{t.all||s.endsWith("[]")?Et(r,s,o):r[s]=o}),t.dot&&Object.entries(r).forEach(([o,s])=>{o.includes(".")&&(Ct(r,o,s),delete r[o])}),r}var Et=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ct=(e,t,r)=>{let o=e;const s=t.split(".");s.forEach((n,a)=>{a===s.length-1?o[n]=r:((!o[n]||typeof o[n]!="object"||Array.isArray(o[n])||o[n]instanceof File)&&(o[n]=Object.create(null)),o=o[n])})},Qe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Rt=e=>{const{groups:t,path:r}=Pt(e),o=Qe(r);return It(o,t)},Pt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,o)=>{const s=`@${o}`;return t.push([s,r]),s}),{groups:t,path:e}},It=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[o]=t[r];for(let s=e.length-1;s>=0;s--)if(e[s].includes(o)){e[s]=e[s].replace(o,t[r][1]);break}}return e},Pe={},_t=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const o=`${e}#${t}`;return Pe[o]||(r[2]?Pe[o]=t&&t[0]!==":"&&t[0]!=="*"?[o,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Pe[o]=[e,r[1],!0]),Pe[o]}return null},Le=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},At=e=>Le(e,decodeURI),Je=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let o=r;for(;o<t.length;o++){const s=t.charCodeAt(o);if(s===37){const n=t.indexOf("?",o),a=t.slice(r,n===-1?void 0:n);return At(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return t.slice(r,o)},jt=e=>{const t=Je(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},oe=(e,t,...r)=>(r.length&&(t=oe(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Ze=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let o="";return t.forEach(s=>{if(s!==""&&!/\:/.test(s))o+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){r.length===0&&o===""?r.push("/"):r.push(o);const n=s.replace("?","");o+="/"+n,r.push(o)}else o+="/"+s}),r.filter((s,n,a)=>a.indexOf(s)===n)},Te=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Le(e,tt):e):e,et=(e,t,r)=>{let o;if(!r&&t&&!/[%+]/.test(t)){let a=e.indexOf("?",8);if(a===-1)return;for(e.startsWith(t,a+1)||(a=e.indexOf(`&${t}`,a+1));a!==-1;){const l=e.charCodeAt(a+t.length+1);if(l===61){const c=a+t.length+2,d=e.indexOf("&",c);return Te(e.slice(c,d===-1?void 0:d))}else if(l==38||isNaN(l))return"";a=e.indexOf(`&${t}`,a+1)}if(o=/[%+]/.test(e),!o)return}const s={};o??(o=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const a=e.indexOf("&",n+1);let l=e.indexOf("=",n);l>a&&a!==-1&&(l=-1);let c=e.slice(n+1,l===-1?a===-1?void 0:a:l);if(o&&(c=Te(c)),n=a,c==="")continue;let d;l===-1?d="":(d=e.slice(l+1,a===-1?void 0:a),o&&(d=Te(d))),r?(s[c]&&Array.isArray(s[c])||(s[c]=[]),s[c].push(d)):s[c]??(s[c]=d)}return t?s[t]:s},kt=et,Ot=(e,t)=>et(e,t,!0),tt=decodeURIComponent,qe=e=>Le(e,tt),ae,A,D,ot,st,He,q,Ve,rt=(Ve=class{constructor(e,t="/",r=[[]]){f(this,D);m(this,"raw");f(this,ae);f(this,A);m(this,"routeIndex",0);m(this,"path");m(this,"bodyCache",{});f(this,q,e=>{const{bodyCache:t,raw:r}=this,o=t[e];if(o)return o;const s=Object.keys(t)[0];return s?t[s].then(n=>(s==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,h(this,A,r),h(this,ae,{})}param(e){return e?b(this,D,ot).call(this,e):b(this,D,st).call(this)}query(e){return kt(this.url,e)}queries(e){return Ot(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,o)=>{t[o]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await yt(this,e))}json(){return i(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,q).call(this,"text")}arrayBuffer(){return i(this,q).call(this,"arrayBuffer")}blob(){return i(this,q).call(this,"blob")}formData(){return i(this,q).call(this,"formData")}addValidatedData(e,t){i(this,ae)[e]=t}valid(e){return i(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[xt](){return i(this,A)}get matchedRoutes(){return i(this,A)[0].map(([[,e]])=>e)}get routePath(){return i(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,A=new WeakMap,D=new WeakSet,ot=function(e){const t=i(this,A)[0][this.routeIndex][1][e],r=b(this,D,He).call(this,t);return r&&/\%/.test(r)?qe(r):r},st=function(){const e={},t=Object.keys(i(this,A)[0][this.routeIndex][1]);for(const r of t){const o=b(this,D,He).call(this,i(this,A)[0][this.routeIndex][1][r]);o!==void 0&&(e[r]=/\%/.test(o)?qe(o):o)}return e},He=function(e){return i(this,A)[1]?i(this,A)[1][e]:e},q=new WeakMap,Ve),$t={Stringify:1},nt=async(e,t,r,o,s)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(s?s[0]+=e:s=[e],Promise.all(n.map(l=>l({phase:t,buffer:s,context:o}))).then(l=>Promise.all(l.filter(Boolean).map(c=>nt(c,t,!1,o,s))).then(()=>s[0]))):Promise.resolve(e)},Bt="text/plain; charset=UTF-8",Se=(e,t)=>({"Content-Type":e,...t}),be,xe,T,ie,S,I,ye,ce,le,X,ve,we,U,se,We,Tt=(We=class{constructor(e,t){f(this,U);f(this,be);f(this,xe);m(this,"env",{});f(this,T);m(this,"finalized",!1);m(this,"error");f(this,ie);f(this,S);f(this,I);f(this,ye);f(this,ce);f(this,le);f(this,X);f(this,ve);f(this,we);m(this,"render",(...e)=>(i(this,ce)??h(this,ce,t=>this.html(t)),i(this,ce).call(this,...e)));m(this,"setLayout",e=>h(this,ye,e));m(this,"getLayout",()=>i(this,ye));m(this,"setRenderer",e=>{h(this,ce,e)});m(this,"header",(e,t,r)=>{this.finalized&&h(this,I,new Response(i(this,I).body,i(this,I)));const o=i(this,I)?i(this,I).headers:i(this,X)??h(this,X,new Headers);t===void 0?o.delete(e):r!=null&&r.append?o.append(e,t):o.set(e,t)});m(this,"status",e=>{h(this,ie,e)});m(this,"set",(e,t)=>{i(this,T)??h(this,T,new Map),i(this,T).set(e,t)});m(this,"get",e=>i(this,T)?i(this,T).get(e):void 0);m(this,"newResponse",(...e)=>b(this,U,se).call(this,...e));m(this,"body",(e,t,r)=>b(this,U,se).call(this,e,t,r));m(this,"text",(e,t,r)=>!i(this,X)&&!i(this,ie)&&!t&&!r&&!this.finalized?new Response(e):b(this,U,se).call(this,e,t,Se(Bt,r)));m(this,"json",(e,t,r)=>b(this,U,se).call(this,JSON.stringify(e),t,Se("application/json",r)));m(this,"html",(e,t,r)=>{const o=s=>b(this,U,se).call(this,s,t,Se("text/html; charset=UTF-8",r));return typeof e=="object"?nt(e,$t.Stringify,!1,{}).then(o):o(e)});m(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});m(this,"notFound",()=>(i(this,le)??h(this,le,()=>new Response),i(this,le).call(this,this)));h(this,be,e),t&&(h(this,S,t.executionCtx),this.env=t.env,h(this,le,t.notFoundHandler),h(this,we,t.path),h(this,ve,t.matchResult))}get req(){return i(this,xe)??h(this,xe,new rt(i(this,be),i(this,we),i(this,ve))),i(this,xe)}get event(){if(i(this,S)&&"respondWith"in i(this,S))return i(this,S);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,S))return i(this,S);throw Error("This context has no ExecutionContext")}get res(){return i(this,I)||h(this,I,new Response(null,{headers:i(this,X)??h(this,X,new Headers)}))}set res(e){if(i(this,I)&&e){e=new Response(e.body,e);for(const[t,r]of i(this,I).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const o=i(this,I).headers.getSetCookie();e.headers.delete("set-cookie");for(const s of o)e.headers.append("set-cookie",s)}else e.headers.set(t,r)}h(this,I,e),this.finalized=!0}get var(){return i(this,T)?Object.fromEntries(i(this,T)):{}}},be=new WeakMap,xe=new WeakMap,T=new WeakMap,ie=new WeakMap,S=new WeakMap,I=new WeakMap,ye=new WeakMap,ce=new WeakMap,le=new WeakMap,X=new WeakMap,ve=new WeakMap,we=new WeakMap,U=new WeakSet,se=function(e,t,r){const o=i(this,I)?new Headers(i(this,I).headers):i(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,l]of n)a.toLowerCase()==="set-cookie"?o.append(a,l):o.set(a,l)}if(r)for(const[n,a]of Object.entries(r))if(typeof a=="string")o.set(n,a);else{o.delete(n);for(const l of a)o.append(n,l)}const s=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ie);return new Response(e,{status:s,headers:o})},We),v="ALL",St="all",Ht=["get","post","put","delete","options","patch"],at="Can not add a route since the matcher is already built.",it=class extends Error{},Lt="__COMPOSED_HANDLER",Dt=e=>e.text("404 Not Found",404),Ue=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},j,w,ct,k,K,Ie,_e,de,Ft=(de=class{constructor(t={}){f(this,w);m(this,"get");m(this,"post");m(this,"put");m(this,"delete");m(this,"options");m(this,"patch");m(this,"all");m(this,"on");m(this,"use");m(this,"router");m(this,"getPath");m(this,"_basePath","/");f(this,j,"/");m(this,"routes",[]);f(this,k,Dt);m(this,"errorHandler",Ue);m(this,"onError",t=>(this.errorHandler=t,this));m(this,"notFound",t=>(h(this,k,t),this));m(this,"fetch",(t,...r)=>b(this,w,_e).call(this,t,r[1],r[0],t.method));m(this,"request",(t,r,o,s)=>t instanceof Request?this.fetch(r?new Request(t,r):t,o,s):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${oe("/",t)}`,r),o,s)));m(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,w,_e).call(this,t.request,t,void 0,t.request.method))})});[...Ht,St].forEach(n=>{this[n]=(a,...l)=>(typeof a=="string"?h(this,j,a):b(this,w,K).call(this,n,i(this,j),a),l.forEach(c=>{b(this,w,K).call(this,n,i(this,j),c)}),this)}),this.on=(n,a,...l)=>{for(const c of[a].flat()){h(this,j,c);for(const d of[n].flat())l.map(u=>{b(this,w,K).call(this,d.toUpperCase(),i(this,j),u)})}return this},this.use=(n,...a)=>(typeof n=="string"?h(this,j,n):(h(this,j,"*"),a.unshift(n)),a.forEach(l=>{b(this,w,K).call(this,v,i(this,j),l)}),this);const{strict:o,...s}=t;Object.assign(this,s),this.getPath=o??!0?t.getPath??Je:jt}route(t,r){const o=this.basePath(t);return r.routes.map(s=>{var a;let n;r.errorHandler===Ue?n=s.handler:(n=async(l,c)=>(await Me([],r.errorHandler)(l,()=>s.handler(l,c))).res,n[Lt]=s.handler),b(a=o,w,K).call(a,s.method,s.path,n)}),this}basePath(t){const r=b(this,w,ct).call(this);return r._basePath=oe(this._basePath,t),r}mount(t,r,o){let s,n;o&&(typeof o=="function"?n=o:(n=o.optionHandler,o.replaceRequest===!1?s=c=>c:s=o.replaceRequest));const a=n?c=>{const d=n(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};s||(s=(()=>{const c=oe(this._basePath,t),d=c==="/"?0:c.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(d)||"/",new Request(p,u)}})());const l=async(c,d)=>{const u=await r(s(c.req.raw),...a(c));if(u)return u;await d()};return b(this,w,K).call(this,v,oe(t,"*"),l),this}},j=new WeakMap,w=new WeakSet,ct=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,h(t,k,i(this,k)),t.routes=this.routes,t},k=new WeakMap,K=function(t,r,o){t=t.toUpperCase(),r=oe(this._basePath,r);const s={basePath:this._basePath,path:r,method:t,handler:o};this.router.add(t,r,[o,s]),this.routes.push(s)},Ie=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},_e=function(t,r,o,s){if(s==="HEAD")return(async()=>new Response(null,await b(this,w,_e).call(this,t,r,o,"GET")))();const n=this.getPath(t,{env:o}),a=this.router.match(s,n),l=new Tt(t,{path:n,matchResult:a,env:o,executionCtx:r,notFoundHandler:i(this,k)});if(a[0].length===1){let d;try{d=a[0][0][0][0](l,async()=>{l.res=await i(this,k).call(this,l)})}catch(u){return b(this,w,Ie).call(this,u,l)}return d instanceof Promise?d.then(u=>u||(l.finalized?l.res:i(this,k).call(this,l))).catch(u=>b(this,w,Ie).call(this,u,l)):d??i(this,k).call(this,l)}const c=Me(a[0],this.errorHandler,i(this,k));return(async()=>{try{const d=await c(l);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,w,Ie).call(this,d,l)}})()},de),lt=[];function Nt(e,t){const r=this.buildAllMatchers(),o=((s,n)=>{const a=r[s]||r[v],l=a[2][n];if(l)return l;const c=n.match(a[0]);if(!c)return[[],lt];const d=c.indexOf("",1);return[a[1][d],c]});return this.match=o,o(e,t)}var je="[^/]+",fe=".*",ge="(?:|/.*)",ne=Symbol(),Mt=new Set(".\\+*[^]$()");function qt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===fe||e===ge?1:t===fe||t===ge?-1:e===je?1:t===je?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q,J,O,te,Ut=(te=class{constructor(){f(this,Q);f(this,J);f(this,O,Object.create(null))}insert(t,r,o,s,n){if(t.length===0){if(i(this,Q)!==void 0)throw ne;if(n)return;h(this,Q,r);return}const[a,...l]=t,c=a==="*"?l.length===0?["","",fe]:["","",je]:a==="/*"?["","",ge]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const u=c[1];let p=c[2]||je;if(u&&c[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw ne;if(d=i(this,O)[p],!d){if(Object.keys(i(this,O)).some(g=>g!==fe&&g!==ge))throw ne;if(n)return;d=i(this,O)[p]=new te,u!==""&&h(d,J,s.varIndex++)}!n&&u!==""&&o.push([u,i(d,J)])}else if(d=i(this,O)[a],!d){if(Object.keys(i(this,O)).some(u=>u.length>1&&u!==fe&&u!==ge))throw ne;if(n)return;d=i(this,O)[a]=new te}d.insert(l,r,o,s,n)}buildRegExpStr(){const r=Object.keys(i(this,O)).sort(qt).map(o=>{const s=i(this,O)[o];return(typeof i(s,J)=="number"?`(${o})@${i(s,J)}`:Mt.has(o)?`\\${o}`:o)+s.buildRegExpStr()});return typeof i(this,Q)=="number"&&r.unshift(`#${i(this,Q)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},Q=new WeakMap,J=new WeakMap,O=new WeakMap,te),ke,Ee,Ge,zt=(Ge=class{constructor(){f(this,ke,{varIndex:0});f(this,Ee,new Ut)}insert(e,t,r){const o=[],s=[];for(let a=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const d=`@\\${a}`;return s[a]=[d,c],a++,l=!0,d}),!l)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[l]=s[a];for(let c=n.length-1;c>=0;c--)if(n[c].indexOf(l)!==-1){n[c]=n[c].replace(l,s[a][1]);break}}return i(this,Ee).insert(n,t,o,i(this,ke),r),o}buildRegExp(){let e=i(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],o=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,n,a)=>n!==void 0?(r[++t]=Number(n),"$()"):(a!==void 0&&(o[Number(a)]=++t),"")),[new RegExp(`^${e}`),r,o]}},ke=new WeakMap,Ee=new WeakMap,Ge),Vt=[/^$/,[],Object.create(null)],Ae=Object.create(null);function dt(e){return Ae[e]??(Ae[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Wt(){Ae=Object.create(null)}function Gt(e){var d;const t=new zt,r=[];if(e.length===0)return Vt;const o=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[g,y])=>u?1:g?-1:p.length-y.length),s=Object.create(null);for(let u=0,p=-1,g=o.length;u<g;u++){const[y,_,F]=o[u];y?s[_]=[F.map(([P])=>[P,Object.create(null)]),lt]:p++;let x;try{x=t.insert(_,p,y)}catch(P){throw P===ne?new it(_):P}y||(r[p]=F.map(([P,N])=>{const Ce=Object.create(null);for(N-=1;N>=0;N--){const[Re,$]=x[N];Ce[Re]=$}return[P,Ce]}))}const[n,a,l]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let g=0,y=r[u].length;g<y;g++){const _=(d=r[u][g])==null?void 0:d[1];if(!_)continue;const F=Object.keys(_);for(let x=0,P=F.length;x<P;x++)_[F[x]]=l[_[F[x]]]}const c=[];for(const u in a)c[u]=r[a[u]];return[n,c,s]}function re(e,t){if(e){for(const r of Object.keys(e).sort((o,s)=>s.length-o.length))if(dt(r).test(t))return[...e[r]]}}var z,V,Oe,ut,Ke,Kt=(Ke=class{constructor(){f(this,Oe);m(this,"name","RegExpRouter");f(this,z);f(this,V);m(this,"match",Nt);h(this,z,{[v]:Object.create(null)}),h(this,V,{[v]:Object.create(null)})}add(e,t,r){var l;const o=i(this,z),s=i(this,V);if(!o||!s)throw new Error(at);o[e]||[o,s].forEach(c=>{c[e]=Object.create(null),Object.keys(c[v]).forEach(d=>{c[e][d]=[...c[v][d]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=dt(t);e===v?Object.keys(o).forEach(d=>{var u;(u=o[d])[t]||(u[t]=re(o[d],t)||re(o[v],t)||[])}):(l=o[e])[t]||(l[t]=re(o[e],t)||re(o[v],t)||[]),Object.keys(o).forEach(d=>{(e===v||e===d)&&Object.keys(o[d]).forEach(u=>{c.test(u)&&o[d][u].push([r,n])})}),Object.keys(s).forEach(d=>{(e===v||e===d)&&Object.keys(s[d]).forEach(u=>c.test(u)&&s[d][u].push([r,n]))});return}const a=Ze(t)||[t];for(let c=0,d=a.length;c<d;c++){const u=a[c];Object.keys(s).forEach(p=>{var g;(e===v||e===p)&&((g=s[p])[u]||(g[u]=[...re(o[p],u)||re(o[v],u)||[]]),s[p][u].push([r,n-d+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,V)).concat(Object.keys(i(this,z))).forEach(t=>{e[t]||(e[t]=b(this,Oe,ut).call(this,t))}),h(this,z,h(this,V,void 0)),Wt(),e}},z=new WeakMap,V=new WeakMap,Oe=new WeakSet,ut=function(e){const t=[];let r=e===v;return[i(this,z),i(this,V)].forEach(o=>{const s=o[e]?Object.keys(o[e]).map(n=>[n,o[e][n]]):[];s.length!==0?(r||(r=!0),t.push(...s)):e!==v&&t.push(...Object.keys(o[v]).map(n=>[n,o[v][n]]))}),r?Gt(t):null},Ke),W,H,Ye,Yt=(Ye=class{constructor(e){m(this,"name","SmartRouter");f(this,W,[]);f(this,H,[]);h(this,W,e.routers)}add(e,t,r){if(!i(this,H))throw new Error(at);i(this,H).push([e,t,r])}match(e,t){if(!i(this,H))throw new Error("Fatal error");const r=i(this,W),o=i(this,H),s=r.length;let n=0,a;for(;n<s;n++){const l=r[n];try{for(let c=0,d=o.length;c<d;c++)l.add(...o[c]);a=l.match(e,t)}catch(c){if(c instanceof it)continue;throw c}this.match=l.match.bind(l),h(this,W,[l]),h(this,H,void 0);break}if(n===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(i(this,H)||i(this,W).length!==1)throw new Error("No active router has been determined yet.");return i(this,W)[0]}},W=new WeakMap,H=new WeakMap,Ye),me=Object.create(null),G,R,Z,ue,C,L,Y,pe,Xt=(pe=class{constructor(t,r,o){f(this,L);f(this,G);f(this,R);f(this,Z);f(this,ue,0);f(this,C,me);if(h(this,R,o||Object.create(null)),h(this,G,[]),t&&r){const s=Object.create(null);s[t]={handler:r,possibleKeys:[],score:0},h(this,G,[s])}h(this,Z,[])}insert(t,r,o){h(this,ue,++Ne(this,ue)._);let s=this;const n=Rt(r),a=[];for(let l=0,c=n.length;l<c;l++){const d=n[l],u=n[l+1],p=_t(d,u),g=Array.isArray(p)?p[0]:d;if(g in i(s,R)){s=i(s,R)[g],p&&a.push(p[1]);continue}i(s,R)[g]=new pe,p&&(i(s,Z).push(p),a.push(p[1])),s=i(s,R)[g]}return i(s,G).push({[t]:{handler:o,possibleKeys:a.filter((l,c,d)=>d.indexOf(l)===c),score:i(this,ue)}}),s}search(t,r){var c;const o=[];h(this,C,me);let n=[this];const a=Qe(r),l=[];for(let d=0,u=a.length;d<u;d++){const p=a[d],g=d===u-1,y=[];for(let _=0,F=n.length;_<F;_++){const x=n[_],P=i(x,R)[p];P&&(h(P,C,i(x,C)),g?(i(P,R)["*"]&&o.push(...b(this,L,Y).call(this,i(P,R)["*"],t,i(x,C))),o.push(...b(this,L,Y).call(this,P,t,i(x,C)))):y.push(P));for(let N=0,Ce=i(x,Z).length;N<Ce;N++){const Re=i(x,Z)[N],$=i(x,C)===me?{}:{...i(x,C)};if(Re==="*"){const M=i(x,R)["*"];M&&(o.push(...b(this,L,Y).call(this,M,t,i(x,C))),h(M,C,$),y.push(M));continue}const[mt,De,he]=Re;if(!p&&!(he instanceof RegExp))continue;const B=i(x,R)[mt],ft=a.slice(d).join("/");if(he instanceof RegExp){const M=he.exec(ft);if(M){if($[De]=M[0],o.push(...b(this,L,Y).call(this,B,t,i(x,C),$)),Object.keys(i(B,R)).length){h(B,C,$);const $e=((c=M[0].match(/\//))==null?void 0:c.length)??0;(l[$e]||(l[$e]=[])).push(B)}continue}}(he===!0||he.test(p))&&($[De]=p,g?(o.push(...b(this,L,Y).call(this,B,t,$,i(x,C))),i(B,R)["*"]&&o.push(...b(this,L,Y).call(this,i(B,R)["*"],t,$,i(x,C)))):(h(B,C,$),y.push(B)))}}n=y.concat(l.shift()??[])}return o.length>1&&o.sort((d,u)=>d.score-u.score),[o.map(({handler:d,params:u})=>[d,u])]}},G=new WeakMap,R=new WeakMap,Z=new WeakMap,ue=new WeakMap,C=new WeakMap,L=new WeakSet,Y=function(t,r,o,s){const n=[];for(let a=0,l=i(t,G).length;a<l;a++){const c=i(t,G)[a],d=c[r]||c[v],u={};if(d!==void 0&&(d.params=Object.create(null),n.push(d),o!==me||s&&s!==me))for(let p=0,g=d.possibleKeys.length;p<g;p++){const y=d.possibleKeys[p],_=u[d.score];d.params[y]=s!=null&&s[y]&&!_?s[y]:o[y]??(s==null?void 0:s[y]),u[d.score]=!0}}return n},pe),ee,Xe,Qt=(Xe=class{constructor(){m(this,"name","TrieRouter");f(this,ee);h(this,ee,new Xt)}add(e,t,r){const o=Ze(t);if(o){for(let s=0,n=o.length;s<n;s++)i(this,ee).insert(e,o[s],r);return}i(this,ee).insert(e,t,r)}match(e,t){return i(this,ee).search(e,t)}},ee=new WeakMap,Xe),pt=class extends Ft{constructor(e={}){super(e),this.router=e.router??new Yt({routers:[new Kt,new Qt]})}},Jt=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},o=(n=>typeof n=="string"?n==="*"?()=>n:a=>n===a?a:null:typeof n=="function"?n:a=>n.includes(a)?a:null)(r.origin),s=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(r.allowMethods);return async function(a,l){var u;function c(p,g){a.res.headers.set(p,g)}const d=await o(a.req.header("origin")||"",a);if(d&&c("Access-Control-Allow-Origin",d),r.credentials&&c("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const p=await s(a.req.header("origin")||"",a);p.length&&c("Access-Control-Allow-Methods",p.join(","));let g=r.allowHeaders;if(!(g!=null&&g.length)){const y=a.req.header("Access-Control-Request-Headers");y&&(g=y.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await l(),r.origin!=="*"&&a.header("Vary","Origin",{append:!0})}};const E=new pt;E.use("/api/*",Jt());E.post("/api/auth/verify",async e=>{const{password:t}=await e.req.json();return e.json({success:t==="123"})});E.get("/api/products",async e=>{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM products ORDER BY id DESC").all();return e.json(r)});E.get("/api/products/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id"),{results:o}=await t.prepare("SELECT * FROM products WHERE id = ?").bind(r).all();return e.json(o[0]||null)});E.post("/api/products",async e=>{const{DB:t}=e.env,{name:r,price:o,brand:s,stock_quantity:n,image_url:a}=await e.req.json(),l=await t.prepare("INSERT INTO products (name, price, brand, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?)").bind(r,o,s,n||0,a||null).run();return e.json({id:l.meta.last_row_id,success:!0})});E.put("/api/products/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id"),{name:o,price:s,brand:n,stock_quantity:a,image_url:l}=await e.req.json();return await t.prepare("UPDATE products SET name = ?, price = ?, brand = ?, stock_quantity = ?, image_url = ? WHERE id = ?").bind(o,s,n,a,l,r).run(),e.json({success:!0})});E.delete("/api/products/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id");return await t.prepare("DELETE FROM products WHERE id = ?").bind(r).run(),e.json({success:!0})});E.get("/api/customers",async e=>{const{DB:t}=e.env,{results:r}=await t.prepare("SELECT * FROM customers ORDER BY name").all();return e.json(r)});E.get("/api/customers/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id"),{results:o}=await t.prepare("SELECT * FROM customers WHERE id = ?").bind(r).all();return e.json(o[0]||null)});E.post("/api/customers",async e=>{const{DB:t}=e.env,{name:r,address:o,neighborhood:s,zip_code:n,city:a,phone:l}=await e.req.json(),c=await t.prepare("INSERT INTO customers (name, address, neighborhood, zip_code, city, phone) VALUES (?, ?, ?, ?, ?, ?)").bind(r,o,s,n,a,l).run();return e.json({id:c.meta.last_row_id,success:!0})});E.put("/api/customers/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id"),{name:o,address:s,neighborhood:n,zip_code:a,city:l,phone:c}=await e.req.json();return await t.prepare("UPDATE customers SET name = ?, address = ?, neighborhood = ?, zip_code = ?, city = ?, phone = ? WHERE id = ?").bind(o,s,n,a,l,c,r).run(),e.json({success:!0})});E.delete("/api/customers/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id");return await t.prepare("DELETE FROM customers WHERE id = ?").bind(r).run(),e.json({success:!0})});E.post("/api/orders",async e=>{const{DB:t}=e.env,{customer_id:r,items:o,payment_method:s,total_amount:n}=await e.req.json(),l=(await t.prepare("INSERT INTO orders (customer_id, total_amount, payment_method) VALUES (?, ?, ?)").bind(r,n,s).run()).meta.last_row_id;for(const c of o)await t.prepare("INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)").bind(l,c.product_id,c.quantity,c.unit_price,c.total_price).run();return e.json({id:l,success:!0})});E.get("/api/orders/:id",async e=>{const{DB:t}=e.env,r=e.req.param("id"),{results:o}=await t.prepare("SELECT o.*, c.name as customer_name, c.phone, c.address, c.neighborhood, c.city FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.id = ?").bind(r).all();if(!o.length)return e.json(null);const s=o[0],{results:n}=await t.prepare("SELECT oi.*, p.name as product_name, p.brand FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?").bind(r).all();return e.json({...s,items:n})});E.get("/api/settings/logo",async e=>{var o;const{DB:t}=e.env,{results:r}=await t.prepare("SELECT value FROM settings WHERE key = 'logo_url'").all();return e.json({logo_url:((o=r[0])==null?void 0:o.value)||null})});E.post("/api/settings/logo",async e=>{const{DB:t}=e.env,{logo_url:r}=await e.req.json();return await t.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('logo_url', ?, CURRENT_TIMESTAMP)").bind(r).run(),e.json({success:!0})});E.post("/api/upload",async e=>{try{const{image:t,filename:r}=await e.req.json(),o=t.split(",")[1]||t,s=atob(o),n=new Uint8Array(s.length);for(let c=0;c<s.length;c++)n[c]=s.charCodeAt(c);const a=`${Date.now()}-${r}`,l=t;return e.json({success:!0,url:l})}catch(t){return console.error("Upload error:",t),e.json({success:!1,error:"Upload failed"},500)}});E.get("/",e=>e.html(`
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
            overflow: hidden;
            margin-bottom: 80px;
        }
        .logo-container {
            position: absolute;
            bottom: -50px;
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
        }
        .logo-container img {
            max-width: 100%;
            max-height: 100%;
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

        // Carregar dados iniciais
        async function loadInitialData() {
            try {
                const [productsRes, customersRes, logoRes] = await Promise.all([
                    axios.get('/api/products'),
                    axios.get('/api/customers'),
                    axios.get('/api/settings/logo')
                ]);
                products = productsRes.data;
                customers = customersRes.data;
                logoUrl = logoRes.data.logo_url;
                
                if (logoUrl) {
                    document.getElementById('logoImage').src = logoUrl;
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
                            <div class="product-card" onclick="addToCart(\${p.id})">
                                <div style="width: 100%; height: 120px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; overflow: hidden;">
                                    \${p.image_url ? \`<img src="\${p.image_url}" style="width: 100%; height: 100%; object-fit: contain;">\` : '<i class="fas fa-beer text-4xl text-yellow-400"></i>'}
                                </div>
                                <h3 class="font-bold text-sm mb-1">\${p.name}</h3>
                                <p class="text-xs text-gray-400 mb-1">\${p.brand}</p>
                                <p class="text-yellow-400 font-bold">R$ \${parseFloat(p.price).toFixed(2)}</p>
                            </div>
                        \`).join('')}
                    </div>
                </div>
            \`;
            content.innerHTML = html;
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
                        
                        <button onclick="finishOrder()" class="btn-red w-full mt-6 py-4 text-lg">
                            <i class="fas fa-check mr-2"></i> Finalizar Pedido
                        </button>
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
                            <div class="card flex justify-between items-center">
                                <div>
                                    <p class="font-bold">\${c.name}</p>
                                    <p class="text-sm text-gray-400">\${c.phone}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="editCustomer(\${c.id})" class="btn-yellow" style="padding: 8px 12px;">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteCustomer(\${c.id})" class="btn-red" style="padding: 8px 12px;">
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
                            <i class="fas fa-image mr-2"></i> Alterar Logo
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
  `));const ze=new pt,Zt=Object.assign({"/src/index.tsx":E});let ht=!1;for(const[,e]of Object.entries(Zt))e&&(ze.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),ze.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),ht=!0);if(!ht)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{ze as default};
