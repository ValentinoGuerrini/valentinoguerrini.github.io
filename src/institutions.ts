export const institutions = {
  polimi: { name: 'Politecnico di Milano', file: 'polimi.svg', width: 131, height: 43 },
  uic: { name: 'University of Illinois Chicago', file: 'uic.png', width: 700, height: 146 },
  necstlab: { name: 'NECSTLab', file: 'necstlab.png', width: 500, height: 248 },
  asp: { name: 'Alta Scuola Politecnica', file: 'asp.png', width: 318, height: 60 },
  huawei: { name: 'Huawei', file: 'huawei.png', width: 266, height: 60 },
  collins: { name: 'Collins Aerospace', file: 'collins.svg', width: 512, height: 127 },
  st: { name: 'STMicroelectronics', file: 'st.svg', width: 188, height: 101 },
} as const;
export type Institution = keyof typeof institutions;
