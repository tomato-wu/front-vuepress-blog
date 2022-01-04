```
## 下载安装Eslint

```javascript
全局安装： npm install -g eslint
项目安装： npm install eslint --save-dev
```

> 注意：
> 1.如果你想你所有项目都使用eslint，请全局安装；如果你想当前项目使用，请局部安装。
> 2.局部安装时请使用–save-dev，因为eslint是适用于开发环境（Software Development Environment，SDE）的插件，qing请不要添加到生产环境中。

## 接下来需要初始化esLint： eslint --init

上面的这个命令我使用没有效果，我用的这个 `./node_modules/.bin/eslint --init`

## 接下来就是配置eslint

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127164845818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70#pic_center)
**你想怎样使用eslint**

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? (Use arrow keys)
  To check syntax only //只检查语法
> To check syntax and find problems//检查语法、发现问题
  To check syntax, find problems, and enforce code style//检查语法、发现问题并执行代码样式
```

您的项目使用什么类型的模块?
vue中用的JavaScript modules

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? (Use arrow keys)
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

```

项目中使用的什么框架？
我用的vue

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? (Use arrow keys)
> React
  Vue.js
  None of these

```

你的代码运行在什么地方？
这里是多选，我选的浏览器和node

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Browser
 ( ) Node

```

您想如何为您的项目定义一个样式?
我选的第二个，问问题

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? (Use arrow keys)
> Use a popular style guide   // 1. 使用大厂的
  Answer questions about your style  //2. 问问题
  Inspect your JavaScript file(s)  //3. 检查现有的代码自动生成

```

您希望配置文件的格式是什么?
我选JavaScript

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in?
> JavaScript
  YAML
  JSON

```

你用什么来进行缩进
我比较爱用tabs

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? (Use arrow keys)
> Tabs
  Spaces

```

字符串用什么引号？单引号还是双引号

```javascript
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? Tabs
? What quotes do you use for strings? (Use arrow keys)
> Double
  Single

```

你用什么行尾?
我用的window

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? Tabs
? What quotes do you use for strings? Single
? What line endings do you use? (Use arrow keys)
> Unix
  Windows

```

你需要分号吗?

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? Tabs
? What quotes do you use for strings? Single
? What line endings do you use? Windows
? Do you require semicolons? (Y/n)

```

您希望配置文件的格式是什么?

```javascript
PS F:\resource>  ./node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? Vue.js
? Where does your code run? Browser, Node
? How would you like to define a style for your project? Answer questions about your style
? What format do you want your config file to be in? JavaScript
? What style of indentation do you use? Tabs
? What quotes do you use for strings? Single
? What line endings do you use? Windows
? Do you require semicolons? Yes
? What format do you want your config file to be in? (Use arrow keys)
> JavaScript
  YAML
  JSON

```

后面根据实际情况回答就好了，即使不小心答错也没关系，都在配置文件里随时可以修改。

## 在你的项目根目录下面会有一个.eslintrc.js文件，里面内容为

```javascript
module.exports = {
    "env": {               //Environments，指定代码的运行环境。不同的运行环境，全局变量不一样，指明运行环境这样ESLint就能识别特定的全局变量。同时也会开启对应环境的语法支持，例如：es6。
        "browser": true,
        "es2021": true
    },
    "extends": [  //ESLint 不需要自行定义大量的规则，因为很多规则已被分组作为一个规则配置。
        "eslint:recommended",  //就是 ESLint 的推荐规则配置，包含了ESLint的规则 里前面有✔︎的部分，recommended 规则只在ESLint升级大版本的才有可能改变。
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [    //顾名思义就是插件  plugins一般包含一个或多个规则配置，可以在extends中引入。
        "vue"
    ],
    "rules": {   //这里可以对规则进行细致的定义了，覆盖之前前面说的extends中定义的规则。
    }
};

```

错误等级有三级 0，1，2，分别代表off，warning，error。error错误会终止 lint-staged 执行。

```javascript
0或’off’：关闭规则。
1或’warn’：打开规则，并且作为一个警告（并不会导致检查不通过）。
2或’error’：打开规则，并且作为一个错误 (退出码为1，检查不通过)。


参数说明：
参数1 ： 错误等级
参数2 ： 处理方式

```

## 然后还要在package.json文件里面配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201127171424728.png#pic_center)

```javascript
"lint": "eslint --ext .js,.vue src"
```

## 然后就可以在控制台输入

```javascript
npm run lint检查
```

然后就能检查代码的规范性了
不过很多报错并不知道为啥错，但是可以成功运行。。。。

```
我是eslint的界面
```
