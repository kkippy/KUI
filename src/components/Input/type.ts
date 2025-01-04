export interface InputProps {
    type:string;
    size?:'small' | 'large';
    clearable?:boolean;
    showPassword?:boolean;
    disabled?:boolean;
}

export interface  InputEmits {
    (e:'change',value:string):void;
    (e:'blur',value:string):void;
    (e:'focus',value:string):void;
    (e:'clear'):void;
    (e:'input',value:string):void;
}