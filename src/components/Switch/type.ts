export interface switchProps {
    modelValue: boolean;
    disabled?: boolean;
    size?: 'small' | 'large';
    activeText?: string;
    inactiveText?: string;
    name?: string;
    id:string;

}

export interface switchEmits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'change', value: boolean): void;
}