# input-keyboard

> a input-keyboard plugin
> 最近开发eletron，但是碰到一个棘手的问题，就是input无法唤醒虚拟键盘，手动调动很麻烦，所以开发出这款插件备用

## Build Setup

``` bash
# install dependencies
npm install input-keyboard
or
yarn add input-keyboard

import inputKeyboard from 'input-keyboard'

<key-input id="test1" :model.sync="value"></key-input>
id是必须的且不能重复！！！！
:model.sync类似于原v-model绑定。必须的！！！

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
