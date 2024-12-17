import type {VNode} from "vue";
export interface  MessageProps {
  content?:string | VNode;
  duration?:number;
  type?:'info' | 'success' | 'warning' | 'error';
  showClose?:boolean; //控制关闭按钮的显示隐藏;
  onDestroy:() => void
}

//创建忽略onDestroy的MessageProps
export type createMessageProps = Omit<MessageProps,'onDestroy'>
