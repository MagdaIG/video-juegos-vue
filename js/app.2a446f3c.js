(function(){"use strict";var e={3710:function(e,t,n){var r=n(5130),o=n(6768);const a={id:"app"};function i(e,t,n,r,i,s){const u=(0,o.g2)("AppNavbar"),c=(0,o.g2)("router-view"),l=(0,o.g2)("b-container"),d=(0,o.g2)("AppFooter");return(0,o.uX)(),(0,o.CE)("div",a,[(0,o.bF)(u),(0,o.bF)(l,{fluid:"",class:"main-content"},{default:(0,o.k6)((()=>[(0,o.bF)(c)])),_:1}),(0,o.bF)(d)])}function s(e,t,n,r,a,i){const s=(0,o.g2)("b-navbar-brand"),u=(0,o.g2)("b-nav-item"),c=(0,o.g2)("b-navbar-nav"),l=(0,o.g2)("b-container"),d=(0,o.g2)("b-navbar");return(0,o.uX)(),(0,o.Wv)(d,{class:"navbar-custom",variant:"dark"},{default:(0,o.k6)((()=>[(0,o.bF)(l,null,{default:(0,o.k6)((()=>[(0,o.bF)(s,{href:"/"},{default:(0,o.k6)((()=>t[0]||(t[0]=[(0,o.eW)("Catálogo de juegos")]))),_:1}),(0,o.bF)(c,{class:"ml-auto"},{default:(0,o.k6)((()=>[(0,o.bF)(u,{to:"/",exact:""},{default:(0,o.k6)((()=>t[1]||(t[1]=[(0,o.eW)("Inicio")]))),_:1})])),_:1})])),_:1})])),_:1})}var u={name:"AppNavbar"},c=n(1241);const l=(0,c.A)(u,[["render",s],["__scopeId","data-v-3900ae5c"]]);var d=l;const f={class:"footer-custom"};function m(e,t,n,r,a,i){const s=(0,o.g2)("b-col"),u=(0,o.g2)("b-row"),c=(0,o.g2)("b-container");return(0,o.uX)(),(0,o.CE)("div",f,[(0,o.bF)(c,null,{default:(0,o.k6)((()=>[(0,o.bF)(u,null,{default:(0,o.k6)((()=>[(0,o.bF)(s,{class:"text-center"},{default:(0,o.k6)((()=>t[0]||(t[0]=[(0,o.Lk)("p",null,"© 2024 Magdalena Inalaf - Todos los derechos reservados",-1)]))),_:1})])),_:1})])),_:1})])}var p={name:"AppFooter"};const g=(0,c.A)(p,[["render",m],["__scopeId","data-v-2b7f339c"]]);var v=g,h={name:"App",components:{AppNavbar:d,AppFooter:v},created(){this.$store.state.games.length||this.$store.dispatch("fetchGames")}};const b=(0,c.A)(h,[["render",i]]);var k=b,y=n(1387),w=n(4232);const _={class:"d-flex justify-content-between align-items-center"};function O(e,t,n,r,a,i){const s=(0,o.g2)("b-card-text"),u=(0,o.g2)("b-button"),c=(0,o.g2)("b-card"),l=(0,o.g2)("b-col"),d=(0,o.g2)("b-row"),f=(0,o.g2)("b-card-group"),m=(0,o.g2)("b-alert"),p=(0,o.g2)("v-container");return(0,o.uX)(),(0,o.Wv)(p,null,{default:(0,o.k6)((()=>[t[3]||(t[3]=(0,o.Lk)("h2",{class:"section-title"},"Lista de Juegos Disponibles",-1)),(0,o.bF)(f,{deck:""},{default:(0,o.k6)((()=>[(0,o.bF)(d,null,{default:(0,o.k6)((()=>[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(i.games,((e,n)=>((0,o.uX)(),(0,o.Wv)(l,{key:n,cols:"12",md:"4",lg:"3",class:"mb-4"},{default:(0,o.k6)((()=>[(0,o.bF)(c,{title:e.name,"img-src":e.background_image||a.placeholderImage,"img-alt":"Game Image","img-top":"",class:"game-card"},{default:(0,o.k6)((()=>[(0,o.bF)(s,null,{default:(0,o.k6)((()=>[t[0]||(t[0]=(0,o.eW)(" Lanzamiento: ")),(0,o.Lk)("strong",null,(0,w.v_)(e.released||"N/A"),1)])),_:2},1024),(0,o.Lk)("div",_,[(0,o.bF)(u,{variant:"primary",onClick:t=>i.navigateToOpinions(e.slug)},{default:(0,o.k6)((()=>t[1]||(t[1]=[(0,o.eW)(" Opinar ")]))),_:2},1032,["onClick"]),(0,o.bF)(u,{class:"heart-button",onClick:t=>i.toggleLike(e.id),variant:a.likedGames.includes(e.id)?"danger":"outline-danger"},{default:(0,o.k6)((()=>[(0,o.Lk)("i",{class:(0,w.C4)(a.likedGames.includes(e.id)?"fas fa-heart":"far fa-heart")},null,2)])),_:2},1032,["onClick","variant"])])])),_:2},1032,["title","img-src"])])),_:2},1024)))),128))])),_:1})])),_:1}),0===i.games.length?((0,o.uX)(),(0,o.Wv)(m,{key:0,variant:"info",show:""},{default:(0,o.k6)((()=>t[2]||(t[2]=[(0,o.eW)(" No hay juegos disponibles en este momento. ")]))),_:1})):(0,o.Q3)("",!0)])),_:1})}n(4114),n(8992),n(4520);var F={name:"HomeView",data(){return{placeholderImage:"https://via.placeholder.com/300x300?text=No+Image",likedGames:[]}},computed:{games(){return this.$store.getters.allGames}},methods:{navigateToOpinions(e){this.$router.push(`/opiniones/${e}`)},toggleLike(e){this.likedGames.includes(e)?this.likedGames=this.likedGames.filter((t=>t!==e)):this.likedGames.push(e)}},created(){this.$store.dispatch("fetchGames")}};const A=(0,c.A)(F,[["render",O],["__scopeId","data-v-1cf6d0a6"]]);var E=A;const C=[{path:"/",name:"Home",component:E},{path:"/opiniones/:gameSlug",name:"Opiniones",component:()=>n.e(212).then(n.bind(n,212))},{path:"/admin",name:"Admin",component:()=>n.e(636).then(n.bind(n,4636))},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>n.e(537).then(n.bind(n,537))}],L=(0,y.aE)({history:(0,y.LA)("/video-juegos-vue/"),routes:C});var j=L,G=(n(2577),n(782)),N=(0,G.y$)({state:{games:[],loading:!1,error:null,reviews:{}},mutations:{setGames(e,t){e.games=t},setLoading(e,t){e.loading=t},setError(e,t){e.error=t},addOpinion(e,{gameSlug:t,opinion:n}){e.reviews[t]||(e.reviews[t]=[]),e.reviews[t].push(n)},updateOpinion(e,{gameSlug:t,id:n,updatedOpinion:r}){const o=e.reviews[t];if(o){const a=o.findIndex((e=>e.id===n));-1!==a&&(e.reviews[t][a]={...e.reviews[t][a],...r})}},deleteOpinion(e,{gameSlug:t,id:n}){e.reviews[t]&&(e.reviews[t]=e.reviews[t].filter((e=>e.id!==n)))}},actions:{async fetchGames({commit:e}){e("setLoading",!0),e("setError",null);try{const t="4a731528ad48459c8f28aa52f11a0973",n=await fetch(`https://api.rawg.io/api/games?key=${t}`);if(!n.ok)throw new Error("Error al obtener juegos de la API");const r=await n.json();e("setGames",r.results)}catch(t){console.error("Error en fetchGames:",t.message),e("setError",t.message)}finally{e("setLoading",!1)}},addOpinion({commit:e},t){e("addOpinion",t)},updateOpinion({commit:e},t){e("updateOpinion",t)},deleteOpinion({commit:e},t){e("deleteOpinion",t)}},getters:{allGames(e){return e.games},isLoading(e){return e.loading},fetchError(e){return e.error},getOpinionsById:e=>t=>e.reviews&&e.reviews[t]?e.reviews[t]:[],getGameBySlug:e=>t=>e.games.find((e=>e.slug===t))}}),S=n(5015),x=n(5888);n(5524);const I=(0,x.$N)({theme:{defaultTheme:"light"}}),T=(0,r.Ef)(k);T.use(N),T.use(j),T.use(I),T.use(S.Ay),T.mount("#app")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var s=!0,u=0;u<r.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(s=!1,a<i&&(i=a));if(s){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{212:"490cc0d7",537:"c4141bc4",636:"7a9fcf53"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{212:"82e6e3da",636:"73d14ce6"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="proyecto-vue:";n.l=function(r,o,a,i){if(e[r])e[r].push(o);else{var s,u;if(void 0!==a)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=r),e[r]=[o];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/video-juegos-vue/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,r,o,a){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",n.nc&&(i.nonce=n.nc);var s=function(n){if(i.onerror=i.onload=null,"load"===n.type)o();else{var r=n&&n.type,s=n&&n.target&&n.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+s+")");u.name="ChunkLoadError",u.code="CSS_CHUNK_LOAD_FAILED",u.type=r,u.request=s,i.parentNode&&i.parentNode.removeChild(i),a(u)}};return i.onerror=i.onload=s,i.href=t,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){o=i[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var i=n.miniCssF(r),s=n.p+i;if(t(i,s))return o();e(r,s,null,o,a)}))},o={524:0};n.f.miniCss=function(e,t){var n={212:1,636:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var i=n.p+n.u(t),s=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};n.l(i,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,i=r[0],s=r[1],u=r[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(u)var l=u(n)}for(t&&t(r);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunkproyecto_vue"]=self["webpackChunkproyecto_vue"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(3710)}));r=n.O(r)})();
//# sourceMappingURL=app.2a446f3c.js.map