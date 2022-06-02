type sizeMetricsType = 'px' | 'cm' | 'mm' | 'inches';

type printMetricsType = 'pixels/inch' | 'pixels/cm';

type backgroundType = 'white' | 'black' | 'white-checkered' | 'black-checkered' | 'custom';

type fileStorageType = 'skip' | 'cloud' | 'driverts' | 'drivedl';

export type fileStateType = {
  width: number;
  height: number;
  sizeMetrics: sizeMetricsType;
  fileName: string;
  printRes: number;
  printResMetrics: printMetricsType;
  background: backgroundType;
  backgroundColor: string;
  fileStorage: fileStorageType;
};
