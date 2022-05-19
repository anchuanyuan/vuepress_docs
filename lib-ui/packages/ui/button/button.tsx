import { defineComponent} from 'vue'

export default defineComponent({
    name:'A-button',
    setup(){
        return ()=>{
            return (
                <button>测试按钮</button>
            )
        }
    }
})
