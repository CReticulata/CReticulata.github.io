import{aA as Ze,r as z,q as ie,ad as be,w as H,c as h,g as W,a7 as Ue,aB as Ge,aC as Ie,o as re,aD as We,aj as xe,u as De,s as ye,n as Y,aE as ze,aF as Le,h as p,j as oe,a as je,a1 as Se,aG as Ye,G,H as pe,aH as Je,x as we,f as te,ah as qe,aI as Me,aJ as ce,aK as Xe,aL as et,m as tt,aM as nt,aN as lt,z as ot,B as at,D as it,C as rt,E as ut,aO as st,aP as dt,I as ct}from"./index-C-bEpD6O.js";function ft(e){return e??null}function _e(e,t){return e??(t===!0?`f_${be()}`:null)}function vt({getValue:e,required:t=!0}={}){if(Ze.value===!0){const n=e!==void 0?z(ft(e())):z(null);return t===!0&&n.value===null&&ie(()=>{n.value=`f_${be()}`}),e!==void 0&&H(e,i=>{n.value=_e(i,t)}),n}return e!==void 0?h(()=>_e(e(),t)):z(`f_${be()}`)}const Fe=/^on[A-Z]/;function mt(){const{attrs:e,vnode:t}=W(),n={listeners:z({}),attributes:z({})};function i(){const u={},d={};for(const c in e)c!=="class"&&c!=="style"&&Fe.test(c)===!1&&(u[c]=e[c]);for(const c in t.props)Fe.test(c)===!0&&(d[c]=t.props[c]);n.attributes.value=u,n.listeners.value=d}return Ue(i),i(),n}function gt({validate:e,resetValidation:t,requiresQForm:n}){const i=Ge(Ie,!1);if(i!==!1){const{props:u,proxy:d}=W();Object.assign(d,{validate:e,resetValidation:t}),H(()=>u.disable,c=>{c===!0?(typeof t=="function"&&t(),i.unbindComponent(d)):i.bindComponent(d)}),ie(()=>{u.disable!==!0&&i.bindComponent(d)}),re(()=>{u.disable!==!0&&i.unbindComponent(d)})}else n===!0&&console.error("Parent QForm not found on useFormChild()!")}const Ee=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,Re=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,Be=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ue=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,se=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,he={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>Ee.test(e),hexaColor:e=>Re.test(e),hexOrHexaColor:e=>Be.test(e),rgbColor:e=>ue.test(e),rgbaColor:e=>se.test(e),rgbOrRgbaColor:e=>ue.test(e)||se.test(e),hexOrRgbColor:e=>Ee.test(e)||ue.test(e),hexaOrRgbaColor:e=>Re.test(e)||se.test(e),anyColor:e=>Be.test(e)||ue.test(e)||se.test(e)},ht=[!0,!1,"ondemand"],bt={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],default:!1,validator:e=>ht.includes(e)}};function yt(e,t){const{props:n,proxy:i}=W(),u=z(!1),d=z(null),c=z(!1);gt({validate:j,resetValidation:A});let y=0,M;const k=h(()=>n.rules!==void 0&&n.rules!==null&&n.rules.length!==0),x=h(()=>n.disable!==!0&&k.value===!0&&t.value===!1),m=h(()=>n.error===!0||u.value===!0),Q=h(()=>typeof n.errorMessage=="string"&&n.errorMessage.length!==0?n.errorMessage:d.value);H(()=>n.modelValue,()=>{c.value=!0,x.value===!0&&n.lazyRules===!1&&L()});function g(){n.lazyRules!=="ondemand"&&x.value===!0&&c.value===!0&&L()}H(()=>n.reactiveRules,N=>{N===!0?M===void 0&&(M=H(()=>n.rules,g,{immediate:!0,deep:!0})):M!==void 0&&(M(),M=void 0)},{immediate:!0}),H(()=>n.lazyRules,g),H(e,N=>{N===!0?c.value=!0:x.value===!0&&n.lazyRules!=="ondemand"&&L()});function A(){y++,t.value=!1,c.value=!1,u.value=!1,d.value=null,L.cancel()}function j(N=n.modelValue){if(n.disable===!0||k.value===!1)return!0;const T=++y,R=t.value!==!0?()=>{c.value=!0}:()=>{},B=(E,_)=>{E===!0&&R(),u.value=E,d.value=_||null,t.value=!1},V=[];for(let E=0;E<n.rules.length;E++){const _=n.rules[E];let I;if(typeof _=="function"?I=_(N,he):typeof _=="string"&&he[_]!==void 0&&(I=he[_](N)),I===!1||typeof I=="string")return B(!0,I),!1;I!==!0&&I!==void 0&&V.push(I)}return V.length===0?(B(!1),!0):(t.value=!0,Promise.all(V).then(E=>{if(E===void 0||Array.isArray(E)===!1||E.length===0)return T===y&&B(!1),!0;const _=E.find(I=>I===!1||typeof I=="string");return T===y&&B(_!==void 0,_),_===void 0},E=>(T===y&&(console.error(E),B(!0)),!1)))}const L=We(j,0);return re(()=>{M!==void 0&&M(),L.cancel()}),Object.assign(i,{resetValidation:A,validate:j}),xe(i,"hasError",()=>m.value),{isDirtyModel:c,hasRules:k,hasError:m,errorMessage:Q,validate:j,resetValidation:A}}let J=[],ae=[];function Ke(e){ae=ae.filter(t=>t!==e)}function pt(e){Ke(e),ae.push(e)}function Ae(e){Ke(e),ae.length===0&&J.length!==0&&(J[J.length-1](),J=[])}function me(e){ae.length===0?e():J.push(e)}function kt(e){J=J.filter(t=>t!==e)}function ke(e){return e!=null&&(""+e).length!==0}const xt={...De,...bt,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String},wt={...xt,maxlength:[Number,String]},Ct=["update:modelValue","clear","focus","blur"];function St({requiredForAttr:e=!0,tagProp:t,changeEvent:n=!1}={}){const{props:i,proxy:u}=W(),d=je(i,u.$q),c=vt({required:e,getValue:()=>i.for});return{requiredForAttr:e,changeEvent:n,tag:t===!0?h(()=>i.tag):{value:"label"},isDark:d,editable:h(()=>i.disable!==!0&&i.readonly!==!0),innerLoading:z(!1),focused:z(!1),hasPopupOpen:!1,splitAttrs:mt(),targetUid:c,rootRef:z(null),targetRef:z(null),controlRef:z(null)}}function qt(e){const{props:t,emit:n,slots:i,attrs:u,proxy:d}=W(),{$q:c}=d;let y=null;e.hasValue===void 0&&(e.hasValue=h(()=>ke(t.modelValue))),e.emitValue===void 0&&(e.emitValue=s=>{n("update:modelValue",s)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:r,onFocusout:a}),Object.assign(e,{clearValue:f,onControlFocusin:r,onControlFocusout:a,focus:_}),e.computedCounter===void 0&&(e.computedCounter=h(()=>{if(t.counter!==!1){const s=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,b=t.maxlength!==void 0?t.maxlength:t.maxValues;return s+(b!==void 0?" / "+b:"")}}));const{isDirtyModel:M,hasRules:k,hasError:x,errorMessage:m,resetValidation:Q}=yt(e.focused,e.innerLoading),g=e.floatingLabel!==void 0?h(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):h(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),A=h(()=>t.bottomSlots===!0||t.hint!==void 0||k.value===!0||t.counter===!0||t.error!==null),j=h(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),L=h(()=>`q-field row no-wrap items-start q-field--${j.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(g.value===!0?" q-field--float":"")+(T.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(x.value===!0?" q-field--error":"")+(x.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&A.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),N=h(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(x.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),T=h(()=>t.labelSlot===!0||t.label!==void 0),R=h(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&x.value!==!0?` text-${t.labelColor}`:"")),B=h(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:g.value,modelValue:t.modelValue,emitValue:e.emitValue})),V=h(()=>{const s={};return e.targetUid.value&&(s.for=e.targetUid.value),t.disable===!0&&(s["aria-disabled"]="true"),s});function E(){const s=document.activeElement;let b=e.targetRef!==void 0&&e.targetRef.value;b&&(s===null||s.id!==e.targetUid.value)&&(b.hasAttribute("tabindex")===!0||(b=b.querySelector("[tabindex]")),b&&b!==s&&b.focus({preventScroll:!0}))}function _(){me(E)}function I(){kt(E);const s=document.activeElement;s!==null&&e.rootRef.value.contains(s)&&s.blur()}function r(s){y!==null&&(clearTimeout(y),y=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,n("focus",s))}function a(s,b){y!==null&&clearTimeout(y),y=setTimeout(()=>{y=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,n("blur",s)),b!==void 0&&b())})}function f(s){ye(s),c.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),n("update:modelValue",null),e.changeEvent===!0&&n("change",null),n("clear",t.modelValue),Y(()=>{const b=M.value;Q(),M.value=b})}function o(s){[13,32].includes(s.keyCode)&&f(s)}function S(){const s=[];return i.prepend!==void 0&&s.push(p("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:oe},i.prepend())),s.push(p("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},w())),x.value===!0&&t.noErrorIcon===!1&&s.push(C("error",[p(Se,{name:c.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?s.push(C("inner-loading-append",i.loading!==void 0?i.loading():[p(Ye,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&s.push(C("inner-clearable-append",[p(Se,{class:"q-field__focusable-action",name:t.clearIcon||c.iconSet.field.clear,tabindex:0,role:"button","aria-hidden":"false","aria-label":c.lang.label.clear,onKeyup:o,onClick:f})])),i.append!==void 0&&s.push(p("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:oe},i.append())),e.getInnerAppend!==void 0&&s.push(C("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&s.push(e.getControlChild()),s}function w(){const s=[];return t.prefix!==void 0&&t.prefix!==null&&s.push(p("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&s.push(e.getShadowControl()),e.getControl!==void 0?s.push(e.getControl()):i.rawControl!==void 0?s.push(i.rawControl()):i.control!==void 0&&s.push(p("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},i.control(B.value))),T.value===!0&&s.push(p("div",{class:R.value},G(i.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&s.push(p("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),s.concat(G(i.default))}function $(){let s,b;x.value===!0?m.value!==null?(s=[p("div",{role:"alert"},m.value)],b=`q--slot-error-${m.value}`):(s=G(i.error),b="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(s=[p("div",t.hint)],b=`q--slot-hint-${t.hint}`):(s=G(i.hint),b="q--slot-hint"));const F=t.counter===!0||i.counter!==void 0;if(t.hideBottomSpace===!0&&F===!1&&s===void 0)return;const P=p("div",{key:b,class:"q-field__messages col"},s);return p("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:oe},[t.hideBottomSpace===!0?P:p(pe,{name:"q-transition--field-message"},()=>P),F===!0?p("div",{class:"q-field__counter"},i.counter!==void 0?i.counter():e.computedCounter.value):null])}function C(s,b){return b===null?null:p("div",{key:s,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},b)}let q=!1;return ze(()=>{q=!0}),Le(()=>{q===!0&&t.autofocus===!0&&d.focus()}),t.autofocus===!0&&ie(()=>{d.focus()}),re(()=>{y!==null&&clearTimeout(y)}),Object.assign(d,{focus:_,blur:I}),function(){const b=e.getControl===void 0&&i.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...V.value}:V.value;return p(e.tag.value,{ref:e.rootRef,class:[L.value,u.class],style:u.style,...b},[i.before!==void 0?p("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:oe},i.before()):null,p("div",{class:"q-field__inner relative-position col self-stretch"},[p("div",{ref:e.controlRef,class:N.value,tabindex:-1,...e.controlEvents},S()),A.value===!0?$():null]),i.after!==void 0?p("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:oe},i.after()):null])}}const Ve={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ve={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Ne=Object.keys(ve);Ne.forEach(e=>{ve[e].regex=new RegExp(ve[e].pattern)});const Mt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Ne.join("")+"])|(.)","g"),Pe=/[.*+?^${}()|[\]\\]/g,K="",_t={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function Ft(e,t,n,i){let u,d,c,y,M,k;const x=z(null),m=z(g());function Q(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}H(()=>e.type+e.autogrow,j),H(()=>e.mask,r=>{if(r!==void 0)L(m.value,!0);else{const a=_(m.value);j(),e.modelValue!==a&&t("update:modelValue",a)}}),H(()=>e.fillMask+e.reverseFillMask,()=>{x.value===!0&&L(m.value,!0)}),H(()=>e.unmaskedValue,()=>{x.value===!0&&L(m.value)});function g(){if(j(),x.value===!0){const r=V(_(e.modelValue));return e.fillMask!==!1?I(r):r}return e.modelValue}function A(r){if(r<u.length)return u.slice(-r);let a="",f=u;const o=f.indexOf(K);if(o!==-1){for(let S=r-f.length;S>0;S--)a+=K;f=f.slice(0,o)+a+f.slice(o)}return f}function j(){if(x.value=e.mask!==void 0&&e.mask.length!==0&&Q(),x.value===!1){y=void 0,u="",d="";return}const r=Ve[e.mask]===void 0?e.mask:Ve[e.mask],a=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",f=a.replace(Pe,"\\$&"),o=[],S=[],w=[];let $=e.reverseFillMask===!0,C="",q="";r.replace(Mt,(P,l,O,Z,U)=>{if(Z!==void 0){const v=ve[Z];w.push(v),q=v.negate,$===!0&&(S.push("(?:"+q+"+)?("+v.pattern+"+)?(?:"+q+"+)?("+v.pattern+"+)?"),$=!1),S.push("(?:"+q+"+)?("+v.pattern+")?")}else if(O!==void 0)C="\\"+(O==="\\"?"":O),w.push(O),o.push("([^"+C+"]+)?"+C+"?");else{const v=l!==void 0?l:U;C=v==="\\"?"\\\\\\\\":v.replace(Pe,"\\\\$&"),w.push(v),o.push("([^"+C+"]+)?"+C+"?")}});const s=new RegExp("^"+o.join("")+"("+(C===""?".":"[^"+C+"]")+"+)?"+(C===""?"":"["+C+"]*")+"$"),b=S.length-1,F=S.map((P,l)=>l===0&&e.reverseFillMask===!0?new RegExp("^"+f+"*"+P):l===b?new RegExp("^"+P+"("+(q===""?".":q)+"+)?"+(e.reverseFillMask===!0?"$":f+"*")):new RegExp("^"+P));c=w,y=P=>{const l=s.exec(e.reverseFillMask===!0?P:P.slice(0,w.length+1));l!==null&&(P=l.slice(1).join(""));const O=[],Z=F.length;for(let U=0,v=P;U<Z;U++){const D=F[U].exec(v);if(D===null)break;v=v.slice(D.shift().length),O.push(...D)}return O.length!==0?O.join(""):P},u=w.map(P=>typeof P=="string"?P:K).join(""),d=u.split(K).join(a)}function L(r,a,f){const o=i.value,S=o.selectionEnd,w=o.value.length-S,$=_(r);a===!0&&j();const C=V($),q=e.fillMask!==!1?I(C):C,s=m.value!==q;o.value!==q&&(o.value=q),s===!0&&(m.value=q),document.activeElement===o&&Y(()=>{if(q===d){const F=e.reverseFillMask===!0?d.length:0;o.setSelectionRange(F,F,"forward");return}if(f==="insertFromPaste"&&e.reverseFillMask!==!0){const F=o.selectionEnd;let P=S-1;for(let l=M;l<=P&&l<F;l++)u[l]!==K&&P++;T.right(o,P);return}if(["deleteContentBackward","deleteContentForward"].indexOf(f)!==-1){const F=e.reverseFillMask===!0?S===0?q.length>C.length?1:0:Math.max(0,q.length-(q===d?0:Math.min(C.length,w)+1))+1:S;o.setSelectionRange(F,F,"forward");return}if(e.reverseFillMask===!0)if(s===!0){const F=Math.max(0,q.length-(q===d?0:Math.min(C.length,w+1)));F===1&&S===1?o.setSelectionRange(F,F,"forward"):T.rightReverse(o,F)}else{const F=q.length-w;o.setSelectionRange(F,F,"backward")}else if(s===!0){const F=Math.max(0,u.indexOf(K),Math.min(C.length,S)-1);T.right(o,F)}else{const F=S-1;T.right(o,F)}});const b=e.unmaskedValue===!0?_(q):q;String(e.modelValue)!==b&&(e.modelValue!==null||b!=="")&&n(b,!0)}function N(r,a,f){const o=V(_(r.value));a=Math.max(0,u.indexOf(K),Math.min(o.length,a)),M=a,r.setSelectionRange(a,f,"forward")}const T={left(r,a){const f=u.slice(a-1).indexOf(K)===-1;let o=Math.max(0,a-1);for(;o>=0;o--)if(u[o]===K){a=o,f===!0&&a++;break}if(o<0&&u[a]!==void 0&&u[a]!==K)return T.right(r,0);a>=0&&r.setSelectionRange(a,a,"backward")},right(r,a){const f=r.value.length;let o=Math.min(f,a+1);for(;o<=f;o++)if(u[o]===K){a=o;break}else u[o-1]===K&&(a=o);if(o>f&&u[a-1]!==void 0&&u[a-1]!==K)return T.left(r,f);r.setSelectionRange(a,a,"forward")},leftReverse(r,a){const f=A(r.value.length);let o=Math.max(0,a-1);for(;o>=0;o--)if(f[o-1]===K){a=o;break}else if(f[o]===K&&(a=o,o===0))break;if(o<0&&f[a]!==void 0&&f[a]!==K)return T.rightReverse(r,0);a>=0&&r.setSelectionRange(a,a,"backward")},rightReverse(r,a){const f=r.value.length,o=A(f),S=o.slice(0,a+1).indexOf(K)===-1;let w=Math.min(f,a+1);for(;w<=f;w++)if(o[w-1]===K){a=w,a>0&&S===!0&&a--;break}if(w>f&&o[a-1]!==void 0&&o[a-1]!==K)return T.leftReverse(r,f);r.setSelectionRange(a,a,"forward")}};function R(r){t("click",r),k=void 0}function B(r){if(t("keydown",r),Je(r)===!0||r.altKey===!0)return;const a=i.value,f=a.selectionStart,o=a.selectionEnd;if(r.shiftKey||(k=void 0),r.keyCode===37||r.keyCode===39){r.shiftKey&&k===void 0&&(k=a.selectionDirection==="forward"?f:o);const S=T[(r.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(r.preventDefault(),S(a,k===f?o:f),r.shiftKey){const w=a.selectionStart;a.setSelectionRange(Math.min(k,w),Math.max(k,w),"forward")}}else r.keyCode===8&&e.reverseFillMask!==!0&&f===o?(T.left(a,f),a.setSelectionRange(a.selectionStart,o,"backward")):r.keyCode===46&&e.reverseFillMask===!0&&f===o&&(T.rightReverse(a,o),a.setSelectionRange(f,a.selectionEnd,"forward"))}function V(r){if(r==null||r==="")return"";if(e.reverseFillMask===!0)return E(r);const a=c;let f=0,o="";for(let S=0;S<a.length;S++){const w=r[f],$=a[S];if(typeof $=="string")o+=$,w===$&&f++;else if(w!==void 0&&$.regex.test(w))o+=$.transform!==void 0?$.transform(w):w,f++;else return o}return o}function E(r){const a=c,f=u.indexOf(K);let o=r.length-1,S="";for(let w=a.length-1;w>=0&&o!==-1;w--){const $=a[w];let C=r[o];if(typeof $=="string")S=$+S,C===$&&o--;else if(C!==void 0&&$.regex.test(C))do S=($.transform!==void 0?$.transform(C):C)+S,o--,C=r[o];while(f===w&&C!==void 0&&$.regex.test(C));else return S}return S}function _(r){return typeof r!="string"||y===void 0?typeof r=="number"?y(""+r):r:y(r)}function I(r){return d.length-r.length<=0?r:e.reverseFillMask===!0&&r.length!==0?d.slice(0,-r.length)+r:r+d.slice(r.length)}return{innerValue:m,hasMask:x,moveCursorForPaste:N,updateMaskValue:L,onMaskedKeydown:B,onMaskedClick:R}}const Et={name:String};function en(e){return h(()=>({type:"hidden",name:e.name,value:e.modelValue}))}function tn(e={}){return(t,n,i)=>{t[n](p("input",{class:"hidden"+(i||""),...e.value}))}}function Rt(e){return h(()=>e.name||e.for)}function Bt(e,t){function n(){const i=e.modelValue;try{const u="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(i)===i&&("length"in i?Array.from(i):[i]).forEach(d=>{u.items.add(d)}),{files:u.files}}catch{return{files:void 0}}}return t===!0?h(()=>{if(e.type==="file")return n()}):h(n)}const At=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,Vt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,Pt=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,$t=/[a-z0-9_ -]$/i;function Tt(e){return function(n){if(n.type==="compositionend"||n.type==="change"){if(n.target.qComposing!==!0)return;n.target.qComposing=!1,e(n)}else n.type==="compositionupdate"&&n.target.qComposing!==!0&&typeof n.data=="string"&&(we.is.firefox===!0?$t.test(n.data)===!1:At.test(n.data)===!0||Vt.test(n.data)===!0||Pt.test(n.data)===!0)===!0&&(n.target.qComposing=!0)}}const nn=te({name:"QInput",inheritAttrs:!1,props:{...wt,..._t,...Et,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Ct,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:n}){const{proxy:i}=W(),{$q:u}=i,d={};let c=NaN,y,M,k=null,x;const m=z(null),Q=Rt(e),{innerValue:g,hasMask:A,moveCursorForPaste:j,updateMaskValue:L,onMaskedKeydown:N,onMaskedClick:T}=Ft(e,t,C,m),R=Bt(e,!0),B=h(()=>ke(g.value)),V=Tt(w),E=St({changeEvent:!0}),_=h(()=>e.type==="textarea"||e.autogrow===!0),I=h(()=>_.value===!0||["text","search","url","tel","password"].includes(e.type)),r=h(()=>{const l={...E.splitAttrs.listeners.value,onInput:w,onPaste:S,onChange:s,onBlur:b,onFocus:qe};return l.onCompositionstart=l.onCompositionupdate=l.onCompositionend=V,A.value===!0&&(l.onKeydown=N,l.onClick=T),e.autogrow===!0&&(l.onAnimationend=$),l}),a=h(()=>{const l={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:Q.value,...E.splitAttrs.attributes.value,id:E.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return _.value===!1&&(l.type=e.type),e.autogrow===!0&&(l.rows=1),l});H(()=>e.type,()=>{m.value&&(m.value.value=e.modelValue)}),H(()=>e.modelValue,l=>{if(A.value===!0){if(M===!0&&(M=!1,String(l)===c))return;L(l)}else g.value!==l&&(g.value=l,e.type==="number"&&d.hasOwnProperty("value")===!0&&(y===!0?y=!1:delete d.value));e.autogrow===!0&&Y(q)}),H(()=>e.autogrow,l=>{l===!0?Y(q):m.value!==null&&n.rows>0&&(m.value.style.height="auto")}),H(()=>e.dense,()=>{e.autogrow===!0&&Y(q)});function f(){me(()=>{const l=document.activeElement;m.value!==null&&m.value!==l&&(l===null||l.id!==E.targetUid.value)&&m.value.focus({preventScroll:!0})})}function o(){m.value!==null&&m.value.select()}function S(l){if(A.value===!0&&e.reverseFillMask!==!0){const O=l.target;j(O,O.selectionStart,O.selectionEnd)}t("paste",l)}function w(l){if(!l||!l.target)return;if(e.type==="file"){t("update:modelValue",l.target.files);return}const O=l.target.value;if(l.target.qComposing===!0){d.value=O;return}if(A.value===!0)L(O,!1,l.inputType);else if(C(O),I.value===!0&&l.target===document.activeElement){const{selectionStart:Z,selectionEnd:U}=l.target;Z!==void 0&&U!==void 0&&Y(()=>{l.target===document.activeElement&&O.indexOf(l.target.value)===0&&l.target.setSelectionRange(Z,U)})}e.autogrow===!0&&q()}function $(l){t("animationend",l),q()}function C(l,O){x=()=>{k=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==l&&c!==l&&(c=l,O===!0&&(M=!0),t("update:modelValue",l),Y(()=>{c===l&&(c=NaN)})),x=void 0},e.type==="number"&&(y=!0,d.value=l),e.debounce!==void 0?(k!==null&&clearTimeout(k),d.value=l,k=setTimeout(x,e.debounce)):x()}function q(){requestAnimationFrame(()=>{const l=m.value;if(l!==null){const O=l.parentNode.style,{scrollTop:Z}=l,{overflowY:U,maxHeight:v}=u.platform.is.firefox===!0?{}:window.getComputedStyle(l),D=U!==void 0&&U!=="scroll";D===!0&&(l.style.overflowY="hidden"),O.marginBottom=l.scrollHeight-1+"px",l.style.height="1px",l.style.height=l.scrollHeight+"px",D===!0&&(l.style.overflowY=parseInt(v,10)<l.scrollHeight?"auto":"hidden"),O.marginBottom="",l.scrollTop=Z}})}function s(l){V(l),k!==null&&(clearTimeout(k),k=null),x!==void 0&&x(),t("change",l.target.value)}function b(l){l!==void 0&&qe(l),k!==null&&(clearTimeout(k),k=null),x!==void 0&&x(),y=!1,M=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{m.value!==null&&(m.value.value=g.value!==void 0?g.value:"")})}function F(){return d.hasOwnProperty("value")===!0?d.value:g.value!==void 0?g.value:""}re(()=>{b()}),ie(()=>{e.autogrow===!0&&q()}),Object.assign(E,{innerValue:g,fieldClass:h(()=>`q-${_.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:h(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:m,emitValue:C,hasValue:B,floatingLabel:h(()=>B.value===!0&&(e.type!=="number"||isNaN(g.value)===!1)||ke(e.displayValue)),getControl:()=>p(_.value===!0?"textarea":"input",{ref:m,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...a.value,...r.value,...e.type!=="file"?{value:F()}:R.value}),getShadowControl:()=>p("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(_.value===!0?"":" text-no-wrap")},[p("span",{class:"invisible"},F()),p("span",e.shadowText)])});const P=qt(E);return Object.assign(i,{focus:f,select:o,getNativeElement:()=>m.value}),xe(i,"nativeEl",()=>m.value),P}});let Ot=1,It=document.body;function Dt(e,t){const n=document.createElement("div");if(n.id=t!==void 0?`q-portal--${t}--${Ot++}`:e,Me.globalNodes!==void 0){const i=Me.globalNodes.class;i!==void 0&&(n.className=i)}return It.appendChild(n),n}function zt(e){e.remove()}const fe=[];function ln(e){return fe.find(t=>t.contentEl!==null&&t.contentEl.contains(e))}function Lt(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return ce(e)}else if(e.__qPortal===!0){const n=ce(e);return n!==void 0&&n.$options.name==="QPopupProxy"?(e.hide(t),n):e}e=ce(e)}while(e!=null)}function on(e,t,n){for(;n!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(n--,e.$options.name==="QMenu"){e=Lt(e,t);continue}e.hide(t)}e=ce(e)}}const jt=te({name:"QPortal",setup(e,{slots:t}){return()=>t.default()}});function Kt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Nt(e,t,n,i){const u=z(!1),d=z(!1);let c=null;const y={},M=i==="dialog"&&Kt(e);function k(m){if(m===!0){Ae(y),d.value=!0;return}d.value=!1,u.value===!1&&(M===!1&&c===null&&(c=Dt(!1,i)),u.value=!0,fe.push(e.proxy),pt(y))}function x(m){if(d.value=!1,m!==!0)return;Ae(y),u.value=!1;const Q=fe.indexOf(e.proxy);Q!==-1&&fe.splice(Q,1),c!==null&&(zt(c),c=null)}return Xe(()=>{x(!0)}),e.proxy.__qPortal=!0,xe(e.proxy,"contentEl",()=>t.value),{showPortal:k,hidePortal:x,portalIsActive:u,portalIsAccessible:d,renderPortal:()=>M===!0?n():u.value===!0?[p(et,{to:c},p(jt,n))]:void 0}}const Ht={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Qt(e,t=()=>{},n=()=>{}){return{transitionProps:h(()=>{const i=`q-transition--${e.transitionShow||t()}`,u=`q-transition--${e.transitionHide||n()}`;return{appear:!0,enterFromClass:`${i}-enter-from`,enterActiveClass:`${i}-enter-active`,enterToClass:`${i}-enter-to`,leaveFromClass:`${u}-leave-from`,leaveActiveClass:`${u}-leave-active`,leaveToClass:`${u}-leave-to`}}),transitionStyle:h(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}const X=[];let le;function Zt(e){le=e.keyCode===27}function Ut(){le===!0&&(le=!1)}function Gt(e){le===!0&&(le=!1,tt(e,27)===!0&&X[X.length-1](e))}function He(e){window[e]("keydown",Zt),window[e]("blur",Ut),window[e]("keyup",Gt),le=!1}function Wt(e){we.is.desktop===!0&&(X.push(e),X.length===1&&He("addEventListener"))}function $e(e){const t=X.indexOf(e);t!==-1&&(X.splice(t,1),X.length===0&&He("removeEventListener"))}const ee=[];function Qe(e){ee[ee.length-1](e)}function Yt(e){we.is.desktop===!0&&(ee.push(e),ee.length===1&&document.body.addEventListener("focusin",Qe))}function Te(e){const t=ee.indexOf(e);t!==-1&&(ee.splice(t,1),ee.length===0&&document.body.removeEventListener("focusin",Qe))}const an=te({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:t}){const n=h(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>p(e.tag,{class:n.value},G(t.default))}}),rn=te({name:"QCard",props:{...De,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:n}}=W(),i=je(e,n),u=h(()=>"q-card"+(i.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>p(e.tag,{class:u.value},G(t.default))}}),un=te({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const n=h(()=>parseInt(e.lines,10)),i=h(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(n.value===1?" ellipsis":"")),u=h(()=>e.lines!==void 0&&n.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":n.value}:null);return()=>p("div",{style:u.value,class:i.value},G(t.default))}}),sn=te({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:n}){const i=W(),u=z(null);let d=0;const c=[];function y(g){const A=typeof g=="boolean"?g:e.noErrorFocus!==!0,j=++d,L=(R,B)=>{n(`validation${R===!0?"Success":"Error"}`,B)},N=R=>{const B=R.validate();return typeof B.then=="function"?B.then(V=>({valid:V,comp:R}),V=>({valid:!1,comp:R,err:V})):Promise.resolve({valid:B,comp:R})};return(e.greedy===!0?Promise.all(c.map(N)).then(R=>R.filter(B=>B.valid!==!0)):c.reduce((R,B)=>R.then(()=>N(B).then(V=>{if(V.valid===!1)return Promise.reject(V)})),Promise.resolve()).catch(R=>[R])).then(R=>{if(R===void 0||R.length===0)return j===d&&L(!0),!0;if(j===d){const{comp:B,err:V}=R[0];if(V!==void 0&&console.error(V),L(!1,B),A===!0){const E=R.find(({comp:_})=>typeof _.focus=="function"&&nt(_.$)===!1);E!==void 0&&E.comp.focus()}}return!1})}function M(){d++,c.forEach(g=>{typeof g.resetValidation=="function"&&g.resetValidation()})}function k(g){g!==void 0&&ye(g);const A=d+1;y().then(j=>{A===d&&j===!0&&(e.onSubmit!==void 0?n("submit",g):g!==void 0&&g.target!==void 0&&typeof g.target.submit=="function"&&g.target.submit())})}function x(g){g!==void 0&&ye(g),n("reset"),Y(()=>{M(),e.autofocus===!0&&e.noResetFocus!==!0&&m()})}function m(){me(()=>{if(u.value===null)return;const g=u.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(u.value.querySelectorAll("[tabindex]"),A=>A.tabIndex!==-1);g!=null&&g.focus({preventScroll:!0})})}lt(Ie,{bindComponent(g){c.push(g)},unbindComponent(g){const A=c.indexOf(g);A!==-1&&c.splice(A,1)}});let Q=!1;return ze(()=>{Q=!0}),Le(()=>{Q===!0&&e.autofocus===!0&&m()}),ie(()=>{e.autofocus===!0&&m()}),Object.assign(i.proxy,{validate:y,resetValidation:M,submit:k,reset:x,focus:m,getValidationComponents:()=>c}),()=>p("form",{class:"q-form",ref:u,onSubmit:k,onReset:x},G(t.default))}});let de=0;const Jt={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},Oe={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]},dn=te({name:"QDialog",inheritAttrs:!1,props:{...at,...Ht,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,backdropFilter:String,position:{type:String,default:"standard",validator:e=>["standard","top","bottom","left","right"].includes(e)}},emits:[...ot,"shake","click","escapeKey"],setup(e,{slots:t,emit:n,attrs:i}){const u=W(),d=z(null),c=z(!1),y=z(!1);let M=null,k=null,x,m;const Q=h(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:g}=dt(),{registerTimeout:A}=it(),{registerTick:j,removeTick:L}=rt(),{transitionProps:N,transitionStyle:T}=Qt(e,()=>Oe[e.position][0],()=>Oe[e.position][1]),R=h(()=>T.value+(e.backdropFilter!==void 0?`;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}`:"")),{showPortal:B,hidePortal:V,portalIsAccessible:E,renderPortal:_}=Nt(u,d,U,"dialog"),{hide:I}=ut({showing:c,hideOnRouteChange:Q,handleShow:$,handleHide:C,processOnMount:!0}),{addToHistory:r,removeFromHistory:a}=st(c,I,Q),f=h(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Jt[e.position]}`+(y.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),o=h(()=>c.value===!0&&e.seamless!==!0),S=h(()=>e.autoClose===!0?{onClick:l}:{}),w=h(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${o.value===!0?"modal":"seamless"}`,i.class]);H(()=>e.maximized,v=>{c.value===!0&&P(v)}),H(o,v=>{g(v),v===!0?(Yt(Z),Wt(b)):(Te(Z),$e(b))});function $(v){r(),k=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,P(e.maximized),B(),y.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),j(q)):L(),A(()=>{if(u.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:D,bottom:ne}=document.activeElement.getBoundingClientRect(),{innerHeight:Ce}=window,ge=window.visualViewport!==void 0?window.visualViewport.height:Ce;D>0&&ne>ge/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-ge,ne>=Ce?1/0:Math.ceil(document.scrollingElement.scrollTop+ne-ge/2))),document.activeElement.scrollIntoView()}m=!0,d.value.click(),m=!1}B(!0),y.value=!1,n("show",v)},e.transitionDuration)}function C(v){L(),a(),F(!0),y.value=!0,V(),k!==null&&(((v&&v.type.indexOf("key")===0?k.closest('[tabindex]:not([tabindex^="-"])'):void 0)||k).focus(),k=null),A(()=>{V(!0),y.value=!1,n("hide",v)},e.transitionDuration)}function q(v){me(()=>{let D=d.value;if(D!==null){if(v!==void 0){const ne=D.querySelector(v);if(ne!==null){ne.focus({preventScroll:!0});return}}D.contains(document.activeElement)!==!0&&(D=D.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||D.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||D.querySelector("[autofocus], [data-autofocus]")||D,D.focus({preventScroll:!0}))}})}function s(v){v&&typeof v.focus=="function"?v.focus({preventScroll:!0}):q(),n("shake");const D=d.value;D!==null&&(D.classList.remove("q-animate--scale"),D.classList.add("q-animate--scale"),M!==null&&clearTimeout(M),M=setTimeout(()=>{M=null,d.value!==null&&(D.classList.remove("q-animate--scale"),q())},170))}function b(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&s():(n("escapeKey"),I()))}function F(v){M!==null&&(clearTimeout(M),M=null),(v===!0||c.value===!0)&&(P(!1),e.seamless!==!0&&(g(!1),Te(Z),$e(b))),v!==!0&&(k=null)}function P(v){v===!0?x!==!0&&(de<1&&document.body.classList.add("q-body--dialog"),de++,x=!0):x===!0&&(de<2&&document.body.classList.remove("q-body--dialog"),de--,x=!1)}function l(v){m!==!0&&(I(v),n("click",v))}function O(v){e.persistent!==!0&&e.noBackdropDismiss!==!0?I(v):e.noShake!==!0&&s()}function Z(v){e.allowFocusOutside!==!0&&E.value===!0&&ct(d.value,v.target)!==!0&&q('[tabindex]:not([tabindex="-1"])')}Object.assign(u.proxy,{focus:q,shake:s,__updateRefocusTarget(v){k=v||null}}),re(F);function U(){return p("div",{role:"dialog","aria-modal":o.value===!0?"true":"false",...i,class:w.value},[p(pe,{name:"q-transition--fade",appear:!0},()=>o.value===!0?p("div",{class:"q-dialog__backdrop fixed-full",style:R.value,"aria-hidden":"true",tabindex:-1,onClick:O}):null),p(pe,N.value,()=>c.value===!0?p("div",{ref:d,class:f.value,style:T.value,tabindex:-1,...S.value},G(t.default)):null)])}return _}});export{on as A,sn as B,nn as Q,tn as a,en as b,Ht as c,Qt as d,Nt as e,Wt as f,Yt as g,Te as h,Lt as i,me as j,dn as k,rn as l,an as m,vt as n,un as o,fe as p,Ct as q,$e as r,xt as s,St as t,Et as u,Rt as v,Bt as w,ke as x,qt as y,ln as z};
