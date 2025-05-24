import{k as H,e as T,n as L,p as S,d as v,u as M,m as P,c as R,a as n,i as V,b as y,r as w,w as $,v as b,I as q,o as N}from"./index-QZaKag1-.js";import{J as O}from"./JsBarcode-BF-T5tIv.js";import{b as B}from"./browser-CjSdxGTc.js";import{a as F}from"./studentFields-fvyCakD3.js";const G={class:"section import-page"},U={class:"container"},E={class:"main-card mid-cardd"},J={class:"card-header"},W={class:"left"},Y={class:"icon"},Z={class:"right"},j={class:"searchbar"},A={class:"searchbar"},Q={class:"text text-grey"},K={class:"icons"},X={class:"card-body id-card-body"},tt={id:"download-pdf"},dt={__name:"FinalIdCardList",setup(et){const x=M(),c=S(),g=H(null),a=T({organizationId:null,classId:null,organizationSettingId:null,height:297,width:210,file:null,card:[]});L(async()=>{l(),c.query.organizationId&&c.query.classId&&(a.organizationId=c.query.organizationId,a.classId=c.query.classId,z())});const _=v(()=>{l();const e=window.devicePixelRatio*192/2;return a.height/25.4*e}),I=v(()=>{l();const e=window.devicePixelRatio*192/2;return a.width/25.4*e});function l(){const e=document.createElement("style");e.type="text/css";const o=`@page { size: ${a.width}mm ${a.height}mm; }`;e.innerHTML=o,document.head.appendChild(e)}const s=e=>{const o=window.devicePixelRatio*192/2;return e/25.4*o};function p(e){return e/2}async function z(){const e=await x.dispatch("OrganizationStudent/getStudentFinalForCard",{organizationId:a.organizationId,classId:a.classId});let o="";if(e.status===200&&e.data.result.length>0){console.log(e.data.result);for(const i of e.data.result)if(i.houseZone_card||i.classList_card||i.classList_pCard){let t;try{c.query.status==="House"?t=JSON.parse(i.houseZone_card):c.query.status==="Class"?t=JSON.parse(i.classList_card):c.query.status==="Parent"&&(t=JSON.parse(i.classList_pCard))}catch{t=null}if(!t)return;const d=`
            <div class="design-card"
              style="
                height: ${s(t.cardHeight)}px;
                width: ${s(t.cardWidth)}px;
                margin-bottom: ${s(t.cardVerticalGap)}px;
                margin-right: ${s(t.cardHorizontalGap)}px;
                margin-left: ${s(t.cardHorizontalGap)}px;
              "
            >
              <div class="front-side"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  overflow: hidden;
                  padding: 3px;
                  border: 1px solid #ccc;
                  background-image: url('${t.frontCardImage}');
                  background-size: cover;
                  background-position: center;
                "
              >
                ${await f(t.frontCard,i)}
              </div>
            </div>
            ${t.side!=="Single"?`
            <div class="design-card"
              style="
                height: ${s(t.cardHeight)}px;
                width: ${s(t.cardWidth)}px;
                margin-bottom: ${s(t.cardVerticalGap)}px;
                margin-right: ${s(t.cardHorizontalGap)}px;
                margin-left: ${s(t.cardHorizontalGap)}px;
              "
            >
              <div class="back-side"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  overflow: hidden;
                  padding: 3px;
                  border: 1px solid #ccc;
                  background-image: url('${t.backCardImage}');
                  background-size: cover;
                  background-position: center;
                "
              >
                ${await f(t.backCard,i)}
              </div>
            </div>`:""}
          `;o+=d}}g.value.innerHTML=o}async function f(e,o){let i="";for(const t of e){let d=null;const u=F.find(r=>r.name===t.id);if(u){let r=o[u.id];if(isNaN(Date.parse(r)))d=r;else{const m=new Date(r);d=D(m)}}let h="";if(t.content.type==="Image"&&(h=`<div style="width: 100%; height: 100%;">
        <img
          id="${t.id}"
          src="${t.id?d:""}"
          alt=""
          style="
            height: 100%;
            width: 100%;
            border-radius: ${t.content["border-radius"]};
            border: ${t.content.border} ${t.content["border-color"]};
          "
        />
      </div>`),t.content.type==="Barcode"){const r=document.createElement("canvas");O(r,d,{format:"CODE128",width:2,height:60,displayValue:!1});const m=r.toDataURL();h=`<div style="width: 100%; height: 100%;">
          <img
            id="${t.id}"
            src="${m}"
            alt=""
            style="
              height: 100%;
              width: 100%;
              border-radius: ${t.content["border-radius"]};
              border: ${t.content.border} ${t.content["border-color"]};
            "
          />
        </div>`}if(t.content.type==="QR"){const r=await B.toDataURL(d);h=`<div style="width: 100%; height: 100%;">
          <img
            id="${t.id}"
            src="${r}"
            alt=""
            style="
              height: 100%;
              width: 100%;
              border-radius: ${t.content["border-radius"]};
              border: ${t.content.border} ${t.content["border-color"]};
            "
          />
        </div>`}t.content.type==="Text"&&(h=`<div
        id="${t.id}"
        style="
          color: ${t.content.color};
          font-weight: ${t.content["font-weight"]};
          font-style: ${t.content["font-style"]};
          font-size: ${t.content["font-size"]};
          line-height: ${t.content["line-height"]};
          font-family: ${t.content["font-family"]};
          text-align: ${t.content["text-align"]};
        "
      >
        ${t.id?d:t.name}
      </div>`);const k=`
      <div>
        <div
          style="
            touch-action: none;
            position: absolute;
            box-sizing: border-box;
            transform: translate(${p(t.props.left)}px, ${p(t.props.top)}px) ${t.rotate};
            z-index: auto;
            user-select: auto;
            width: ${p(t.props.w)}px;
            height: ${p(t.props.h)}px;
          "
        >
          ${h}
        </div>
      </div>
    `;i+=k}return i}async function C(){const e=document.getElementById("download-pdf");document.body.innerHTML;const o=window.open("","_self");o.document.write(e.innerHTML),o.document.close(),o.print(),o.close(),location.reload()}function D(e){return e?P(e).format("DD.MM.YYYY"):"-"}return(e,o)=>{const i=w("icon-card"),t=w("icon-download");return N(),R("div",G,[n("div",U,[n("div",E,[n("div",J,[n("div",W,[n("div",Y,[y(i,{class:"rotate-18"})]),o[2]||(o[2]=V(" Final Id Cards "))]),n("div",Z,[n("div",j,[$(n("input",{type:"number","onUpdate:modelValue":o[0]||(o[0]=d=>a.height=d),onChange:l,placeholder:"Height(mm)"},null,544),[[b,a.height]])]),n("div",A,[$(n("input",{type:"number","onUpdate:modelValue":o[1]||(o[1]=d=>a.width=d),onChange:l,placeholder:"Width(mm)"},null,544),[[b,a.width]])]),n("div",Q,[n("div",K,[n("div",{class:"icon tooltip-wrapper pointer",onClick:C},[y(t,{class:""}),o[3]||(o[3]=n("div",{class:"tooltip"},"Print & Download",-1))])])])])]),n("div",X,[n("div",tt,[n("div",{class:"page",style:q({width:I.value+"px",height:_.value+"px",padding:0,margin:"0 auto","border-radius":"5px","break-inside":"avoid"})},[n("div",{ref_key:"htmlContainer",ref:g,style:{display:"flex","flex-wrap":"wrap"}},null,512)],4)])])])])])}}};export{dt as default};
