const NS='http://www.w3.org/2000/svg';
function el(tag,attrs={},parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function txt(parent,x,y,s,attrs={}){const t=el('text',Object.assign({x,y,'font-size':12,fill:'#4a5670'},attrs),parent);t.textContent=s;return t}
function svgIn(id,w,h){const c=document.getElementById(id);const s=el('svg',{viewBox:`0 0 ${w} ${h}`,class:'chart'});c.appendChild(s);return s}
const ru=(v,d)=>v.toLocaleString('ru-RU',{maximumFractionDigits:d??1});

/* 02 market indicators */
(function(){
  const d=[
    ['Выпуск мебели 2025, млрд ₽',547.6,600,'#1b3163',v=>ru(v)],
    ['в т. ч. бытовая (B2C), млрд ₽',425.4,600,'#2f6fed',v=>ru(v)],
    ['офисная и торговая, млрд ₽',122.2,600,'#8b5cf6',v=>ru(v)],
    ['Кухонная мебель, млн ед. (−8,5% г/г)',16.4,30,'#f08a24',v=>ru(v)],
    ['Мебельных компаний, тыс.',39,50,'#0fa3a3',v=>'≈'+v],
    ['Продавцов мебели, тыс.',38,50,'#0fa3a3',v=>'≈'+v],
    ['Рост продаж мебели на маркетплейсах',1.7,2.5,'#e0475b',v=>'× '+ru(v)]
  ];
  const W=900,rh=44,H=d.length*rh+10,s=svgIn('mktChart',W,H),x0=320,bw=480;
  d.forEach((r,i)=>{const y=i*rh+8;txt(s,0,y+21,r[0],{'font-size':14,fill:'#172033'});
    el('rect',{x:x0,y:y+6,width:bw,height:22,rx:6,fill:'#eef2f8'},s);
    el('rect',{x:x0,y:y+6,width:bw*r[1]/r[2],height:22,rx:6,fill:r[3]},s);
    txt(s,x0+bw*r[1]/r[2]+8,y+22,r[4](r[1]),{'font-size':14,'font-weight':700,fill:'#172033'});});
})();

/* 03 positioning map */
(function(){
  const W=1500,H=580,m={l:60,r:30,t:30,b:60},s=svgIn('posMap',W,H),iw=W-m.l-m.r,ih=H-m.t-m.b;
  const X=v=>m.l+iw*v/100,Y=v=>m.t+ih*(1-v/100);
  el('rect',{x:m.l,y:m.t,width:iw,height:ih,fill:'#fbfcfe',stroke:'#e3e8f0',rx:10},s);
  [25,75].forEach(v=>{el('line',{x1:X(v),x2:X(v),y1:m.t,y2:m.t+ih,stroke:'#f0f3f8'},s);el('line',{x1:m.l,x2:m.l+iw,y1:Y(v),y2:Y(v),stroke:'#f0f3f8'},s)});
  el('line',{x1:X(50),x2:X(50),y1:m.t,y2:m.t+ih,stroke:'#cdd5e2','stroke-dasharray':'4 4'},s);
  el('line',{x1:m.l,x2:m.l+iw,y1:Y(50),y2:Y(50),stroke:'#cdd5e2','stroke-dasharray':'4 4'},s);
  el('rect',{x:X(56),y:Y(99),width:X(80)-X(56),height:Y(60)-Y(99),rx:18,fill:'rgba(240,138,36,.08)',stroke:'#f08a24','stroke-width':2,'stroke-dasharray':'8 6'},s);
  txt(s,X(68),Y(74),'Целевая зона',{'text-anchor':'middle','font-size':15,'font-weight':800,fill:'#c46a12'});
  txt(s,X(68),Y(74)+18,'веб + салон + производство + 1С',{'text-anchor':'middle','font-size':12.5,'font-weight':600,fill:'#c46a12'});
  txt(s,m.l+8,H-22,'← Продажа и визуализация',{'font-size':13,'font-weight':700});
  txt(s,m.l+iw-8,H-22,'Производство, CAD/CAM →',{'font-size':13,'font-weight':700,'text-anchor':'end'});
  txt(s,X(50),H-22,'Фокус решения',{'font-size':12,'text-anchor':'middle',fill:'#7c879e'});
  const yl1=el('text',{x:22,y:m.t+ih,'font-size':13,fill:'#4a5670','font-weight':700,transform:`rotate(-90 22 ${m.t+ih})`},s);yl1.textContent='Десктоп / on-prem';
  const yl2=el('text',{x:22,y:m.t,'font-size':13,fill:'#4a5670','font-weight':700,'text-anchor':'end',transform:`rotate(-90 22 ${m.t})`},s);yl2.textContent='Веб / облако →';
  const C={ru:'#2f6fed',in:'#8b5cf6',cn:'#e0475b'};
  const P=[
    ['Ceramic 3D',14,46,26,'ru'],['Базис',80,32,30,'ru'],['К3-Мебель',68,18,22,'ru'],['PRO100',30,10,24,'in'],['bCAD',52,12,14,'ru'],['Астра',60,6,11,'ru'],
    ['БАЗИС-Облако',86,70,14,'ru'],['PlanPlace',38,80,12,'ru'],['3Dplan',27,88,10,'ru'],['UPlan',15,93,10,'ru'],['Планоплан',6,66,16,'ru'],['Remplanner',5,84,10,'ru'],
    ['Cyncly Winner / 2020 Flex',36,62,28,'in'],['KitchenDraw',40,26,16,'in'],['imos iX',92,52,22,'in'],['Cabinet Vision / Microvellum',91,18,20,'in'],['Mozaik',78,46,14,'in'],
    ['Roomle',50,95,14,'in'],['3D Cloud / Threekit',24,98,18,'in'],['Coohom',48,78,26,'cn'],['Polyboard',78,8,10,'in']
  ];
  P.forEach(p=>{const cx=X(p[1]),cy=Y(p[2]);el('circle',{cx,cy,r:p[3],fill:C[p[4]],'fill-opacity':.16,stroke:C[p[4]],'stroke-width':2},s);
    el('circle',{cx,cy,r:3.5,fill:C[p[4]]},s);
    const t=txt(s,cx,cy-p[3]-7,p[0],{'text-anchor':'middle','font-size':13,'font-weight':700,fill:'#172033'});
    t.setAttribute('paint-order','stroke');t.setAttribute('stroke','#fbfcfe');t.setAttribute('stroke-width','4')});
})();

/* 06 heatmap */
(function(){
  const F=['Обмер, помещение','Параметри&shy;ческая мебель','Салонный UX, скорость','Фото&shy;реализм, 360°','Смета, КП, цены','Детали&shy;ровка','Раскрой, ЧПУ','Интеграция с 1С','Веб, облако','Виджет на сайт','Мульти-салон, дилеры','ИИ, автоплан','Доступ&shy;ность в РФ'];
  const R=[
    ['Ceramic 3D + «Кухни»','ru',[3,2,3,3,3,1,0,2,2,1,2,2,3]],
    ['БАЗИС (Мебельщик + Салон + Облако)','ru',[2,3,2,1,3,3,3,3,2,1,3,0,3]],
    ['К3-Мебель','ru',[2,3,1,2,3,3,3,2,1,0,1,0,3]],
    ['PRO100','in',[2,2,3,2,2,1,1,1,0,0,1,0,1]],
    ['bCAD','ru',[2,2,2,2,2,2,2,1,0,0,1,0,3]],
    ['PlanPlace','ru',[2,2,3,2,3,2,1,1,3,3,2,0,3]],
    ['3Dplan / UPlan','ru',[1,2,3,2,3,1,0,3,3,3,2,1,3]],
    ['Планоплан','ru',[3,1,2,3,1,0,0,0,2,2,1,1,3]],
    ['Cyncly Winner / 2020 Flex','in',[3,3,3,3,3,2,1,0,3,2,3,2,0]],
    ['KitchenDraw','in',[2,3,3,2,3,2,1,1,1,0,2,0,1]],
    ['imos iX','in',[3,3,2,3,3,3,3,1,2,2,3,2,0]],
    ['Coohom','cn',[3,3,3,3,2,2,2,0,3,3,2,3,1]],
    ['Roomle Rubens','in',[1,3,2,2,3,2,2,1,3,3,2,1,0]],
    ['Целевой продукт (v1–v2)','t',[3,3,3,2,3,2,2,3,3,3,3,2,3]]
  ];
  const col=v=>['#f3f5f9','#cdeeee','#7fd3d3','#0fa3a3'][v], fc=v=>v>=3?'#fff':'#172033';
  let h='<thead><tr><th style="min-width:260px;vertical-align:bottom">Решение</th>';
  F.forEach(f=>h+=`<th class="hd">${f}</th>`);h+='<th class="num" style="vertical-align:bottom">Σ из 39</th></tr></thead><tbody>';
  R.forEach(r=>{const sum=r[2].reduce((a,b)=>a+b,0);
    const pill=r[1]==='ru'?'<span class="pill ru">RU</span>':r[1]==='cn'?'<span class="pill cn">CN</span>':r[1]==='t'?'<span class="pill" style="background:#fff0de;color:#c46a12">цель</span>':'<span class="pill in">INT</span>';
    h+=`<tr${r[1]==='t'?' style="outline:2px dashed #f08a24;outline-offset:-3px"':''}><td><b>${r[0]}</b> ${pill}</td>`;
    r[2].forEach(v=>h+=`<td class="h" style="background:${col(v)};color:${fc(v)}">${v}</td>`);
    h+=`<td class="num"><b style="font-size:15px">${sum}</b></td></tr>`});
  document.getElementById('heat').innerHTML=h+'</tbody>';
})();

/* 07 TCO */
(function(){
  const d=[
    ['Ceramic 3D «Кухонный»',420,'подписка: 168 + 126 + 126','#e0475b'],
    ['БАЗИС-Облако (базовый тариф)',189,'63 × 3 года','#2f6fed'],
    ['БАЗИС Мебельщик + Салон',159.6,'133 + обновления 2 × 13,3','#2f6fed'],
    ['PlanPlace BASE (годовой тариф)',98.4,'32,8 × 3 года, без лимита пользователей','#0fa3a3'],
    ['К3-Мебель «Эксперт 1»',95,'бессрочно; техподдержка отдельно','#2f6fed'],
    ['БАЗИС-Салон',44.4,'37 + обновления 2 × 3,7','#2f6fed'],
    ['К3-Мебель «Салон» + «Справочники»',43,'35 + 8, бессрочно','#2f6fed'],
    ['bCAD Салон',40,'бессрочно, без НДС','#2f6fed']
  ];
  const W=1000,rh=48,m=350,H=d.length*rh+30,s=svgIn('tcoChart',W,H),bw=520,max=440;
  [0,100,200,300,400].forEach(v=>{const x=m+bw*v/max;el('line',{x1:x,x2:x,y1:0,y2:H-24,stroke:'#eef1f6'},s);txt(s,x,H-6,v+' тыс. ₽',{'text-anchor':'middle','font-size':11})});
  d.forEach((r,i)=>{const y=i*rh+6;txt(s,0,y+18,r[0],{'font-size':14,'font-weight':700,fill:'#172033'});txt(s,0,y+35,r[2],{'font-size':12,fill:'#7c879e'});
    el('rect',{x:m,y:y+6,width:bw*r[1]/max,height:26,rx:6,fill:r[3]},s);
    txt(s,m+bw*r[1]/max+8,y+24,ru(r[1])+' тыс. ₽',{'font-size':13.5,'font-weight':700,fill:'#172033'})});
})();

/* 10 options */
(function(){
  const O=[
    {n:'A · Купить готовое',d:'Базис (Мебельщик + Салон + Облако) или Ceramic 3D + интегратор 1С.',s:{'Скорость запуска':10,'Низкий риск':9,'Низкие затраты':7,'Дифференциация':1,'Потенциал SaaS':0},v:'Быстро и надёжно для своей фабрики, но продукта на продажу не будет.',c:'#7c879e'},
    {n:'B · White-label',d:'PlanPlace или 3Dplan под своим брендом + своя интеграция с 1С и каталог.',s:{'Скорость запуска':8,'Низкий риск':7,'Низкие затраты':7,'Дифференциация':4,'Потенциал SaaS':3},v:'Запуск за 1–3 месяца, но зависимость от чужой дорожной карты и ограниченное право перепродажи.',c:'#8b5cf6'},
    {n:'C · Всё своё',d:'Собственная платформа от 3D до CAM и раскроя, полная замена Базиса.',s:{'Скорость запуска':2,'Низкий риск':2,'Низкие затраты':2,'Дифференциация':9,'Потенциал SaaS':9},v:'Максимальный потенциал, но 2–3 года до паритета с Базисом по производству.',c:'#e0475b'},
    {n:'D · Гибрид (рекомендуется)',d:'Свой веб-конфигуратор для салона и дилеров + 1С; производство — экспорт в Базис/К3, свой CAM поэтапно.',s:{'Скорость запуска':6,'Низкий риск':6,'Низкие затраты':6,'Дифференциация':8,'Потенциал SaaS':8},v:'Ценность уже в MVP, собственный актив и путь к тиражированию.',c:'#0fa3a3'}
  ];
  const box=document.getElementById('optCards');
  O.forEach(o=>{let h=`<div class="card" style="border-top:4px solid ${o.c}"><h4>${o.n}</h4><p class="small" style="margin:0 0 12px">${o.d}</p>`;
    for(const k in o.s)h+=`<div class="scoreRow"><span>${k}</span><div class="bar" style="margin:0"><i style="width:${o.s[k]*10}%;background:${o.c}"></i></div><b>${o.s[k]}</b></div>`;
    const tot=Object.values(o.s).reduce((a,b)=>a+b,0);
    h+=`<p style="font-size:13px;margin:12px 0 0"><b>Σ ${tot} из 50.</b> ${o.v}</p></div>`;box.insertAdjacentHTML('beforeend',h)});
})();

/* 12 1C flows */
(function(){
  const s=document.getElementById('onecSvg');
  const defs=el('defs',{},s);const mk=el('marker',{id:'ar',markerWidth:10,markerHeight:10,refX:8,refY:3,orient:'auto'},defs);el('path',{d:'M0,0 L8,3 L0,6 Z',fill:'#4a5670'},mk);
  const box=(x,y,w,h,t,sub,fill)=>{el('rect',{x,y,width:w,height:h,rx:14,fill},s);txt(s,x+w/2,y+h/2-4,t,{'text-anchor':'middle','font-size':17,'font-weight':800,fill:'#fff'});txt(s,x+w/2,y+h/2+17,sub,{'text-anchor':'middle','font-size':12.5,fill:'#e8eefb'})};
  box(20,100,220,130,'Конфигуратор','облако / SaaS','#1b3163');
  box(660,100,220,130,'1С:Предприятие','УНФ · УТ · КА · ERP','#c99400');
  box(340,262,220,58,'Коннектор-агент','на стороне клиента','#0fa3a3');
  const arrow=(x1,y1,x2,y2,label,dy)=>{el('line',{x1,y1,x2,y2,stroke:'#4a5670','stroke-width':2,'marker-end':'url(#ar)'},s);txt(s,(x1+x2)/2,(y1+y2)/2+dy,label,{'text-anchor':'middle','font-size':12.5,fill:'#172033','font-weight':600})};
  arrow(658,125,244,125,'Номенклатура, характеристики, цены, остатки',-7);
  arrow(658,160,244,160,'Статусы заказов, оплаты, сроки готовности',-7);
  arrow(242,195,656,195,'Заказ покупателя + спецификация (BOM) + PDF',-7);
  arrow(242,222,656,222,'Контрагент, договор, предоплата',-7);
  el('path',{d:'M450,262 L450,236',stroke:'#0fa3a3','stroke-width':2,'stroke-dasharray':'4 3'},s);
  txt(s,450,32,'HTTP-сервисы (JSON, JWT) в расширении .cfe · OData v3 для чтения справочников',{'text-anchor':'middle','font-size':13.5,fill:'#172033','font-weight':600});
  txt(s,450,54,'Идемпотентность по GUID · журнал обмена · повтор при сбоях · исходящее соединение из сети клиента',{'text-anchor':'middle','font-size':12.5,fill:'#7c879e'});
})();

/* 14 effort: [component, classic, with AI, complexity 1-5] */
const EFF=[
  ['2D-редактор помещения',3,2,3],['3D-сцена, материалы, realtime',3,2,3],['Параметрическое ядро модулей',8,5.5,5],['Правила и валидация',4,3,4],
  ['Каталог / PIM + админка',4,2.5,2],['Прайсинг, смета, PDF-КП',2,1.3,2],['Облачный рендер, панорамы',3,2,3],['Деталировка, раскрой, экспорт ЧПУ',8,6,5],
  ['Интеграция с 1С (расширение + агент)',3,2,4],['CRM-лайт, мульти-салон, роли',3,1.8,2],['SaaS: тенанты, биллинг, безопасность',4,3,3],['3D-контент (модели, текстуры)',3,2.6,2],['QA, документация, обучение',4,3,2]
];
(function(){
  const W=1000,rh=36,m=300,H=EFF.length*rh+56,s=svgIn('effortChart',W,H),bw=610,max=8.5;
  [0,2,4,6,8].forEach(v=>{const x=m+bw*v/max;el('line',{x1:x,x2:x,y1:0,y2:H-46,stroke:'#eef1f6'},s);txt(s,x,H-30,v+'',{'text-anchor':'middle','font-size':11})});
  txt(s,m,H-8,'человеко-месяцы',{'font-size':12});
  EFF.forEach((r,i)=>{const y=i*rh+4;txt(s,0,y+19,r[0],{'font-size':13.5,fill:'#172033'});
    el('rect',{x:m,y:y+3,width:bw*r[1]/max,height:13,rx:4,fill:'#b8c3d8'},s);
    el('rect',{x:m,y:y+18,width:bw*r[2]/max,height:13,rx:4,fill:'#0fa3a3'},s);
    txt(s,m+bw*r[1]/max+6,y+14,ru(r[1]),{'font-size':11.5});txt(s,m+bw*r[2]/max+6,y+29,ru(r[2]),{'font-size':11.5,fill:'#0b7d7d','font-weight':700})});
  const lg=el('g',{transform:`translate(${m+bw-250},${H-20})`},s);
  el('rect',{x:0,y:0,width:12,height:12,rx:3,fill:'#b8c3d8'},lg);txt(lg,18,10,'классика',{'font-size':12});
  el('rect',{x:100,y:0,width:12,height:12,rx:3,fill:'#0fa3a3'},lg);txt(lg,118,10,'с ИИ-ассистентами',{'font-size':12});
  const a=EFF.reduce((x,r)=>x+r[1],0),b=EFF.reduce((x,r)=>x+r[2],0);
  document.getElementById('effTotA').textContent=ru(a);document.getElementById('effTotB').textContent=ru(b);
  const cx=document.getElementById('cxList');
  [...EFF].sort((p,q)=>q[3]-p[3]).slice(0,7).forEach(r=>{const c=r[3]>=5?'#dc2626':r[3]>=4?'#f08a24':r[3]>=3?'#eab308':'#16a34a';
    cx.insertAdjacentHTML('beforeend',`<div class="scoreRow" style="grid-template-columns:230px 1fr 24px"><span>${r[0]}</span><div class="bar" style="margin:0"><i style="width:${r[3]*20}%;background:${c}"></i></div><b>${r[3]}</b></div>`)});
})();

/* 15 gantt */
(function(){
  const T=[
    ['Этап 0 · Discovery, пилот, данные',0,1.5,'#7c879e'],
    ['MVP: помещение, модули, фасады',1,5,'#2f6fed'],
    ['MVP: смета, КП, заказ → 1С',2.5,5,'#c99400'],
    ['Пилот в 1–2 салонах',4,7,'#16a34a'],
    ['Деталировка и экспорт в Базис/К3/раскрой',5,11,'#e0475b'],
    ['Облачный рендер, панорамы 360°',6,9,'#8b5cf6'],
    ['1С: полный обмен, статусы, агент',7,11,'#c99400'],
    ['Мульти-салон, дилерский портал',9,13,'#2f6fed'],
    ['SaaS: тенанты, биллинг, онбординг',10,16,'#0fa3a3'],
    ['B2C-виджет для сайтов',12,15,'#0fa3a3'],
    ['Скан помещения + ИИ-автоплан',14,20,'#8b5cf6'],
    ['Продажи и тиражирование',12,24,'#16a34a']
  ];
  const W=1600,rh=32,m=360,H=T.length*rh+64,s=svgIn('gantt',W,H),iw=W-m-20,M=24,X=v=>m+iw*v/M;
  for(let i=0;i<=M;i++){el('line',{x1:X(i),x2:X(i),y1:22,y2:H-26,stroke:i%3===0?'#e3e8f0':'#f4f6fa'},s);if(i%3===0)txt(s,X(i),16,'мес. '+i,{'text-anchor':'middle','font-size':11.5,'font-weight':700})}
  [[5,'MVP'],[11,'v1'],[16,'SaaS']].forEach(([mm,l])=>{el('line',{x1:X(mm),x2:X(mm),y1:22,y2:H-26,stroke:'#f08a24','stroke-width':2,'stroke-dasharray':'5 4'},s);txt(s,X(mm),H-8,l,{'font-size':13,'font-weight':800,fill:'#c46a12','text-anchor':'middle'})});
  T.forEach((t,i)=>{const y=30+i*rh;txt(s,0,y+16,t[0],{'font-size':13.5,fill:'#172033'});el('rect',{x:X(t[1]),y:y+2,width:X(t[2])-X(t[1]),height:21,rx:6,fill:t[3],'fill-opacity':.9},s)});
})();

/* 16 funnel + revenue */
(function(){
  const L=[['Мебельные компании в РФ','≈39 000',100,'#1b3163'],['Корпусная и кухонная мебель на заказ (оценка)','≈10 000',88,'#2f6fed'],['Готовы платить за облачный конфигуратор (оценка)','≈3 000',76,'#0fa3a3'],['Цель на 3 года: салоны и фабрики','150–300',64,'#f08a24']];
  const f=document.getElementById('funnel');
  L.forEach(l=>f.insertAdjacentHTML('beforeend',`<div class="lvl" style="width:${l[2]}%;background:${l[3]}"><span>${l[0]}</span><b>${l[1]}</b></div>`));
  const W=460,H=270,s=svgIn('arrChart',W,H);
  const parts=[['Салоны (ARR)',13.5,'#2f6fed'],['Фабрики (ARR)',10.5,'#0fa3a3'],['Внедрения (разово)',5,'#f08a24']];
  const y0=H-30,sc=6.5;let acc=0;
  parts.forEach(p=>{const h=p[1]*sc;el('rect',{x:70,y:y0-acc-h,width:120,height:h,fill:p[2],rx:4},s);txt(s,204,y0-acc-h/2+5,`${p[0]}: ${ru(p[1])} млн ₽`,{'font-size':13.5,fill:'#172033','font-weight':600});acc+=h});
  txt(s,130,y0-acc-10,'≈29 млн ₽',{'text-anchor':'middle','font-size':17,'font-weight':800,fill:'#172033'});
  el('line',{x1:50,x2:440,y1:y0,y2:y0,stroke:'#cdd5e2'},s);txt(s,130,y0+19,'Год 3 (иллюстрация)',{'text-anchor':'middle','font-size':12});
})();

/* 17 risks: [id, risk, probability, impact, mitigation] */
(function(){
  const R=[
    [1,'Сложность параметрического ядра и точность до 1 мм',4,5,'Технолог в команде; «золотые» проекты; автотесты BOM; размеры в целых мм'],
    [2,'3D-контент и лицензии на декоры и модели',4,4,'Договоры с поставщиками плит и фурнитуры; 15–25% бюджета на контент'],
    [3,'Разнообразие и доработки 1С у клиентов',4,3,'Расширение .cfe, таблицы соответствий, партнёры-франчайзи 1С'],
    [4,'Конкуренция Базиса и Ceramic 3D, консерватизм рынка',3,4,'Позиция «дополняем Базис», экспорт .b3d/CSV, фокус на салоне и вебе'],
    [5,'Производительность на слабых ПК в салонах',3,3,'LOD, инстансинг, сжатые текстуры KTX2, облачный рендер'],
    [6,'Техдолг и уязвимости в «вайбкоде»',4,4,'Строгий TypeScript, ревью, CI, пентест перед запуском SaaS'],
    [7,'152-ФЗ: хранение персональных данных клиентов',2,4,'Хостинг в РФ, минимизация ПДн, политики и согласия'],
    [8,'Зависимость от одного пилотного клиента',3,3,'2–3 пилота разного масштаба; решения по продуктовым метрикам'],
    [9,'Проприетарные форматы Базиса и К3',3,3,'Нейтральный экспорт CSV/XML; официальное партнёрство с вендорами']
  ];
  const W=640,H=430,m={l:70,t:20,r:20,b:60},s=svgIn('riskMap',W,H),cw=(W-m.l-m.r)/5,ch=(H-m.t-m.b)/5;
  for(let p=1;p<=5;p++)for(let i=1;i<=5;i++){const sc=p*i;const c=sc>=16?'#fbd5d5':sc>=9?'#fde7c7':sc>=5?'#fff6cc':'#e6f6ec';el('rect',{x:m.l+(i-1)*cw,y:m.t+(5-p)*ch,width:cw-3,height:ch-3,rx:8,fill:c},s)}
  for(let i=1;i<=5;i++){txt(s,m.l+(i-.5)*cw,H-m.b+20,i,{'text-anchor':'middle'});txt(s,m.l-16,m.t+(5-i+.5)*ch+4,i,{'text-anchor':'middle'})}
  txt(s,m.l+(W-m.l-m.r)/2,H-12,'Влияние →',{'text-anchor':'middle','font-weight':700,'font-size':13});
  const ym=m.t+(H-m.t-m.b)/2;
  const yl=el('text',{x:18,y:ym,'text-anchor':'middle','font-weight':700,'font-size':13,fill:'#4a5670',transform:`rotate(-90 18 ${ym})`},s);yl.textContent='Вероятность →';
  const occ={};
  R.forEach(r=>{const k=r[2]+'_'+r[3];occ[k]=(occ[k]||0)+1;const n=occ[k]-1;
    const cx=m.l+(r[3]-.5)*cw+(n%3-1)*32,cy=m.t+(5-r[2]+.5)*ch+Math.floor(n/3)*32;
    el('circle',{cx,cy,r:15,fill:'#1b3163'},s);txt(s,cx,cy+5,r[0],{'text-anchor':'middle',fill:'#fff','font-weight':800,'font-size':13.5})});
  const tb=document.querySelector('#riskTbl tbody');
  R.forEach(r=>tb.insertAdjacentHTML('beforeend',`<tr><td><b>${r[0]}</b></td><td>${r[1]}<div class="small">вероятность ${r[2]} · влияние ${r[3]}</div></td><td>${r[4]}</td></tr>`));
})();

/* active TOC link */
(function(){
  const links=[...document.querySelectorAll('nav.toc a')];const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const i=secs.indexOf(e.target);if(i>=0)links[i].classList.add('active')}})},{rootMargin:'-30% 0px -60% 0px'});
  secs.forEach(s=>s&&io.observe(s));
})();
