var freeaps_autotuneCore;(()=>{var e={5533:(e,r,o)=>{var i=o(2263);e.exports=function(e){var r=e.previousAutotune,o=e.pumpProfile,a=o.basalprofile,t=r.basalprofile,n=r.isfProfile,s=n.sensitivities[0].sensitivity,u=r.carb_ratio,l=s/u,d=r.dia,v=r.insulinPeakTime;if(!0==!r.useCustomPeakTime&&(v="ultra-rapid"===r.curve?55:75),o)var f=o.isfProfile;if(f&&f.sensitivities[0])var m=f.sensitivities[0].sensitivity,h=o.carb_ratio,p=m/h;u||(u=h),l||(l=p),s||(s=m);var c=e.preppedGlucose,F=c.CSFGlucoseData,C=c.ISFGlucoseData,g=c.basalGlucoseData,R=c.CRData,S=c.diaDeviations,M=c.peakDeviations,D=d;if(S){for(var I=S[2].meanDeviation,b=S[2].RMSDeviation,w=1e6,x=1e6,T=2,k=2,L=0;L<S.length;L++){var P=S[L].meanDeviation,_=S[L].RMSDeviation;P<w&&(w=Math.round(1e3*P)/1e3,T=L),_<x&&(x=Math.round(1e3*_)/1e3,k=L)}console.error("Best insulinEndTime for meanDeviations:",S[T].dia,"hours"),console.error("Best insulinEndTime for RMSDeviations:",S[k].dia,"hours"),T<2&&k<2?S[1].meanDeviation<.99*I&&S[1].RMSDeviation<.99*b&&(D=S[1].dia):T>2&&k>2&&S[3].meanDeviation<.99*I&&S[3].RMSDeviation<.99*b&&(D=S[3].dia),D>12&&(console.error("insulinEndTime maximum is 12h: not raising further"),D=12),D!==d?console.error("Adjusting insulinEndTime from",d,"to",D,"hours"):console.error("Leaving insulinEndTime unchanged at",d,"hours")}var B=v;if(M&&M[2]){var O=M[2].meanDeviation,y=M[2].RMSDeviation;for(w=1e6,x=1e6,T=2,k=2,L=0;L<M.length;L++)P=M[L].meanDeviation,_=M[L].RMSDeviation,P<w&&(w=Math.round(1e3*P)/1e3,T=L),_<x&&(x=Math.round(1e3*_)/1e3,k=L);console.error("Best insulinPeakTime for meanDeviations:",M[T].peak,"minutes"),console.error("Best insulinPeakTime for RMSDeviations:",M[k].peak,"minutes"),T<2&&k<2?M[1].meanDeviation<.99*O&&M[1].RMSDeviation<.99*y&&(B=M[1].peak):T>2&&k>2&&M[3].meanDeviation<.99*O&&M[3].RMSDeviation<.99*y&&(B=M[3].peak),B!==v?console.error("Adjusting insulinPeakTime from",v,"to",B,"minutes"):console.error("Leaving insulinPeakTime unchanged at",v)}var E=0,N=0;R.forEach((function(e){var r=(e.CREndBG-e.CRInitialBG)/s;e.CREndIOB,e.CRInitialIOB;e.CRInsulinTotal=e.CRInitialIOB+e.CRInsulin+r;Math.round(e.CRCarbs/e.CRInsulinTotal*1e3);e.CRInsulinTotal>0&&(E+=e.CRCarbs,N+=e.CRInsulinTotal)})),N=Math.round(1e3*N)/1e3;var j=Math.round(E/N*1e3)/1e3;console.error("CRTotalCarbs:",E,"CRTotalInsulin:",N,"totalCR:",j);var G=[],A=[];for(L=0;L<24;L++){for(var J=0;J<t.length;++J)if(t[J].minutes<=60*L){if(0===t[J].rate)return void console.error("ERROR: bad basalProfile",t[J]);G[L]=JSON.parse(JSON.stringify(t[J]))}G[L].i=L,G[L].minutes=60*L;var H=("000"+L).slice(-2);if(G[L].start=H+":00:00",G[L].rate=Math.round(1e3*G[L].rate)/1e3,a&&a[0]){for(J=0;J<a.length;++J){if(0===a[J].rate)return void console.error("ERROR: bad pumpBasalProfile",a[J]);a[J].minutes<=60*L&&(A[L]=JSON.parse(JSON.stringify(a[J])))}A[L].i=L,A[L].minutes=60*L,A[L].rate=Math.round(1e3*A[L].rate)/1e3}}for(var U=JSON.parse(JSON.stringify(G)),q=0;q<24;q++){var z=0;for(L=0;L<g.length;++L){var K;g[L].date?K=new Date(g[L].date):g[L].displayTime?K=new Date(g[L].displayTime.replace("T"," ")):g[L].dateString?K=new Date(g[L].dateString):console.error("Could not determine last BG time"),q===K.getHours()&&(z+=parseFloat(g[L].deviation))}z=Math.round(1e3*z)/1e3,console.error("Hour",q.toString(),"total deviations:",z,"mg/dL");var Q=.2*z/s;if(Q=Math.round(100*Q)/100,console.error("Hour",q,"basal adjustment needed:",Q,"U/hr"),Q>0)for(var V=-3;V<0;V++){var W=q+V;W<0&&(W+=24),U[W].rate+=Q/3,U[W].rate=Math.round(1e3*U[W].rate)/1e3}else if(Q<0){var X=0;for(V=-3;V<0;V++)(W=q+V)<0&&(W+=24),X+=U[W].rate;var Y=1+Q/X;for(V=-3;V<0;V++)(W=q+V)<0&&(W+=24),U[W].rate=U[W].rate*Y,U[W].rate=Math.round(1e3*U[W].rate)/1e3}}if(a&&a[0])for(q=0;q<24;q++){if(void 0!==o.autosens_max)var Z=o.autosens_max;else Z=1.2;if(void 0!==o.autosens_min)var $=o.autosens_min;else $=.7;var ee=A[q].rate*Z,re=A[q].rate*$;U[q].rate>ee?(console.error("Limiting hour",q,"basal to",ee.toFixed(2),"(which is",Z,"* pump basal of",A[q].rate,")"),U[q].rate=ee):U[q].rate<re&&(console.error("Limiting hour",q,"basal to",re.toFixed(2),"(which is",$,"* pump basal of",A[q].rate,")"),U[q].rate=re),U[q].rate=Math.round(20*U[q].rate)/20}var oe=0;for(q=0;q<24;q++)if(G[q].rate===U[q].rate){for(var ie=23,ae=q;ae<24;ae++)if(G[ae].rate!==U[ae].rate){ie=ae;break}U[q].rate=Math.round(20*(.8*G[q].rate+.1*U[oe].rate+.1*U[ie].rate))/20,U[q].untuned?U[q].untuned++:U[q].untuned=1,console.error("Adjusting hour",q,"basal from",G[q].rate,"to",U[q].rate,"based on hour",oe,"=",U[oe].rate,"and hour",ie,"=",U[ie].rate)}else oe=q;console.error(U),t=U,z=0;var te,ne=0,se=0,ue=0;for(L=0;L<F.length;++L)if("start"===F[L].mealAbsorption)z=0,ne=parseInt(F[L].mealCarbs);else if("end"===F[L].mealAbsorption){se+=ne,ue+=z+=parseFloat(F[L].deviation)}else z+=Math.max(0*r.min_5m_carbimpact,parseFloat(F[L].deviation)),ne=Math.max(ne,parseInt(F[L].mealCarbs));0===se&&(se+=ne),0===ue&&(ue+=z);var le=.8*l+.2*(te=0===se?l:Math.round(ue/se*100)/100);if(void 0!==p){var de=p*Z,ve=p*$;le>de?(console.error("Limiting CSF to",de.toFixed(2),"(which is",Z,"* pump CSF of",p,")"),le=de):le<ve&&(console.error("Limiting CSF to",ve.toFixed(2),"(which is",$,"* pump CSF of",p,")"),le=ve)}var fe=Math.round(1e3*l)/1e3;if(le=Math.round(1e3*le)/1e3,ue=Math.round(1e3*ue)/1e3,console.error("totalMealCarbs:",se,"totalDeviations:",ue,"oldCSF",fe,"fullNewCSF:",te,"newCSF:",le),le&&(l=le),0===j)var me=u;else me=j;var he=h*Z;he>150&&(he=150);var pe=h*$;pe<3&&(pe=3),void 0!==h&&(me>he?(console.error("Limiting fullNewCR from",me,"to",he.toFixed(2),"(which is",Z,"* pump CR of",h,")"),me=he):me<pe&&(console.error("Limiting fullNewCR from",me,"to",pe.toFixed(2),"(which is",$,"* pump CR of",h,")"),me=pe));var ce=.8*u+.2*me;void 0!==h&&(ce>he?(console.error("Limiting CR to",he.toFixed(2),"(which is",Z,"* pump CR of",h,")"),ce=he):ce<pe&&(console.error("Limiting CR to",pe.toFixed(2),"(which is",$,"* pump CR of",h,")"),ce=pe)),ce=Math.round(1e3*ce)/1e3,console.error("oldCR:",u,"fullNewCR:",me,"newCR:",ce),ce&&(u=ce),z=[];var Fe=[],Ce=[],ge=[];for(L=0;L<C.length;++L){deviation=parseFloat(C[L].deviation),z.push(deviation);var Re=parseFloat(C[L].BGI);Fe.push(Re);var Se=parseFloat(C[L].avgDelta);Ce.push(Se);var Me=1+deviation/Re;ge.push(Me)}Ce.sort((function(e,r){return e-r})),Fe.sort((function(e,r){return e-r})),z.sort((function(e,r){return e-r})),ge.sort((function(e,r){return e-r}));var De,Ie=i(z,.5),be=i(Fe,.5),we=Math.round(1e3*i(ge,.5))/1e3,xe=s;C.length<10?console.error("Only found",C.length,"ISF data points, leaving ISF unchanged at",s):xe=s*we,xe=Math.round(1e3*xe)/1e3,De=void 0!==o.autotune_isf_adjustmentFraction?o.autotune_isf_adjustmentFraction:1;var Te=m/$,ke=m/Z;if(void 0!==m){if(xe<0)var Le=s;else Le=De*xe+(1-De)*m;Le>Te?(console.error("Limiting adjusted ISF of",Le.toFixed(2),"to",Te.toFixed(2),"(which is pump ISF of",m,"/",$,")"),Le=Te):Le<ke&&(console.error("Limiting adjusted ISF of",Le.toFixed(2),"to",ke.toFixed(2),"(which is pump ISF of",m,"/",Z,")"),Le=ke);var Pe=.8*s+.2*Le;Pe>Te?(console.error("Limiting ISF of",Pe.toFixed(2),"to",Te.toFixed(2),"(which is pump ISF of",m,"/",$,")"),Pe=Te):Pe<ke&&(console.error("Limiting ISF of",Pe.toFixed(2),"to",ke.toFixed(2),"(which is pump ISF of",m,"/",Z,")"),Pe=ke)}Pe=Math.round(1e3*Pe)/1e3,Ie=Math.round(1e3*Ie)/1e3,be=Math.round(1e3*be)/1e3,Le=Math.round(1e3*Le)/1e3,console.error("p50deviation:",Ie,"p50BGI",be,"p50ratios:",we,"Old ISF:",s,"fullNewISF:",xe,"adjustedISF:",Le,"newISF:",Pe,"newDIA:",D,"newPeak:",B),Pe&&(s=Pe);var _e=r;return _e.basalprofile=t,n.sensitivities[0].sensitivity=s,_e.isfProfile=n,_e.sens=s,_e.csf=l,u=Math.round(1e3*u)/1e3,_e.carb_ratio=u,_e.dia=D,_e.insulinPeakTime=B,(S||M)&&(_e.useCustomPeakTime=!0),_e}},2263:e=>{e.exports=function(e,r){if(0===e.length)return 0;if("number"!=typeof r)throw new TypeError("p must be a number");if(r<=0)return e[0];if(r>=1)return e[e.length-1];var o=e.length*r,i=Math.floor(o),a=i+1,t=o%1;return a>=e.length?e[i]:e[i]*(1-t)+e[a]*t}}},r={};var o=function o(i){var a=r[i];if(void 0!==a)return a.exports;var t=r[i]={exports:{}};return e[i](t,t.exports,o),t.exports}(5533);freeaps_autotuneCore=o})();