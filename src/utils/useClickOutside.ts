//区域外侧点击后收起显示区域
import type {Ref} from "vue"
import {onMounted,onUnmounted} from "vue";
//方法的第一个参数是目标dom,一开始是undefined最终是HTMLElement类型
const clickOutside = (elementRef:Ref<undefined |  HTMLElement>,callback:(e:MouseEvent)=> void) => {
    const handler = (e:MouseEvent) => {
        //先判断目标dom以及点击的元素是否存在
        if(elementRef.value && e.target) {
            //判断点击的元素是否在目标dom内，不在则执行回调函数
            if(!elementRef.value.contains(e.target as HTMLElement)) {
                callback(e)
            }
        }
    }

    onMounted(()=>{
        document.addEventListener('click',handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('click',handler)
    })
}

export default clickOutside

