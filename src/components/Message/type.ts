import type {VNode,ComponentInternalInstance} from "vue";

export interface  MessageProps {
  content?:string | VNode;
  duration?:number;
  type?:'info' | 'success' | 'warning' | 'danger';
  showClose?:boolean; //控制关闭按钮的显示隐藏;
  onDestroy:() => void;
  offset?:number;
  id:string,
  zIndex:number;
  transitionName?:string;
}

//包含多个Message实例的数组
export interface  MessageContext {
  id:string
  vm:ComponentInternalInstance
  props:MessageProps
  vNode:VNode,
  destroy:() => void
}

//创建忽略onDestroy的MessageProps
export type createMessageProps = Omit<MessageProps,'onDestroy' | 'id' | 'zIndex'>
