import {describe,test,expect,vi,beforeEach,} from "vitest";
import {mount} from "@vue/test-utils";
import Tooltip from "./tooltip.vue"

vi.mock("@popperjs/core") //取消对popperjs的模拟
const visibleChange = vi.fn()

describe("Tooltip", () => {
    beforeEach(()=>{
        vi.useFakeTimers()
    })

    test("mount component",async () => {
        const wrapper = mount(()=>
            <div>
                <div id="out">
                    <Tooltip content="hello" trigger="click" openDelay={100} closeDelay={100} onVisible-change={visibleChange}>
                        <button id="triggerClick">点击触发</button>
                    </Tooltip>
                </div>
            </div>,
            {
                attachTo:document.body
            }
        )

        //静态测试
        const triggerArea = wrapper.find("#triggerClick")
        expect(triggerArea.exists()).toBeTruthy() //判断触发区域也就是按钮是否存在
        expect(wrapper.find(".k-tooltip__popper").exists()).toBeFalsy //一开始展示区域是不存在的
        await triggerArea.trigger("click")
        //点击后展示区域应该显示出来
        await vi.runAllTimers()
        expect(wrapper.find(".k-tooltip__popper").exists()).toBeTruthy
        expect(wrapper.get(".k-tooltip__popper").text()).toBe("hello")
        expect(visibleChange).toHaveBeenCalledWith(true)
        //
        // await triggerArea.trigger("click")
        // //点击后展示区域应该显示出来
        // await vi.runAllTimers()
        // expect(wrapper.find(".k-tooltip__popper").exists()).toBeFalsy
        // expect(visibleChange).toHaveBeenLastCalledWith(false)

        //区域外侧点击测试，展示区域应该隐藏
        await wrapper.get("#out").trigger('click')
        await vi.runAllTimers()
        expect(wrapper.find(".k-tooltip__popper").exists()).toBeFalsy
        //应该调用close方法，visibleChange事件传递的参数因为false，见组件的逻辑
        expect(visibleChange).toHaveBeenLastCalledWith(false)
    })
})
