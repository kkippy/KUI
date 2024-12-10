import {describe,test,expect} from "vitest";
import {mount} from "@vue/test-utils";
import CollapseItem from "./CollapseItem.vue"
import Collapse from "./Collapse.vue"

describe("Collapse", () => {
  test("mount component",async () => {
    const wrapper = mount( ()=>
      <Collapse modelValue={['1']} accordion>
        <CollapseItem name='1' title='title 1'>
          content a
        </CollapseItem>

        <CollapseItem name='2' title='title 2' disabled>
          content b
        </CollapseItem>

        <CollapseItem name='3' title='title 3' >
          content c
        </CollapseItem>

      </Collapse>
    ,{
      global:{
        stubs:['Icon']
      },
      attachTo:document.body
    })

    const headers = wrapper.findAll('.k-collapse-item__header')
    const content = wrapper.findAll('.k-collapse-item__content')

    expect(headers.length).toBe(3)
    expect(content.length).toBe(3)

    //文本内容测试
    const firstContent = content[0]
    const secondContent = content[1]
    const thirdContent = content[2]
    const firstHeader = headers[0]
    const thirdHeader = headers[2]

    expect(firstContent.isVisible()).toBeTruthy() //isVisible()模拟元素是否根据v-show显隐
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
    expect(secondContent.text()).toBe('content b')

    //行为测试
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await thirdHeader.trigger('click')
    expect(thirdHeader.text()).toBe('title 3')
    expect(thirdContent.isVisible()).toBeTruthy()
    expect(thirdContent.text()).toBe('content c')

    //禁用测试，点击后应无内容
    const disabledHeader = headers[1]
    await disabledHeader.trigger('click')
    expect(secondContent.isVisible()).toBeFalsy()
    expect(disabledHeader.classes()).toContain('is-disabled')
  })
})
