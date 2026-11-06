import { links } from './links';
import type { Institution } from './institutions';

export type JourneyCard = {
  icon: string;
  label: string;
  title: string;
  text: string;
  footnote: string;
  institutions?: Institution[];
  metrics?: { value: string; label: string }[];
  metricNote?: string;
  links?: { url: string; label: string; accessibleLabel?: string }[];
  detail?: number;
};

export const story: { id: string; label: string; number: string; date: string; cards: JourneyCard[] }[] = [
  { id:'beginning', label:'The journey', number:'00', date:'Piacenza → Zürich', cards:[
    { icon:'compass', label:'Computer architecture · Hardware acceleration', title:'Valentino Guerrini.',
      text:'I design **hardware accelerators for server SoCs** in Zürich. My background spans **FPGA architectures**, applied cryptography and high-performance computing.',
      footnote:'Italian engineer · Digital design · Reconfigurable computing', detail:0 },
  ]},
  { id:'piacenza', label:'Piacenza', number:'01', date:'Where it starts', cards:[
    { icon:'home', label:'Home · Northern Italy', title:'A place to start.',
      text:'I grew up in the hills around **Piacenza**. Studying and research took me to Milan, Chicago and Zürich. Italy is still home.',
      footnote:'Next stop: Milan.' },
  ]},
  { id:'milan', label:'Milan', number:'02', date:'2020–2026', cards:[
    { icon:'book', institutions:['polimi'], label:'Education · Computer engineering', title:'Computer architecture.',
      text:'A **BSc in Engineering of Computing Systems** and an **MSc in Computer Science and Engineering**, focused on hardware design and computer architecture. At NECSTLab, I turned algorithms into FPGA accelerators.',
      footnote:'BSc 2023 · MSc 2026', detail:2 },
    { icon:'lock', institutions:['st'], label:'Research internship · Embedded security', title:'Embedded cryptography.',
      text:'Analysed **performance–memory trade-offs for zero-knowledge protocols** on microcontrollers. A separate project implemented **ISW-masked SHA-3 on ARM Cortex-M4** to protect against power-analysis attacks.',
      footnote:'Advanced Research · 2023–2024 · C / C++',
      links:[{ url:links.sha3, label:'View the SHA-3 code' }] },
    { icon:'atom', institutions:['necstlab'], label:'FPGA · Quantum error correction', title:'Accelerating Sparse Blossom.',
      text:'Co-developed **FPGA collision prediction** for the Sparse Blossom flooder in quantum error correction, on **AMD Alveo U55C**.',
      metrics:[{ value:'2.75×', label:'speedup' },{ value:'9.59×', label:'energy efficiency' }],
      metricNote:'At 2,000 nodes vs. Python on Ryzen 7 3700X. CPU energy uses rated power.',
      footnote:'**Best Poster Award** · RAW 2024',
      links:[{ url:links.qec, label:'Read the QEC paper' }] },
    { icon:'chip', institutions:['necstlab'], label:'FPGA · Fully homomorphic encryption', title:'ReFHE-NTT.',
      text:'Designed a **resource-efficient NTT accelerator** for Kria KV260 with **on-the-fly twiddle generation**. Supports **4,096–65,536 coefficients** and **32–64-bit primes**.',
      metrics:[{ value:'1.98×', label:'slice-equivalent efficiency' }],
      metricNote:'Up to, vs. the most resource-efficient prior FPGA design.',
      footnote:'Publications · FCCM 2026 · DATE 2026',
      links:[{ url:links.refheNtt, label:'FCCM 2026', accessibleLabel:'Read the ReFHE-NTT paper at FCCM 2026' },{ url:links.date2026, label:'DATE 2026', accessibleLabel:'Read the DATE 2026 NTT paper' }] },
    { icon:'chip', institutions:['polimi','necstlab'], label:'Master’s thesis · Embedded FHE', title:'ReFHE-CKKS.',
      text:'Built **two FPGA kernels for the complete CKKS client workflows**: encode–encrypt and decrypt–decode. Each fits individually on Kria KV260, with buffer reuse keeping memory independent of prime count.',
      metrics:[{ value:'38.5×', label:'encode + encrypt' },{ value:'54.7×', label:'decrypt + decode' }],
      metricNote:'Vs. extended Full-RNS HEAAN on ARM Cortex-A53; N = 65,536, five 64-bit primes, pseudo-Mersenne backend.',
      footnote:'MSc thesis · 2026 · Vitis HLS · Vivado · XRT' },
    { icon:'eye', institutions:['asp','collins'], label:'AVIWC · Aerospace inspection', title:'AVIWC.',
      text:'Our team combined **AI-based scratch detection** for coated aerospace rods with **automated rod rotation**. We trained ResNet-18 on **6,000 microscope images**.',
      metrics:[{ value:'>97%', label:'scratch-detection precision' },{ value:'≈€300', label:'rotation prototype' }],
      metricNote:'Scratch-detection results from the project dataset.',
      footnote:'Computer vision · Mechatronics',
      links:[{ url:links.aviwc, label:'Explore AVIWC' }] },
  ]},
  { id:'chicago', label:'Chicago', number:'03', date:'2024–2025', cards:[
    { icon:'skyline', institutions:['uic'], label:'Double degree · Computer science', title:'From FPGAs to HPC.',
      text:'Completed an **MS in Computer Science** through the PoliMi–UIC double-degree programme. My research shifted to **communication algorithms for supercomputers**.',
      footnote:'MS 2025 · GPA **3.71 / 4.00**' },
    { icon:'nodes', institutions:['uic'], label:'HPC research · Master’s thesis', title:'Hierarchical Allreduce.',
      text:'Implemented **configurable MPI collectives** in C / C++, combining communication within and across nodes. Evaluated topology, radix and message-size choices on **Polaris and Aurora**.',
      footnote:'Allgather · Reduce-scatter · Allreduce',
      links:[{ url:links.allreduce, label:'Explore the MPI code' }] },
    { icon:'teaching', institutions:['uic'], label:'Teaching assistant · Spring 2025', title:'Teaching CS 569.',
      text:'Worked as a **teaching assistant for CS 569** alongside my graduate research in high-performance computing.',
      footnote:'Graduate teaching · Computer science' },
  ]},
  { id:'zurich', label:'Zürich', number:'04', date:'2026–now', cards:[
    { icon:'chip', institutions:['huawei'], label:'Research Center Zürich · Hardware', title:'Accelerators for server SoCs.',
      text:'I work on **hardware accelerators for data analytics**, focusing on **computer architecture, data processing and memory** in server SoCs.',
      footnote:'2026–present · Zürich, Switzerland',
      links:[{ url:'https://linkedin.com/in/guerrini', label:'View my experience' }] },
    { icon:'mountain', label:'Life outside work', title:'A little more altitude.',
      text:'**Skiing, running and time with friends.** The mountains are a good reason to close the laptop, with Italy still close enough to feel like home.',
      footnote:'Zürich, Switzerland · Home for now' },
  ]},
  { id:'contact', label:'The next chapter', number:'05', date:'To be continued', cards:[
    { icon:'envelope', label:'An open conversation', title:'What comes next?',
      text:'**Computer architecture, hardware design, interesting engineering problems.** If our interests overlap, I’d be happy to hear from you.',
      footnote:'Based in Zürich · Italian & English',
      links:[{ url:'mailto:valentino.guerrini@outlook.com', label:'Say hello' }] },
  ]},
];
