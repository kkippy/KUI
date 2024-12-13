//使用tsx的语法再次实现drop down组件
import type {MenuOption} from "./type"
import {defineComponent,computed,Fragment} from "vue"
import type {PropType} from "vue";
import type {Placement,Options} from "@popperjs/core";
import Tooltip from "@/components/Tooltip/tooltip.vue"

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
  setup(props,{slots}){
    const options = computed(()=>{
      return props.menuOption?.map(item => {
        return (
            <Fragment key={item.key}>
              {item.divided ? <li class="k-dropdown__divided" role="separator" /> : '' }
              <li
                  class="k-dropdown__item"
                  id={`dropdown-item-${item.key}`}
              >
                {item.label}
              </li>
            </Fragment>
        )
      })
    })
    return () => (
        <div class="k-dropdown">
          <Tooltip
            close-delay={props.closeDelay}
            open-delay={props.openDelay}
            trigger={props.trigger}
            transition={props.transition}
            placement={props.placement}
          >
            {{
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
