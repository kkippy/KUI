import type {Ref} from "vue";
import type { InjectionKey } from 'vue'
export type NameType =  string | number;

export interface CollapseItemProps {
  name: NameType;
  title?:string;
  disabled?: boolean;
}

export interface CollapseProps{
    modelValue:string[];
    accordion?: boolean;
}

export interface CollapseContent{
    activeName:Ref<NameType[]>;
    handleClickItem:(name:NameType) => void
}

export interface CollapseEmits{
    (e:'update:modelValue',value:NameType[]):void; // v-model的事件定义
    (e:'change',value:NameType[]):void; //item的change事件
}

//利用symbol创建独一无二的标签
export const CollapseContentKey : InjectionKey<CollapseContent> = Symbol('CollapseContentKey');