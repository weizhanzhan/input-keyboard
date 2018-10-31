<template>
    <span class="key-input">
        <input  :id="id" @focus="getFocus" @blur="getBlur" @input="changeIput" :value="model" />
        <key-board :id.sync="inputId" :handle_data.sync="handle_data"></key-board>
    </span>
</template>

<script>
import keyBoard from './key-board.vue'
export default {
    name:'keyInput',
    props:['model','id'],
    data(){
        return {
            inputId:''
        }
    },
    components:{
        keyBoard
    },
    methods:{
        getFocus(e){
           
            this.inputId=e.target.id
        },
        changeIput(e){
            this.$emit('update:model',e.target.value)
        },
        getBlur(){
           
           
            
        },
        listenClick(e){
            if(e.target.className=='keyboard-td-plugin' || e.target.className.indexOf('keyboard-td-plugin')!=-1|| this.inputId==e.target.id){
                console.log('正确')
            }else{
                console.log('错误')
                this.inputId=''
                // window.removeEventListener('click',this.listenClick)
            }
        }
    },
    computed:{
        handle_data:{
            get(){ return this.model},
            set(val) { this.$emit('update:model',val)}
        },
        st(){
            if(this.styles&&JSON.parse(this.styles)){
                
                return JSON.parse(this.styles)
            }
            else
                return ''
        }
    },
    mounted(){
        window.addEventListener('click',this.listenClick)
    },
    destroyed(){
        window.removeEventListener('click',this.listenClick)
    }
}
</script>

<style>
.key-input{
   /* display: inline-block; */
  
}
.key-input input{
   
}
</style>
