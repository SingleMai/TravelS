webpackJsonp([12],{Byy8:function(t,e,a){t.exports=a.p+"static/img/userHome.66f9a5d.jpg"},XxKR:function(t,e){},d0FS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("lC5x"),n=a.n(s),r=a("J0Oq"),i=a.n(r),c=a("4YfN"),o=a.n(c),d=a("gyMJ"),u=a("jGkV"),l=a("9rMa"),v=a("Byy8"),f=a.n(v),m={name:"",mounted:function(){this.$_getUsersInfo()},data:function(){return{myId:JSON.parse(window.localStorage.getItem("user")).id,id:parseInt(this.$route.params.id),userHomeImg:f.a,selected:"",travelsLimit:50,travelsOffset:0,data:{}}},methods:o()({back:function(){this.$router.back()},routeToEdit:function(){this.$router.push("/user/"+this.id+"/edit")},addFriend:function(){var t=this;return i()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.b.addFriend({friendId:t.id});case 2:a=e.sent,console.log(a);case 4:case"end":return e.stop()}},e,t)}))()},$_getUsersInfo:function(){var t=this;return i()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.getMyInfo){e.next=6;break}return e.next=3,d.f.getUsersInfo({id:t.id,travelsLimit:t.travelsLimit,travelsOffset:t.travelsOffset});case 3:a=e.sent,t.data=a,t.setMyInfo(a);case 6:case"end":return e.stop()}},e,t)}))()}},Object(l.c)({setMyInfo:"SET_MY_INFO"})),computed:o()({},Object(l.b)(["getMyInfo"])),components:{TravelsItem:u.a}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"head-box",style:"background: url("+t.userHomeImg+") center;background-size: 100% 100%;"},[a("span",{staticClass:"btn-back",on:{click:function(e){t.back()}}},[a("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-back"}})])]),t._v(" "),a("div",{staticClass:"user-info"},[a("div",{staticClass:"avator"},[a("img",{attrs:{src:t.data.head,alt:""}})]),t._v(" "),a("p",{staticClass:"name"},[t._v(t._s(t.data.name))]),t._v(" "),a("p",{staticClass:"info"},[t._v(t._s(t.data.job)+"/"+t._s(t.data.city))]),t._v(" "),a("div",{staticClass:"btn-box"},[t.myId===t.id?a("p",{staticClass:"btn-edit",on:{click:t.routeToEdit}},[t._v("编辑资料")]):a("p",{staticClass:"btn-likes",on:{click:t.addFriend}},[t._v("关注")])])])]),t._v(" "),a("mt-navbar",{attrs:{fixed:!1},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("mt-tab-item",{attrs:{id:"shop"}},[t._v("我的小店")]),t._v(" "),a("mt-tab-item",{attrs:{id:"instru"}},[t._v("关于我")]),t._v(" "),a("mt-tab-item",{attrs:{id:"travels"}},[t._v("旅途")])],1),t._v(" "),a("mt-tab-container",{model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[a("mt-tab-container-item",{attrs:{id:"shop"}},[a("p",{staticClass:"no-data"},[t._v("暂无数据")])]),t._v(" "),a("mt-tab-container-item",{attrs:{id:"instru"}},[a("p",{staticClass:"instru-content",domProps:{innerHTML:t._s(t.data.instroduction)}})]),t._v(" "),a("mt-tab-container-item",{attrs:{id:"travels"}},t._l(t.data.travels,function(t,e){return a("travels-item",{key:e,attrs:{data:t}})}))],1)],1)},staticRenderFns:[]};var p=a("X4nt")(m,b,!1,function(t){a("XxKR")},"data-v-6b477166",null);e.default=p.exports}});
//# sourceMappingURL=12.95b65e836b70ab9db54a.js.map