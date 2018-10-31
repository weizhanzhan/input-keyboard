<template>
  <span class="keyMain" v-if="id">
    <div class="keyboard_box keyboard-td-plugin" :id="'keyboard'+id">
      <table class="keyboad keyboard-td-plugin" cellspacing="10" @click="tableClick">

        <tr v-for="(trkey,index) in keys" :key="index" v-if="isSmall">
          <td v-for="tdkey in trkey" :key="tdkey" v-html="tdkey" @click="selectKey(tdkey,$event)" class="keyboard-td-plugin"></td>
        </tr>
        <tr v-for="(trkey,index) in keys2" :key="index" v-if="!isSmall">
          <td v-for="tdkey in trkey" :key="tdkey" v-html="tdkey" @click="selectKey(tdkey,$event)" class="keyboard-td-plugin"></td>
        </tr>
      </table>

    </div>

  </span>
</template>

<script>
  export default {
    props: ['id', 'handle_data'],
    data() {
      return {
        keys: [
          ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '关闭'],
          ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '='],
          ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '清空', 'Del'],
          ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '空格'],
        ],
        keys2: [
          ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '关闭'],
          ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '+'],
          ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '清空', '|'],
          ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '空格', 'Del'],
        ],
        isSmall: true,
        value: '',
      }

    },
    methods: {
      selectKey(val, event) {

        document.getElementById(this.id).focus();
        if (val == 'shift') {

          this.isSmall = !this.isSmall
          if (!this.isSmall) {
            event.target.style.background = '#8f8484'
            event.target.style['box-shadow'] = '0px 0px 1px 1px #cccccc'
          } else {
            event.target.style.background = ''
            event.target.style['box-shadow'] = ''
          }
        } else if (val == '空格') {
          this.value += ''
        } else if (val == '清空') {
          this.value = ''
        } else if (val == 'Del') {
          this.value = this.value.substr(0, this.value.length - 1)
        } else if (val == '关闭') {
          document.getElementById(this.id).blur();
          this.$emit('update:id', '')
        } else {
          this.value += val
        }
      },
      drag(id) {
        var dv = document.getElementById('keyboard' + id)
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;
        var isDown = false;
        //鼠标按下事件
        dv.onmousedown = function (e) {
          //获取x坐标和y坐标
          x = e.clientX;
          y = e.clientY;

          //获取左部和顶部的偏移量
          l = dv.offsetLeft;
          t = dv.offsetTop;
          //开关打开
          isDown = true;
          //设置样式  
          dv.style.cursor = 'move';
        }
        //鼠标移动
        window.onmousemove = function (e) {
          if (isDown == false) {
            return;
          }
          //获取x和y
          var nx = e.clientX;
          var ny = e.clientY;
          //计算移动后的左偏移量和顶部的偏移量
          var nl = nx - (x - l);
          var nt = ny - (y - t);

          dv.style.left = nl + 'px';
          dv.style.top = nt + 'px';
        }
        //鼠标抬起事件
        dv.onmouseup = function () {
          //开关关闭
          isDown = false;
          dv.style.cursor = 'default';
        }
      },
      tableClick() {

      }
    },
    watch: {

      value(val) {
        this.$emit('update:handle_data', val)

      },
      handle_data: {
        handler() {
          this.value = this.handle_data
        },
        immediate: true
      },
      id(val) {
        if (val) {
          this.$nextTick(() => {
            if (this.id)
              this.drag(this.id)
          })
        }
      }

    },
    mounted() {
      this.$nextTick(() => {
        if (this.id)
          this.drag(this.id)
      })
    }
  }

</script>

<style>
  .keyMain {}

  .keyboard_box {
    width: 700px;
    background: #333;
    padding: .9rem 0;
    position: fixed;
    z-index: 1
  }

  .keyboad {
    margin: 0 auto;
    color: #dcdddd;
    border-collapse: separate
  }

  .keyboad td {
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    width: 40px;
    background: #666;

    border: 0.1em solid #aaa;
    border-radius: 5px
  }

  .keyboad td:hover {
    background: #8f8484;
    box-shadow: 0px 0px 1px 1px #cccccc;
  }

  .keyboad td:active {
    background: #968080
  }

</style>
