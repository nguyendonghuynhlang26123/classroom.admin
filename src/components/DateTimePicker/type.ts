export type MyTimePickerProps = {
  value: number;
  label: string;
  handleChange: (dt: any) => void;
  disabled: boolean;
  [x: string]: any; // Other props
};
