/* Below the Bog — research-informed conceptual exhibit. No real core measurements implied. */
const SOURCES = {
  ingram: { label: 'Ingram (1978) · Functional layers of mires', url: 'https://doi.org/10.1111/j.1365-2389.1978.tb02053.x' },
  clymo: { label: 'Clymo (1984) · Limits to peat bog growth', url: 'https://doi.org/10.1098/rstb.1984.0002' },
  usda: { label: 'Soil Survey Staff (2022) · Keys to Soil Taxonomy, 13th ed.', url: 'https://www.nrcs.usda.gov/resources/guides-and-instructions/keys-to-soil-taxonomy' },
  zaccone: { label: 'Zaccone et al. (2018) · Peat humification', url: 'https://doi.org/10.1016/j.earscirev.2018.05.017' },
  initiation: { label: 'Dating basal peat (2022) · Peat initiation pathways', url: 'https://doi.org/10.1016/j.quageo.2022.101278' },
  nature: { label: 'NatureScot (2016) · Ombrotrophic bog development', url: 'https://www.nature.scot/sites/default/files/Publication%202016%20-%20SNH%20Commissioned%20Report%20925%20-%20A%20review%20of%20the%20influence%20of%20ombrotrophic%20peat%20depth%20on%20the%20successful%20restoration%20of%20bog%20habitat.pdf' },
  irish: { label: 'Irish Peatland Conservation Council · Raised-bog stratigraphy', url: 'https://www.ipcc.ie/wp/wp-content/uploads/2021/04/Peatlands-Climate-Change-Action-Plan-pages-0-15.pdf' }
};
const layers = [
  {id:'living', number:'01', name:'Living moss & litter', mini:'LIVING SURFACE', headline:'Where peat begins', sub:'The living skin of a Sphagnum-dominated bog.', color:'#b3ca77',height:.36, kind:'moss', base:'#685329', label:'SURFACE VEGETATION',points:[
    'Living Sphagnum moss, other bog vegetation, fine roots and recently fallen litter form the active surface.',
    'New plant production supplies material that may eventually become peat if long-term accumulation exceeds decomposition.',
    'The vegetation pictured is characteristic of a Sphagnum raised bog—not of every peatland type.'
  ],caveat:'The living moss is vegetation, not necessarily a separate soil horizon. Species composition varies with site and microtopography.',refs:['clymo','nature']},
  {id:'sphagnum', number:'02', name:'Recognizable Sphagnum peat', mini:'YOUNGER BOG PEAT',headline:'Plants become an archive', sub:'Light-to-russet fibres retain the architecture of moss stems and leaves.',color:'#b38c50',height:1.14,kind:'fibrous',base:'#80603e',label:'FIBROUS BOG PEAT',points:[
    'Recognizable Sphagnum stems, branch fragments, leaves and other plant remains may form a loose fibrous peat matrix.',
    'Preservation depends on past conditions; recognizable fibres are not confined to the acrotelm.',
    'Here, this layer illustrates a relatively well-preserved upper bog deposit—not a universally fixed age or decomposition class.'
  ],caveat:'“Fibric” is a formal material class with fibre-content criteria; it is not synonymous with the acrotelm.',refs:['usda','ingram','zaccone']},
  {id:'buried',number:'03',name:'Variably decomposed peat',mini:'BURIED BOG PEAT',headline:'Time is not a gradient',sub:'Alternating plant remains and darker altered organic matter tell a changing story.',color:'#7c5138',height:1.48,kind:'mixed',base:'#583823',label:'MIXED ORGANIC MATRIX',points:[
    'Buried peat can contain interleaved moss-rich, root-rich or more humified material depending on past vegetation and conditions.',
    'Its darker matrix may have partly obscured plant structure, while adjacent fragments remain identifiable.',
    'Degree of humification does not necessarily increase monotonically with depth or peat age.'
  ],caveat:'The alternating bands are illustrative, not an observed chronology or measured profile. They do not identify fibric, hemic or sapric classes without laboratory/field criteria.',refs:['zaccone','usda']},
  {id:'fen',number:'04',name:'Older fen peat (example)',mini:'EARLIER VEGETATION',headline:'Before the raised bog',sub:'Below bog peat, some sites preserve evidence of an earlier, groundwater-influenced mire.',color:'#8c7046',height:1.26,kind:'woody',base:'#503a2a',label:'SEDGE · REED · WOOD',points:[
    'Some raised-bog histories include a fen stage with sedge rhizomes, reed fragments, roots, brown-moss remains or small pieces of wood.',
    'The change in plant material can record a transition in vegetation and hydrological conditions during mire development.',
    'Such a fen layer is plausible at many sites, but is not a required layer in every peatland.'
  ],caveat:'Plant taxa and past habitat cannot be confirmed from colour alone; identification requires macrofossils, pollen and/or other stratigraphic evidence.',refs:['nature','irish','initiation']},
  {id:'basal',number:'05',name:'Basal transition',mini:'PEAT–MINERAL CONTACT',headline:'The first organic deposits',sub:'At the base, organics may meet older mineral sediment gradually or abruptly.',color:'#999080',height:.52,kind:'transition',base:'#676054',label:'MIXED ORGANIC–MINERAL',points:[
    'A basal contact may include peat intermingled with sand, silt or clay, reflecting conditions at the onset of peat accumulation.',
    'Some lakes also preserve gyttja (organic lake sediment) below peat; it is not obligatory and is not inserted in this model.',
    'The contact differs among lake infilling, waterlogging of mineral ground and other mire-initiation pathways.'
  ],caveat:'This mixed contact is one possible form of a basal transition, not a universal or precisely defined horizon.',refs:['initiation','nature']},
  {id:'mineral',number:'06',name:'Pre-peat mineral ground',mini:'THE OLDER LANDSCAPE',headline:'What came before',sub:'Sand, silt, clay or till can form the substrate beneath the peat body.',color:'#a9a18e',height:.78,kind:'mineral',base:'#777264',label:'MINERAL SUBSTRATE',points:[
    'Mineral grains and sediment structures belong to the pre-existing landscape on which the peatland subsequently formed.',
    'The substrate may be sand, silt, clay, till or other local material, depending on site geology and landscape history.',
    'This schematic core ends below the peat base to show that the deposit has a beginning.'
  ],caveat:'Neither the true deposit thickness nor time since initiation can be inferred from this illustration; a measured core and dating would be needed.',refs:['initiation','irish']}
];
const $ = sel => document.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selectedIndex=0, mode='strata', cutaway=false, spinning=false, renderHook=()=>{}, focusHook=()=>{}, setModeHook=()=>{};
const textureCanvases=new Map();
function rng(seed){return ()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function buildTexture(layer,index){
  const c=document.createElement('canvas');c.width=720;c.height=448;
  const g=c.getContext('2d');const r=rng(1234+index*9871), w=c.width,h=c.height;
  g.fillStyle=layer.base;g.fillRect(0,0,w,h);
  for(let i=0;i<18500;i++){
    const x=r()*w,y=r()*h,a=.03+r()*.13,light=r()>.54;
    g.fillStyle=light?`rgba(241,211,157,${a})`:`rgba(14,9,7,${a})`;
    const ww=.5+r()*16;g.fillRect(x,y,ww,.3+r()*3.6);
  }
  // Irregular, non-strict horizontal bands, only in this one illustrated middle layer.
  if(layer.kind==='mixed') for(let i=0;i<11;i++){
    const yy=r()*h,dir=r()>.45?1:-1;g.strokeStyle=dir>0?'rgba(197,145,90,.11)':'rgba(22,14,11,.2)';g.lineWidth=8+r()*26;
    g.beginPath();for(let x=-10;x<w+20;x+=12){let y=yy+Math.sin(x/54+i)* (4+r()*4);x===-10?g.moveTo(x,y):g.lineTo(x,y);}g.stroke();
  }
  if(layer.kind==='mineral'||layer.kind==='transition'){
    for(let i=0;i<(layer.kind==='mineral'?2800:1250);i++){
      const x=r()*w,y=r()*h,size=1+r()* (layer.kind==='mineral'?7:5);
      g.fillStyle=['#b1aaa0','#d7c6a4','#483b32','#96958e','#d7d0b9'][Math.floor(r()*5)];
      g.beginPath();g.ellipse(x,y,size,size*(.4+r()*.7),r()*6.28,0,6.28);g.fill();
    }
  }
  if(layer.kind!=='mineral'){
    let n=layer.kind==='fibrous'?2400:layer.kind==='woody'?1450:layer.kind==='moss'?1350:layer.kind==='mixed'?920:layer.kind==='sapric'?65:240;
    for(let i=0;i<n;i++){
      const x=r()*w,y=r()*h,len=layer.kind==='woody'?10+r()*68:4+r()*55,ang=(r()-.5)*1.9;
      g.strokeStyle=layer.kind==='fibrous'?['#c2a476','#dfc49c','#614529','#926f43'][Math.floor(r()*4)]:
        layer.kind==='woody'?['#a28a60','#bb9e75','#392c22','#79694a'][Math.floor(r()*4)]:
        ['#9c7750','#70523d','#3c251e','#d0a177'][Math.floor(r()*4)];
      g.globalAlpha=.24+r()*.62;g.lineWidth=.5+r()*(layer.kind==='woody'?4.5:2.5);
      g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+len*.5,y+len*Math.sin(ang)*.4,x+len*Math.cos(ang),y+len*Math.sin(ang));g.stroke();
    }
    g.globalAlpha=1;
  }
  for(let i=0;i<420;i++){let x=r()*w,y=r()*h,rad=.5+r()*3;g.fillStyle=r()>.6?'#20180a':'#edc08b';g.globalAlpha=.06+r()*.17;g.beginPath();g.arc(x,y,rad,0,Math.PI*2);g.fill();}g.globalAlpha=1;
  textureCanvases.set(layer.id,c);return c;
}
layers.forEach(buildTexture);
// Separate sapric *reference swatch*: not assigned to a particular core depth.
buildTexture({id:'sapric-exemplar',kind:'sapric',base:'#251c18'},99);
function citations(ids){return `<div class="citations">${ids.map(id=>`<a class="citation" href="${SOURCES[id].url}" target="_blank" rel="noopener noreferrer"><span>${esc(SOURCES[id].label)}</span><span aria-hidden="true">↗</span></a>`).join('')}</div>`}
function renderNav(){ $('#layerNav').innerHTML=layers.map((l,i)=>`<button class="layer-button ${i===selectedIndex?'active':''}" data-index="${i}" ${i===selectedIndex?'aria-current="true"':''}><span class="layer-num">${l.number}</span><span class="layer-swatch" style="background:${l.color}"></span><span class="layer-title">${esc(l.name)}</span><span aria-hidden="true">${i===selectedIndex?'↗':''}</span></button>`).join('');}
function textureGraphic(id){return textureCanvases.get(id)?.toDataURL('image/png')||'';}
function renderDetails(){
 const box=$('#detailsContent');$('#layerCounter').textContent=`${layers[selectedIndex].number} / 06`;$('#tourProgress').textContent=`${layers[selectedIndex].number} / 06`;
 if(mode==='texture'){
  box.innerHTML=`<p class="detail-overline">MATERIAL, NOT DEPTH</p><h2>How decomposed<br/>is this peat?</h2><p class="detail-subtitle">Fibric, hemic and sapric describe the organic material's decomposition—not three compulsory layers and not hydrological zones.</p><div class="texture-grid">${[['Fibric','Recognizable, comparatively abundant plant fibres.','sphagnum'],['Hemic','Intermediate degree of alteration and fibre content.','buried'],['Sapric','Strongly decomposed with little recognizable fibre.','sapric-exemplar']].map(([t,d,id])=>`<div class="texture-item"><div class="sample" style="background-image:url(${textureGraphic(id)});background-size:cover"></div><b>${t}</b><small>${d}</small></div>`).join('')}</div><p class="caveat">These visual swatches are artist-made approximations, not sampled or diagnostically classified materials. Proper classification uses field criteria such as rubbed fibre content, as specified by USDA Soil Taxonomy.</p><p class="detail-section-label">WHY THIS MATTERS</p><ul><li>Fibric material can be preserved at depth.</li><li>Humification can vary non-monotonically down a peat column.</li><li>Do not use colour alone as a decomposition measurement.</li></ul><p class="detail-section-label">RESEARCH & DEFINITIONS</p>${citations(['usda','zaccone'])}`;
 }else if(mode==='water'){
  box.innerHTML=`<p class="detail-overline">FUNCTION, NOT TEXTURE</p><h2>Two hydrological<br/>zones</h2><p class="detail-subtitle">The acrotelm and catotelm describe how a peatland functions, especially how water moves and decomposition proceeds.</p><div class="detail-visual" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(175deg,#5a7750 0%,#83a28a 36%,#243e42 39%,#1d3741 100%)"><span style="font-family:Georgia,serif;color:#eff5e4;font-size:22px">surface fluctuations ↓ saturation</span></div><p class="detail-section-label">HYDROLOGICAL STRUCTURE</p><ul><li><strong>Acrotelm:</strong> relatively active upper zone with water-table fluctuations, generally greater biological activity and hydraulic conductivity.</li><li><strong>Catotelm:</strong> deeper, generally more permanently saturated, oxygen-limited peat where decomposition is slow.</li><li>The functional boundary varies with site and is not always a visible stratigraphic boundary.</li></ul><p class="caveat">The translucent 3D overlay is schematic. Its boundary is deliberately approximate, not a measured water-table position or an acrotelm thickness inferred from this core.</p><p class="detail-section-label">FOUNDATIONAL REFERENCES</p>${citations(['ingram','clymo'])}`;
 }else{
   let l=layers[selectedIndex];box.innerHTML=`<p class="detail-overline">LAYER ${l.number} / ${esc(l.mini)}</p><h2>${esc(l.headline)}</h2><p class="detail-subtitle">${esc(l.sub)}</p><div class="detail-visual"><canvas data-tex="${l.id}" aria-label="Illustrative ${esc(l.name)} texture"></canvas><div class="detail-visual-label">${esc(l.label)}</div></div><p class="detail-section-label">LOOK CLOSER</p><ul>${l.points.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><div class="caveat"><strong>Scientific note.</strong> ${esc(l.caveat)}</div><p class="detail-section-label">EXPLORE THE EVIDENCE</p>${citations(l.refs)}`;
   const canvas=box.querySelector('canvas[data-tex]');let ctx=canvas.getContext('2d');canvas.width=720;canvas.height=240;ctx.drawImage(textureCanvases.get(l.id),0,0,720,240);
 }
 $('#prevButton').disabled=selectedIndex===0;$('#nextButton').textContent=selectedIndex===layers.length-1?'BACK TO SURFACE ↺':'NEXT LAYER →';
}
function choose(i,auto=true){selectedIndex=Math.max(0,Math.min(layers.length-1,i));if(mode!=='strata'&&auto){mode='strata';refreshMode();}renderNav();renderDetails();focusHook(selectedIndex);renderHook();}
function refreshMode(){document.querySelectorAll('[data-mode]').forEach(b=>{let yes=b.dataset.mode===mode;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes));});let badge=$('#zoneBadge');badge.hidden=mode!=='water';badge.textContent='The acrotelm–catotelm boundary is a schematic functional transition, not a measured soil horizon.';setModeHook(mode);renderDetails();}
$('#layerNav').addEventListener('click',e=>{let b=e.target.closest('button[data-index]');if(b)choose(Number(b.dataset.index));});
$('#prevButton').addEventListener('click',()=>choose(selectedIndex-1));$('#nextButton').addEventListener('click',()=>choose((selectedIndex+1)%layers.length));
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;refreshMode();renderHook();}));
$('#cutButton').addEventListener('click',()=>{cutaway=!cutaway;$('#cutButton').classList.toggle('active',cutaway);$('#cutButton').setAttribute('aria-pressed',String(cutaway));renderHook('cutaway');});
$('#spinButton').addEventListener('click',()=>{spinning=!spinning;$('#spinButton').classList.toggle('active',spinning);$('#spinButton').setAttribute('aria-pressed',String(spinning));renderHook('spin');});
$('#resetButton').addEventListener('click',()=>{selectedIndex=0;mode='strata';cutaway=false;spinning=false;$('#cutButton').classList.remove('active');$('#spinButton').classList.remove('active');$('#cutButton').setAttribute('aria-pressed','false');$('#spinButton').setAttribute('aria-pressed','false');refreshMode();choose(0);renderHook('reset');});
const dialog=$('#infoDialog');
function showDialog(type){if(type==='method'){$('#dialogBody').innerHTML=`<p class="detail-overline">CURATOR'S NOTE</p><h2 id="modalTitle">What this model can—and cannot—show</h2><p>This is an <strong>illustrative reconstruction</strong> of one plausible European Sphagnum raised-bog developmental sequence, not a photographed, sampled, dated or georeferenced peat core. All visual thicknesses, colours and texture details are artistic and <strong>not to scale</strong>.</p><h3>What is evidence-informed?</h3><ul><li>Recognizable bog and fen plant material can occur in peat; botanical layers may record vegetation changes.</li><li>Decomposition classes (fibric / hemic / sapric) describe material properties—not fixed depth intervals.</li><li>Acrotelm / catotelm refer to hydrological function—not visual material classes.</li><li>Basal gyttja can accompany lake-infilling (terrestrialisation), while peat may form directly on mineral ground via paludification; neither pathway explains all peatlands.</li></ul><h3>What is intentionally not claimed?</h3><p>No depth, age, rate of accumulation, actual water table, plant identification, chemistry, taxonomic classification or site-specific sequence can be inferred from the geometry. The optional older fen layer, mixed basal contact and surface Sphagnum are <em>scenario assumptions</em>.</p><h3>Key literature</h3>${citations(Object.keys(SOURCES))}`;}
else{$('#dialogBody').innerHTML=`<p class="detail-overline">VISITOR GUIDE</p><h2 id="modalTitle">Explore beneath the surface</h2><p>Inspect this virtual core in your browser using a mouse, trackpad, keyboard or touch screen.</p><ul><li><strong>Rotate:</strong> drag the core. <strong>Zoom:</strong> mouse wheel or pinch. <strong>Pan:</strong> right-drag / two-finger drag.</li><li><strong>Select:</strong> click a visible layer of the 3D core, or choose a named layer on the left.</li><li><strong>Cutaway:</strong> reveal an artistic cross-section. <strong>Auto-spin:</strong> turn the core slowly.</li><li><strong>Views:</strong> switch between stratigraphy, hydrological functions and decomposition materials.</li><li><strong>Keyboard:</strong> left and right arrows while the 3D area is focused select layers; Escape closes this window. The left layer list is fully keyboard accessible.</li><li><strong>Evidence:</strong> open the linked scholarly references from the right-hand panel.</li></ul><p>All textures and embedded debris are procedurally drawn, not measured images. See “About this reconstruction” for scientific limits.</p>`;}dialog.showModal();}
$('#helpButton').addEventListener('click',()=>showDialog('help'));$('#methodButton').addEventListener('click',()=>showDialog('method'));
$('#viewport').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();choose((selectedIndex+1)%layers.length);}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();choose((selectedIndex+layers.length-1)%layers.length);}});
renderNav();renderDetails();

async function createScene(){
 let THREE, OrbitControls;try{THREE=await import('three');({OrbitControls}=await import('three/addons/controls/OrbitControls.js'));}catch(e){console.error('Three.js failed to load',e);$('#loadError').hidden=false;return;}
 const mount=$('#webglMount'),viewport=$('#viewport');let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch(e){console.error(e);$('#loadError').hidden=false;return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;mount.appendChild(renderer.domElement);
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,80);camera.position.set(7.5,3.25,12.7);
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.02,0);controls.enableDamping=true;controls.dampingFactor=.075;controls.minDistance=5;controls.maxDistance=23;controls.maxPolarAngle=Math.PI*.88;controls.autoRotate=false;controls.autoRotateSpeed=.5;controls.enablePan=true;
 scene.add(new THREE.HemisphereLight(0xe6f6df,0x3b3024,2.1));
 const key=new THREE.DirectionalLight(0xffe7b9,3.1);key.position.set(5,9,8);scene.add(key);
 const fill=new THREE.DirectionalLight(0x9dd2ce,1.8);fill.position.set(-6,2,-8);scene.add(fill);
 const rim=new THREE.DirectionalLight(0xcddba1,2.6);rim.position.set(-4,6,4);scene.add(rim);
 const display=new THREE.Group();scene.add(display);
 const coreGroup=new THREE.Group();display.add(coreGroup);
 const coreRadius=.92, top=2.85, meshes=[], textures=[];
 let cursor=top;
 const layerMeshes=[];
 function shape(radius,height,angleStart,angleLength,seed){
  const geom=new THREE.CylinderGeometry(radius,radius,height,112,25,false,angleStart,angleLength);
  const a=geom.attributes.position;
  for(let j=0;j<a.count;j++){
   const x=a.getX(j),y=a.getY(j),z=a.getZ(j);
   const phi=Math.atan2(x,z);
   const perturb=1+.023*Math.sin(phi*11+y*18+seed)+.011*Math.sin(phi*41-y*33+seed*.7)+.008*Math.sin(phi*97+y*81);
   a.setXYZ(j,x*perturb,y+Math.sin(phi*17+seed)*.009,z*perturb);
  }
  geom.computeVertexNormals();return geom;
 }
 function cutFace(angle,h,y,mat){
  const geom=new THREE.PlaneGeometry(coreRadius,h,20,30),a=geom.attributes.position;
  for(let v=0;v<a.count;v++){const x=a.getX(v);a.setZ(v,Math.sin(x*13+y*9)*.011);}
  geom.computeVertexNormals();const mesh=new THREE.Mesh(geom,mat);mesh.rotation.y=angle-Math.PI/2;mesh.position.set(coreRadius*.5*Math.sin(angle),y,coreRadius*.5*Math.cos(angle));return mesh;
 }
 const topSlices=[],cutSlices=[];
 layers.forEach((l,i)=>{
  const height=l.height,y=cursor-height/2;cursor-=height;
  const texture=new THREE.CanvasTexture(textureCanvases.get(l.id));texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=THREE.RepeatWrapping;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());textures.push(texture);
  const normalMaterial=new THREE.MeshStandardMaterial({map:texture,color:0xffffff,roughness:.99,metalness:0,side:THREE.DoubleSide,emissive:0x4e351c,emissiveIntensity:0});
  const cutMat=new THREE.MeshStandardMaterial({map:texture,roughness:1,side:THREE.DoubleSide,emissive:0x4e351c,emissiveIntensity:0});
  const full=new THREE.Mesh(shape(coreRadius,height,0,Math.PI*2,i*5.7),normalMaterial);full.position.y=y;full.userData.layerIndex=i;coreGroup.add(full);meshes.push(full);
  const cut=new THREE.Mesh(shape(coreRadius,height,Math.PI*.26,Math.PI*1.48,i*5.7),cutMat);cut.position.y=y;cut.userData.layerIndex=i;cut.visible=false;coreGroup.add(cut);meshes.push(cut);
  const faces=new THREE.Group();faces.add(cutFace(Math.PI*.26,height,y,cutMat),cutFace(Math.PI*1.74,height,y,cutMat));faces.visible=false;coreGroup.add(faces);cutSlices.push(faces);
  layerMeshes.push({full,cut,faces,top:y+height/2,bottom:y-height/2,y,height,material:normalMaterial,cutMaterial:cutMat});
 });
 // Botanical surface: tufts and upright stems in green/yellow/rust tones.
 const veget=new THREE.Group();coreGroup.add(veget);const mr=rng(91235);
 const mossMaterials=['#8eb555','#c1cb61','#667c32','#dde08c','#b5b04d','#7d9c48','#c8b378'].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1,side:THREE.DoubleSide}));
 const twigGeo=new THREE.CylinderGeometry(.004,.012,.25,5);twigGeo.translate(0,.125,0);
 for(let i=0;i<430;i++){
   let r=Math.sqrt(mr())*coreRadius*.98,angle=mr()*Math.PI*2;
   let x=r*Math.cos(angle),z=r*Math.sin(angle),len=.09+mr()*.28;
   const m=new THREE.Mesh(twigGeo,mossMaterials[Math.floor(mr()*mossMaterials.length)]);m.position.set(x,top-.02,z);m.scale.set(.5+mr(),len/.25,.5+mr());m.rotation.z=(mr()-.5)*.7;m.rotation.x=(mr()-.5)*.7;veget.add(m);
   if(i%6===0){const bud=new THREE.Mesh(new THREE.IcosahedronGeometry(.018+mr()*.02,0),mossMaterials[Math.floor(mr()*4)]);bud.position.set(x,top+len*.83,z);veget.add(bud);}
 }
 // Seeded exposed plant strands distributed over selected cylindrical walls.
 const fiberColors=['#c8a678','#8f6b4b','#e7c792','#5c3d2a','#aa8959'];const fiberMats=fiberColors.map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1}));
 const strandGeo=new THREE.CylinderGeometry(.008,.007,.19,4);let fullFiber=new THREE.Group();coreGroup.add(fullFiber);
 const strandRandom=rng(48789);
 layerMeshes.forEach((g,i)=>{
   if(i===5)return;const layer=layers[i],n=[90,220,155,150,30][i];
   const instances=fiberMats.map(mat=>{const im=new THREE.InstancedMesh(strandGeo,mat,n);im.count=0;fullFiber.add(im);return im;});
   const counts=[0,0,0,0,0];const dummy=new THREE.Object3D();
   for(let j=0;j<n;j++){
     const a=strandRandom()*2*Math.PI,p=(strandRandom()-.5)*layer.height*.92;
     dummy.position.set((coreRadius+.015)*Math.sin(a),g.y+p,(coreRadius+.015)*Math.cos(a));
     // Tangential fibre orientation, with arbitrary vertical component.
     dummy.rotation.set(.22+(strandRandom()-.5)*1.8,-a+.15,(strandRandom()-.5)*1.3);
     let scale=.4+strandRandom()*1.8;dummy.scale.set(.65+strandRandom(),scale,.65+strandRandom());dummy.updateMatrix();
     const c=Math.floor(strandRandom()*5);instances[c].setMatrixAt(counts[c]++,dummy.matrix);
   }
   instances.forEach((im,k)=>{im.count=counts[k];im.instanceMatrix.needsUpdate=true;});
 });
 // Core end caps, supporting stand and grounded shadow disc.
 const stand=new THREE.Group();scene.add(stand);stand.position.y=cursor-.14;
 const standMat=new THREE.MeshStandardMaterial({color:0x172b24,metalness:.48,roughness:.36});
 const pedestal1=new THREE.Mesh(new THREE.CylinderGeometry(1.27,1.37,.16,96),standMat);stand.add(pedestal1);
 const pedestal2=new THREE.Mesh(new THREE.CylinderGeometry(1.42,1.5,.075,96),new THREE.MeshStandardMaterial({color:0x8c7956,metalness:.65,roughness:.32}));pedestal2.position.y=-.13;stand.add(pedestal2);
 const pedestal3=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.6,.14,96),standMat);pedestal3.position.y=-.23;stand.add(pedestal3);
 const groundDisc=new THREE.Mesh(new THREE.CircleGeometry(3.0,120),new THREE.MeshBasicMaterial({color:0x7ea77c,transparent:true,opacity:.035,side:THREE.DoubleSide}));groundDisc.rotation.x=-Math.PI/2;groundDisc.position.y=cursor-.54;scene.add(groundDisc);
 const bright=new THREE.MeshBasicMaterial({color:0xe8c68d,transparent:true,opacity:.9});
 const selectionRings=[];
 for(let x=0;x<2;x++){let ring=new THREE.Mesh(new THREE.TorusGeometry(coreRadius+.06,.013,7,128),bright);ring.rotation.x=Math.PI/2;coreGroup.add(ring);selectionRings.push(ring);}
 // Hydrological zones drawn outside the material, deliberately approximate.
 const zones=new THREE.Group();zones.visible=false;coreGroup.add(zones);
 const acBottom=top-1.22;const peatBase=layerMeshes[4].bottom;
 for(const [a,b,col] of [[top,acBottom,0x8bba91],[acBottom,peatBase,0x6ea8b7]]){
  let cy=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,a-b,96,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.105,depthWrite:false,side:THREE.DoubleSide}));cy.position.y=(a+b)/2;zones.add(cy);
  let rim=new THREE.Mesh(new THREE.TorusGeometry(1.15,.008,6,120),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.62}));rim.rotation.x=Math.PI/2;rim.position.y=a;zones.add(rim);
 }
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let pointerDown=null;
 renderer.domElement.addEventListener('pointerdown',e=>{pointerDown={x:e.clientX,y:e.clientY};});
 renderer.domElement.addEventListener('pointerup',e=>{
  if(!pointerDown)return;const dist=Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y);pointerDown=null;if(dist>7)return;
  const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(meshes.filter(m=>m.visible));if(hits.length){choose(hits[0].object.userData.layerIndex);}
 });
 let targetY=0, animatedTargetY=0;
 focusHook=(idx)=>{
  const part=layerMeshes[idx];selectionRings[0].position.y=part.top;selectionRings[1].position.y=part.bottom;
  // Soft focus movement rather than changing camera angle: selected layer stays visible.
  targetY=Math.max(-.5,Math.min(.5,part.y*.11));
  layerMeshes.forEach((entry,i)=>{entry.material.emissiveIntensity=i===idx?.12:0;entry.cutMaterial.emissiveIntensity=i===idx?.14:0;});
 };
 setModeHook=(m)=>{zones.visible=m==='water';selectionRings.forEach(r=>r.visible=m==='strata');};
 function resetCamera(){camera.position.set(7.5,3.25,12.7);controls.target.set(0,.02,0);controls.update();}
 function applyCut(){layerMeshes.forEach(o=>{o.full.visible=!cutaway;o.cut.visible=cutaway;o.faces.visible=cutaway;});fullFiber.visible=!cutaway;}
 renderHook=(action)=>{applyCut();zones.visible=mode==='water';selectionRings.forEach(r=>r.visible=mode==='strata');controls.autoRotate=spinning;if(action==='reset')resetCamera();};
 focusHook(selectedIndex);renderHook();
 function resize(){const b=mount.getBoundingClientRect();let w=Math.max(1,b.width),h=Math.max(1,b.height);camera.aspect=w/h;camera.fov=window.innerWidth<650?44:35;camera.updateProjectionMatrix();renderer.setSize(w,h,false);}
 const observer=new ResizeObserver(resize);observer.observe(mount);resize();
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let last=0;
 function animate(t){requestAnimationFrame(animate);let dt=Math.min((t-last)/16.67||1,3);last=t;
  if(reduceMotion.matches)controls.autoRotate=false;else controls.autoRotate=spinning;
  animatedTargetY+=(targetY-animatedTargetY)*Math.min(.08*dt,1);
  controls.target.y=animatedTargetY;
  controls.update();renderer.render(scene,camera);
 }
 requestAnimationFrame(animate);
}
createScene();