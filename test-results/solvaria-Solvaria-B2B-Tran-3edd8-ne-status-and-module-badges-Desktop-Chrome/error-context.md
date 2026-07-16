# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: solvaria.spec.ts >> Solvaria B2B Transformation E2E Tests >> CARPASS development pipeline status and module badges
- Location: tests/solvaria.spec.ts:75:7

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /Solvaria Ürün Laboratuvarı|Solvaria Product Lab|Solvaria Produktlabor/i
Received string:  "(self.__next_f=self.__next_f||[]).push([0])self.__next_f.push([1,\"1:\\\"$Sreact.fragment\\\"\\n2:I[17139,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"LanguageProvider\\\"]\\n3:I[37263,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"ActiveProjectProvider\\\"]\\n4:I[66941,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"default\\\"]\\n5:I[39756,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"default\\\"]\\n6:I[98168,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\",\\\"/_next/static/chunks/3fxbbfmh67msj.js\\\",\\\"/_next/static/chunks/419nwfw2xdjw_.js\\\"],\\\"default\\\"]\\n7:I[37457,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"default\\\"]\\n8:I[56691,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"default\\\"]\\n9:I[43880,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"Analytics\\\"]\\ne:I[68027,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"default\\\",1]\\n:HL[\\\"/_next/static/chunks/3dq7om10gc6po.css\\\",\\\"style\\\"]\\n:HL[\\\"/_next/static/media/2fe89d53234c61d4-s.p.1u30mmyq6lnsd.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/651aaf1801011892-s.p.357dd_6abeqge.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/68757d6cddeff913-s.p.1i-sca43-qwng.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/75affa71d1e2f6a7-s.p.17-aodiw50953.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/99e609270109b47d-s.p.40sczeszzbjw1.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/c7f47671e39f7787-s.p.0klc_mi0-5f4_.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/effe91970fc4db64-s.p.0oace-s_gkfks.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n:HL[\\\"/_next/static/media/f06bf9da926bae75-s.p.2874ccu1_u7jf.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n\"])self.__next_f.push([1,\"0:{\\\"P\\\":null,\\\"c\\\":[\\\"\\\",\\\"projeler\\\",\\\"carpass\\\"],\\\"q\\\":\\\"\\\",\\\"i\\\":false,\\\"f\\\":[[[\\\"\\\",{\\\"children\\\":[\\\"projeler\\\",{\\\"children\\\":[[\\\"slug\\\",\\\"carpass\\\",\\\"d\\\",null],{\\\"children\\\":[\\\"__PAGE__\\\",{}]}]}]},\\\"$undefined\\\",\\\"$undefined\\\",16],[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[[[\\\"$\\\",\\\"link\\\",\\\"0\\\",{\\\"rel\\\":\\\"stylesheet\\\",\\\"href\\\":\\\"/_next/static/chunks/3dq7om10gc6po.css\\\",\\\"precedence\\\":\\\"next\\\",\\\"crossOrigin\\\":\\\"$undefined\\\",\\\"nonce\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"script\\\",\\\"script-2\\\",{\\\"src\\\":\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}]],[\\\"$\\\",\\\"html\\\",null,{\\\"lang\\\":\\\"tr\\\",\\\"className\\\":\\\"archivo_c21c35f2-module__97MDiG__variable instrument_sans_a7f11f48-module__WEtACW__variable ibm_plex_mono_dc9b4df7-module__3sIfPG__variable h-full antialiased\\\",\\\"children\\\":[[\\\"$\\\",\\\"head\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"script\\\",null,{\\\"type\\\":\\\"application/ld+json\\\",\\\"dangerouslySetInnerHTML\\\":{\\\"__html\\\":\\\"{\\\\\\\"@context\\\\\\\":\\\\\\\"https://schema.org\\\\\\\",\\\\\\\"@graph\\\\\\\":[{\\\\\\\"@type\\\\\\\":\\\\\\\"Organization\\\\\\\",\\\\\\\"@id\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/#organization\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"Solvaria\\\\\\\",\\\\\\\"url\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app\\\\\\\",\\\\\\\"logo\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/logo.png\\\\\\\",\\\\\\\"sameAs\\\\\\\":[\\\\\\\"https://github.com/mertalban\\\\\\\",\\\\\\\"https://linkedin.com/in/mertalban\\\\\\\"]},{\\\\\\\"@type\\\\\\\":\\\\\\\"Person\\\\\\\",\\\\\\\"@id\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/#person\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"Mert Alban\\\\\\\",\\\\\\\"jobTitle\\\\\\\":\\\\\\\"Founder \\u0026 Lead Software Engineer\\\\\\\",\\\\\\\"worksFor\\\\\\\":{\\\\\\\"@id\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/#organization\\\\\\\"},\\\\\\\"url\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app\\\\\\\",\\\\\\\"sameAs\\\\\\\":[\\\\\\\"https://github.com/mertalban\\\\\\\",\\\\\\\"https://linkedin.com/in/mertalban\\\\\\\"]},{\\\\\\\"@type\\\\\\\":\\\\\\\"WebSite\\\\\\\",\\\\\\\"@id\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/#website\\\\\\\",\\\\\\\"url\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"Solvaria\\\\\\\",\\\\\\\"publisher\\\\\\\":{\\\\\\\"@id\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/#organization\\\\\\\"}}]}\\\"}}]}],[\\\"$\\\",\\\"body\\\",null,{\\\"className\\\":\\\"min-h-full flex flex-col\\\",\\\"children\\\":[\\\"$\\\",\\\"$L2\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$L3\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"$L4\\\",null,{}],[\\\"$\\\",\\\"$L5\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$undefined\\\",\\\"errorStyles\\\":\\\"$undefined\\\",\\\"errorScripts\\\":\\\"$undefined\\\",\\\"template\\\":[\\\"$\\\",\\\"$L6\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$L7\\\",null,{}]}],\\\"templateStyles\\\":[],\\\"templateScripts\\\":[[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/3fxbbfmh67msj.js\\\",\\\"async\\\":true}],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/419nwfw2xdjw_.js\\\",\\\"async\\\":true}]],\\\"notFound\\\":[[[\\\"$\\\",\\\"title\\\",null,{\\\"children\\\":\\\"404: This page could not be found.\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"style\\\":{\\\"fontFamily\\\":\\\"system-ui,\\\\\\\"Segoe UI\\\\\\\",Roboto,Helvetica,Arial,sans-serif,\\\\\\\"Apple Color Emoji\\\\\\\",\\\\\\\"Segoe UI Emoji\\\\\\\"\\\",\\\"height\\\":\\\"100vh\\\",\\\"textAlign\\\":\\\"center\\\",\\\"display\\\":\\\"flex\\\",\\\"flexDirection\\\":\\\"column\\\",\\\"alignItems\\\":\\\"center\\\",\\\"justifyContent\\\":\\\"center\\\"},\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"style\\\",null,{\\\"dangerouslySetInnerHTML\\\":{\\\"__html\\\":\\\"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}\\\"}}],[\\\"$\\\",\\\"h1\\\",null,{\\\"className\\\":\\\"next-error-h1\\\",\\\"style\\\":{\\\"display\\\":\\\"inline-block\\\",\\\"margin\\\":\\\"0 20px 0 0\\\",\\\"padding\\\":\\\"0 23px 0 0\\\",\\\"fontSize\\\":24,\\\"fontWeight\\\":500,\\\"verticalAlign\\\":\\\"top\\\",\\\"lineHeight\\\":\\\"49px\\\"},\\\"children\\\":404}],[\\\"$\\\",\\\"div\\\",null,{\\\"style\\\":{\\\"display\\\":\\\"inline-block\\\"},\\\"children\\\":[\\\"$\\\",\\\"h2\\\",null,{\\\"style\\\":{\\\"fontSize\\\":14,\\\"fontWeight\\\":400,\\\"lineHeight\\\":\\\"49px\\\",\\\"margin\\\":0},\\\"children\\\":\\\"This page could not be found.\\\"}]}]]}]}]],[]],\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"$L8\\\",null,{}],[\\\"$\\\",\\\"$L9\\\",null,{}]]}]}]}]]}]]}],{\\\"children\\\":[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[null,[\\\"$\\\",\\\"$L5\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$undefined\\\",\\\"errorStyles\\\":\\\"$undefined\\\",\\\"errorScripts\\\":\\\"$undefined\\\",\\\"template\\\":[\\\"$\\\",\\\"$L7\\\",null,{}],\\\"templateStyles\\\":\\\"$undefined\\\",\\\"templateScripts\\\":\\\"$undefined\\\",\\\"notFound\\\":\\\"$undefined\\\",\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\"}]]}],{\\\"children\\\":[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[null,[\\\"$\\\",\\\"$L5\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$undefined\\\",\\\"errorStyles\\\":\\\"$undefined\\\",\\\"errorScripts\\\":\\\"$undefined\\\",\\\"template\\\":[\\\"$\\\",\\\"$L7\\\",null,{}],\\\"templateStyles\\\":\\\"$undefined\\\",\\\"templateScripts\\\":\\\"$undefined\\\",\\\"notFound\\\":\\\"$undefined\\\",\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\"}]]}],{\\\"children\\\":[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[\\\"$La\\\",[[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/3gs1rc7pwtuht.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/419nwfw2xdjw_.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}]],\\\"$Lb\\\"]}],{},null,false,null]},null,false,\\\"$@c\\\"]},null,false,\\\"$@c\\\"]},null,false,null],\\\"$Ld\\\",false]],\\\"m\\\":\\\"$undefined\\\",\\\"G\\\":[\\\"$e\\\",[\\\"$Lf\\\"]],\\\"S\\\":true,\\\"h\\\":null,\\\"s\\\":\\\"$undefined\\\",\\\"l\\\":\\\"$undefined\\\",\\\"p\\\":\\\"$undefined\\\",\\\"d\\\":\\\"$undefined\\\",\\\"b\\\":\\\"9Kf-Je3ZBcGW_PUJkFPbI\\\"}\\n\"])self.__next_f.push([1,\"10:I[97367,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"OutletBoundary\\\"]\\n11:\\\"$Sreact.suspense\\\"\\n14:I[97367,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"ViewportBoundary\\\"]\\n16:I[97367,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"MetadataBoundary\\\"]\\nb:[\\\"$\\\",\\\"$L10\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$11\\\",null,{\\\"name\\\":\\\"Next.MetadataOutlet\\\",\\\"children\\\":\\\"$@12\\\"}]}]\\n13:[]\\nc:\\\"$W13\\\"\\nd:[\\\"$\\\",\\\"$1\\\",\\\"h\\\",{\\\"children\\\":[null,[\\\"$\\\",\\\"$L14\\\",null,{\\\"children\\\":\\\"$L15\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"hidden\\\":true,\\\"children\\\":[\\\"$\\\",\\\"$L16\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$11\\\",null,{\\\"name\\\":\\\"Next.Metadata\\\",\\\"children\\\":\\\"$L17\\\"}]}]}],[\\\"$\\\",\\\"meta\\\",null,{\\\"name\\\":\\\"next-size-adjust\\\",\\\"content\\\":\\\"\\\"}]]}]\\nf:[\\\"$\\\",\\\"link\\\",\\\"0\\\",{\\\"rel\\\":\\\"stylesheet\\\",\\\"href\\\":\\\"/_next/static/chunks/3dq7om10gc6po.css\\\",\\\"precedence\\\":\\\"next\\\",\\\"crossOrigin\\\":\\\"$undefined\\\",\\\"nonce\\\":\\\"$undefined\\\"}]\\n\"])self.__next_f.push([1,\"18:I[5205,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\",\\\"/_next/static/chunks/3gs1rc7pwtuht.js\\\",\\\"/_next/static/chunks/419nwfw2xdjw_.js\\\"],\\\"default\\\"]\\na:[[\\\"$\\\",\\\"script\\\",null,{\\\"type\\\":\\\"application/ld+json\\\",\\\"dangerouslySetInnerHTML\\\":{\\\"__html\\\":\\\"{\\\\\\\"@context\\\\\\\":\\\\\\\"https://schema.org\\\\\\\",\\\\\\\"@graph\\\\\\\":[{\\\\\\\"@type\\\\\\\":\\\\\\\"BreadcrumbList\\\\\\\",\\\\\\\"itemListElement\\\\\\\":[{\\\\\\\"@type\\\\\\\":\\\\\\\"ListItem\\\\\\\",\\\\\\\"position\\\\\\\":1,\\\\\\\"name\\\\\\\":\\\\\\\"Ana Sayfa\\\\\\\",\\\\\\\"item\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app\\\\\\\"},{\\\\\\\"@type\\\\\\\":\\\\\\\"ListItem\\\\\\\",\\\\\\\"position\\\\\\\":2,\\\\\\\"name\\\\\\\":\\\\\\\"Projeler\\\\\\\",\\\\\\\"item\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/projeler\\\\\\\"},{\\\\\\\"@type\\\\\\\":\\\\\\\"ListItem\\\\\\\",\\\\\\\"position\\\\\\\":3,\\\\\\\"name\\\\\\\":\\\\\\\"CARPASS\\\\\\\",\\\\\\\"item\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app/projeler/carpass\\\\\\\"}]},{\\\\\\\"@type\\\\\\\":\\\\\\\"SoftwareApplication\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"CARPASS\\\\\\\",\\\\\\\"operatingSystem\\\\\\\":\\\\\\\"Web Cloud\\\\\\\",\\\\\\\"applicationCategory\\\\\\\":\\\\\\\"BusinessApplication\\\\\\\",\\\\\\\"description\\\\\\\":\\\\\\\"İkinci el araç alımında güvenilir bir kaynak eksikliğini gidermek için araç geçmişini toplayıp yapay zeka ile yorumlayan ve kullanıcıya risk skoru ile Trust Report sunan SaaS platform mimarisi tasarlandı ve geliştirme süreci devam ediyor.\\\\\\\",\\\\\\\"publisher\\\\\\\":{\\\\\\\"@type\\\\\\\":\\\\\\\"Organization\\\\\\\",\\\\\\\"name\\\\\\\":\\\\\\\"Solvaria\\\\\\\",\\\\\\\"url\\\\\\\":\\\\\\\"https://personal-brand-site-azure.vercel.app\\\\\\\"}}]}\\\"}}],[\\\"$\\\",\\\"$L18\\\",null,{\\\"slug\\\":\\\"carpass\\\"}]]\\n\"])self.__next_f.push([1,\"15:[[\\\"$\\\",\\\"meta\\\",\\\"0\\\",{\\\"charSet\\\":\\\"utf-8\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"viewport\\\",\\\"content\\\":\\\"width=device-width, initial-scale=1\\\"}]]\\n\"])self.__next_f.push([1,\"19:I[27201,[\\\"/_next/static/chunks/2d70fhvxcii-i.js\\\",\\\"/_next/static/chunks/14mrh2-p_w84d.js\\\",\\\"/_next/static/chunks/3wwjbua7ho-cl.js\\\"],\\\"IconMark\\\"]\\n12:null\\n\"])self.__next_f.push([1,\"17:[[\\\"$\\\",\\\"title\\\",\\\"0\\\",{\\\"children\\\":\\\"CARPASS — Geliştirme Aşamasındaki Ürün | Solvaria\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"description\\\",\\\"content\\\":\\\"İkinci el araç alımında güvenilir bir kaynak eksikliğini gidermek için araç geçmişini toplayıp yapay zeka ile yorumlayan ve kullanıcıya risk skoru ile Trust Report sunan SaaS platform mimarisi tasarlandı ve geliştirme süreci devam ediyor.\\\"}],[\\\"$\\\",\\\"link\\\",\\\"2\\\",{\\\"rel\\\":\\\"canonical\\\",\\\"href\\\":\\\"https://personal-brand-site-azure.vercel.app/projeler/carpass\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"3\\\",{\\\"property\\\":\\\"og:title\\\",\\\"content\\\":\\\"Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"4\\\",{\\\"property\\\":\\\"og:description\\\",\\\"content\\\":\\\"Kurumsal web sitelerinden iş takip sistemlerine, web uygulamalarından SaaS altyapısına kadar işletmenize özel dijital çözümler geliştiriyoruz.\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"5\\\",{\\\"property\\\":\\\"og:url\\\",\\\"content\\\":\\\"https://personal-brand-site-azure.vercel.app\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"6\\\",{\\\"property\\\":\\\"og:locale\\\",\\\"content\\\":\\\"tr_TR\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"7\\\",{\\\"property\\\":\\\"og:type\\\",\\\"content\\\":\\\"website\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"8\\\",{\\\"name\\\":\\\"twitter:card\\\",\\\"content\\\":\\\"summary\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"9\\\",{\\\"name\\\":\\\"twitter:title\\\",\\\"content\\\":\\\"Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"10\\\",{\\\"name\\\":\\\"twitter:description\\\",\\\"content\\\":\\\"Kurumsal web sitelerinden iş takip sistemlerine, web uygulamalarından SaaS altyapısına kadar işletmenize özel dijital çözümler geliştiriyoruz.\\\"}],[\\\"$\\\",\\\"link\\\",\\\"11\\\",{\\\"rel\\\":\\\"icon\\\",\\\"href\\\":\\\"/favicon.ico?favicon.2vob68tjqpejf.ico\\\",\\\"sizes\\\":\\\"256x256\\\",\\\"type\\\":\\\"image/x-icon\\\"}],[\\\"$\\\",\\\"$L19\\\",\\\"12\\\",{}]]\\n\"]){\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Ana Sayfa\",\"item\":\"https://personal-brand-site-azure.vercel.app\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Projeler\",\"item\":\"https://personal-brand-site-azure.vercel.app/projeler\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"CARPASS\",\"item\":\"https://personal-brand-site-azure.vercel.app/projeler/carpass\"}]},{\"@type\":\"SoftwareApplication\",\"name\":\"CARPASS\",\"operatingSystem\":\"Web Cloud\",\"applicationCategory\":\"BusinessApplication\",\"description\":\"İkinci el araç alımında güvenilir bir kaynak eksikliğini gidermek için araç geçmişini toplayıp yapay zeka ile yorumlayan ve kullanıcıya risk skoru ile Trust Report sunan SaaS platform mimarisi tasarlandı ve geliştirme süreci devam ediyor.\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"Solvaria\",\"url\":\"https://personal-brand-site-azure.vercel.app\"}}]}SOLVARIAdijital çözümler & sistemlerSolutionsProjectsPartnershipStudioenDiscuss ProjectenDiscuss ProjectHome/Projects/CARPASSProduct Development LabGeliştirme AşamasındaCARPASSVehicle history and AI-driven risk analysis platformTechnologiesReact NativeSupabasen8nAI AgentsInitial ProblemLack of a reliable, centralized, and transparent history source for used vehicles.VISUAL PROTOTYPESystem Interface & Flow DesignA working prototype of the operational interface structure built from scratch and put into production based on the company's needs.Mockup GridProject SummaryTo address the lack of a reliable source in used vehicle purchases, a SaaS platform architecture was designed to collect vehicle history, interpret it with AI, and present a Risk Score and Trust Report to the user.Target UserUsed car buyers and dealers needing reliable vehicle history; individuals and corporate buyersSolution ApproachA SaaS platform aggregating vehicle data and converting it into a risk score via AI.System ModulesTrust Report & Risk ScoreAI-backed risk analysisDamage and inspection data interpretationClean report presentation to the userSaaS & Billing InfrastructureFreemium plan managementPayment and invoicing systemUsage limits trackingn8n Automation FlowsData aggregation automationsReport generation triggersError handling and loggingMobile & Web InterfaceReact Native mobile appResponsive web portalUser management panelUser Journey1User enters plate number to start query2n8n workflow aggregates vehicle data from sources3AI model calculates risk score4Trust Report is presented to the user5Premium user accesses full report details6Subscription management handled via user panelOutcomesReliable risk analysis provided to used car buyers in secondsRecurring subscription revenue model for the platform ownerSustainable product built on a scalable SaaS infrastructureLessons LearnedIterative testing was crucial for consistent AI prompt outputsCorrect setup of multi-tenant data isolation early accelerated later developmentFuture PlansDealer API integrationComparative vehicle analysisWhite-label licensing models03 — Case Studies & ReferencesWhat else have we developed?StockAppInventory, finance, and receivables tracking systemReview Hezer Auto ServiceVehicle intake, repair, and auto service operations systemReview SaaS InfrastructuresSubscription-ready multi-tenant software architectureReview Solvaria Personal Brand SiteMulti-page website for personal branding and studio positioningReview Product Idea?Let's discuss your product idea or platform.Let's plan the technical stack and MVP steps for your SaaS project.Let's Discuss Your Product IdeaAll ProjectsSOLVARIAWe develop premium custom digital operation systems and SaaS infrastructures that consolidate business processes scattered across notebooks, Excel, and WhatsApp into a single center.mertalbaan@gmail.comChat on WhatsAppIzmir, Türkiye · Remote collaboration worldwideSystem SolutionsJob Tracking SystemsInventory & AccountsOperational AutomationSaaS Product FoundationStudioStudioProjectsEngagement ProcessPartnershipContact© 2026 Solvaria. All rights reserved.PrivacyTerms of UseDigital Operation Systems · Izmir, Türkiye · Remote collaboration worldwide"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - main [ref=e25]:
    - navigation [ref=e27]:
      - link "SOLVARIA dijital çözümler & sistemler" [ref=e28] [cursor=pointer]:
        - /url: /
        - generic [ref=e29]: SOLVARIA
        - generic [ref=e30]: dijital çözümler & sistemler
      - generic [ref=e31]:
        - button "Solutions" [ref=e33]:
          - text: Solutions
          - img [ref=e34]
        - link "Projects" [ref=e36] [cursor=pointer]:
          - /url: /projeler
        - link "Partnership" [ref=e37] [cursor=pointer]:
          - /url: /is-birligi
        - button "Studio" [ref=e39]:
          - text: Studio
          - img [ref=e40]
        - button "en" [ref=e43]:
          - text: en
          - img [ref=e44]
        - link "Discuss Project" [ref=e46] [cursor=pointer]:
          - /url: /iletisim
    - generic [ref=e49]:
      - navigation "Breadcrumb" [ref=e50]:
        - list [ref=e51]:
          - listitem [ref=e52]:
            - link "Home" [ref=e53] [cursor=pointer]:
              - /url: /
          - listitem [ref=e54]:
            - generic [ref=e55]: /
            - link "Projects" [ref=e56] [cursor=pointer]:
              - /url: /projeler
          - listitem [ref=e57]:
            - generic [ref=e58]: /
            - generic [ref=e59]: CARPASS
      - generic [ref=e60]:
        - paragraph [ref=e61]: Product Development Lab
        - generic [ref=e62]: Geliştirme Aşamasında
      - heading "CARPASS" [level=1] [ref=e63]
      - paragraph [ref=e64]: Vehicle history and AI-driven risk analysis platform
      - generic [ref=e65]:
        - paragraph [ref=e66]: Technologies
        - generic [ref=e67]:
          - generic [ref=e68]: React Native
          - generic [ref=e69]: Supabase
          - generic [ref=e70]: n8n
          - generic [ref=e71]: AI Agents
      - generic [ref=e72]:
        - paragraph [ref=e73]: Initial Problem
        - paragraph [ref=e74]: Lack of a reliable, centralized, and transparent history source for used vehicles.
    - generic [ref=e77]:
      - generic [ref=e78]:
        - generic [ref=e79]: VISUAL PROTOTYPE
        - heading "System Interface & Flow Design" [level=2] [ref=e80]
        - paragraph [ref=e81]: A working prototype of the operational interface structure built from scratch and put into production based on the company's needs.
      - generic [ref=e83]: Mockup Grid
    - generic [ref=e88]:
      - generic [ref=e89]:
        - heading "Project Summary" [level=2] [ref=e90]
        - paragraph [ref=e91]: To address the lack of a reliable source in used vehicle purchases, a SaaS platform architecture was designed to collect vehicle history, interpret it with AI, and present a Risk Score and Trust Report to the user.
      - generic [ref=e92]:
        - heading "Target User" [level=2] [ref=e93]
        - paragraph [ref=e94]: Used car buyers and dealers needing reliable vehicle history; individuals and corporate buyers
    - generic [ref=e96]:
      - heading "Solution Approach" [level=2] [ref=e97]
      - paragraph [ref=e98]: A SaaS platform aggregating vehicle data and converting it into a risk score via AI.
    - generic [ref=e100]:
      - heading "System Modules" [level=2] [ref=e101]
      - generic [ref=e102]:
        - generic [ref=e103]:
          - heading "Trust Report & Risk Score" [level=3] [ref=e104]
          - list [ref=e105]:
            - listitem [ref=e106]: AI-backed risk analysis
            - listitem [ref=e108]: Damage and inspection data interpretation
            - listitem [ref=e110]: Clean report presentation to the user
        - generic [ref=e112]:
          - heading "SaaS & Billing Infrastructure" [level=3] [ref=e113]
          - list [ref=e114]:
            - listitem [ref=e115]: Freemium plan management
            - listitem [ref=e117]: Payment and invoicing system
            - listitem [ref=e119]: Usage limits tracking
        - generic [ref=e121]:
          - heading "n8n Automation Flows" [level=3] [ref=e122]
          - list [ref=e123]:
            - listitem [ref=e124]: Data aggregation automations
            - listitem [ref=e126]: Report generation triggers
            - listitem [ref=e128]: Error handling and logging
        - generic [ref=e130]:
          - heading "Mobile & Web Interface" [level=3] [ref=e131]
          - list [ref=e132]:
            - listitem [ref=e133]: React Native mobile app
            - listitem [ref=e135]: Responsive web portal
            - listitem [ref=e137]: User management panel
    - generic [ref=e140]:
      - heading "User Journey" [level=2] [ref=e141]
      - list [ref=e142]:
        - listitem [ref=e143]:
          - generic [ref=e144]: "1"
          - generic [ref=e145]: User enters plate number to start query
        - listitem [ref=e146]:
          - generic [ref=e147]: "2"
          - generic [ref=e148]: n8n workflow aggregates vehicle data from sources
        - listitem [ref=e149]:
          - generic [ref=e150]: "3"
          - generic [ref=e151]: AI model calculates risk score
        - listitem [ref=e152]:
          - generic [ref=e153]: "4"
          - generic [ref=e154]: Trust Report is presented to the user
        - listitem [ref=e155]:
          - generic [ref=e156]: "5"
          - generic [ref=e157]: Premium user accesses full report details
        - listitem [ref=e158]:
          - generic [ref=e159]: "6"
          - generic [ref=e160]: Subscription management handled via user panel
    - generic [ref=e162]:
      - heading "Outcomes" [level=2] [ref=e163]
      - generic [ref=e164]:
        - generic [ref=e165]:
          - img [ref=e166]
          - generic [ref=e169]: Reliable risk analysis provided to used car buyers in seconds
        - generic [ref=e170]:
          - img [ref=e171]
          - generic [ref=e174]: Recurring subscription revenue model for the platform owner
        - generic [ref=e175]:
          - img [ref=e176]
          - generic [ref=e179]: Sustainable product built on a scalable SaaS infrastructure
    - generic [ref=e181]:
      - heading "Lessons Learned" [level=2] [ref=e182]
      - list [ref=e183]:
        - listitem [ref=e184]: Iterative testing was crucial for consistent AI prompt outputs
        - listitem [ref=e186]: Correct setup of multi-tenant data isolation early accelerated later development
    - generic [ref=e189]:
      - heading "Future Plans" [level=2] [ref=e190]
      - generic [ref=e191]:
        - generic [ref=e192]: Dealer API integration
        - generic [ref=e193]: Comparative vehicle analysis
        - generic [ref=e194]: White-label licensing models
    - generic [ref=e196]:
      - paragraph [ref=e197]: 03 — Case Studies & References
      - heading "What else have we developed?" [level=2] [ref=e198]
      - generic [ref=e199]:
        - link "StockApp Inventory, finance, and receivables tracking system Review" [ref=e200] [cursor=pointer]:
          - /url: /projeler/stockapp
          - heading "StockApp" [level=3] [ref=e201]
          - paragraph [ref=e202]: Inventory, finance, and receivables tracking system
          - generic [ref=e203]:
            - text: Review
            - img [ref=e204]
        - link "Hezer Auto Service Vehicle intake, repair, and auto service operations system Review" [ref=e206] [cursor=pointer]:
          - /url: /projeler/hezer-auto-service
          - heading "Hezer Auto Service" [level=3] [ref=e207]
          - paragraph [ref=e208]: Vehicle intake, repair, and auto service operations system
          - generic [ref=e209]:
            - text: Review
            - img [ref=e210]
        - link "SaaS Infrastructures Subscription-ready multi-tenant software architecture Review" [ref=e212] [cursor=pointer]:
          - /url: /projeler/saas-operasyon-altyapisi
          - heading "SaaS Infrastructures" [level=3] [ref=e213]
          - paragraph [ref=e214]: Subscription-ready multi-tenant software architecture
          - generic [ref=e215]:
            - text: Review
            - img [ref=e216]
        - link "Solvaria Personal Brand Site Multi-page website for personal branding and studio positioning Review" [ref=e218] [cursor=pointer]:
          - /url: /projeler/personal-brand-site
          - heading "Solvaria Personal Brand Site" [level=3] [ref=e219]
          - paragraph [ref=e220]: Multi-page website for personal branding and studio positioning
          - generic [ref=e221]:
            - text: Review
            - img [ref=e222]
    - generic [ref=e225]:
      - paragraph [ref=e226]: Product Idea?
      - heading "Let's discuss your product idea or platform." [level=2] [ref=e227]
      - paragraph [ref=e228]: Let's plan the technical stack and MVP steps for your SaaS project.
      - generic [ref=e229]:
        - link "Let's Discuss Your Product Idea" [ref=e230] [cursor=pointer]:
          - /url: /iletisim
        - link "All Projects" [ref=e231] [cursor=pointer]:
          - /url: /projeler
  - contentinfo [ref=e232]:
    - generic [ref=e233]:
      - generic [ref=e234]:
        - generic [ref=e235]:
          - link "SOLVARIA" [ref=e236] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e237]: We develop premium custom digital operation systems and SaaS infrastructures that consolidate business processes scattered across notebooks, Excel, and WhatsApp into a single center.
          - generic [ref=e238]:
            - link "mertalbaan@gmail.com" [ref=e239] [cursor=pointer]:
              - /url: mailto:mertalbaan@gmail.com?subject=Proje%20talebi
              - img [ref=e240]
              - text: mertalbaan@gmail.com
            - link "Chat on WhatsApp" [ref=e243] [cursor=pointer]:
              - /url: https://wa.me/905379531547
              - img [ref=e244]
              - text: Chat on WhatsApp
            - generic [ref=e246]:
              - img [ref=e247]
              - text: Izmir, Türkiye · Remote collaboration worldwide
        - generic [ref=e250]:
          - heading "System Solutions" [level=4] [ref=e251]
          - list [ref=e252]:
            - listitem [ref=e253]:
              - link "Job Tracking Systems" [ref=e254] [cursor=pointer]:
                - /url: /cozumler/is-takip-sistemleri
            - listitem [ref=e255]:
              - link "Inventory & Accounts" [ref=e256] [cursor=pointer]:
                - /url: /cozumler/stok-cari-tahsilat
            - listitem [ref=e257]:
              - link "Operational Automation" [ref=e258] [cursor=pointer]:
                - /url: /cozumler/operasyon-otomasyonlari
            - listitem [ref=e259]:
              - link "SaaS Product Foundation" [ref=e260] [cursor=pointer]:
                - /url: /cozumler/saas-urun-altyapisi
        - generic [ref=e261]:
          - heading "Studio" [level=4] [ref=e262]
          - list [ref=e263]:
            - listitem [ref=e264]:
              - link "Studio" [ref=e265] [cursor=pointer]:
                - /url: /studyo
            - listitem [ref=e266]:
              - link "Projects" [ref=e267] [cursor=pointer]:
                - /url: /projeler
            - listitem [ref=e268]:
              - link "Engagement Process" [ref=e269] [cursor=pointer]:
                - /url: /surec
            - listitem [ref=e270]:
              - link "Partnership" [ref=e271] [cursor=pointer]:
                - /url: /is-birligi
            - listitem [ref=e272]:
              - link "Contact" [ref=e273] [cursor=pointer]:
                - /url: /iletisim
      - generic [ref=e274]:
        - paragraph [ref=e275]: © 2026 Solvaria. All rights reserved.
        - generic [ref=e276]:
          - link "Privacy" [ref=e277] [cursor=pointer]:
            - /url: /gizlilik
          - link "Terms of Use" [ref=e278] [cursor=pointer]:
            - /url: /kullanim-kosullari
          - generic [ref=e279]: Digital Operation Systems · Izmir, Türkiye · Remote collaboration worldwide
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Solvaria B2B Transformation E2E Tests", () => {
  4   |   
  5   |   test.beforeEach(async ({ page }) => {
  6   |     // Set a longer default navigation timeout for Next.js compilation
  7   |     page.setDefaultTimeout(60000);
  8   |   });
  9   | 
  10  |   test("Homepage loads successfully and contains correct branding", async ({ page }) => {
  11  |     await page.goto("/");
  12  |     // Wait for Next.js to finish compile & load, check page title
  13  |     await expect(page).toHaveTitle(/Solvaria/, { timeout: 25000 });
  14  |     
  15  |     // Verify 14+ is NOT in the text
  16  |     const content = await page.textContent("body");
  17  |     expect(content).not.toContain("14+ teslim edilen");
  18  |     expect(content).not.toContain("14+ sistem");
  19  |     
  20  |     // Check no absolute risk guarantee statements
  21  |     expect(content).not.toContain("sıfır hata");
  22  |     expect(content).not.toContain("kesintisiz teknik operasyon");
  23  |   });
  24  | 
  25  |   test("Navbar links are accessible", async ({ page }) => {
  26  |     await page.goto("/");
  27  |     await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
  28  |     
  29  |     const solutionsLink = page.locator("nav").filter({ hasText: /Çözümler|Solutions|Lösungen/i }).first();
  30  |     const casesLink = page.locator("nav").filter({ hasText: /Projeler|Projects|Projekte/i }).first();
  31  |     const cooperationLink = page.locator("nav").filter({ hasText: /İş Birliği|Partnership|Partnerschaft/i }).first();
  32  |     const studioLink = page.locator("nav").filter({ hasText: /Stüdyo|Studio/i }).first();
  33  | 
  34  |     await expect(solutionsLink).toBeVisible();
  35  |     await expect(casesLink).toBeVisible();
  36  |     await expect(cooperationLink).toBeVisible();
  37  |     await expect(studioLink).toBeVisible();
  38  |   });
  39  | 
  40  |   test("Project classification and categories are accurate", async ({ page }) => {
  41  |     await page.goto("/projeler");
  42  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  43  |     
  44  |     // Check project filters
  45  |     const filterAll = page.locator("button").filter({ hasText: /Tümü|All|Alle/i }).first();
  46  |     const filterClient = page.locator("button").filter({ hasText: /Müşteri Projeleri|Customer Projects|Kundenprojekte/i }).first();
  47  |     const filterProducts = page.locator("button").filter({ hasText: /Ürünler|Products|Produkte/i }).first();
  48  |     const filterConcepts = page.locator("button").filter({ hasText: /Konseptler|Concepts|Konzepte/i }).first();
  49  | 
  50  |     await expect(filterAll).toBeVisible();
  51  |     await expect(filterClient).toBeVisible();
  52  |     await expect(filterProducts).toBeVisible();
  53  |     await expect(filterConcepts).toBeVisible();
  54  | 
  55  |     // Check project cards
  56  |     const content = await page.textContent("body");
  57  |     expect(content).toContain("StockApp");
  58  |     expect(content).toContain("Hezer Auto Service");
  59  |     expect(content).toContain("CARPASS");
  60  |   });
  61  | 
  62  |   test("StockApp case study layout and details", async ({ page }) => {
  63  |     await page.goto("/projeler/stockapp");
  64  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  65  |     
  66  |     // Check B2B details
  67  |     const content = await page.textContent("body");
  68  |     expect(content).toContain("StockApp");
  69  |     expect(content).toMatch(/Müşteri Projesi|Customer Project|Kundenprojekt/i);
  70  |     
  71  |     // Check mockup placeholders are visible
  72  |     await expect(page.locator("text=Mockup Grid").first()).toBeVisible();
  73  |   });
  74  | 
  75  |   test("CARPASS development pipeline status and module badges", async ({ page }) => {
  76  |     await page.goto("/projeler/carpass");
  77  |     await page.waitForSelector("h1", { state: "visible", timeout: 25000 });
  78  |     
  79  |     const content = await page.textContent("body");
  80  |     expect(content).toContain("CARPASS");
> 81  |     expect(content).toMatch(/Solvaria Ürün Laboratuvarı|Solvaria Product Lab|Solvaria Produktlabor/i);
      |                     ^ Error: expect(received).toMatch(expected)
  82  |     
  83  |     // Check pipeline status
  84  |     expect(content).toMatch(/Geliştirme Aşamasında|In Development|Entwicklung/i);
  85  |   });
  86  | 
  87  |   test("Contact form multi-stage wizard works", async ({ page }) => {
  88  |     await page.goto("/iletisim");
  89  |     await page.waitForSelector("#cf-needType", { state: "visible", timeout: 25000 });
  90  |     
  91  |     // Select Need Type by index (language-agnostic)
  92  |     await page.selectOption("#cf-needType", { index: 3 });
  93  | 
  94  |     // Fill Stage 1
  95  |     await page.fill("#cf-name", "Test User");
  96  |     await page.fill("#cf-company", "Test Company");
  97  |     await page.fill("#cf-email", "test@company.com");
  98  |     await page.fill("#cf-phone", "905000000000");
  99  |     await page.fill("#cf-message", "Looking for custom operations software.");
  100 | 
  101 |     // Go to next stage via language-agnostic ID selector
  102 |     await page.click("#cf-next-btn");
  103 | 
  104 |     // Verify Stage 2 fields are visible
  105 |     await expect(page.locator("#cf-currentMethod")).toBeVisible({ timeout: 10000 });
  106 |     await expect(page.locator("#cf-problem")).toBeVisible();
  107 |     await expect(page.locator("#cf-userCount")).toBeVisible();
  108 |     await expect(page.locator("#cf-timeline")).toBeVisible();
  109 |   });
  110 | 
  111 |   test("Language context switching preserves the active page", async ({ page }) => {
  112 |     await page.goto("/projeler/stockapp");
  113 |     await page.waitForSelector("nav", { state: "visible", timeout: 25000 });
  114 |     
  115 |     // Scope search inside the first language switcher (desktop)
  116 |     const desktopLangSwitcher = page.locator("[data-lang-switcher]").first();
  117 |     const activeBtn = desktopLangSwitcher.locator("button").first();
  118 |     await expect(activeBtn).toBeVisible({ timeout: 15000 });
  119 |     
  120 |     // Get the current language tag
  121 |     const currentLangText = (await activeBtn.innerText()).trim().toLowerCase();
  122 |     
  123 |     // Open language dropdown
  124 |     await activeBtn.click();
  125 |     
  126 |     // Select target language button
  127 |     const targetLang = currentLangText === "tr" ? "en" : "tr";
  128 |     const targetBtn = desktopLangSwitcher.locator("button", { hasText: new RegExp(`^${targetLang}$`, "i") });
  129 |     await expect(targetBtn).toBeVisible();
  130 |     await targetBtn.click();
  131 |     
  132 |     // Verify path is preserved
  133 |     const url = page.url();
  134 |     expect(url).toContain("/projeler/stockapp");
  135 | 
  136 |     // Check that content language changed correctly
  137 |     if (targetLang === "en") {
  138 |       await page.waitForSelector("text=Client Project", { state: "visible", timeout: 15000 });
  139 |     } else {
  140 |       await page.waitForSelector("text=Müşteri Projesi", { state: "visible", timeout: 15000 });
  141 |     }
  142 |   });
  143 | });
  144 | 
```