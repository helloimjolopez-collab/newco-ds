/*! For license information please see SideNav-stories.7ac0baf3.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_helloimjolopez_newco_newco_tokens=self.webpackChunk_helloimjolopez_newco_newco_tokens||[]).push([[801],{"./src/stories/SideNav.stories.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Collapsed:()=>Collapsed,LightAndMidnight:()=>LightAndMidnight,Midnight:()=>Midnight,Overlay:()=>Overlay,Playground:()=>Playground,__namedExportsOrder:()=>__namedExportsOrder,default:()=>SideNav_stories});var react=__webpack_require__("./node_modules/react/index.js");const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:reactive_element_i,defineProperty:reactive_element_e,getOwnPropertyDescriptor:h,getOwnPropertyNames:reactive_element_r,getOwnPropertySymbols:reactive_element_o,getPrototypeOf:reactive_element_n}=Object,a=globalThis,reactive_element_c=a.trustedTypes,l=reactive_element_c?reactive_element_c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!reactive_element_i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&reactive_element_e(this.prototype,t,h)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=reactive_element_n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...reactive_element_r(t),...reactive_element_o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c(s))}else void 0!==s&&i.push(c(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map,y[d("finalized")]=new Map,p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");const lit_html_t=globalThis,lit_html_i=t=>t,lit_html_s=lit_html_t.trustedTypes,lit_html_e=lit_html_s?lit_html_s.createPolicy("lit-html",{createHTML:t=>t}):void 0,lit_html_o=`lit$${Math.random().toFixed(9).slice(2)}$`,lit_html_n="?"+lit_html_o,lit_html_r=`<${lit_html_n}>`,lit_html_l=document,lit_html_c=()=>lit_html_l.createComment(""),lit_html_a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,lit_html_u=Array.isArray,lit_html_d=t=>lit_html_u(t)||"function"==typeof t?.[Symbol.iterator],v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,lit_html_p=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),g=/'/g,$=/"/g,lit_html_y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),lit_html_b=x(1),E=(x(2),x(3),Symbol.for("lit-noChange")),A=Symbol.for("lit-nothing"),C=new WeakMap,P=lit_html_l.createTreeWalker(lit_html_l,129);function V(t,i){if(!lit_html_u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==lit_html_e?lit_html_e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(lit_html_y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=lit_html_p):void 0!==u[3]&&(c=lit_html_p):c===lit_html_p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?lit_html_p:'"'===u[3]?$:g):c===$||c===g?c=lit_html_p:c===_||c===m?c=v:(c=lit_html_p,n=void 0);const x=c===lit_html_p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+lit_html_r:d>=0?(e.push(a),s.slice(0,d)+"$lit$"+s.slice(d)+lit_html_o+x):s+lit_html_o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class lit_html_S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=lit_html_S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith("$lit$")){const i=v[a++],s=r.getAttribute(t).split(lit_html_o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(lit_html_o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(lit_html_y.test(r.tagName)){const t=r.textContent.split(lit_html_o),i=t.length-1;if(i>0){r.textContent=lit_html_s?lit_html_s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],lit_html_c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],lit_html_c())}}}else if(8===r.nodeType)if(r.data===lit_html_n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(lit_html_o,t+1));)d.push({type:7,index:l}),t+=lit_html_o.length-1}l++}}static createElement(t,i){const s=lit_html_l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=lit_html_a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??lit_html_l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=lit_html_l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),lit_html_a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):lit_html_d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&lit_html_a(this._$AH)?this._$AA.nextSibling.data=t:this.T(lit_html_l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=lit_html_S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new lit_html_S(t)),i}k(t){lit_html_u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(lit_html_c()),this.O(lit_html_c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=lit_html_i(t).nextSibling;lit_html_i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!lit_html_a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!lit_html_a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const B=lit_html_t.litHtmlPolyfillSupport;B?.(lit_html_S,k),(lit_html_t.litHtmlVersions??=[]).push("3.3.3");const lit_element_s=globalThis;class lit_element_i extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(lit_html_c(),t),t,void 0,s??{})}return h._$AI(t),h})(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}}lit_element_i._$litElement$=!0,lit_element_i.finalized=!0,lit_element_s.litElementHydrateSupport?.({LitElement:lit_element_i});const lit_element_o=lit_element_s.litElementPolyfillSupport;lit_element_o?.({LitElement:lit_element_i});(lit_element_s.litElementVersions??=[]).push("4.2.2");class NewcoSideNav extends lit_element_i{static properties={collapsed:{type:Boolean,reflect:!0},elevated:{type:Boolean,reflect:!0},stroked:{type:Boolean,reflect:!0},theme:{type:String,reflect:!0},label:{type:String}};constructor(){super(),this.collapsed=!1,this.elevated=!1,this.stroked=!1,this.theme="light",this.label="Primary navigation"}static styles=i`
    :host {
      display: block;
      box-sizing: border-box;
      inline-size: var(--newco-nav-width, 260px);
      block-size: 100%;
      font-family: "Red Hat Text", system-ui, -apple-system, sans-serif;
    }
    .rail {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      block-size: 100%;
      /* Figma: padding 8 (top) / 16 (sides) / 56 (bottom); gap 0 between items. */
      padding: 8px 16px 56px;
      background: var(--newco-nav-surface, #f7f3f3);
      transition: inline-size 160ms ease;
      overflow: hidden;
    }
    .header {
      min-block-size: 44px;
      display: flex;
      align-items: center;
    }
    .header:not(.has-content) { display: none; }
    nav {
      display: flex;
      flex-direction: column;
      gap: 0;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1 1 auto;
      scrollbar-width: none;
    }
    nav::-webkit-scrollbar { width: 0; height: 0; }
    :host([stroked]) .rail {
      border-inline-end: var(--semantic-layout-units-borderwidth-base, 1px) solid
        var(--newco-nav-border, rgba(0, 0, 0, 0.08));
    }
    :host([collapsed]) { --newco-nav-width: 84px; }
    :host([collapsed]) .rail { padding-inline: 12px; }
    /* Overlay / drawer: lift with the overlay elevation, no flush divider. */
    :host([elevated]) .rail {
      box-shadow: var(--newco-nav-shadow);
      border-inline-end: 0;
    }
  `;_themeStyle(){const mode="midnight"===this.theme?"midnight":"light";return lit_html_b`<style>:host{${(mode=>`\n  --newco-nav-surface: var(--semantic-color-${mode}-mode-fill-surface-canvas);\n  --newco-nav-border: var(--semantic-color-${mode}-mode-stroke-static-neutral-subtle);\n  --newco-nav-item-fg: var(--semantic-color-${mode}-mode-foreground-action-selection-base);\n  --newco-nav-item-fg-hover: var(--semantic-color-${mode}-mode-foreground-action-selection-hover);\n  --newco-nav-item-fg-selected: var(--semantic-color-${mode}-mode-foreground-action-selection-selected);\n  --newco-nav-item-fg-disabled: var(--semantic-color-${mode}-mode-foreground-action-selection-disabled);\n  --newco-nav-item-bg-hover: var(--semantic-color-${mode}-mode-fill-action-selection-hover);\n  --newco-nav-item-bg-selected: var(--semantic-color-${mode}-mode-fill-action-selection-selected);\n  --newco-nav-indicator: var(--semantic-color-${mode}-mode-fill-action-selection-indicator);\n  --newco-nav-focus: var(--semantic-color-${mode}-mode-stroke-focusring-base);\n  --newco-nav-shadow: var(${"midnight"===mode?"--elevation-midnight-overlay":"--elevation-overlay"});\n`)(mode)}}</style>`}toggle(){this.collapsed=!this.collapsed,this.dispatchEvent(new CustomEvent("newco-collapse",{detail:{collapsed:this.collapsed},bubbles:!0,composed:!0}))}_syncChildren(){for(const el of this.querySelectorAll("newco-side-nav-item"))el.collapsed=this.collapsed;const hdr=this.renderRoot?.querySelector(".header"),slot=hdr?.querySelector('slot[name="header"]');hdr&&slot&&hdr.classList.toggle("has-content",slot.assignedNodes({flatten:!0}).length>0)}updated(changed){changed.has("collapsed")&&this._syncChildren()}render(){return lit_html_b`
      ${this._themeStyle()}
      <div class="rail" part="rail">
        <div class="header" part="header">
          <slot name="header" @slotchange=${()=>this._syncChildren()}></slot>
        </div>
        <nav part="nav" aria-label=${this.label}>
          <slot @slotchange=${()=>this._syncChildren()}></slot>
        </nav>
      </div>
    `}}class NewcoSideNavItem extends lit_element_i{static properties={icon:{type:String},label:{type:String},active:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},collapsed:{type:Boolean,reflect:!0},expandable:{type:Boolean,reflect:!0},expanded:{type:Boolean,reflect:!0},href:{type:String},level:{type:Number,reflect:!0},value:{type:String}};constructor(){super(),this.active=!1,this.disabled=!1,this.collapsed=!1,this.expandable=!1,this.expanded=!1,this.level=0}static styles=i`
    :host { display: block; }
    /* Figma SideNavItem: a 44px row = [4px indicator gutter] + 4px gap + pill.
       The pill (Container.Main) carries the hover/selected fill + 999 radius and
       is inset from the item edge; the stripe sits OUTSIDE the pill in the gutter. */
    .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 4px;
      inline-size: 100%;
      min-block-size: 44px;
      padding: 4px 0;
      border: 0;
      background: transparent;
      color: var(--newco-nav-item-fg, #524e59);
      font-family: "Red Hat Text", system-ui, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.35;
      text-align: start;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
    }
    /* 4px-wide gutter column; the short stripe is vertically centred within it. */
    .indicator {
      flex: 0 0 4px;
      inline-size: 4px;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .stripe {
      inline-size: 4px;
      block-size: 16px;
      border-radius: 0 4px 4px 0;
      background: var(--newco-nav-indicator, #6e64be);
      opacity: 0;
    }
    :host([active]) .stripe { opacity: 1; }
    /* The pill = Container.Main: the fill + radius live here, not on the row. */
    .pill {
      flex: 1 1 auto;
      min-inline-size: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 6px;
      min-block-size: 36px;
      padding-inline: 8px;
      border-radius: 999px;
      background: transparent;
      transition: background 120ms ease, color 120ms ease;
    }
    /* Level-1 (nested): no icon, label indented to line up under the parent label. */
    :host([level="1"]) .pill { padding-inline-start: 38px; }
    .lead {
      flex: 0 0 auto;
      inline-size: 24px;
      block-size: 24px;
      display: grid;
      place-items: center;
      color: inherit;
    }
    .lead .material-symbols-rounded { font-size: 20px; }
    .label {
      flex: 1 1 auto;
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chev {
      flex: 0 0 auto;
      display: inline-flex;
      color: inherit;
      transition: transform 140ms ease;
    }
    .chev .material-symbols-rounded { font-size: 18px; }
    :host([expanded]) .chev { transform: rotate(180deg); }
    .material-symbols-rounded {
      font-family: "Material Symbols Rounded";
      line-height: 1;
      font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      user-select: none;
    }
    .item:hover .pill {
      background: var(--newco-nav-item-bg-hover, rgba(0, 0, 0, 0.05));
    }
    .item:hover { color: var(--newco-nav-item-fg-hover, #1b1822); }
    .item:focus-visible { outline: none; }
    .item:focus-visible .pill {
      outline: 2px solid var(--newco-nav-focus, #827ad9);
      outline-offset: -2px;
    }
    :host([active]) .pill {
      background: var(--newco-nav-item-bg-selected, #dddbfa);
    }
    :host([active]) .item {
      color: var(--newco-nav-item-fg-selected, #1b1822);
      font-weight: 600;
    }
    :host([disabled]) .item {
      color: var(--newco-nav-item-fg-disabled, rgba(0, 0, 0, 0.35));
      cursor: not-allowed;
      pointer-events: none;
    }
    /* Collapsed rail: no gutter; icon over a small 2-line label, centred pill. */
    :host([collapsed]) .indicator { display: none; }
    :host([collapsed]) .pill {
      flex-direction: column;
      gap: 4px;
      padding: 6px 2px;
      min-block-size: 44px;
      justify-content: center;
      text-align: center;
      white-space: normal;
    }
    :host([collapsed]) .lead .material-symbols-rounded { font-size: 22px; }
    :host([collapsed]) .label {
      flex: none;
      inline-size: 100%;
      font-size: 10px;
      line-height: 1.15;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    :host([collapsed]) .chev { display: none; }
  `;_onClick(e){if(this.disabled)return void e.preventDefault();this.expandable&&(this.expanded=!this.expanded);const ev=new CustomEvent("newco-select",{detail:{value:this.value??this.label,label:this.label,item:this,expanded:this.expanded},bubbles:!0,composed:!0,cancelable:!0});this.dispatchEvent(ev)||e.preventDefault()}render(){const showIcon=this.icon&&1!==this.level,inner=lit_html_b`
      <span class="indicator" aria-hidden="true"><span class="stripe"></span></span>
      <span class="pill">
        ${showIcon?lit_html_b`<span class="lead"><span class="material-symbols-rounded" aria-hidden="true">${this.icon}</span></span>`:A}
        <span class="label">${this.label}</span>
        ${this.expandable&&!this.collapsed?lit_html_b`<span class="chev"><span class="material-symbols-rounded" aria-hidden="true">expand_more</span></span>`:A}
      </span>
    `,title=this.collapsed?this.label:A;return this.href&&!this.disabled?lit_html_b`<a class="item" part="item" href=${this.href} title=${title||A}
          aria-current=${this.active?"page":A} aria-expanded=${this.expandable?String(this.expanded):A}
          @click=${this._onClick}>${inner}</a>`:lit_html_b`<button class="item" part="item" type="button" ?disabled=${this.disabled} title=${title||A}
          aria-current=${this.active?"page":A} aria-expanded=${this.expandable?String(this.expanded):A}
          @click=${this._onClick}>${inner}</button>`}}customElements.get("newco-side-nav")||customElements.define("newco-side-nav",NewcoSideNav),customElements.get("newco-side-nav-item")||customElements.define("newco-side-nav-item",NewcoSideNavItem),NewcoSideNav.__docgenInfo={description:"",methods:[{name:"_themeStyle",docblock:null,modifiers:[],params:[],returns:null},{name:"toggle",docblock:null,modifiers:[],params:[],returns:null},{name:"_syncChildren",docblock:null,modifiers:[],params:[],returns:null},{name:"updated",docblock:null,modifiers:[],params:[{name:"changed",optional:!1,type:null}],returns:null}],displayName:"NewcoSideNav"},NewcoSideNavItem.__docgenInfo={description:"",methods:[{name:"_onClick",docblock:null,modifiers:[],params:[{name:"e",optional:!1,type:null}],returns:null}],displayName:"NewcoSideNavItem"};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DEFAULT_ITEMS=[{icon:"dashboard",label:"Home"},{icon:"groups",label:"People",expandable:!0},{label:"Members",level:1},{label:"Households",level:1},{icon:"volunteer_activism",label:"Giving"},{icon:"event",label:"Calendar",expandable:!0},{icon:"bar_chart",label:"Reporting"},{icon:"settings",label:"Settings",disabled:!0}];function Backdrop({theme,children}){const bg="midnight"===theme?"var(--semantic-color-midnight-mode-fill-surface-canvas)":"var(--semantic-color-light-mode-fill-surface-canvas)";return(0,jsx_runtime.jsxs)("div",{style:{display:"flex",height:"560px",background:bg},children:[children,(0,jsx_runtime.jsx)("div",{style:{flex:1}})]})}function SideNav({theme="light",collapsed=!1,elevated=!1,activeIndex=1,brand="NewCo",items=DEFAULT_ITEMS}){const ref=react.useRef(null);return react.useEffect(()=>{const el=ref.current;if(!el)return;const onSel=e=>console.log("newco-select",e.detail.value);return el.addEventListener("newco-select",onSel),()=>el.removeEventListener("newco-select",onSel)},[]),(0,jsx_runtime.jsx)(Backdrop,{theme,children:(0,jsx_runtime.jsxs)("newco-side-nav",{ref,theme,...collapsed?{collapsed:!0}:{},...elevated?{elevated:!0}:{},label:"Primary",children:[(0,jsx_runtime.jsxs)("div",{slot:"header",style:{display:"flex",alignItems:"center",gap:10,padding:"4px 6px",minWidth:0},children:[(0,jsx_runtime.jsx)("span",{className:"material-symbols-rounded","aria-hidden":!0,style:{fontSize:26,color:"var(--semantic-color-light-mode-fill-action-selection-indicator)"},children:"hub"}),!collapsed&&(0,jsx_runtime.jsx)("strong",{style:{font:"600 15px 'Red Hat Text',sans-serif",color:"var(--newco-nav-item-fg-selected)"},children:brand})]}),items.map((it,i)=>(0,jsx_runtime.jsx)("newco-side-nav-item",{...it.icon?{icon:it.icon}:{},label:it.label,...it.level?{level:it.level}:{},...it.expandable?{expandable:!0}:{},...it.disabled?{disabled:!0}:{},...i===activeIndex?{active:!0}:{}},it.label+i))]})})}const SideNav_stories={title:"Library/Side Nav",parameters:{layout:"fullscreen",docs:{description:{component:"App side navigation as a framework-agnostic Web Component. Icon + label items, an active state with a brand indicator, a collapsible icon rail, and Light/Midnight theming — all driven by NewCo tokens. See docs/side-nav.md for how to absorb it into any stack."}}},argTypes:{theme:{control:{type:"inline-radio"},options:["light","midnight"],description:"Colour mode"},collapsed:{control:"boolean",description:"Icon-only rail"},elevated:{control:"boolean",description:"Floating/overlay presentation (overlay elevation shadow)"},activeIndex:{control:{type:"number",min:0,max:5},description:"Which item is current"},brand:{control:"text"}},args:{theme:"light",collapsed:!1,elevated:!1,activeIndex:1,brand:"NewCo"}},Playground={render:args=>(0,jsx_runtime.jsx)(SideNav,{...args})},Collapsed={args:{collapsed:!0},render:args=>(0,jsx_runtime.jsx)(SideNav,{...args})},Midnight={args:{theme:"midnight"},render:args=>(0,jsx_runtime.jsx)(SideNav,{...args})},Overlay={name:"Overlay (elevated)",args:{elevated:!0},parameters:{docs:{description:{story:"Use `elevated` when the rail floats over content (a drawer, or the mobile overlay). It lifts off the canvas with the `--elevation-overlay` token and drops its flush divider — matching the demo's drawer."}}},render:args=>(0,jsx_runtime.jsxs)("div",{style:{position:"relative",height:560,background:"var(--semantic-color-light-mode-fill-surface-elevated-sheet)",overflow:"hidden"},children:[(0,jsx_runtime.jsx)("div",{style:{position:"absolute",inset:0,padding:40,color:"#8a8080",font:"600 22px 'Red Hat Text',sans-serif"},children:"Page content behind the drawer…"}),(0,jsx_runtime.jsx)("div",{style:{position:"absolute",insetBlock:0,insetInlineStart:0,width:260},children:(0,jsx_runtime.jsx)(SideNav,{...args})})]})},LightAndMidnight={name:"Light + Midnight",parameters:{controls:{disable:!0}},render:()=>(0,jsx_runtime.jsxs)("div",{style:{display:"flex",gap:24,padding:24,flexWrap:"wrap",background:"#eae6e6"},children:[(0,jsx_runtime.jsx)("div",{style:{width:260,height:520},children:(0,jsx_runtime.jsx)(SideNav,{theme:"light"})}),(0,jsx_runtime.jsx)("div",{style:{width:260,height:520},children:(0,jsx_runtime.jsx)(SideNav,{theme:"midnight"})})]})},__namedExportsOrder=["Playground","Collapsed","Midnight","Overlay","LightAndMidnight"];Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  render: args => <SideNav {...args} />\n}",...Playground.parameters?.docs?.source}}},Collapsed.parameters={...Collapsed.parameters,docs:{...Collapsed.parameters?.docs,source:{originalSource:"{\n  args: {\n    collapsed: true\n  },\n  render: args => <SideNav {...args} />\n}",...Collapsed.parameters?.docs?.source}}},Midnight.parameters={...Midnight.parameters,docs:{...Midnight.parameters?.docs,source:{originalSource:'{\n  args: {\n    theme: "midnight"\n  },\n  render: args => <SideNav {...args} />\n}',...Midnight.parameters?.docs?.source}}},Overlay.parameters={...Overlay.parameters,docs:{...Overlay.parameters?.docs,source:{originalSource:'{\n  name: "Overlay (elevated)",\n  args: {\n    elevated: true\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: "Use `elevated` when the rail floats over content (a drawer, or the mobile overlay). It lifts off the canvas with the `--elevation-overlay` token and drops its flush divider — matching the demo\'s drawer."\n      }\n    }\n  },\n  render: args => <div style={{\n    position: "relative",\n    height: 560,\n    background: "var(--semantic-color-light-mode-fill-surface-elevated-sheet)",\n    overflow: "hidden"\n  }}>\n      <div style={{\n      position: "absolute",\n      inset: 0,\n      padding: 40,\n      color: "#8a8080",\n      font: "600 22px \'Red Hat Text\',sans-serif"\n    }}>Page content behind the drawer…</div>\n      <div style={{\n      position: "absolute",\n      insetBlock: 0,\n      insetInlineStart: 0,\n      width: 260\n    }}>\n        <SideNav {...args} />\n      </div>\n    </div>\n}',...Overlay.parameters?.docs?.source}}},LightAndMidnight.parameters={...LightAndMidnight.parameters,docs:{...LightAndMidnight.parameters?.docs,source:{originalSource:'{\n  name: "Light + Midnight",\n  parameters: {\n    controls: {\n      disable: true\n    }\n  },\n  render: () => <div style={{\n    display: "flex",\n    gap: 24,\n    padding: 24,\n    flexWrap: "wrap",\n    background: "#eae6e6"\n  }}>\n      <div style={{\n      width: 260,\n      height: 520\n    }}><SideNav theme="light" /></div>\n      <div style={{\n      width: 260,\n      height: 520\n    }}><SideNav theme="midnight" /></div>\n    </div>\n}',...LightAndMidnight.parameters?.docs?.source}}}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js"(__unused_webpack_module,exports,__webpack_require__){var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js"(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
//# sourceMappingURL=SideNav-stories.7ac0baf3.iframe.bundle.js.map