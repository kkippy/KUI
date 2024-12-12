import type {TooltipProps} from "@/components/Tooltip/type"
import type {VNode} from "vue";

export interface dropdownProps extends TooltipProps {
    menuOption:MenuOption[]
}

export interface MenuOption {
    label:string | VNode,
    key:string | number,
    disabled?:boolean,
    divided?:boolean,
}

export interface DropdownEmits {
    (e:'visible-change', visible:boolean) : void, //控制显示隐藏的点击事件
    (e:'select-change', value:MenuOption):void //选中事件
}

//实例
export interface DropdownInstance {
    hide:()=>void,
    show:()=>void,
}
