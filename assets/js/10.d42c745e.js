(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{365:function(t,a,n){"use strict";n.r(a);var e=n(45),s=Object(e.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"cpl"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#cpl"}},[t._v("#")]),t._v(" CPL")]),t._v(" "),n("h2",{attrs:{id:"fact-阶乘"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#fact-阶乘"}},[t._v("#")]),t._v(" Fact 阶乘")]),t._v(" "),n("div",{staticClass:"language-cpl extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("rec function Fact[x] = (x = 0) -> 1, xFact[x — 1]\n")])])]),n("h2",{attrs:{id:"fact2-循环版阶乘"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#fact2-循环版阶乘"}},[t._v("#")]),t._v(" Fact2 循环版阶乘")]),t._v(" "),n("div",{staticClass:"language-cpl extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("function Fact2[x] = result of\n    §   real f = 1\n        until x = 0 do\n            f, x := xf, x — 1\n        result := f §\n")])])]),n("h2",{attrs:{id:"欧拉算法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#欧拉算法"}},[t._v("#")]),t._v(" 欧拉算法")]),t._v(" "),n("div",{staticClass:"language-cpl extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("function Euler [function Fct, real Eps; integer Tim]= result of\n    §1  dec §1.1    real Mn, Ds, Sum\n                    integer i, t\n                    index n=0\n                    m = Array [real, (0, 15)] §1.1\n        i, t, m[0] := 0, 0, Fct[0]\n        Sum := m[0]/2\n        §1.2    i := i + 1\n                Mn := Fct[i]\n                for k = step 0, 1, n do\n                    m[k], Mn := Mn, (Mn + m[k])/2\n                test Mod[Mn] < Mod[m[n]] /\\ n < 15\n                    then do Ds, n, m[n+l] := Mn/2, n+1, Mn\n                    or do Ds := Mn\n                Sum := Sum + Ds\n                t := (Mod[Ds] < Eps) -> t + 1, 0 §1.2\n        repeat while t < Tim\n        result := Sum §1\n")])])])])}),[],!1,null,null,null);a.default=s.exports}}]);