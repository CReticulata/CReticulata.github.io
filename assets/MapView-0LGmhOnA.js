import{k as Q,m as v,N as W,n as V,o as b,q as C,C as _}from"./Note-C-Ns2Xzi.js";import{_ as P,U as h,r as c,w as x,q as E,L as R,X as s,W as p,$ as M,P as r,M as z,a0 as U,a1 as S,Y as q}from"./index-BM6oWnlH.js";const O={__name:"MapView",setup($){const n=h(),l=c({user:n.user.ID||"",id:"",storeName:"",foodScore:0,serviceScore:0,pros:"",cons:"",location:{lat:0,lng:0},googlemapURL:"",address:"",photos:[]}),w=c(""),u=c(!1),m=c(!1),g=c(!1);let i,d;async function y(){let a={lat:25.0476133,lng:121.5148313};n.userLocation&&(a=n.userLocation);const{Map:e}=await google.maps.importLibrary("maps"),{AdvancedMarkerElement:t}=await google.maps.importLibrary("marker");i=new e(document.getElementById("map"),{zoom:18,center:a,mapId:"DEMO_MAP_ID",gestureHandling:"greedy"}),new t({map:i,position:a,title:"目前位置"}),i.addListener("click",o=>{o.placeId&&A(o.placeId,i)})}async function A(a,e){const{Place:t}=await google.maps.importLibrary("places"),o=new t({id:a,requestedLanguage:"zh_Hant"});await o.fetchFields({fields:["formattedAddress","googleMapsURI","location","displayName"]}),I(a,o.displayName,{lat:o.location.lat(),lng:o.location.lng()},o.googleMapsURI,o.formattedAddress),L(o.location,e,o.displayName,o.formattedAddress)}async function L(a,e,t,o){const{InfoWindow:f}=await google.maps.importLibrary("maps");d=new f({position:a,content:B(t,o),maxWidth:250}),d.open(e),google.maps.event.addListener(d,"domready",function(){const N=document.querySelector(".create-note");N&&N.addEventListener("click",()=>{if(n.notes.find(k=>k.id===l.value.id)){m.value=!0,d.close();return}if(!n.user.ID){g.value=!0,d.close();return}u.value=!0})})}function B(a,e){return`
    <div class="info-window">
      <h6>${a}</h6>
      <p>${e}</p>
      <div class=info-window__button>
        <button class="create-note">新增筆記</button>
      </div>
    </div>`}y(),x(()=>n.userLocation,()=>{y()}),E(async()=>{const a=document.querySelector(".search-input input");await google.maps.importLibrary("places");const e={north:n.userLocation.lat+.1,south:n.userLocation.lat-.1,east:n.userLocation.lng+.1,west:n.userLocation.lng-.1},t=new google.maps.places.Autocomplete(a,{fields:["place_id","geometry","formatted_address","name","url"],bounds:e});t.addListener("place_changed",()=>{d&&d.close();const o=t.getPlace();!o.geometry||!o.geometry.location||(o.geometry.viewport?i.fitBounds(o.geometry.viewport):(i.setCenter(o.geometry.location),i.setZoom(18)),I(o.place_id,o.name,{lat:o.geometry.location.lat(),lng:o.geometry.location.lng()},o.url,o.formatted_address),L(o.geometry.location,i,o.name,o.formatted_address))})});function D(a){d.close(),u.value=!1;const e=a;if(l.value={user:n.user.ID,id:"",storeName:"",foodScore:0,serviceScore:0,pros:"",cons:"",location:{lat:0,lng:0},googlemapURL:"",address:"",photos:[]},n.notes.find(t=>t.id===e.id)){m.value=!0;return}n.createNote(e)}function I(a,e,t,o,f){l.value.id=a,l.value.storeName=e,l.value.location=t,l.value.googlemapURL=o,l.value.address=f}return x(()=>n.user,()=>{l.value.user=n.user.ID}),(a,e)=>(z(),R("div",null,[s(Q,{modelValue:w.value,"onUpdate:modelValue":e[0]||(e[0]=t=>w.value=t),class:"search-input",outlined:"",placeholder:"在這裡搜尋",color:"red"},null,8,["modelValue"]),e[9]||(e[9]=p("div",{class:"separator row flex-center"},[p("div",{class:"text text-grey-7 q-py-sm"},"或直接點選地點")],-1)),p("div",{id:"map",onTouchstart:e[1]||(e[1]=M(()=>{},["stop"])),onMousedown:e[2]||(e[2]=M(()=>{},["stop"]))},null,32),s(v,{modelValue:u.value,"onUpdate:modelValue":e[4]||(e[4]=t=>u.value=t),persistent:""},{default:r(()=>[s(W,{isCreate:!0,"onUpdate:isCreate":e[3]||(e[3]=t=>u.value=t),noteInput:l.value,"onCreate:note":D},null,8,["noteInput"])]),_:1},8,["modelValue"]),s(v,{modelValue:m.value,"onUpdate:modelValue":e[5]||(e[5]=t=>m.value=t)},{default:r(()=>[s(V,null,{default:r(()=>[s(b,{class:"row items-center"},{default:r(()=>[s(U,{name:"warning",color:"negative",size:"24px"}),e[7]||(e[7]=p("span",{class:"q-ml-sm"},"已經寫過這家店的筆記囉！",-1))]),_:1}),s(C,{align:"right"},{default:r(()=>[S(s(q,{flat:"",label:"OK",color:"primary"},null,512),[[_]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(v,{modelValue:g.value,"onUpdate:modelValue":e[6]||(e[6]=t=>g.value=t)},{default:r(()=>[s(V,{style:{width:"200px"}},{default:r(()=>[s(b,{class:"row items-center"},{default:r(()=>[s(U,{name:"warning",color:"negative",size:"24px"}),e[8]||(e[8]=p("span",{class:"q-ml-sm"},"請先登入！",-1))]),_:1}),s(C,{align:"right"},{default:r(()=>[S(s(q,{flat:"",label:"OK",color:"primary"},null,512),[[_]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}},F=P(O,[["__scopeId","data-v-2853a8a3"]]);export{F as default};
