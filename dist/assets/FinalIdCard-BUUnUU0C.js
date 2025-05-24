import{k as z,e as H,n as I,p as T,d as $,u as L,m as P,c as S,a as i,i as M,b as g,r as b,w as y,v as x,o as R}from"./index-QZaKag1-.js";import{b as V}from"./browser-CjSdxGTc.js";import{a as B}from"./studentFields-fvyCakD3.js";const F={class:"section import-page"},N={class:"container"},O={class:"main-card mid-cardd"},q={class:"card-header"},G={class:"left"},U={class:"icon"},E={class:"right"},J={class:"searchbar"},W={class:"searchbar"},Y={class:"text text-grey"},Z={class:"icons"},j={class:"card-body id-card-body"},tt={__name:"FinalIdCard",setup(A){const _=L(),c=T(),f=z(null),s=H({organizationId:null,classId:null,organizationSettingId:null,height:297,width:210,file:null,card:[]});I(async()=>{l(),c.query.id&&C()}),$(()=>{const o=window.devicePixelRatio*96,e=25.4;return l(),s.height/e*o}),$(()=>{l();const o=window.devicePixelRatio*96;return s.width/25.4*o});function l(){const o=document.createElement("style");o.type="text/css";const e=`@page { size: ${s.width}mm ${s.height}mm; }`;o.innerHTML=e,document.head.appendChild(o)}const d=o=>{const e=window.devicePixelRatio*96;return o/25.4*e};function h(o){return o/2}async function C(){const o=await _.dispatch("OrganizationStudent/getStudentFinalForCardProfile",{id:c.query.id});let e="";if(o.status===200&&o.data.result.length>0){console.log(o.data.result);for(const n of o.data.result)if(n.houseZone_card||n.classList_card||n.classList_pCard){let t;try{c.query.status==="House"?t=JSON.parse(n.houseZone_card):c.query.status==="Class"?t=JSON.parse(n.classList_card):c.query.status==="Parent"&&(t=JSON.parse(n.classList_pCard))}catch{t=null}if(!t)return;const a=`
            <div class="design-card"
            id="front-download-pdf"
              style="
                height: ${d(t.cardHeight)}px;
                width: ${d(t.cardWidth)}px;
                margin-bottom: ${d(t.cardVerticalGap)}px;
                margin-right: ${d(t.cardHorizontalGap)}px;
                margin-left: ${d(t.cardHorizontalGap)}px;
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
                ${await v(t.frontCard,n)}
              </div>
            </div>
            ${t.side!=="Single"?`
            <div class="design-card"
            id="back-download-pdf"
              style="
                height: ${d(t.cardHeight)}px;
                width: ${d(t.cardWidth)}px;
                margin-bottom: ${d(t.cardVerticalGap)}px;
                margin-right: ${d(t.cardHorizontalGap)}px;
                margin-left: ${d(t.cardHorizontalGap)}px;
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
                ${await v(t.backCard,n)}
              </div>
            </div>`:""}
          `;e+=a}}f.value.innerHTML=e}async function v(o,e){let n="";for(const t of o){let a=null;const u=B.find(r=>r.name===t.id);if(u){let r=e[u.id];if(isNaN(Date.parse(r)))a=r;else{const m=new Date(r);a=k(m)}}let p="";if(t.content.type==="Image"&&(p=`<div style="width: 100%; height: 100%;">
        <img
          id="${t.id}"
          src="${t.id?a:""}"
          alt=""
          style="
            height: 100%;
            width: 100%;
            border-radius: ${t.content["border-radius"]};
            border: ${t.content.border} ${t.content["border-color"]};
          "
        />
      </div>`),t.content.type==="Barcode"){const r=document.createElement("canvas");JsBarcode(r,a,{format:"CODE128",width:2,height:60,displayValue:!1});const m=r.toDataURL();p=`<div style="width: 100%; height: 100%;">
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
        </div>`}if(t.content.type==="QR"){const r=await V.toDataURL(a);p=`<div style="width: 100%; height: 100%;">
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
        </div>`}t.content.type==="Text"&&(p=`<div
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
        ${t.id?a:t.name}
      </div>`);const D=`
      <div>
        <div
          style="
            touch-action: none;
            position: absolute;
            box-sizing: border-box;
            transform: translate(${h(t.props.left)}px, ${h(t.props.top)}px) ${t.rotate};
            z-index: auto;
            user-select: auto;
            width: ${h(t.props.w)}px;
            height: ${h(t.props.h)}px;
          "
        >
          ${p}
        </div>
      </div>
    `;n+=D}return n}async function w(o){const e=document.getElementById(o);document.body.innerHTML;const n=window.open("","_self");n.document.write(e.innerHTML),n.document.close(),n.print(),n.close(),location.reload()}function k(o){return o?P(o).format("DD.MM.YYYY"):"-"}return(o,e)=>{const n=b("icon-card"),t=b("icon-download");return R(),S("div",F,[i("div",N,[i("div",O,[i("div",q,[i("div",G,[i("div",U,[g(n,{class:"rotate-18"})]),e[4]||(e[4]=M(" Final Id Cards "))]),i("div",E,[i("div",J,[y(i("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=a=>s.height=a),onChange:l,placeholder:"Height(mm)"},null,544),[[x,s.height]])]),i("div",W,[y(i("input",{type:"number","onUpdate:modelValue":e[1]||(e[1]=a=>s.width=a),onChange:l,placeholder:"Width(mm)"},null,544),[[x,s.width]])]),i("div",Y,[i("div",Z,[i("div",{class:"icon tooltip-wrapper pointer",onClick:e[2]||(e[2]=a=>w("front-download-pdf"))},[g(t,{class:""}),e[5]||(e[5]=i("div",{class:"tooltip"},"Front Print & Download",-1))]),i("div",{class:"icon tooltip-wrapper pointer",onClick:e[3]||(e[3]=a=>w("back-download-pdf"))},[g(t,{class:""}),e[6]||(e[6]=i("div",{class:"tooltip"},"Back Print & Download",-1))])])])])]),i("div",j,[i("div",null,[i("div",{ref_key:"htmlContainer",ref:f},null,512)])])])])])}}};export{tt as default};
