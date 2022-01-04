@[toc]
## 有以下4种

## 1、静态定位（static）：

position的默认值，从上到下，从左到右，属于正常的文档流
   一般的标签元素不加任何定位属性都属于静态定位，在页面的最底层属于标准流。就是正常的css布局，那个就叫静态定位

```html
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>static定位</title>
    <style>
        .box1{
            background-color: aqua;
            width: 200px;
            height: 200px;
            margin: 20px;
            
        }
        .box2{
            background-color: rgb(18, 156, 99);
            width: 200px;
            height: 200px;
            margin: 20px;
           
        }
        .box3{
            background-color: rgb(235, 204, 32);
            width: 200px;
            height: 200px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
</body>
</html>
```

## 2、相对定位（relative）：

相对定位元素不可层叠，依据left、right、top、bottom等属性在正常文档流中偏移自身位置
                        确定元素的默认位置之后，通过 left、right、top、bottom等属性来设置位置的偏移，但是元素所占的空间还保留在原位置，其他元素不会挤占他原本的空间
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>相对定位（relative）</title>
    <style>
        .box1{
            background-color: aqua;
            width: 200px;
            height: 200px;
            margin: 20px;
        }
        .box2{
            background-color: rgb(18, 156, 99);
            width: 200px;
            height: 200px;
            margin: 20px;
            position: relative;
            left: 50px;
            top: 60px;
            
        }
        .box3{
            background-color: rgb(235, 204, 32);
            width: 200px;
            height: 200px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
</body>
</html>
```

## 3、绝对定位（absolute）：

会把元素移出正常的文档流，后边的元素会挤占他的空间，而他自己会覆盖在挤占他空间的元素上边
                        使用left、right、top、bottom等属性相对于其最接近的一个最有定位设置的父级元素进行绝对定位，
                        如果元素的父级没有设置定位属性，就是他的父级元素没有设置position，transform属性，则依据 body 元素左上角作为参考进行定位
                        绝对定位元素可层叠，层叠顺序可通过 z-index 属性控制，z-index值为无单位的整数，大的在上面，可以有负值。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>绝对定位absolute</title>
    <style>
        .box1{
            background-color: aqua;
            width: 200px;
            height: 200px;
            
            /* margin: 20px; */
        }
        .box2{
            background-color: rgb(18, 156, 99);
            width: 200px;
            height: 200px;   
            /* margin: 20px; */
                position: absolute; 
                top: 20px;
                left: 30px;
            
        }
        .box3{
            background-color: rgb(235, 204, 32);
            width: 200px;
            height: 200px;
            /* margin: 20px; */
        }
        .father{
            background-color: cadetblue;
            width: 600px;
            height: 900px;
            margin: 60px;
            position: static;
            
        }
    </style>
</head>
<body>
    <div class="father">
            <div class="box1">box1</div>
            <div class="box2">box2</div>
            <div class="box3">box3</div>
    </div>
</body>

</html>
```

## 4、固定定位（fixed）：

固定定位与绝对定位类似，但它是相对于浏览器窗口定位，并且不会随着滚动条进行滚动。
                        固定定位的最常见的一种用途是在页面中创建一个固定头部、固定脚部或者固定侧边栏，不需使用margin、border、padding。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>固定定位（fixed）</title>
    <style>
        .fixed_position{
            background-color: cornflowerblue;
            width: 100%;
            height: 100px;
            position: fixed;
            top: 30px;
        }
        .box1{
            background-color: darkorange;
            height: 1000px;
            width: 900px;
        }
        .box2{
            background-color: rgb(16, 88, 221);
            height: 1000px;
            width: 900px;
        }
    </style>
</head>
<body>
    <div class="fixed_position">我是fixed定位的导航栏，当鼠标滚动时我是固定不动的</div>
    <div class="box1">11111111111111111111111111111111111111111</div>
    <div class="box2">11111111111111111111111111111111111111111</div>
</body>
</html>
```

## 5、sticky

是CSS3新发布的一个属性。设置了sticky的元素，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是top、left等属性无效），
当该元素的位置将要移出偏移范围时，定位又会变成fixed

该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sticky定位</title>
    <style>
        .box1{
            background-color: darkorange;
            width: 600px;
            height: 500px;

        }
        .box2{
            background-color: rgb(19, 160, 7);
            width: 600px;
            height: 500px;
            position: sticky;
            top: 0px;
            
        }
        .box3{
            background-color: rgb(13, 115, 211);
            width: 600px;
            height: 1000px;
            
        }
        .box4{
            background-color: rgb(211, 13, 161);
            width: 600px;
            height: 1000px;
            
        }
    </style>
</head>
<body>
    <div class="box1">1111111111111111111111</div>
    <div class="box2">2222222222222222222222</div>
    <div class="box3">3333333333333333333333</div>
    <div class="box4">3333333333333333333333</div>


</body>
</html>
```

## 6、z-index:

 z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面
 

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style>
.box
{
    width: 200px;
    height: 300px;
    background-color: darkorange;
	position:absolute;
	left:0px;
	top:0px;
    z-index:-1;
}

	
.a1{
    z-index: 1;
}    

</style>
</head>

<body>
<h1>This is a heading</h1>
<div class="box"></div>
<p class="a1">因为图像元素设置了 z-index 属性值为 -1, 所以它会显示在文字之后。</p>
</body>
</html>
```
