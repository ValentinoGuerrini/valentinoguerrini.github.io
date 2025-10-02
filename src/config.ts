export const siteConfig = {
  name: "Valentino Guerrini",
  title: "Computer Engineering Student",
  description: "Portfolio website of Valentino Guerrini",
  accentColor: "#ff6f00ff",
  social: {
    email: "valentino.guerrini@outlook.com",
    linkedin: "https://linkedin.com/in/guerrini",
    twitter: "https://x.com/rfitzio",
    github: "https://github.com/valentinoguerrini",
  },
  aboutMe:
    "I am Master’s student with a focus on Hardware Design andReconfigurable Architectures, combining hands-on research at NECSTLab with industry experience through a collaboration with STMicroelectronics. Currently expanding technical expertise through a dual degree in the U.S., developing a robust skill set to tackle complex challenges when tailoring algorithms on specific hardware architectures.",
  skills: ["RTL", "C", "C++", "Vivado", "Vitis", "FPGAs", "Cryptography"],
  projects: [
    {
      name: "AI Dev Roundup Newsletter",
      description:
        "One concise email. Five minutes. Every Tuesday. Essential AI news & trends, production-ready libraries, powerful AI tools, and real-world code examples",
      link: "https://aidevroundup.com/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      name: "Chrome Extension Mastery: Build Full-Stack Extensions with React & Node.js",
      description:
        "Master the art of building production-ready, full-stack Chrome Extensions using modern web technologies and best practices",
      link: "https://fullstackextensions.com/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
    {
      name: "ExtensionKit",
      description:
        "Kit to jump-start your Chrome extension projects with a variety of battle-tested starter templates & examples",
      link: "https://extensionkit.io/?ref=devportfolio",
      skills: ["React", "Node.js", "AWS"],
    },
  ],
  pubblications: [
    {
      name: "Towards the Acceleration of the Sparse Blossom Algorithm for Quantum Error Correction",
      description:
        "M. Venere, V. Guerrini, B. Branchini, D. Conficconi, D. Sciuto and M. D. Santambrogio",
      link: "https://ieeexplore.ieee.org/abstract/document/10596535",
      skills: ["Verilog", "C++", "FPGA Design", "XRT", "Vitis", "Quantum Computing"],
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
      degree: "Master of Science in Computer",
      dateRange: "2024 - 2025",
      achievements: [
        "GPA: 3.71",
        "Double Degree Program with Politecnico di Milano",
        "Thesis on High-Performance Computing",
      ],
    },
    {
      school: "Politecnico di Milano",
      degree: "Master of Science in Computer Science and Engineering",
      dateRange: "2023 - 2026",
      achievements: [
        "GPA: 27.89/30",
        // "Dean's List all semesters",
        // "President of Computer Science Club",
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
