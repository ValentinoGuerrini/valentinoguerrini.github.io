# Portfolio card content

Updated 6 November 2026. Keep the benchmark conditions when reusing a figure.

| Card | Figure | Source and scope |
| --- | --- | --- |
| Sparse Blossom / QEC | 2.75× speedup; 9.59× energy efficiency | *Towards the Acceleration of the Sparse Blossom Algorithm for Quantum Error Correction*, IPDPSW / RAW 2024, pp. 108–109. FL1 collision-prediction component of the flooder, AMD Alveo U55C, 2,000 input nodes, vs. the corresponding Python implementation on Ryzen 7 3700X. CPU power uses TDP; FPGA power was measured. These are not speedups for the entire decoder. [Paper](https://ieeexplore.ieee.org/abstract/document/10596535). |
| ReFHE-NTT | Up to 1.98× slice-equivalent efficiency | *ReFHE-NTT: Resource-Driven NTT FPGA Architecture for Fully Homomorphic Encryption*, FCCM 2026, abstract and introduction. Comparison is with the most resource-efficient prior FPGA design, not the fastest prior design. KV260 supports polynomial sizes 2^12–2^16 and compatible 32–64-bit primes. [Paper](https://ieeexplore.ieee.org/abstract/document/11552700). |
| ReFHE-CKKS | 38.5× encode–encrypt; 54.7× decrypt–decode | Valentino Guerrini, *ReFHE-CKKS: Enabling Client Side Fully Homomorphic Encryption on Embedded FPGAs*, thesis copy supplied 5 November 2026, abstract and §5.8 (p. 31). Full packing, N = 65,536, five active 64-bit primes, pseudo-Mersenne backend at 300 MHz. Baseline: extended Full-RNS HEAAN on the KV260 ARM Cortex-A53. Times include all five successive limb calls. Each kernel fits individually; simultaneous placement is not claimed. |
| AVIWC | >97% scratch-detection precision; 6,000 training images; approximately €300 prototype | [Official ASP project page](https://www.asp-poli.it/aviwxc/). Team results with Collins Aerospace, ResNet-18 and a stepper-motor/Arduino rotation prototype. The 97% figure is precision, not accuracy or recall. Crack and porosity detection remained limited by labelled data. |
| UIC | GPA 3.71 / 4.00 | User-supplied education history. |

## Publication links

The user supplied these exact publication/profile destinations. IEEE Xplore did not provide readable page content through the research tool; paper content was checked against the supplied PDFs. DATE 2026 is the related NTT work, *Exploring a Resource-Efficient NTT FPGA Accelerator for Fully Homomorphic Encryption*; the portfolio links it separately from the FCCM paper. CKKS thesis results are not attributed to either NTT publication.

- [DATE 2026](https://ieeexplore.ieee.org/abstract/document/11539423)
- [Google Scholar](https://scholar.google.com/citations?view_op=list_works&hl=it&hl=it&user=TxbXScEAAAAJ)
- [ReFHE-NTT code](https://github.com/necst/ReFHE-NTT)

No new speedup is claimed for the MPI or Huawei cards. Hardware roles, education and teaching information use the existing portfolio and the user's supplied professional history. The SHA-3 project is identified as separate work rather than represented as an STMicroelectronics deliverable.

## Logo assets

Logos are stored locally in `public/assets/logos/`, with original source URLs in `sources.json`. Assets retain their colours and proportions, with no runtime third-party image requests. Logos identify the institutions in the user's education, employment and research history; their trademarks belong to their respective owners. Collins Aerospace's official mark is sourced from its Wikimedia Commons copy; the other marks come from the institutions' websites.
