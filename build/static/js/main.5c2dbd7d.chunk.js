(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{215:function(e,t,a){},216:function(e,t,a){},380:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a(0),r=a.n(c),o=a(32),s=a.n(o),i=(a(215),a(36)),l=a(52),j=(a(216),a(381)),d=a(65),b=a(391),h=a(392),u=function(e){var t=e.color,a=void 0===t?"white":t;return Object(n.jsx)("h2",{className:"logo",style:{color:a,display:"inline"},children:"HotZ\ud83c\udfafne"})},O=j.a.Content,x=j.a.Footer,p=j.a.Header,m=function(e){var t=e.children,a=Object(i.g)().pathname.split("/")[1]||"cases";return Object(n.jsxs)(j.a,{style:{minHeight:"100vh"},children:[Object(n.jsx)(p,{children:Object(n.jsxs)(d.a,{theme:"dark",mode:"horizontal",selectedKeys:[a],children:[Object(n.jsx)(d.a.Item,{children:Object(n.jsx)(u,{})},"0"),Object(n.jsx)(d.a.Item,{icon:Object(n.jsx)(b.a,{}),children:Object(n.jsx)(l.b,{to:"/",children:"Cases"})},"cases"),Object(n.jsx)(d.a.Item,{icon:Object(n.jsx)(h.a,{}),children:Object(n.jsx)(l.b,{to:"/locations",children:"Locations"})},"locations"),Object(n.jsx)(d.a.Item,{icon:Object(n.jsx)(b.a,{}),children:Object(n.jsx)(l.b,{to:"/patients",children:"Patients"})},"patients"),Object(n.jsx)(d.a.Item,{icon:Object(n.jsx)(b.a,{}),children:Object(n.jsx)(l.b,{to:"/settings",children:"Settings"})},"settings")]})}),Object(n.jsxs)(j.a,{children:[Object(n.jsx)(O,{style:{margin:"24px 16px 0"},children:Object(n.jsx)("div",{className:"site-layout-background",style:{padding:24,minHeight:360},children:t})}),Object(n.jsx)(x,{style:{textAlign:"center"},children:"Made with \u2665\ufe0f"})]})]})},f=a(7),g=a(390),k=a(177),v=a(73),y=a(382),I=a(44),w=a.n(I),S=a(393),z=[{title:"ID",dataIndex:"id",key:"id"}].concat([{title:"Name",dataIndex:"name",key:"name"},{title:"X Co-ordinate",dataIndex:"x_coord",key:"x_coord"},{title:"Y Co-ordinate",dataIndex:"y_coord",key:"y_coord"},{title:"Address",dataIndex:"address",key:"address"}]),C=function(){var e=Object(c.useState)([]),t=Object(f.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(!0),s=Object(f.a)(o,2),i=s[0],j=s[1];return Object(c.useEffect)((function(){i&&w.a.get("https://hotzone-group-q-final.herokuapp.com/hotzone/locations.json",{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}}).then((function(e){r(null===e||void 0===e?void 0:e.data),j(!1)}))}),[i]),i?Object(n.jsx)(g.b,{size:"middle",children:Object(n.jsx)(k.a,{size:"large"})}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(l.b,{to:"/addlocation",children:Object(n.jsx)(v.a,{type:"primary",shape:"round",icon:Object(n.jsx)(S.a,{}),size:"large",style:{marginBottom:40},children:"Add Location"})}),Object(n.jsx)(y.a,{dataSource:a,columns:z})]})},_=a(28),A=a.n(_),T=a(37),L=a(386),F=a(387),P=a(383),q=a(206),D=a(131),N=L.a.Title,E=F.a.Search,B=P.a.Meta,H=function(){var e=Object(c.useState)([]),t=Object(f.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(null),s=Object(f.a)(o,2),i=s[0],l=s[1],j=Object(c.useState)(!1),d=Object(f.a)(j,2),b=d[0],h=d[1],u=Object(c.useState)(!1),O=Object(f.a)(u,2),x=O[0],p=O[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(N,{level:2,children:"Add location to HotZone"}),Object(n.jsx)(E,{placeholder:"Enter Location Name",loading:!1,enterButton:"Search Location",size:"large",style:{marginBottom:40},onSearch:function(){var e=Object(T.a)(A.a.mark((function e(t){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.next=3,w.a.get("https://hotzone-group-q-final.herokuapp.com/hotzone/locations/".concat(t),{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}}).then((function(e){r(null===e||void 0===e?void 0:e.data)})).catch((function(e){q.b.error("Error Finding Location")}));case 3:p(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),null!==i&&Object(n.jsx)(v.a,{type:"primary",style:{width:"100%",marginBottom:40},loading:b,onClick:Object(T.a)(A.a.mark((function e(){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(!0),e.next=3,w.a.post("https://hotzone-group-q-final.herokuapp.com/hotzone/locations/",a[i],{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}}).then((function(e){q.b.success("Location Created: ".concat(JSON.stringify(e.data))),r([]),l(null)})).catch((function(e){q.b.error("Location Creation Error: ".concat(e.response.data)),l(null)}));case 3:h(!1);case 4:case"end":return e.stop()}}),e)}))),children:"Create Location"}),x?Object(n.jsx)(g.b,{size:"middle",children:Object(n.jsx)(k.a,{size:"large"})}):Object(n.jsx)(D.a.Group,{onChange:function(e){return l(e.target.value)},value:i,style:{width:"100%"},children:null===a||void 0===a?void 0:a.map((function(e,t){var a=e.name,c=e.address,r=e.x_coord,o=e.y_coord;return Object(n.jsx)(P.a,{children:Object(n.jsx)(B,{avatar:Object(n.jsxs)(D.a,{value:t,children:[a,c&&", ".concat(c)," - ",r,", ",o]})})},t)}))})]})},J=L.a.Title,K=[{title:"HKID",dataIndex:"hkid",key:"hkid"},{title:"Name",dataIndex:"name",key:"name"},{title:"Date of Birth",dataIndex:"dob",key:"dob"}],M=function(){var e=Object(c.useState)([]),t=Object(f.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(!0),s=Object(f.a)(o,2),i=s[0],l=s[1],j=Object(c.useState)(""),d=Object(f.a)(j,2),b=d[0],h=d[1];return Object(c.useEffect)((function(){(function(){var e=Object(T.a)(A.a.mark((function e(){var t,a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),e.prev=1,e.next=4,w.a.get("https://hotzone-group-q-final.herokuapp.com/hotzone/patients.json",{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}});case 4:t=e.sent,a=t.data,r(a),l(!1),h(""),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(1),r([]),h("failed to fetch patients data"),l(!1);case 16:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}})()()}),[]),b&&""!==b?Object(n.jsx)("p",{children:b}):i?Object(n.jsx)(g.b,{size:"middle",children:Object(n.jsx)(k.a,{size:"large"})}):a&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(J,{level:2,children:"All patients"}),Object(n.jsx)(y.a,{dataSource:a,columns:K})]})},X=L.a.Title,Y=[{title:"Pathogen",dataIndex:["virus","name"],key:"pathogen"},{title:"Case number",dataIndex:"case_no",key:"case_no"},{title:"Confirmed on",dataIndex:"confirmed",key:"confirmed"},{title:"Origin",dataIndex:"origin",key:"origin"},{title:"Patient Name",dataIndex:["patient","name"],key:"patient_name"},{title:"Actions",key:"actions",render:function(e,t){return Object(n.jsx)(l.b,{to:"/case/".concat(t.case_no),children:"Details"})}}],Z=function(){var e=Object(c.useState)([]),t=Object(f.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(!0),s=Object(f.a)(o,2),i=s[0],l=s[1],j=Object(c.useState)(""),d=Object(f.a)(j,2),b=d[0],h=d[1];return Object(c.useEffect)((function(){(function(){var e=Object(T.a)(A.a.mark((function e(){var t,a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),e.prev=1,e.next=4,w.a.get("https://hotzone-group-q-final.herokuapp.com/hotzone/cases.json",{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}});case 4:t=e.sent,a=t.data,r(a),l(!1),h(""),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(1),r([]),h("failed to fetch cases data"),l(!1);case 16:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}})()()}),[]),b&&""!==b?Object(n.jsx)("p",{children:b}):i?Object(n.jsx)(g.b,{size:"middle",children:Object(n.jsx)(k.a,{size:"large"})}):a&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(X,{level:2,children:"All cases"}),Object(n.jsx)(y.a,{dataSource:a,columns:Y})]})},G=a(384),R=a(388),U=a(389),Q=G.a.Panel,V=j.a.Content,W=L.a.Title,$=function(){var e=Object(i.h)().case_no,t=Object(c.useState)({}),a=Object(f.a)(t,2),r=a[0],o=a[1],s=Object(c.useState)(!0),j=Object(f.a)(s,2),d=j[0],b=j[1],h=Object(c.useState)(""),u=Object(f.a)(h,2),O=u[0],x=u[1];return Object(c.useEffect)((function(){(function(){var t=Object(T.a)(A.a.mark((function t(){var a,n;return A.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return b(!0),t.prev=1,t.next=4,w.a.get("https://hotzone-group-q-final.herokuapp.com/hotzone/case/".concat(e),{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}});case 4:a=t.sent,(n=a.data).locations.sort((function(e,t){return e.date_from>t.date_to?1:-1})),o(n),b(!1),x(""),t.next=17;break;case 12:t.prev=12,t.t0=t.catch(1),o({}),b(!1),x("failed to fetch case data");case 17:case"end":return t.stop()}}),t,null,[[1,12]])})));return function(){return t.apply(this,arguments)}})()()}),[e]),O&&""!==O?Object(n.jsx)("p",{children:O}):d?Object(n.jsx)(g.b,{size:"middle",children:Object(n.jsx)(k.a,{size:"large"})}):r.confirmed&&Object(n.jsxs)(V,{style:{textAlign:"left"},children:[Object(n.jsxs)(R.a,{children:[Object(n.jsx)(R.a.Item,{children:Object(n.jsx)(l.b,{to:"/cases",children:"Cases"})}),Object(n.jsx)(R.a.Item,{children:"Case number: #".concat(e)})]}),Object(n.jsx)(W,{level:2,children:"Case details"}),Object(n.jsxs)(U.a,{title:"Case details",children:[Object(n.jsx)(U.a.Item,{label:"Infecting pathogen",children:r.virus.name}),Object(n.jsx)(U.a.Item,{label:"Confirmed date",children:r.confirmed}),Object(n.jsx)(U.a.Item,{label:"Origin",children:"I"===r.origin?"Imported":"Local"})]}),Object(n.jsxs)(U.a,{title:"Patient",children:[Object(n.jsx)(U.a.Item,{label:"HKID",children:r.patient.hkid}),Object(n.jsx)(U.a.Item,{label:"Name",children:r.patient.name}),Object(n.jsx)(U.a.Item,{label:"Date of birth",children:r.patient.dob})]}),Object(n.jsx)(W,{level:3,children:"Locations visited"}),Object(n.jsx)(G.a,{children:r.locations.map((function(e,t){return Object(n.jsx)(Q,{header:"".concat(e.location.name," | From: ").concat(e.date_from," - To: ").concat(e.date_to),children:Object(n.jsxs)(U.a,{children:[Object(n.jsx)(U.a.Item,{label:"Location ID",children:e.location.id}),Object(n.jsx)(U.a.Item,{label:"Address",children:e.location.address}),Object(n.jsx)(U.a.Item,{label:"X coordinates",children:e.location.x_coord}),Object(n.jsx)(U.a.Item,{label:"Y coordinates",children:e.location.y_coord})]})},"".concat(e.location.name," ").concat(e.date_from))}))})]})},ee=a(385),te=(L.a.Link,function(){var e=Object(c.useState)(!1),t=Object(f.a)(e,2),a=t[0],r=t[1],o=function(){var e=Object(T.a)(A.a.mark((function e(t){var a,n,c,o;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,n=t.password,r(!0),e.prev=2,e.next=5,w.a.post("https://hotzone-group-q-final.herokuapp.com/login/",{username:a,password:n});case 5:c=e.sent,(o=c.data.token)&&(localStorage.setItem("token",o),localStorage.setItem("userLoggedIn",a)),q.b.success("logged in successfully"),document.location.href="/",e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),q.b.error("failed to login");case 15:r(!1);case 16:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(u,{color:"black"}),Object(n.jsxs)(ee.a,{style:{marginRight:"auto",marginLeft:"auto",width:"50%"},name:"basic",onFinish:o,children:[Object(n.jsx)(ee.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(n.jsx)(F.a,{})}),Object(n.jsx)(ee.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(n.jsx)(F.a.Password,{})}),Object(n.jsx)(ee.a.Item,{children:Object(n.jsx)(v.a,{type:"primary",htmlType:"submit",loading:a,children:"Submit"})})]}),Object(n.jsx)("a",{href:"https://hotzone-group-q-final.herokuapp.com/password-reset/",children:"Forgot Password?"})]})}),ae=L.a.Title,ne=function(){var e=Object(c.useState)(""),t=Object(f.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(!1),s=Object(f.a)(o,2),i=s[0],l=s[1];return Object(n.jsxs)("div",{children:[Object(n.jsx)(ae,{children:"Change Password"}),Object(n.jsx)(F.a,{placeholder:"new password",type:"password",onChange:function(e){r(e.target.value)}}),Object(n.jsx)(v.a,{style:{marginTop:"12px"},type:"primary",onClick:Object(T.a)(A.a.mark((function e(){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,l(!0),!(a&&a.length>3)){e.next=9;break}return e.next=5,w.a.put("https://hotzone-group-q-final.herokuapp.com/hotzone/change_password/",{new_password:a},{headers:{Authorization:"Token ".concat(localStorage.getItem("token"))}});case 5:q.b.success("password changed successfully!"),r(""),e.next=10;break;case 9:q.b.error("password is too short or blank!");case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),q.b.error("failed to change password");case 15:l(!1);case 16:case"end":return e.stop()}}),e,null,[[0,12]])}))),loading:i,children:"Change"})]})},ce=function(){return localStorage.getItem("token")?Object(n.jsx)(m,{children:Object(n.jsxs)(i.d,{children:[Object(n.jsx)(i.b,{exact:!0,path:"/",children:Object(n.jsx)(Z,{})}),Object(n.jsx)(i.b,{exact:!0,path:"/locations",children:Object(n.jsx)(C,{})}),Object(n.jsx)(i.b,{path:"/case/:case_no",children:Object(n.jsx)($,{})}),Object(n.jsx)(i.b,{exact:!0,path:"/patients",children:Object(n.jsx)(M,{})}),Object(n.jsx)(i.b,{exact:!0,path:"/settings",children:Object(n.jsx)(ne,{})}),Object(n.jsx)(i.b,{exact:!0,path:"/addlocation",children:Object(n.jsx)(H,{})})]})}):Object(n.jsx)(i.a,{to:"/login"})},re=function(){return Object(n.jsx)("div",{style:{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"},children:Object(n.jsx)(te,{})})},oe=function(){return Object(n.jsx)("div",{className:"App",style:{height:"100vh"},children:Object(n.jsx)(l.a,{children:Object(n.jsxs)(i.d,{children:[Object(n.jsx)(i.b,{path:"/login",children:Object(n.jsx)(re,{})}),Object(n.jsx)(i.b,{path:"/",children:Object(n.jsx)(ce,{})})]})})})},se=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,394)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),r(e),o(e)}))};s.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(oe,{})}),document.getElementById("root")),se()}},[[380,1,2]]]);
//# sourceMappingURL=main.5c2dbd7d.chunk.js.map