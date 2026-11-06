export type JourneyCard = {
  icon: string; label: string; title: string; text: string; footnote: string;
  link?: string; linkLabel?: string; detail?: number;
};
export const story: { id:string; label:string; number:string; date:string; cards:JourneyCard[] }[] = [
 { id:'beginning', label:'The journey', number:'00', date:'Piacenza → Zürich', cards:[
  {icon:'compass',label:'Computer architecture · Hardware acceleration',title:'Valentino Guerrini.',text:'I’m an Italian computer engineer based in Zürich. I work on hardware accelerators, with a background in reconfigurable computing and high-performance systems.',footnote:'Digital design · Reconfigurable computing',detail:0}
 ]},
 { id:'piacenza', label:'Piacenza', number:'01', date:'Where it starts', cards:[
  {icon:'home',label:'Home · Northern Italy',title:'A place to start.',text:'My story begins in the hills around Piacenza. Italy is still home, even as studying and research have taken me to Milan, across the Atlantic, and into Switzerland.',footnote:'Next stop: Politecnico di Milano.'}
 ]},
 { id:'milan', label:'Milan', number:'02', date:'2020–2026', cards:[
  {icon:'book',label:'Politecnico di Milano',title:'Learning to build.',text:'A bachelor’s and a master’s in computer engineering. At NECSTLab, my focus moved towards computer architecture: taking an algorithm and working out how to build the hardware around it.',footnote:'BSc 2023 · MSc 2026',detail:2},
  {icon:'lock',label:'STMicroelectronics · Embedded security',title:'Cryptography, close to the metal.',text:'As a research intern, I explored cryptography on microcontrollers and the trade-offs between performance and memory. Related work included protecting SHA-3 against side-channel attacks on ARM Cortex-M4.',footnote:'Embedded systems · C / C++',link:'https://github.com/ValentinoGuerrini/CortexM4-ISW-Masked-SHA3',linkLabel:'Explore the SHA-3 project'},
  {icon:'atom',label:'NECSTLab · Quantum error correction',title:'Hardware for quantum errors.',text:'With the team at NECSTLab, I worked on FPGA acceleration of the Sparse Blossom algorithm for quantum error correction, using an AMD Alveo U55C.',footnote:'Best Poster Award · RAW 2024',link:'https://github.com/ValentinoGuerrini/xohw23-Accelerating-QEC-FPGAs',linkLabel:'Explore QuErK'},
  {icon:'chip',label:'ReFHE · Fully homomorphic encryption',title:'Computing on encrypted data.',text:'From the number theoretic transform to the CKKS client pipeline, I designed FPGA accelerators for homomorphic encryption. The challenge: flexible parameters and efficient use of limited hardware resources.',footnote:'ReFHE-NTT · FCCM 2026',link:'https://github.com/ValentinoGuerrini/AOHW-24-HERF',linkLabel:'Explore ReFHE'},
  {icon:'eye',label:'Alta Scuola Politecnica',title:'Beyond one discipline.',text:'Through ASP, I worked with a multidisciplinary team and Collins Aerospace on automated visual inspection of coated rods. A chance to bring computation, sensing and a physical system together.',footnote:'Computer vision · Mechatronics · Teamwork',detail:6}
 ]},
 { id:'chicago', label:'Chicago', number:'03', date:'2024–2025', cards:[
  {icon:'skyline',label:'University of Illinois Chicago',title:'A different scale.',text:'The double-degree programme took me to Chicago for a master’s in computer science. A new city, a new research environment, and a shift from a single accelerator to entire supercomputers.',footnote:'MS Computer Science · 2025'},
  {icon:'nodes',label:'HPC research · Master’s thesis',title:'Getting machines talking.',text:'I researched configurable hierarchical Allreduce algorithms: how to organise communication across nodes, and how topology, message size and algorithm parameters affect performance on Polaris and Aurora.',footnote:'C / C++ · MPI · Parallel algorithms',link:'https://github.com/ValentinoGuerrini/Configurable-Hierarchical-Allreduce-Algorithms',linkLabel:'Explore the Allreduce project'},
  {icon:'teaching',label:'Teaching · CS 569',title:'Learning by teaching.',text:'Alongside research, I worked as a teaching assistant for CS 569. My time at UIC brought together graduate study, teaching and hands-on work with high-performance computing systems.',footnote:'Teaching assistant · Spring 2025'}
 ]},
 { id:'zurich', label:'Zürich', number:'04', date:'2026–now', cards:[
  {icon:'chip',label:'Huawei Research Center',title:'Closer to the silicon.',text:'I now work on hardware accelerators for server SoCs in Zürich. My focus is on computer architecture and making computation more efficient, with particular interest in data processing and memory.',footnote:'Hardware acceleration · Server SoCs',link:'https://linkedin.com/in/guerrini',linkLabel:'View my experience'},
  {icon:'mountain',label:'Life outside work',title:'A little more altitude.',text:'The mountains are a pretty good reason to close the laptop. Skiing, running and time with friends are part of life here, with Italy still close enough to feel like home.',footnote:'Zürich, Switzerland · Home for now'}
 ]},
 { id:'contact', label:'The next chapter', number:'05', date:'To be continued', cards:[
  {icon:'envelope',label:'An open conversation',title:'What comes next?',text:'Computer architecture, interesting engineering problems, or something I haven’t thought of yet. If our interests overlap, I’d be happy to hear from you.',footnote:'Based in Zürich · Italian & English',link:'mailto:valentino.guerrini@outlook.com',linkLabel:'Say hello'}
 ]}
];
