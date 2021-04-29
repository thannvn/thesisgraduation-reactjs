export enum COLUMN_TYPE {
  ID = 0,
  STRING = 1,
  NUMBER = 2,
  BOOLEAN = 3,
  DATE_TIME = 4,
  EMAIL = 5,
  URL = 6,
};

interface Option {
  label: string,
  value: number,
}
export const options: Array<Option> = [
  { label: 'ID', value: COLUMN_TYPE.ID },
  { label: 'String', value: COLUMN_TYPE.STRING },
  { label: 'Number', value: COLUMN_TYPE.NUMBER },
  { label: 'Boolean', value: COLUMN_TYPE.BOOLEAN },
  { label: 'Date/Time', value: COLUMN_TYPE.DATE_TIME },
  { label: 'Email', value: COLUMN_TYPE.EMAIL },
  { label: 'Url', value: COLUMN_TYPE.URL },
];
