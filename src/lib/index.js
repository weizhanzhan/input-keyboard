import inputKeyBoard from './input-keyboard'
import Vue from 'vue'

const inputkeyboard = {
    install:function(Vue){
        Vue.component(inputKeyBoard.name,inputKeyBoard)
    }
}
export default inputkeyboard