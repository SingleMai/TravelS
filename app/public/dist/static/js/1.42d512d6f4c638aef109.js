webpackJsonp([1],{"/p/U":function(t,a){},GciH:function(t,a,e){"use strict";var s=e("XqjS"),i={name:"",data:function(){return{}},props:{data:{type:Object}},components:{ValidateBar:s.a}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"server-card-block"},[e("div",{staticClass:"img"},[e("img",{attrs:{src:t.data.headImg,alt:""}})]),t._v(" "),e("div",{staticClass:"info"},[e("div",{staticClass:"info-left"},[e("p",{staticClass:"title"},[t._v(t._s(t.data.title))]),t._v(" "),e("validate-bar"),t._v(" "),e("p",{staticClass:"views"},[e("i",{staticClass:"el-icon-view"}),t._v("\n        "+t._s(t.data.views)+"人浏览过\n      ")])],1),t._v(" "),e("p",{staticClass:"info-right price"},[t._v("￥ "+t._s(t.data.price))]),t._v(" "),e("div",{staticClass:"avator"},[e("img",{attrs:{src:t.data.user.head,alt:""}})])])])},staticRenderFns:[]};var r=e("X4nt")(i,n,!1,function(t){e("ppiq")},"data-v-2215227a",null);a.a=r.exports},JCK8:function(t,a,e){t.exports=e.p+"static/img/bus.b227f5f.jpg"},LKMy:function(t,a){},PtPy:function(t,a){},ZYKm:function(t,a){},aIJf:function(t,a,e){t.exports=e.p+"static/img/foot.72ae318.jpg"},bhJ1:function(t,a,e){t.exports=e.p+"static/img/travels.cf6a633.jpg"},cV5L:function(t,a,e){t.exports=e.p+"static/img/show.7035365.jpg"},iall:function(t,a,e){t.exports=e.p+"static/img/hotel.eb0117a.jpg"},ppiq:function(t,a){},"q+80":function(t,a,e){t.exports=e.p+"static/img/iceCream.2bd598c.jpg"},qYpy:function(t,a){},sCWr:function(t,a,e){t.exports=e.p+"static/img/ticket.ecb7d3d.jpg"},tqM1:function(t,a){},wqTG:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("lC5x"),i=e.n(s),n=e("J0Oq"),r=e.n(n),c=e("gyMJ"),o={name:"",data:function(){return{}},props:{data:{type:Array}}},l={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"block"},[a("mt-swipe",{attrs:{auto:4e3}},this._l(this.data,function(t,e){return a("mt-swipe-item",{key:e},[a("img",{attrs:{src:t.carousel,alt:""}})])}))],1)},staticRenderFns:[]};var u=e("X4nt")(o,l,!1,function(t){e("LKMy")},"data-v-47257494",null).exports,d={name:"",data:function(){return{}},methods:{locationClick:function(){console.log("地点选定被点击")},searchBoxClick:function(){this.$emit("search")},mapClick:function(){console.log("右边map按钮被点击")}}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"search-block"},[e("a",{staticClass:"btn-location",attrs:{href:"javascript:void(0)"},on:{click:t.locationClick}},[t._v("深圳")]),t._v(" "),e("div",{staticClass:"search",on:{click:t.searchBoxClick}},[e("i",{staticClass:"el-icon-search"}),t._v(" "),e("span",[t._v("搜索目的地、玩法、景区")])]),t._v(" "),e("a",{staticClass:"btn-map",attrs:{href:"javascript:void(0)"},on:{click:t.mapClick}},[e("i",{staticClass:"el-icon-location-outline"})])])},staticRenderFns:[]};var f=e("X4nt")(d,v,!1,function(t){e("tqM1")},"data-v-cbe705be",null).exports,p=e("aIJf"),_=e.n(p),m=e("bhJ1"),h=e.n(m),C=e("sCWr"),g=e.n(C),b=e("iall"),k=e.n(b),x=e("cV5L"),y=e.n(x),$=e("q+80"),q=e.n($),w=e("JCK8"),j=e.n(w),S={name:"",data:function(){return{data:[{img:_.a,title:"一日游"},{img:h.a,title:"多日游"},{img:g.a,title:"门票"},{img:k.a,title:"酒店"},{img:y.a,title:"演出活动"},{img:q.a,title:"当地特产"},{img:j.a,title:"租车"}]}},methods:{route2:function(t){this.$router.push({name:"QueryServies",params:{query:t}})}}},E={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"bar-slide-box"},[e("ul",{staticClass:"bar-slide-list"},t._l(t.data,function(a,s){return e("li",{key:s,staticClass:"bar-slide-item",on:{click:function(e){t.route2(a.title)}}},[e("div",{staticClass:"img"},[e("img",{attrs:{src:a.img,alt:""}})]),t._v(" "),e("p",{staticClass:"label"},[t._v(t._s(a.title))])])}))])},staticRenderFns:[]};var J=e("X4nt")(S,E,!1,function(t){e("qYpy")},"data-v-71fdcd0c",null).exports,X={name:"",data:function(){return{}},props:{title:{type:String,required:!0},subTitle:{type:String,required:!0}},methods:{getMore:function(){console.log("更多按钮被点击")}}},B={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"block-title"},[e("div",{staticClass:"word"},[e("h2",{staticClass:"head"},[t._v(t._s(t.title))]),t._v(" "),e("p",{staticClass:"introduction"},[t._v(t._s(t.subTitle))])]),t._v(" "),e("p",{staticClass:"btn-more",on:{click:function(a){a.stopPropagation(),t.getMore()}}},[t._v("更多")])])},staticRenderFns:[]};var M=e("X4nt")(X,B,!1,function(t){e("ZYKm")},"data-v-c5a5ac92",null).exports,F=e("XqjS"),P={name:"",data:function(){return{}},props:{data:{type:Object}},components:{ValidateBar:F.a}},R={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"user-card-block"},[e("div",{staticClass:"block-left"},[e("div",{staticClass:"head-img"},[e("img",{attrs:{src:t.data.head,alt:""}})]),t._v(" "),e("div",{staticClass:"user-info"},[e("p",{staticClass:"name"},[t._v(t._s(t.data.name))]),t._v(" "),e("validate-bar",{attrs:{data:t.data}})],1)]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"block-right"},[e("p",{staticClass:"status"},[t._v("离线")]),t._v(" "),e("p",{staticClass:"likes"},[t._v("🔥18人好评")])])}]};var K={name:"",mounted:function(){this.$_getCarousel(),this.$_getUsers(),this.$_getServies()},data:function(){return{carousels:[],users:[],servies:[]}},methods:{route2:function(t){this.$router.push(t)},$_getServies:function(){var t=this;return r()(i.a.mark(function a(){var e;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.d.getServies({limit:5,offset:0});case 2:e=a.sent,t.servies=e;case 4:case"end":return a.stop()}},a,t)}))()},$_getCarousel:function(){var t=this;return r()(i.a.mark(function a(){var e;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.getCarousel();case 2:e=a.sent,t.carousels=e;case 4:case"end":return a.stop()}},a,t)}))()},$_getUsers:function(){var t=this;return r()(i.a.mark(function a(){var e;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.f.getList({limit:5,offset:0});case 2:e=a.sent,t.users=e;case 4:case"end":return a.stop()}},a,t)}))()}},components:{CarouselV:u,SearchBox:f,BarSlide:J,BlockTitle:M,UserCard:e("X4nt")(P,R,!1,function(t){e("/p/U")},"data-v-63a8b33d",null).exports,ServerCard:e("GciH").a}},T={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("search-box",{on:{search:function(a){t.route2("/search")}}}),t._v(" "),e("carousel-v",{attrs:{data:t.carousels}}),t._v(" "),e("div",{staticClass:"barBlock"},[t._m(0),t._v(" "),e("bar-slide"),t._v(" "),t._m(1),t._v(" "),e("bar-slide")],1),t._v(" "),e("div",{staticClass:"playing-recommend"},[e("block-title",{attrs:{title:"人气推荐",subTitle:"热门用户"}}),t._v(" "),t._l(t.users,function(t,a){return e("user-card",{key:a,attrs:{data:t}})})],2),t._v(" "),e("div",{staticClass:"playing-recommend"},[e("block-title",{attrs:{title:"玩法推荐",subTitle:"精选推荐好玩的景区、去处"}}),t._v(" "),t._l(t.servies,function(a,s){return e("server-card",{key:s,attrs:{data:a},nativeOn:{click:function(e){e.stopPropagation(),t.route2("/servies/"+a.id)}}})})],2)],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"head"},[a("i",{staticClass:"el-icon-picture"}),this._v("\n      当地人带你玩\n    ")])},function(){var t=this.$createElement,a=this._self._c||t;return a("p",{staticClass:"head"},[a("i",{staticClass:"el-icon-goods"}),this._v("\n      当地人代购\n    ")])}]};var L=e("X4nt")(K,T,!1,function(t){e("PtPy")},"data-v-1db5d132",null);a.default=L.exports}});
//# sourceMappingURL=1.42d512d6f4c638aef109.js.map