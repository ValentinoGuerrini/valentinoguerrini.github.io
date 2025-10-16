export const siteConfig = {
  name: "Valentino Guerrini",
  title: "Computer Engineering Student",
  description: "Portfolio website of Valentino Guerrini",
  accentColor: "#ff6f00ff",
  social: {
    email: "valentino.guerrini@outlook.com",
    linkedin: "https://linkedin.com/in/guerrini",
    //twitter: "https://x.com/rfitzio",
    github: "https://github.com/valentinoguerrini",
  },
  aboutMe:
    "I am a graduate researcher pursuing a dual Master's in Computer Science at the University of Illinois Chicago and Computer Engineering at Politecnico di Milano. My work spans high-performance computing, reconfigurable architectures, and applied cryptography, with a focus on optimizing MPI communication algorithms and developing FPGA accelerators for homomorphic encryption. I have experience with both edge devices (Kria KV260) and datacenter platforms (Versal VCK5000, AMD Alveo U55C), and my broader interests lie at the intersection of algorithms, hardware design, and distributed systems to make computation faster, more secure, and more efficient.",
  skills: ["Verilog", "C", "C++","Java", "Vivado", "Vitis", "FPGAs", "Cryptography"],
  projects: [
    {
      name: "Homomorphic Encryption Acceleration Through Reconfigurable Fabric",
      description:
        "Developed FPGA accelerator for homomorphic encryption, achieving significant speedups for small polynomials and integrating with Full-RNS HEAAN, Finalist in AMD Open Hardware 2024",
      link: "https://github.com/ValentinoGuerrini/AOHW-24-HERF",
      skills: ["Verilog", "C++", "FPGA Design", "XRT", "Vitis", "Cryptography"],
    },
    {
      name: "Autonomous Visual Inspection Tungsten-Based Coating",
      description:
        "Developed in collaboration with Collins Aerospace a hybrid AI-mechatronic system to automate visual inspection of HVOF-coated aerospace rods, achieving >97% scratch detection accuracy and reducing manual workload through automated rod rotation.",
      link: "https://www.asp-poli.it/asp-projects",
      skills: ["Machine Learning", "Automation", "Computer Vision", "Embedded Systems", "Multidisciplinary"],
    },
    {
      name: "QuErK: Accelerating Quantum Error Correction through FPGAs",
      description:
        "FPGA Based Accelerator for Sparse Blossom Algorithm for Quantum Error Correction on AMD U55C FPGA, achieving a top speedup of 49x with respect to software.",
      link: "https://github.com/ValentinoGuerrini/xohw23-Accelerating-QEC-FPGAs.git",
      skills: ["Verilog", "C++", "FPGA Design", "XRT", "Vitis", "Quantum Computing"],
    },
    {
      name: "DPA Attack resistant SHA-3 Algorithm for Cortex-M4 Microcontrollers",
      description:
        "Implemented the Ishai-Sahai-Wagner (ISW) protection scheme to safeguard the Secure Hash Algorithm 3 (SHA-3) against Differential Power Analysis (DPA) attacks on ARM Cortex M4 microcontrollers.",
      link: "https://github.com/ValentinoGuerrini/CortexM4-ISW-Masked-SHA3.git",
      skills: ["C/C++", "STM32", "Embedded Systems Programming", "Applied Cryptography", "Side-Channel Attack Countermeasures"]
    },
    {
      name: "MyShelfie - Java Multiplayer Board Game",
      description:
        "Developed a full Java implementation of the MyShelfie board game with both GUI and networked multiplayer using RMI and sockets. Designed a resilient client-server architecture supporting chat, CLI, and fault tolerance.",
      link: "https://github.com/ValentinoGuerrini/ing-sw-2023-Gennaro-Poggi-Giliberto-Guerrini.git",
      skills: ["Java", "RMI", "Sockets", "Multiplayer", "JavaFX", "OOP", "Design Patterns", "Software Design", "Concurrency", "Version Control"]
    },
  ],
  pubblications: [
    {
      name: "[IPDPSW] Towards the Acceleration of the Sparse Blossom Algorithm for Quantum Error Correction",
      description:
        "M. Venere, V. Guerrini, B. Branchini, D. Conficconi, D. Sciuto and M. D. Santambrogio",
      link: "https://ieeexplore.ieee.org/abstract/document/10596535",
      //skills: ["Verilog", "C++", "FPGA Design", "XRT", "Vitis", "Quantum Computing"],
    },

  ],
  experience: [
    {
      company: "HPCLab, University of Illinois Chicago",
      title: "Research Assistant",
      dateRange: "Jan 2025 - Present",
      bullets: [
        "Researching MPI AllReduce optimizations for high-performance computing.",
        "Achieved 3.5× speedup over MPICH with a runtime-configurable Allgather algorithm for small–medium messages.",
        "Developing an enhanced Reduce-Scatter integration to further optimize AllReduce.",
      ],
    },
    {
      company: "NECSTLab, Politecnico di Milano",
      title: "Student Researcher",
      dateRange: "Oct 2022 - Present",
      bullets: [
        "Developed ReFHE-NTT FPGA accelerator integrated into Full-RNS HEAAN, enabling arbitrary-size CKKS polynomials with up to 4.5× speedup.",
        "Developed FPGA architecture for CKKS achieving up to 2149× speedup (KV260) and 798× (VCK5000) for small polynomials over CPU baselines",
        "Achieved a 2.75x speedup by accelerating the Sparse Blossom Algorithm for Quantum Error Correction on an AMD Alveo U55C FPGA",
      ],
    },
    {
      company: "STMicroelectronics",
      title: "Advanced Research Intern",
      dateRange: "Sep 2023 - Jan 2024",
      bullets: [
        "Joined the SRA security team in the Advanced Research department, focusing on cryptography and embedded systems.",
        "Conducted a detailed analysis of performance-memory trade-offs in microcontroller applications for different zero-knowledge protocols",
        "Coordinated with a team of 20+ researchers from both academia and industry",
      ],
    },
  ],
  education: [
        {
      school: "University of Illinois Chicago",
      degree: "Master of Science in Computer Science",
      dateRange: "2024 - 2025",
      achievements: [
        "GPA: 3.71",
        "Double Degree Program with Politecnico di Milano",
        "Thesis on High-Performance Computing, MPI AllReduce optimizations",
      ],
    },
    {
      school: "Politecnico di Milano",
      degree: "Master of Science in Computer Science and Engineering",
      dateRange: "2023 - 2026",
      achievements: [
        "GPA: 27.56/30",
        "Thesis on FPGA acceleration of CKKS Homomorphic Encryption Scheme",
        // "Dean's List all semesters",
        // "President of Computer Science Club",
      ],
    },
    {
      school: "Alta Scuola Politecnica",
      degree: "Multidisciplinary honour program",
      dateRange: "2023 - 2025",
      achievements: [
        "Selective honors program by Politecnico di Milano and Politecnico di Torino for top Master's students",
        "Focused on interdisciplinary innovation and complex problem-solving",
      ],
    },
    {
      school: "Politecnico di Milano",
      degree: "Bachelor of Science in Computer Engineering",
      dateRange: "2020 - 2023",
      achievements: [
        "Graded 108/110",
        // "Built 10+ portfolio projects",
        // "Specialized in React and Node.js",
      ],
    },
  ],
};
