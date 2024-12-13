//使用tsx的语法再次实现drop down组件
import type {MenuOption} from "./type"
import {defineComponent, computed, Fragment, ref} from "vue"
import type {PropType} from "vue";
import type {Placement,Options} from "@popperjs/core";
import Tooltip from "@/components/Tooltip/tooltip.vue"
import type {TooltipInstance} from "@/components/Tooltip/type";

export default defineComponent({
  name: "DropdownComponent",
  props: {
    hideAfterClick:{
      type:Boolean,
      default:true
    },
    transition:{
      type:String,
      default:"fade"
    },
    menuOption:{
      type:Array as  PropType<MenuOption[]>,
      required:true
    },
    popperOptions:{
      type:Object as PropType<Options>,
    },
    placement:{
      type:String as PropType<Placement>,
      default:"bottom-start"
    },
    trigger:{
      type:String as PropType<"hover" | "click">,
      default:"hover"
    },
    openDelay:{
      type:Number,
      default:0
    },
    closeDelay:{
      type:Number,
      default:0
    },

  },
  emits:["visible-change","select-change"],
  setup(props,{slots,emit,expose}){
    const tooltipRef = ref<TooltipInstance | null>( null)
    const itemClick = (e:MenuOption)=>{
      if (e.disabled) return
      emit('select-change', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (visible:boolean)=>{
      emit("visible-change",visible)
    }

    const options = computed(()=>{
      return props.menuOption?.map(item => {
        return (
            <Fragment key={item.key}>
              {item.divided ? <li class="k-dropdown__divided" role="separator" /> : '' }
              <li
                  class={{'k-dropdown__item':true,  'is-disabled':item.disabled,'is-divided':item.divided}}
                  id={`dropdown-item-${item.key}`}
                  onClick={()=>itemClick(item)}
              >
                {item.label}
              </li>
            </Fragment>
        )
      })
    })

    expose({
      //利用闭包的特性找到tooltip实例
      hide:() => tooltipRef.value?.hide(),
      show:() => tooltipRef.value?.show()
    })

    return () => (
        <div class="k-dropdown">
          <Tooltip
            close-delay={props.closeDelay}
            open-delay={props.openDelay}
            trigger={props.trigger}
            transition={props.transition}
            placement={props.placement}
            ref={tooltipRef}
            onVisible-change={visibleChange}
          >
            {{
              // 默认slot在jsx中的表现形式
              default:()=>slots.default?.(),
              content:()=>(
                  <ul class="k-dropdown__menu">
                    {options.value}
                  </ul>
              )
            }}
          </Tooltip>
        </div>
    )
  }
})
