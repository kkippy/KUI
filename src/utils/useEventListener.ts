import {onMounted, onBeforeUnmount, isRef,watch,unref} from "vue";
import type {Ref} from "vue";
export default function useEventListener(
    target: Ref<EventTarget | null> |  EventTarget, //EventTarget比HTMLElement更加宽泛些,同时支持响应式元素
    event:string,
    handler:(e:Event) => any
){
    if(isRef(target)){
        watch(target,(newValue,oldValue)=>{
            //首先对旧对象解绑事件，再给新对象绑定事件
            oldValue?.removeEventListener(event,handler)
            newValue?.addEventListener(event,handler)
        })

    } else {
        onMounted(() => {
            target.addEventListener(event, handler)
        })
    }

        onBeforeUnmount(()=>{
            //unref的作用：从一个 ref 对象中提取出其原始值，如果传入的值不是响应式则直接返回这个值且不会报错
            unref(target)?.removeEventListener(event,handler)
        })
}
