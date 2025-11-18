const PRICE = {
  cpu: {
    "intel-i3-10100": 90,
    "intel-i3-12100f": 110,
    "intel-i5-12400f": 150,
    "intel-i5-13400f": 230,
    "intel-i7-13700kf": 380,
    "intel-i9-13900k": 550,
    "amd-ryzen3-3200g": 95,
    "amd-ryzen5-5600": 120,
    "amd-ryzen5-7600": 210,
    "amd-ryzen7-5700x": 200,
    "amd-ryzen9-7900x": 430
  },
  gpu: {
    "none": 0,
    "gtx-1650": 140,
    "gtx-1660-super": 190,
    "rtx-3050": 199,
    "rtx-3060": 269,
    "rtx-3070-ti": 599,
    "rtx-4070": 703,
    "rx-580": 160,
    "rx-6600": 219
  },
  ram: {
    "8": 25,
    "16": 40,
    "32": 80,
    "16d5": 75,
    "32d5": 140,
    "64d5": 260
  },
  storage: {
    "nvme500": 35,
    "nvme1tb": 66,
    "nvme2tb": 120,
    "hdd1tb": 35
  },
  placa: {
    "intel-ddr4": 90,
    "intel-ddr5": 160,
    "amd-am4-ddr4": 80,
    "amd-am5-ddr5": 150
  },
  fuente: {
    "500w": 45,
    "650w": 70,
    "850w": 120
  },
  cooler: {
    "stock": 0,
    "air": 35,
    "liquid": 120
  }
};

const marcaEl = document.getElementById('marca');
const familiaEl = document.getElementById('familia');
const genEl = document.getElementById('generacion');
const conGpuEl = document.getElementById('con-gpu');
const gpuWrap = document.getElementById('gpu-wrap');
const gpuEl = document.getElementById('gpu');
const ramEl = document.getElementById('ram');
const ssd1El = document.getElementById('ssd1');
const ssd2optEl = document.getElementById('ssd2opt');
const ssd2wrap = document.getElementById('ssd2wrap');
const ssd2El = document.getElementById('ssd2');
const btnGenerar = document.getElementById('btn-generar');
const listComp = document.getElementById('list-componentes');
const factura = document.getElementById('factura');
const subtotalEl = document.getElementById('subtotal');
const impuestoEl = document.getElementById('impuesto');
const totalEl = document.getElementById('total');

const families = {
  intel: [
    { id: 'i3', label: 'i3' },
    { id: 'i5', label: 'i5' },
    { id: 'i7', label: 'i7' },
    { id: 'i9', label: 'i9' }
  ],
  amd: [
    { id: 'r3', label: 'Ryzen 3' },
    { id: 'r5', label: 'Ryzen 5' },
    { id: 'r7', label: 'Ryzen 7' },
    { id: 'r9', label: 'Ryzen 9' }
  ]
};

const generaciones = {
  intel: {
    'i3': ['10th', '12th', '13th'],
    'i5': ['10th', '12th', '13th', '14th'],
    'i7': ['10th', '12th', '13th', '14th'],
    'i9': ['12th', '13th', '14th']
  },
  amd: {
    'r3': ['3000', '4100', '7000'],
    'r5': ['3000', '5000', '7000'],
    'r7': ['3000', '5000', '7000'],
    'r9': ['5000', '7000']
  }
};

const gpus = [
  { id: 'none', label: 'Sin GPU (usar integrada)' },
  { id: 'gtx-1650', label: 'GTX 1650' },
  { id: 'gtx-1660-super', label: 'GTX 1660 Super' },
  { id: 'rtx-3050', label: 'RTX 3050' },
  { id: 'rtx-3060', label: 'RTX 3060' },
  { id: 'rtx-3070-ti', label: 'RTX 3070 Ti' },
  { id: 'rtx-4070', label: 'RTX 4070' },
  { id: 'rx-580', label: 'RX 580' },
  { id: 'rx-6600', label: 'RX 6600' }
];

function fillSelect(selectEl, items, defaultLabel) {
  selectEl.innerHTML = '';
  const opt0 = document.createElement('option');
  opt0.value = '';
  opt0.textContent = defaultLabel || '-- Selecciona --';
  selectEl.appendChild(opt0);
  items.forEach(it => {
    const op = document.createElement('option');
    if (typeof it === 'string') { op.value = it; op.textContent = it; }
    else { op.value = it.id; op.textContent = it.label; }
    selectEl.appendChild(op);
  });
  selectEl.disabled = false;
}

marcaEl.addEventListener('change', () => {
  const m = marcaEl.value;
  if (!m) {
    familiaEl.innerHTML = '<option>(elige marca primero)</option>';
    familiaEl.disabled = true;
    genEl.disabled = true;
    return;
  }
  fillSelect(familiaEl, families[m], '-- Selecciona familia --');
  genEl.innerHTML = '<option>(elige familia)</option>';
  genEl.disabled = true;
});

familiaEl.addEventListener('change', () => {
  const m = marcaEl.value;
  const f = familiaEl.value;
  if (!f) {
    genEl.innerHTML = '<option>(elige familia)</option>';
    genEl.disabled = true;
    return;
  }
  const gens = generaciones[m][f] || [];
  fillSelect(genEl, gens, '-- Selecciona generación --');
});

conGpuEl.addEventListener('change', () => {
  const v = conGpuEl.value;
  if (v === 'si') {
    gpuWrap.style.display = 'block';
    fillSelect(gpuEl, gpus, '-- Selecciona GPU --');
  } else {
    gpuWrap.style.display = 'none';
    gpuEl.innerHTML = '';
  }
});

ssd2optEl.addEventListener('change', () => {
  ssd2wrap.style.display = ssd2optEl.value === 'si' ? 'block' : 'none';
});

btnGenerar.addEventListener('click', () => {
  const marca = marcaEl.value;
  const familia = familiaEl.value;
  const gen = genEl.value;
  const wantGpu = conGpuEl.value === 'si';
  const gpuId = gpuEl.value || 'none';
  const ramSel = ramEl.value;
  const ssd1 = ssd1El.value;
  const ssd2 = (ssd2optEl.value === 'si') ? ssd2El.value : null;

  if (!marca || !familia || !gen || !ramSel || !ssd1) {
    alert('Completa todos los campos.');
    return;
  }

  let cpuKey = '';
  if (marca === 'intel') {
    if (familia === 'i3') cpuKey = 'intel-i3-12100f';
    if (familia === 'i5') cpuKey = 'intel-i5-12400f';
    if (familia === 'i7') cpuKey = 'intel-i7-13700kf';
    if (familia === 'i9') cpuKey = 'intel-i9-13900k';
  } else {
    if (familia === 'r3') cpuKey = 'amd-ryzen3-3200g';
    if (familia === 'r5') cpuKey = 'amd-ryzen5-5600';
    if (familia === 'r7') cpuKey = 'amd-ryzen7-5700x';
    if (familia === 'r9') cpuKey = 'amd-ryzen9-7900x';
  }

  let ramTipo = 'DDR4';
  if (marca === 'amd' && gen >= 7000) ramTipo = 'DDR5';
  if (marca === 'intel' && gen >= 12) ramTipo = 'DDR5';

  let placaKey = '';
  if (marca === 'intel') {
    placaKey = (ramTipo === 'DDR4') ? 'intel-ddr4' : 'intel-ddr5';
  } else {
    placaKey = (ramTipo === 'DDR4') ? 'amd-am4-ddr4' : 'amd-am5-ddr5';
  }

  let fuenteKey = '500w';
  if (gpuId === 'rtx-3060' || gpuId === 'rx-6600') fuenteKey = '650w';
  if (gpuId === 'rtx-3070-ti' || gpuId === 'rtx-4070') fuenteKey = '850w';

  listComp.innerHTML = '';

  function addLine(nombre, precio) {
    const div = document.createElement('div');
    div.className = 'component-line';
    div.innerHTML = `<span class="name">${nombre}</span><span class="price">$${precio}</span>`;
    listComp.appendChild(div);
  }

  let subtotal = 0;

  const cpuPrice = PRICE.cpu[cpuKey];
  addLine(`CPU: ${cpuKey}`, cpuPrice); subtotal += cpuPrice;

  const ramPrice = PRICE.ram[ramSel];
  addLine(`RAM: ${ramSel}`, ramPrice); subtotal += ramPrice;

  const s1 = PRICE.storage[ssd1];
  addLine(`Almacenamiento: ${ssd1}`, s1); subtotal += s1;

  if (ssd2) {
    const s2 = PRICE.storage[ssd2];
    addLine(`Almacenamiento adicional: ${ssd2}`, s2); subtotal += s2;
  }

  const placaPrice = PRICE.placa[placaKey];
  addLine(`Placa base (${placaKey})`, placaPrice); subtotal += placaPrice;

  const fuentePrice = PRICE.fuente[fuenteKey];
  addLine(`Fuente (${fuenteKey})`, fuentePrice); subtotal += fuentePrice;

  const coolerPrice = PRICE.cooler.air;
  addLine('Cooler Air', coolerPrice); subtotal += coolerPrice;

  if (wantGpu) {
    const gpuPrice = PRICE.gpu[gpuId];
    addLine(`GPU: ${gpuId}`, gpuPrice); subtotal += gpuPrice;
  }

  const impuesto = Number((subtotal * 0.12).toFixed(2));
  const total = subtotal + impuesto;

  subtotalEl.textContent = `$${subtotal}`;
  impuestoEl.textContent = `$${impuesto}`;
  totalEl.textContent = `$${total}`;

  factura.style.display = 'block';
});

const modal = document.getElementById("modal-confirm");
const modalYes = document.getElementById("modal-yes");
const modalNo = document.getElementById("modal-no");

document.getElementById("btn-addcart").addEventListener("click", () => {
  const cliente = document.getElementById("cliente-nombre").value.trim();
  if (!cliente) return alert("Escribe tu nombre completo.");

  // Mostrar modal
  modal.style.display = "block";
});

modalNo.addEventListener("click", () => {
  modal.style.display = "none";

  document.getElementById("cliente-nombre").value = "";
  listComp.innerHTML = "";
  factura.style.display = "none";
  marcaEl.value = "";
  familiaEl.innerHTML = "<option>(elige marca primero)</option>";
  familiaEl.disabled = true;
  genEl.innerHTML = "<option>(elige familia)</option>";
  genEl.disabled = true;
  conGpuEl.value = "no";
  gpuWrap.style.display = "none";
  ssd2wrap.style.display = "none";
  ramEl.value = "";
  ssd1El.value = "";
  ssd2El.value = "";
  gpuEl.innerHTML = "";
});

modalYes.addEventListener("click", async () => {
  modal.style.display = "none";

  const cliente = document.getElementById("cliente-nombre").value.trim();

  const componentes = [...listComp.querySelectorAll(".component-line")]
    .filter(c => !["Subtotal", "IVA", "Total"].includes(c.querySelector(".name").innerText))
    .map(c => ({
      nombre: c.querySelector(".name").innerText,
      precio: parseFloat(c.querySelector(".price").innerText.replace("$", ""))
    }));

  const total = parseFloat(totalEl.textContent.replace("$", ""));

  try {
    const res = await fetch("/api/cotizacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente, componentes, total })
    });

    const data = await res.json();
    if (res.status === 201) {
      document.getElementById("cliente-nombre").value = "";
      listComp.innerHTML = "";
      factura.style.display = "none";
      marcaEl.value = "";
      familiaEl.innerHTML = "<option>(elige marca primero)</option>";
      familiaEl.disabled = true;
      genEl.innerHTML = "<option>(elige familia)</option>";
      genEl.disabled = true;
      conGpuEl.value = "no";
      gpuWrap.style.display = "none";
      ssd2wrap.style.display = "none";
      ramEl.value = "";
      ssd1El.value = "";
      ssd2El.value = "";
      gpuEl.innerHTML = "";
      alert("Cotización guardada en el carrito!");
    } else {
      alert("Error: " + data.msg);
    }
  } catch (error) {
    console.log(error);
    alert("Error al guardar cotización");
  }
});


