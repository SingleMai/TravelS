webpackJsonp([13],{"//Q1":function(t,e){},V4R6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("lC5x"),n=a.n(r),s=a("J0Oq"),i=a.n(s),c={name:"",data:function(){return{}},methods:{rightClick:function(){this.$emit("rightClick")}},props:{title:{type:String,required:!0},rightText:{type:String}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[a("p",{staticClass:"text"},[t._v(t._s(t.title))]),t._v(" "),a("p",{staticClass:"btn-right",on:{click:t.rightClick}},[t._v(t._s(t.rightText))])])},staticRenderFns:[]};var l=a("X4nt")(c,o,!1,function(t){a("//Q1")},"data-v-6542058a",null).exports,u=a("jGkV"),d=a("wSez"),v=a("gyMJ"),f={name:"",mounted:function(){this.$_getTravels()},data:function(){return{data:[],limit:50,offset:0}},methods:{createTravels:function(){this.$router.push("/travels/create")},$_getTravels:function(){var t=this;return i()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.e.getTravels({limit:t.limit,offset:t.offset});case 3:a=e.sent,t.data=a,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),Object(d.Toast)({message:"获取列表失败",position:"middle",duration:5e3});case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}},components:{MHeader:l,TravelsItem:u.a}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("mt-header",{staticClass:"m-header",attrs:{title:"旅途"}},[a("span",{staticClass:"m-header-span",attrs:{slot:"right"},on:{click:t.createTravels},slot:"right"},[t._v("发布")])]),t._v(" "),t._l(t.data,function(e,r){return a("travels-item",{key:r,attrs:{data:e},on:{needChange:t.$_getTravels}})})],2)},staticRenderFns:[]};var p=a("X4nt")(f,h,!1,function(t){a("dIFV")},"data-v-4e9bc060",null);e.default=p.exports},dIFV:function(t,e){}});
//# sourceMappingURL=13.bc0cd26ab0f9997c0194.js.map