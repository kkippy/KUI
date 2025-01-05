export interface InputProps {
    type:string;
    size?:'small' | 'large';
    clearable?:boolean;
    showPassword?:boolean;
    disabled?:boolean;
    modelValue:string;
}

export interface  InputEmits {
    (e:'change',value:string):void; //改变了值且失去了焦点
    (e:'blur',value:string):void;
    (e:'focus',value:string):void;
    (e:'clear'):void;
    (e:'input',value:string):void;
    (e:'update:modelValue',value:string):void
}