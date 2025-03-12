import{Q as U,N as h}from"./Note-C8zhBK7r.js";import{c as Q,u as $,a as O,g as z,b as F,d as L,e as v,h as j,R as A,f as b,Q as C,i as P,s as K,_ as T,j as E,r as D,k as r,l as N,m,w,F as y,n as p,o as i,p as I,q as g}from"./index-BA2RkC_5.js";const M={xs:8,sm:10,md:14,lg:20,xl:24},_=Q({name:"QChip",props:{...O,...$,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(t,{slots:u,emit:f}){const{proxy:{$q:d}}=z(),s=F(t,d),S=L(t,M),k=v(()=>t.selected===!0||t.icon!==void 0),q=v(()=>t.selected===!0?t.iconSelected||d.iconSet.chip.selected:t.icon),x=v(()=>t.iconRemove||d.iconSet.chip.remove),a=v(()=>t.disable===!1&&(t.clickable===!0||t.selected!==null)),e=v(()=>{const o=t.outline===!0&&t.color||t.textColor;return"q-chip row inline no-wrap items-center"+(t.outline===!1&&t.color!==void 0?` bg-${t.color}`:"")+(o?` text-${o} q-chip--colored`:"")+(t.disable===!0?" disabled":"")+(t.dense===!0?" q-chip--dense":"")+(t.outline===!0?" q-chip--outline":"")+(t.selected===!0?" q-chip--selected":"")+(a.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(t.square===!0?" q-chip--square":"")+(s.value===!0?" q-chip--dark q-dark":"")}),l=v(()=>{const o=t.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:t.tabindex||0},B={...o,role:"button","aria-hidden":"false","aria-label":t.removeAriaLabel||d.lang.label.remove};return{chip:o,remove:B}});function c(o){o.keyCode===13&&n(o)}function n(o){t.disable||(f("update:selected",!t.selected),f("click",o))}function V(o){(o.keyCode===void 0||o.keyCode===13)&&(K(o),t.disable===!1&&(f("update:modelValue",!1),f("remove")))}function R(){const o=[];a.value===!0&&o.push(b("div",{class:"q-focus-helper"})),k.value===!0&&o.push(b(C,{class:"q-chip__icon q-chip__icon--left",name:q.value}));const B=t.label!==void 0?[b("div",{class:"ellipsis"},[t.label])]:void 0;return o.push(b("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},P(u.default,B))),t.iconRight&&o.push(b(C,{class:"q-chip__icon q-chip__icon--right",name:t.iconRight})),t.removable===!0&&o.push(b(C,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:x.value,...l.value.remove,onClick:V,onKeyup:V})),o}return()=>{if(t.modelValue===!1)return;const o={class:e.value,style:S.value};return a.value===!0&&Object.assign(o,l.value.chip,{onClick:n,onKeyup:c}),j("div",o,R(),"ripple",t.ripple!==!1&&t.disable!==!0,()=>[[A,t.ripple]])}}}),G={class:"notes column flex-center"},H={class:"row flex-center q-gutter-md q-pb-md"},J={class:"search"},W={class:"q-gutter-xs"},X={key:0,class:"row flex-center q-gutter-lg"},Y={key:1,class:"row flex-center q-gutter-lg"},Z={key:2,class:"row flex-center q-gutter-lg"},ee={key:3,class:"row flex-center q-gutter-lg"},te={__name:"NotesView",setup(t){const u=E(),f=D(""),d=v(()=>f.value?[...u.notesSortedByDistance].filter(a=>a.storeName.includes(f.value)):[...u.notesSortedByDistance]),s=D({total:!1,food:!1,service:!1});function S(a){s.value={total:!1,food:!1,service:!1,[a]:s.value[a]}}const k=v(()=>[...d.value].sort((a,e)=>{const l=a.foodScore+a.serviceScore;return e.foodScore+e.serviceScore-l})),q=v(()=>[...d.value].sort((a,e)=>e.foodScore-a.foodScore)),x=v(()=>[...d.value].sort((a,e)=>e.serviceScore-a.serviceScore));return(a,e)=>(i(),r("div",G,[N("div",H,[N("div",J,[m(U,{class:"search__input",outlined:"",dense:"",placeholder:"以店名搜尋",color:"green",modelValue:f.value,"onUpdate:modelValue":e[0]||(e[0]=l=>f.value=l)},null,8,["modelValue"])]),N("div",W,[m(_,{selected:s.value.total,"onUpdate:selected":e[1]||(e[1]=l=>s.value.total=l),color:s.value.total?"light-green":"green","text-color":"white",icon:"star",onClick:e[2]||(e[2]=l=>S("total"))},{default:w(()=>e[15]||(e[15]=[I(" 依總分 ")])),_:1},8,["selected","color"]),m(_,{selected:s.value.food,"onUpdate:selected":e[3]||(e[3]=l=>s.value.food=l),color:s.value.food?"light-green":"green","text-color":"white",icon:"lunch_dining",onClick:e[4]||(e[4]=l=>S("food"))},{default:w(()=>e[16]||(e[16]=[I(" 依餐點 ")])),_:1},8,["selected","color"]),m(_,{selected:s.value.service,"onUpdate:selected":e[5]||(e[5]=l=>s.value.service=l),color:s.value.service?"light-green":"green","text-color":"white",icon:"restaurant",onClick:e[6]||(e[6]=l=>S("service"))},{default:w(()=>e[17]||(e[17]=[I(" 依服務 ")])),_:1},8,["selected","color"])])]),s.value.total?(i(),r("div",X,[(i(!0),r(y,null,p(k.value,(l,c)=>(i(),r("div",{class:"note",key:l.id},[m(h,{noteInput:k.value[c],"onUpdate:note":e[7]||(e[7]=n=>g(u).updateNote(n)),"onDelete:note":e[8]||(e[8]=n=>g(u).deleteNote(n))},null,8,["noteInput"])]))),128))])):s.value.food?(i(),r("div",Y,[(i(!0),r(y,null,p(q.value,(l,c)=>(i(),r("div",{class:"note",key:l.id},[m(h,{noteInput:q.value[c],"onUpdate:note":e[9]||(e[9]=n=>g(u).updateNote(n)),"onDelete:note":e[10]||(e[10]=n=>g(u).deleteNote(n))},null,8,["noteInput"])]))),128))])):s.value.service?(i(),r("div",Z,[(i(!0),r(y,null,p(x.value,(l,c)=>(i(),r("div",{class:"note",key:l.id},[m(h,{noteInput:x.value[c],"onUpdate:note":e[11]||(e[11]=n=>g(u).updateNote(n)),"onDelete:note":e[12]||(e[12]=n=>g(u).deleteNote(n))},null,8,["noteInput"])]))),128))])):(i(),r("div",ee,[(i(!0),r(y,null,p(d.value,(l,c)=>(i(),r("div",{class:"note",key:l.id},[m(h,{noteInput:d.value[c],"onUpdate:note":e[13]||(e[13]=n=>g(u).updateNote(n)),"onDelete:note":e[14]||(e[14]=n=>g(u).deleteNote(n))},null,8,["noteInput"])]))),128))]))]))}},ne=T(te,[["__scopeId","data-v-2b781d1d"]]);export{ne as default};
