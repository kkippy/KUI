import type {VNode} from "vue";
export interface SelectOption {
    label:string;
    value:string | number;
    disabled?:boolean
}

export interface SelectProps {
    modelValue:string,
    placeholder:string;
    disabled?:boolean;
    clearable?:boolean;
    options:SelectOption[],
    //自定义菜单
    renderLabel?:(option:SelectOption) => VNode;
    //可筛选
    filterable?:boolean;
    //远程搜索
    remoteMethod?:(value:any) => Promise<SelectOption[]>
}

export interface SelectStatus {
    inputValue:string;
    selectedOption: null |SelectOption ;
}

export interface SelectEmits {
    (e:'change',value:string) : void;
    (e:'update:modelValue',value:string):void;
    (e:'visible-change',value:boolean):void;
}
