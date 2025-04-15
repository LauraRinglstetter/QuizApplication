(function(){"use strict";var e={5495:function(e,t,s){s.d(t,{s:function(){return Ct}});var o=s(5130),r=s(6768),n=s(4232);const a={class:"nav"},i={class:"main"};function l(e,t,s,o,l,u){const c=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",{class:(0,n.C4)(["app",u.backgroundClass])},[(0,r.Lk)("nav",a,[t[2]||(t[2]=(0,r.Lk)("p",null,[(0,r.eW)("Skillmaster "),(0,r.Lk)("span",null,"Skill up your life")],-1)),l.isLoggedIn?((0,r.uX)(),(0,r.CE)("button",{key:0,onClick:t[0]||(t[0]=(...e)=>u.goToProfile&&u.goToProfile(...e))},"Profil 👤")):(0,r.Q3)("",!0),l.isLoggedIn?((0,r.uX)(),(0,r.CE)("button",{key:1,onClick:t[1]||(t[1]=(...e)=>u.logout&&u.logout(...e))},"Logout")):(0,r.Q3)("",!0)]),(0,r.Lk)("div",i,[(0,r.bF)(c)])],2)}s(4114);var u=s(4373),c={name:"App",data(){return{message:"",isLoggedIn:!1}},computed:{backgroundClass(){return"questions"===this.$route.name?"no-background":""}},methods:{checkLoginStatus(){this.isLoggedIn=!!sessionStorage.getItem("token")},async getDataFromBackend(){try{const e=await u.A.get("https://quizapplication-production-ff18.up.railway.app/api/test");this.message=e.data.message}catch(e){console.error("Fehler beim Abrufen der Daten:",e)}},logout(){sessionStorage.removeItem("token"),this.isLoggedIn=!1,this.$router.push("/")},goToProfile(){this.$router.push("/profile")}},watch:{$route(){this.checkLoginStatus()}},mounted(){this.checkLoginStatus()}},d=s(1241);const p=(0,d.A)(c,[["render",l]]);var g=p,h=s(1387);const m={class:"dashboard"},k={id:"intro"},v={key:0},y={class:"categories-dashboard"},b={class:"quiz-general"},f={class:"buttons"},C={class:"cooperative"},L={class:"extend-questions"},w={class:"best-list"};function E(e,t,s,o,a,i){const l=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",m,[(0,r.Lk)("div",k,[t[3]||(t[3]=(0,r.Lk)("h1",null,"Skillmaster Dashboard",-1)),a.username?((0,r.uX)(),(0,r.CE)("h2",v,"Willkommen zurück, "+(0,n.v_)(a.username)+"!",1)):(0,r.Q3)("",!0),t[4]||(t[4]=(0,r.Lk)("p",null," Hier kannst du ein Quiz starten, die Fragenkataloge erweitern, gemeinsam mit anderen Spielern lernen und vieles mehr!",-1))]),(0,r.Lk)("div",y,[(0,r.Lk)("div",b,[t[6]||(t[6]=(0,r.Lk)("p",null," Erweitere deine Kenntnisse und starte ein Quiz!",-1)),(0,r.Lk)("div",f,[(0,r.bF)(l,{to:"/categories",class:"quiz"},{default:(0,r.k6)((()=>t[5]||(t[5]=[(0,r.eW)("Los geht's")]))),_:1})])]),(0,r.Lk)("div",C,[t[7]||(t[7]=(0,r.Lk)("p",null," Du möchtest gemeinsam mit anderen Studierenden lernen?",-1)),(0,r.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.goToMultiplayerPage&&i.goToMultiplayerPage(...e))}," Starte ein kooperatives Spiel")]),(0,r.Lk)("div",L,[t[8]||(t[8]=(0,r.Lk)("p",null," Möchtest du eure gemeinsamen Lerninhalte erweitern und eigene Fragen hinzufügen?",-1)),(0,r.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>i.goToQuestionsPage&&i.goToQuestionsPage(...e))}," Erweitere den Fragenkatalog ")]),(0,r.Lk)("div",w,[t[9]||(t[9]=(0,r.Lk)("p",null," Hier findest du die aktuelle Bestenliste der IU",-1)),(0,r.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.goToLeaderboard&&i.goToLeaderboard(...e))}," Zum Leaderboard ")])])])}var q=s(5068),F={name:"HomePage",data(){return{username:""}},mounted(){this.getUserData()},methods:{getUserData(){const e=sessionStorage.getItem("token");if(e)try{const t=(0,q.s)(e);console.log(t),this.username=t.username}catch(t){console.error("Fehler beim Decodieren des Tokens:",t)}},goToQuiz(e){this.$router.push({name:"quiz",query:{category:e}})},goToLeaderboard(){this.$router.push("/leaderboard")},goToQuestionsPage(){this.$router.push("/questions")},goToMultiplayerPage(){this.$router.push("/multiplayer")}}};const Q=(0,d.A)(F,[["render",E],["__scopeId","data-v-cbaa7f6e"]]);var _=Q;const z={class:"container"},A={class:"registerBox"},X={key:0},S={class:"register-text"};function K(e,t,s,a,i,l){const u=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",z,[(0,r.Lk)("div",A,[t[6]||(t[6]=(0,r.Lk)("h1",null,"Registrieren",-1)),(0,r.Lk)("form",null,[(0,r.bo)((0,r.Lk)("input",{type:"text",placeholder:"Username","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e)},null,512),[[o.Jo,i.username]]),(0,r.bo)((0,r.Lk)("input",{type:"password",placeholder:"Password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e)},null,512),[[o.Jo,i.password]]),(0,r.bo)((0,r.Lk)("input",{type:"password",placeholder:"Password (repeat)","onUpdate:modelValue":t[2]||(t[2]=e=>i.password_repeat=e)},null,512),[[o.Jo,i.password_repeat]]),(0,r.Lk)("input",{type:"button",onClick:t[3]||(t[3]=(...e)=>l.signUp&&l.signUp(...e)),value:"Registrieren"})]),i.msg?((0,r.uX)(),(0,r.CE)("p",X,(0,n.v_)(i.msg),1)):(0,r.Q3)("",!0),(0,r.Lk)("p",S,[t[5]||(t[5]=(0,r.eW)(" Du hast bereits ein Konto? ")),(0,r.bF)(u,{to:"/"},{default:(0,r.k6)((()=>t[4]||(t[4]=[(0,r.eW)("Hier anmelden")]))),_:1})])])])}const I="https://quizapplication-production-ff18.up.railway.app/api";var T={async login(e){try{const t=await u.A.post(I+"/",e);return t.data}catch(t){throw console.error("Login-Fehler:",t),t.response&&console.error("Fehler-Response:",t.response.data),t.response?t.response.data:t.message}},async signUp(e){try{const t=await u.A.post(I+"/register/",e);return t.data}catch(t){throw console.error("Registrierungs-Fehler:",t),t.response?t.response.data:t.message}},async getSecretContent(){try{const e=await u.A.get(I+"/start/");return e.data}catch(e){throw console.error("Fehler beim Abrufen von geheimen Inhalten:",e),e.response?e.response.data:e.message}}},M={data(){return{username:"",password:"",password_repeat:"",msg:""}},methods:{async signUp(){if(this.password===this.password_repeat)if(this.password.length<6)this.msg="Das Passwort muss mindestens 6 Zeichen haben!";else try{const e={username:this.username,password:this.password,password_repeat:this.password_repeat},t=await T.signUp(e);this.msg=t.msg,this.$router.push("/")}catch(e){this.msg=e}else this.msg="Passwörter stimmen nicht überein"}}};const P=(0,d.A)(M,[["render",K],["__scopeId","data-v-971196d2"]]);var R=P;const x={class:"container"},U={class:"loginBox"},$={key:0},W={class:"register-text"};function D(e,t,s,a,i,l){const u=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",x,[(0,r.Lk)("div",U,[t[5]||(t[5]=(0,r.Lk)("h1",null,"Login",-1)),(0,r.Lk)("form",null,[(0,r.bo)((0,r.Lk)("input",{type:"text",placeholder:"Username","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e)},null,512),[[o.Jo,i.username]]),(0,r.bo)((0,r.Lk)("input",{type:"password",placeholder:"Password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e)},null,512),[[o.Jo,i.password]]),(0,r.Lk)("input",{type:"button",onClick:t[2]||(t[2]=(...e)=>l.login&&l.login(...e)),value:"Anmelden"})]),i.msg?((0,r.uX)(),(0,r.CE)("p",$,(0,n.v_)(i.msg),1)):(0,r.Q3)("",!0),(0,r.Lk)("p",W,[t[4]||(t[4]=(0,r.eW)(" Noch kein Konto? ")),(0,r.bF)(u,{to:"/register"},{default:(0,r.k6)((()=>t[3]||(t[3]=[(0,r.eW)("Hier registrieren")]))),_:1})])])])}var O={name:"LoginPage",data(){return{username:"",password:"",msg:""}},methods:{async login(){try{const e={username:this.username,password:this.password},t=await T.login(e);this.msg=t.message,sessionStorage.setItem("token",t.token),sessionStorage.setItem("username",this.username),this.$router.push("/home")}catch(e){console.error("Login-Fehler:",e),e.response&&e.response.data?(console.error("Fehler-Response:",e.response.data),this.msg=e.response.data):e.message?this.msg=e.message:this.msg="Es gab ein Problem mit dem Login. Bitte versuche es später erneut."}}}};const N=(0,d.A)(O,[["render",D]]);var j=N,B=(s(1454),s(144));const J={class:"app"},V={key:0,class:"quiz"},H={class:"timer"},Z={class:"quiz-info"},G={class:"question"},Y={class:"score"},ee={class:"options"},te=["name","value","disabled"],se=["disabled"],oe={key:1},re={class:"quiz-end"},ne={key:0},ae={key:1};var ie={__name:"QuizPage",setup(e){const t=(0,h.lq)(),s=(0,h.rd)();let a=(0,B.KR)(90);const i=(0,B.KR)(!1);let l=null;const c=()=>{l=setInterval((()=>{a.value>0?a.value--:(clearInterval(l),g())}),1e3)},d=()=>{clearInterval(l)},p=(0,r.EW)((()=>{const e=Math.floor(a.value/60),t=a.value%60;return`${e}:${t.toString().padStart(2,"0")}`})),g=()=>{y.value=!0,i.value=!0,L(),d()},m=()=>{s.push("/home"),d()},k=t.query.category,v=(0,B.KR)([]),y=(0,B.KR)(!1),b=(0,B.KR)(0),f=async e=>{try{const t=await u.A.get(`https://quizapplication-production-ff18.up.railway.app/api/questions?category=${e}`);v.value=t.data.map((e=>({question:e.question,options:JSON.parse(e.options),answer:e.answer,selected:null})))}catch(t){console.error("Fehler beim Abrufen der Fragen:",t)}};(0,r.sV)((()=>{f(k),c()}));const C=(0,r.EW)((()=>{let e=0;return v.value.map((t=>{t.selected==t.answer&&e++})),e})),L=async()=>{try{const e=localStorage.getItem("username");if(!e)return void console.error("Kein Benutzername gefunden");const t=await u.A.put("https://quizapplication-production-ff18.up.railway.app/api/leaderboard",{username:e,score:C.value});console.log("Punktestand gespeichert:",t.data)}catch(e){console.error("Fehler beim Speichern des Punktestands:",e)}},w=(0,r.EW)((()=>{let e=v.value[b.value];return e?(e.index=b.value,e):{}})),E=e=>{v.value[b.value].selected=e.target.value},q=()=>{b.value<v.value.length-1?b.value++:(y.value=!0,L())};return(e,t)=>{const s=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("main",J,[t[2]||(t[2]=(0,r.Lk)("h1",null,"Multiple-choice Quiz",-1)),y.value?((0,r.uX)(),(0,r.CE)("section",oe,[(0,r.Lk)("div",re,[i.value?((0,r.uX)(),(0,r.CE)("h2",ne,"Oops, die Zeit ist abgelaufen!")):((0,r.uX)(),(0,r.CE)("h2",ae,"Herzlichen Glückwunsch, du hast das Quiz abgeschlossen!")),(0,r.Lk)("h3",null,"Dein Punktestand: "+(0,n.v_)(C.value)+" / "+(0,n.v_)(v.value.length),1)]),(0,r.Lk)("button",{onClick:m},"Zurück zur Startseite")])):((0,r.uX)(),(0,r.CE)("section",V,[(0,r.Lk)("div",H,(0,n.v_)(p.value),1),(0,r.Lk)("div",Z,[(0,r.Lk)("span",G,(0,n.v_)(w.value.question),1),(0,r.Lk)("span",Y," Score: "+(0,n.v_)(C.value)+" / "+(0,n.v_)(v.value.length),1)]),(0,r.Lk)("div",ee,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(w.value.options,((e,s)=>((0,r.uX)(),(0,r.CE)("label",{key:s,class:(0,n.C4)(`option ${w.value.selected==s?s==w.value.answer?"correct":"wrong":""}${null!==w.value.selected&&s!==w.value.selected?" disabled":""}${s===w.value.answer&&null!==w.value.selected?" correct":""}\n            `)},[(0,r.bo)((0,r.Lk)("input",{type:"radio",name:w.value.index,value:s,"onUpdate:modelValue":t[0]||(t[0]=e=>w.value.selected=e),disabled:null!==w.value.selected,onChange:E},null,40,te),[[o.XL,w.value.selected]]),(0,r.Lk)("span",null,(0,n.v_)(e),1)],2)))),128))]),(0,r.Lk)("button",{onClick:q,disabled:null===w.value.selected},(0,n.v_)(w.value.index==v.value.length-1?"Abschließen":"Nächste Frage"),9,se),(0,r.bF)(s,{to:"/categories",class:"stop-quiz"},{default:(0,r.k6)((()=>t[1]||(t[1]=[(0,r.eW)("Quiz abbrechen")]))),_:1})]))])}}};const le=(0,d.A)(ie,[["__scopeId","data-v-e83ac364"]]);var ue=le;function ce(e,t,s,o,a,i){const l=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.bF)(l,{to:"/home",class:"exit"},{default:(0,r.k6)((()=>t[0]||(t[0]=[(0,r.eW)("Zurück zum Dashboard")]))),_:1}),t[2]||(t[2]=(0,r.Lk)("h1",null,"Leaderboard",-1)),(0,r.Lk)("table",null,[t[1]||(t[1]=(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Platz"),(0,r.Lk)("th",null,"Benutzername"),(0,r.Lk)("th",null,"Punktestand")])],-1)),(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(a.leaderboard,((e,t)=>((0,r.uX)(),(0,r.CE)("tr",{key:e.id},[(0,r.Lk)("td",null,(0,n.v_)(t+1),1),(0,r.Lk)("td",null,(0,n.v_)(e.username),1),(0,r.Lk)("td",null,(0,n.v_)(e.score),1)])))),128))])])])}var de={name:"LeaderboardPage",data(){return{leaderboard:[]}},created(){fetch("https://quizapplication-production-ff18.up.railway.app/api/leaderboard").then((e=>e.json())).then((e=>{this.leaderboard=e})).catch((e=>console.error("Fehler beim Laden der Bestenliste:",e)))}};const pe=(0,d.A)(de,[["render",ce]]);var ge=pe;function he(e,t,s,o,a,i){const l=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.bF)(l,{to:"/home",class:"back exit"},{default:(0,r.k6)((()=>t[0]||(t[0]=[(0,r.eW)("Zurück zum Dashboard")]))),_:1}),t[2]||(t[2]=(0,r.Lk)("h1",null,"Dein Profil",-1)),t[3]||(t[3]=(0,r.Lk)("p",{class:"icon"},"👤",-1)),(0,r.Lk)("table",null,[t[1]||(t[1]=(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Benutzername"),(0,r.Lk)("th",null,"Punktestand")])],-1)),(0,r.Lk)("tbody",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("td",null,(0,n.v_)(a.username),1),(0,r.Lk)("td",null,(0,n.v_)(a.score),1)])])])])}var me={name:"ProfilePage",data(){return{username:"",score:0,id:""}},mounted(){this.getUserData()},methods:{getUserData(){const e=sessionStorage.getItem("token");if(e)try{const t=(0,q.s)(e);console.log("Token-Daten:",t),this.username=t.username,this.id=t.id,this.fetchScore()}catch(t){console.error("Fehler beim Decodieren des Tokens:",t)}},fetchScore(){const e=sessionStorage.getItem("token");if(e)try{const t=(0,q.s)(e),s=t.userId;u.A.get(`https://quizapplication-production-ff18.up.railway.app/api/users/score/${s}`).then((e=>{this.score=e.data.score})).catch((e=>{console.error("Fehler beim Abrufen des Scores:",e)}))}catch(t){console.error("Fehler beim Decodieren des Tokens:",t)}}}};const ke=(0,d.A)(me,[["render",he],["__scopeId","data-v-32fe0e5f"]]);var ve=ke;const ye={class:"container-questions"},be={class:"add-category"},fe={key:0,class:"add-category-form"},Ce={key:1,class:"error-message"},Le={class:"overview"},we=["onClick"],Ee=["onClick"],qe=["onClick"],Fe={key:2,class:"questions-list",ref:"questionList"},Qe={class:"options-list"},_e={key:0},ze={key:3,class:"success-message"},Ae={key:4,class:"question-form",ref:"questionForm"},Xe=["onUpdate:modelValue","placeholder"],Se={class:"answer-selection"},Ke=["value"];function Ie(e,t,s,a,i,l){const u=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",ye,[(0,r.bF)(u,{to:"/home",class:"exit button"},{default:(0,r.k6)((()=>t[6]||(t[6]=[(0,r.eW)("Zurück zum Dashboard")]))),_:1}),t[12]||(t[12]=(0,r.Lk)("h1",null,"Fragenkataloge",-1)),t[13]||(t[13]=(0,r.Lk)("p",null,"Erstelle eine neue Kategorie oder erweitere Fragen in den bisherigen Kategorien!",-1)),(0,r.Lk)("div",be,[(0,r.Lk)("button",{onClick:t[0]||(t[0]=e=>i.showAddCategoryForm=!i.showAddCategoryForm),class:"add-category-button"},t[7]||(t[7]=[(0,r.Lk)("span",null,"+",-1),(0,r.eW)(" Neue Kategorie ")]))]),i.showAddCategoryForm?((0,r.uX)(),(0,r.CE)("div",fe,[(0,r.bo)((0,r.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>i.newCategory=e),type:"text",placeholder:"Kategorie Name",class:"category-input"},null,512),[[o.Jo,i.newCategory]]),(0,r.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>l.addCategory&&l.addCategory(...e)),class:"add-category-submit"},"Hinzufügen")])):(0,r.Q3)("",!0),i.errorMessage?((0,r.uX)(),(0,r.CE)("div",Ce,(0,n.v_)(i.errorMessage),1)):(0,r.Q3)("",!0),(0,r.Lk)("div",Le,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(l.allCategories,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e,class:"category"},[(0,r.Lk)("h3",null,(0,n.v_)(e),1),(0,r.Lk)("span",{onClick:t=>l.selectCategory(e),class:"question-button"},"Neue Frage hinzufügen",8,we),(0,r.Lk)("span",{onClick:t=>l.seeAllQuestions(e),class:"question-button"},"Alle Fragen anzeigen",8,Ee),l.isTemporaryCategory(e)?((0,r.uX)(),(0,r.CE)("span",{key:0,onClick:t=>l.deleteCategory(e),class:"delete-button"},"🗑 Löschen",8,qe)):(0,r.Q3)("",!0)])))),128))]),i.questions.length>0?((0,r.uX)(),(0,r.CE)("div",Fe,[(0,r.Lk)("h2",null,"Fragen für diese Kategorie "+(0,n.v_)(e.category),1),(0,r.Lk)("ul",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.questions,((e,s)=>((0,r.uX)(),(0,r.CE)("li",{key:s,class:"question-item"},[t[8]||(t[8]=(0,r.Lk)("strong",null,"Frage:",-1)),(0,r.eW)(" "+(0,n.v_)(e.question)+" ",1),t[9]||(t[9]=(0,r.Lk)("br",null,null,-1)),t[10]||(t[10]=(0,r.Lk)("strong",null,"Antwortmöglichkeiten:",-1)),(0,r.Lk)("ul",Qe,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.options,((t,s)=>((0,r.uX)(),(0,r.CE)("li",{key:s},[(0,r.eW)((0,n.v_)(t)+" ",1),s===e.answer?((0,r.uX)(),(0,r.CE)("span",_e,"✅")):(0,r.Q3)("",!0)])))),128))])])))),128))])],512)):(0,r.Q3)("",!0),i.successMessage?((0,r.uX)(),(0,r.CE)("div",ze,(0,n.v_)(i.successMessage),1)):(0,r.Q3)("",!0),i.selectedCategory?((0,r.uX)(),(0,r.CE)("div",Ae,[(0,r.Lk)("h2",null,"Neue Frage hinzufügen - "+(0,n.v_)(i.selectedCategory),1),(0,r.bo)((0,r.Lk)("input",{"onUpdate:modelValue":t[3]||(t[3]=e=>i.newQuestion=e),type:"text",placeholder:"Frage",class:"question-input"},null,512),[[o.Jo,i.newQuestion]]),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.options,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t,class:"option-input"},[(0,r.bo)((0,r.Lk)("input",{"onUpdate:modelValue":e=>i.options[t]=e,type:"text",placeholder:"Antwortoption "+(t+1),class:"option-field"},null,8,Xe),[[o.Jo,i.options[t]]])])))),128)),(0,r.Lk)("div",Se,[t[11]||(t[11]=(0,r.Lk)("label",null,"Wähle die richtige Antwort:",-1)),(0,r.bo)((0,r.Lk)("select",{"onUpdate:modelValue":t[4]||(t[4]=e=>i.correctAnswer=e),class:"answer-select"},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.options,((e,t)=>((0,r.uX)(),(0,r.CE)("option",{key:t,value:t}," Antwort "+(0,n.v_)(t+1),9,Ke)))),128))],512),[[o.u1,i.correctAnswer]])]),(0,r.Lk)("button",{onClick:t[5]||(t[5]=(...e)=>l.submitQuestion&&l.submitQuestion(...e))},"Frage hinzufügen")],512)):(0,r.Q3)("",!0)])}s(7642),s(8004),s(3853),s(5876),s(2475),s(5024),s(1698),s(8992),s(4520),s(7550);var Te={data(){return{categories:[],temporaryCategories:[],showAddCategoryForm:!1,newCategory:"",selectedCategory:null,newQuestion:"",options:["","","",""],correctAnswer:null,successMessage:"",errorMessage:"",questions:[]}},async mounted(){await this.fetchCategories(),this.loadTemporaryCategories()},computed:{allCategories(){return[...new Set([...this.categories,...this.temporaryCategories])]}},methods:{async seeAllQuestions(e){this.questions=[];try{const t=await u.A.get(`https://quizapplication-production-ff18.up.railway.app/api/questions?category=${e}`);this.questions=t.data.map((e=>({question:e.question,options:JSON.parse(e.options),answer:e.answer,selected:null})))}catch(t){console.error("Fehler beim Abrufen der Fragen:",t),this.errorMessage="Fehler beim Laden der Fragen."}(0,r.dY)((()=>{this.$refs.questionList&&this.$refs.questionList.scrollIntoView({behavior:"smooth"})}))},async fetchCategories(){try{const e=await u.A.get("https://quizapplication-production-ff18.up.railway.app/api/categories");this.categories=e.data.map((e=>e.category)),console.log(this.categories)}catch(e){console.error("Fehler beim Abrufen der Kategorien:",e)}},loadTemporaryCategories(){const e=localStorage.getItem("temporaryCategories");e&&(this.temporaryCategories=JSON.parse(e))},addCategory(){if(""===this.newCategory.trim())return this.errorMessage="Bitte einen Namen für die Kategorie eingeben.",void this.clearMessages();const e=this.newCategory.trim().toLowerCase(),t=this.allCategories.some((t=>t.toLowerCase()===e));if(t)return this.errorMessage="Diese Kategorie existiert bereits!",void this.clearMessages();this.temporaryCategories.push(this.newCategory),localStorage.setItem("temporaryCategories",JSON.stringify(this.temporaryCategories)),this.newCategory="",this.showAddCategoryForm=!1,this.successMessage="Kategorie erfolgreich hinzugefügt!",this.clearMessages()},selectCategory(e){this.selectedCategory=e,(0,r.dY)((()=>{this.$refs.questionForm&&this.$refs.questionForm.scrollIntoView({behavior:"smooth"})}))},isTemporaryCategory(e){return this.temporaryCategories.includes(e)},deleteCategory(e){this.isTemporaryCategory(e)&&(this.temporaryCategories=this.temporaryCategories.filter((t=>t!==e)),localStorage.setItem("temporaryCategories",JSON.stringify(this.temporaryCategories)),this.successMessage="Kategorie wurde gelöscht.",this.clearMessages())},async submitQuestion(){if(""===this.newQuestion.trim()||this.options.some((e=>""===e.trim()))||null===this.correctAnswer)return this.errorMessage="Bitte füllen Sie alle Felder aus.",void this.clearMessages();const e={question:this.newQuestion,options:[...this.options],answer:this.correctAnswer,category:this.selectedCategory};try{await u.A.post("https://quizapplication-production-ff18.up.railway.app/api/questions",e),this.successMessage="Frage erfolgreich hinzugefügt!",this.newQuestion="",this.options=["","","",""],this.correctAnswer=null}catch(t){this.errorMessage="Es gab ein Problem beim Hinzufügen der Frage.",this.clearMessages()}},clearMessages(){setTimeout((()=>{this.successMessage="",this.errorMessage=""}),5e3)}}};const Me=(0,d.A)(Te,[["render",Ie],["__scopeId","data-v-5a4ea6d6"]]);var Pe=Me;const Re={key:0},xe={class:"overview buttons"},Ue=["onClick"],$e={key:2},We={key:0},De={key:1},Oe={key:3,class:"quiz-form"},Ne={key:0},je={key:1,class:"options"},Be=["onClick"],Je={key:4},Ve={key:5},He={class:"options"},Ze=["onClick"],Ge={key:6},Ye={key:4},et={key:0,style:{color:"green"}},tt={key:1,style:{color:"red"}};function st(e,t,s,o,a,i){const l=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.bF)(l,{to:"/home",class:"exit button"},{default:(0,r.k6)((()=>t[3]||(t[3]=[(0,r.eW)("Zurück zum Dashboard")]))),_:1}),t[11]||(t[11]=(0,r.Lk)("h1",null,"Multiplayer-Quiz",-1)),o.selectedCategory?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",Re,[t[4]||(t[4]=(0,r.Lk)("p",null,"Wähle eine Kategorie aus, um das Quiz zu starten",-1)),(0,r.Lk)("div",xe,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.categories,(e=>((0,r.uX)(),(0,r.CE)("button",{key:e,class:(0,n.C4)(["category",{selected:o.selectedCategory===e}]),onClick:t=>o.selectCategory(e)},(0,n.v_)(e),11,Ue)))),128))])])),!o.lobby&&o.selectedCategory?((0,r.uX)(),(0,r.CE)("button",{key:1,onClick:t[0]||(t[0]=(...e)=>o.joinLobby&&o.joinLobby(...e)),class:"quiz-start"},"Quiz starten")):(0,r.Q3)("",!0),o.lobby&&!o.quizCompleted?((0,r.uX)(),(0,r.CE)("div",$e,[(0,r.Lk)("p",null,"Lobby-ID: "+(0,n.v_)(o.lobby.id),1),(0,r.Lk)("p",null,"Spieler in der Lobby: "+(0,n.v_)(o.lobby.players.length)+" / 2",1),o.lobby.players.length<2?((0,r.uX)(),(0,r.CE)("div",We,t[5]||(t[5]=[(0,r.Lk)("p",null,"Warten auf weiteren Spieler...",-1)]))):((0,r.uX)(),(0,r.CE)("div",De,t[6]||(t[6]=[(0,r.Lk)("p",null,"Das Quiz startet jetzt!",-1)])))])):(0,r.Q3)("",!0),o.quizStarted&&!o.quizCompleted?((0,r.uX)(),(0,r.CE)("div",Oe,[o.playerFinishedMessage?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("h2",Ne,(0,n.v_)(o.currentQuestion.question),1)),o.playerFinishedMessage?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("div",je,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.currentQuestion.options,((e,t)=>((0,r.uX)(),(0,r.CE)("button",{key:t,onClick:e=>o.sendAnswer(t),class:(0,n.C4)([void 0!==o.currentQuestion.selected&&t===o.currentQuestion.correct?"correct":"",void 0!==o.currentQuestion.selected&&t===o.currentQuestion.selected&&t!==o.currentQuestion.correct?"wrong":"",void 0!==o.currentQuestion.selected?"disabled":""])},(0,n.v_)(e),11,Be)))),128))])),!o.quizStarted||o.hasAnswered||o.playerFinishedMessage?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("button",{key:2,onClick:t[1]||(t[1]=(...e)=>o.sendQuestionToTeammate&&o.sendQuestionToTeammate(...e))}," Frage an Mitspieler senden ")),o.hasAnswered?((0,r.uX)(),(0,r.CE)("button",{key:3,onClick:t[2]||(t[2]=(...e)=>o.requestNextQuestion&&o.requestNextQuestion(...e))}," Nächste Frage ")):(0,r.Q3)("",!0),o.playerFinishedMessage?((0,r.uX)(),(0,r.CE)("div",Je,[(0,r.Lk)("h3",null,(0,n.v_)(o.playerFinishedMessage),1)])):(0,r.Q3)("",!0),o.receivedQuestion?((0,r.uX)(),(0,r.CE)("div",Ve,[t[7]||(t[7]=(0,r.Lk)("h2",null,"Frage von deinem Mitspieler:",-1)),(0,r.Lk)("h3",null,(0,n.v_)(o.receivedQuestion.question),1),(0,r.Lk)("div",He,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.receivedQuestion.options,((e,t)=>((0,r.uX)(),(0,r.CE)("button",{key:t,onClick:e=>o.sendReceivedAnswer(t)},(0,n.v_)(e),9,Ze)))),128))])])):(0,r.Q3)("",!0),o.answerFeedback?((0,r.uX)(),(0,r.CE)("p",Ge,(0,n.v_)(o.answerFeedback),1)):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0),o.gameOver?((0,r.uX)(),(0,r.CE)("div",Ye,[t[9]||(t[9]=(0,r.Lk)("h3",null,"Herzlichen Glückwunsch!",-1)),(0,r.Lk)("p",null,[(0,r.eW)(" Ihr habt das Spiel beendet! Dein Score: "+(0,n.v_)(o.score)+" ",1),t[8]||(t[8]=(0,r.Lk)("br",null,null,-1)),(0,r.eW)(" Euer gemeinsamer Team-Score: "+(0,n.v_)(o.teamScore),1)]),t[10]||(t[10]=(0,r.Lk)("h2",null,"Übersicht der gestellten Fragen",-1)),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.answeredQuestions,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:"answered-questions",key:t},[(0,r.Lk)("h3",null,"Frage "+(0,n.v_)(t+1)+": "+(0,n.v_)(e.question),1),(0,r.Lk)("ul",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e.options,((t,s)=>((0,r.uX)(),(0,r.CE)("li",{key:s,style:(0,n.Tr)({color:s===e.correct?"green":"black",fontWeight:s===e.correct||s===e.selected?"bold":"normal"})},[(0,r.eW)((0,n.v_)(t)+" ",1),s===e.correct?((0,r.uX)(),(0,r.CE)("span",et,"✔️")):(0,r.Q3)("",!0),s===e.selected&&s!==e.correct?((0,r.uX)(),(0,r.CE)("span",tt,"❌")):(0,r.Q3)("",!0)],4)))),128))])])))),128))])):(0,r.Q3)("",!0)])}var ot={setup(){const e=(0,B.KR)([]),t=(0,B.KR)(null),s=(0,B.KR)(!1),o=(0,B.KR)(null),r=(0,B.KR)(!1),n=(0,B.KR)({}),a=(0,B.KR)(""),i=(0,B.KR)(0),l=(0,B.KR)(!1),c=(0,B.KR)(0),d=(0,B.KR)(null),p=(0,B.KR)(!1),g=(0,B.KR)([]),h=(0,B.KR)([]),m=(0,B.KR)(null),k=async()=>{try{const t=await u.A.get("https://quizapplication-production-ff18.up.railway.app/api/categories");e.value=t.data.map((e=>e.category))}catch(t){console.error("Fehler beim Abrufen der Kategorien:",t)}},v=e=>{t.value=e},y=()=>{t.value&&(console.log("Joining lobby for category:",t.value),Ct.emit("joinLobby",{category:t.value}))},b=()=>{s.value=!1,a.value="",Ct.emit("requestNextQuestion",o.value.id)},f=e=>{s.value||(n.value.selected=e,Ct.emit("answerQuestion",{lobbyId:o.value.id,answer:e}),h.value.push({question:n.value.question,options:n.value.options,correct:n.value.correct,selected:e,playerId:Ct.id}),s.value=!0)},C=e=>{d.value&&(Ct.emit("answerQuestion",{lobbyId:o.value.id,answer:e}),d.value=null)};Ct.on("lobbyUpdate",(e=>{o.value=e})),Ct.on("startQuiz",(()=>{r.value=!0,Ct.emit("requestFirstQuestion",o.value.id)})),Ct.on("newQuestion",(e=>{n.value={question:e.question,options:e.options,correct:e.correct},g.value.push(n.value),a.value="",s.value=!1}));const L=()=>{Ct.emit("sendQuestionToTeammate",{lobbyId:o.value.id,question:n.value})};Ct.on("receiveQuestionFromTeammate",(e=>{d.value=e})),Ct.on("answerFeedback",(e=>{a.value=e.message,e.correct&&(i.value+=1)})),Ct.on("playerFinished",(e=>{m.value=e.message})),Ct.on("gameOver",(e=>{l.value=!0,c.value=e.teamScore,w(),p.value=!0}));const w=async()=>{try{const e=sessionStorage.getItem("username");if(!e)return void console.error("Kein Benutzername gefunden");const t=await u.A.put("https://quizapplication-production-ff18.up.railway.app/api/leaderboard",{username:e,score:i.value});console.log("Punktestand gespeichert:",t.data)}catch(e){console.error("Fehler beim Speichern des Punktestands:",e)}};return k(),{categories:e,selectedCategory:t,hasAnswered:s,lobby:o,quizStarted:r,currentQuestion:n,sendAnswer:f,answerFeedback:a,score:i,teamScore:c,gameOver:l,selectCategory:v,joinLobby:y,sendQuestionToTeammate:L,receivedQuestion:d,sendReceivedAnswer:C,requestNextQuestion:b,quizCompleted:p,askedQuestions:g,answeredQuestions:h,playerFinishedMessage:m}}};const rt=(0,d.A)(ot,[["render",st],["__scopeId","data-v-116e24a3"]]);var nt=rt;const at={class:"overview buttons"},it=["onClick"];function lt(e,t,s,o,a,i){const l=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",null,[(0,r.bF)(l,{to:"/home",class:"exit button"},{default:(0,r.k6)((()=>t[0]||(t[0]=[(0,r.eW)("Zurück zum Dashboard")]))),_:1}),t[1]||(t[1]=(0,r.Lk)("p",null," Wähle eine Kategorie aus um das Quiz zu starten",-1)),(0,r.Lk)("div",at,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(a.categories,(e=>((0,r.uX)(),(0,r.CE)("button",{key:e,class:"category",onClick:t=>i.goToQuiz(e)},(0,n.v_)(e),9,it)))),128))])])}var ut={data(){return{categories:[]}},async mounted(){await this.fetchCategories()},methods:{goToQuiz(e){this.$router.push({name:"quiz",query:{category:e}})},async fetchCategories(){try{const e=await u.A.get("https://quizapplication-production-ff18.up.railway.app/api/categories");this.categories=e.data.map((e=>e.category)),console.log(this.categories)}catch(e){console.error("Fehler beim Abrufen der Kategorien:",e)}}}};const ct=(0,d.A)(ut,[["render",lt],["__scopeId","data-v-136ac33c"]]);var dt=ct;const pt=[{path:"/",name:"login",component:j},{path:"/register",name:"register",component:R},{path:"/home",name:"home",component:_,meta:{requiresAuth:!0}},{path:"/quiz",name:"quiz",component:ue,meta:{requiresAuth:!0}},{path:"/categories",name:"categories",component:dt,meta:{requiresAuth:!0}},{path:"/leaderboard",name:"leaderboard",component:ge,meta:{requiresAuth:!0}},{path:"/profile",name:"profile",component:ve,meta:{requiresAuth:!0}},{path:"/questions",name:"questions",component:Pe,meta:{requiresAuth:!0}},{path:"/multiplayer",name:"multiplayer",component:nt,meta:{requiresAuth:!0}}],gt=(0,h.aE)({history:(0,h.LA)("/"),routes:pt});gt.beforeEach(((e,t,s)=>{const o=!!sessionStorage.getItem("token");e.meta.requiresAuth&&!o?s("/"):s()}));var ht=gt,mt=s(782),kt=s(5131);const vt=()=>({token:"",user:{}});var yt=(0,mt.y$)({strict:!0,plugins:[(0,kt.A)()],state:vt(),getters:{isLoggedIn:e=>e.token,getUser:e=>e.user},mutations:{SET_TOKEN:(e,t)=>{e.token=t},SET_USER:(e,t)=>{e.user=t},RESET:e=>{Object.assign(e,vt())}},actions:{login:({commit:e},{token:t,user:s})=>{e("SET_TOKEN",t),e("SET_USER",s),u.A.defaults.headers.common["Authorization"]=`Bearer ${t}`},logout:({commit:e})=>{e("RESET","")}}}),bt=s(1714);const ft=(0,o.Ef)(g);u.A.defaults.headers.common["Authorization"]=`Bearer ${yt.state.token}`,u.A.defaults.baseURL="https://quizapplication-production-ff18.up.railway.app/api",ft.config.globalProperties.$axios=u.A;const Ct=(0,bt.io)("https://quizapplication-production-ff18.up.railway.app",{transports:["websocket"],withCredentials:!0});ft.config.globalProperties.$socket=Ct,ft.use(ht),ft.use(yt),ft.mount("#app")}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,s),n.exports}s.m=e,function(){var e=[];s.O=function(t,o,r,n){if(!o){var a=1/0;for(c=0;c<e.length;c++){o=e[c][0],r=e[c][1],n=e[c][2];for(var i=!0,l=0;l<o.length;l++)(!1&n||a>=n)&&Object.keys(s.O).every((function(e){return s.O[e](o[l])}))?o.splice(l--,1):(i=!1,n<a&&(a=n));if(i){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[o,r,n]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};s.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,a=o[0],i=o[1],l=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var c=l(s)}for(t&&t(o);u<a.length;u++)n=a[u],s.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return s.O(c)},o=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=s.O(void 0,[504],(function(){return s(5495)}));o=s.O(o)})();
//# sourceMappingURL=app.4e4c5cef.js.map