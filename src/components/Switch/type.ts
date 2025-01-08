export type SwitchValueType = string | number | boolean

export interface switchProps {
    modelValue: SwitchValueType;
    disabled?: boolean;
    size?: 'small' | 'large';
    activeText?: string;
    inactiveText?: string;
    name?: string;
    id?:string;
    activeValue?: SwitchValueType;
    inactiveValue?: SwitchValueType;
}

export interface switchEmits {
    (e: 'update:modelValue', value: SwitchValueType): void;
    (e: 'change', value: SwitchValueType): void;
}
