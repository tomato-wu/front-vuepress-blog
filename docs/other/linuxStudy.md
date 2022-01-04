@[toc]
## 第一讲，linux文件系统

 1. 普通文件（simple）：Linux对扩展名不关心，在Linux里面扩展名没有意义，能不能执行是看权限。
 2. 目录文件：相当于记录文件，记录了文件名和文件所对应的文件节点号（条目）。
 3. 链接文件：相当于window的快截方式
 4. 设备文件：保存在dev文件下，字符设备文件：键盘。鼠标等。块设备文件：硬盘，光盘等
 5. 命名管道文件(Named pipe)：命名管道（在硬盘上创建文件叫管道文件，一个进程不断写入数据，另外一个进程不断读出数据）阅后焚毁类似
 6. 插口文件(Socket)：实现进程间的通信

过目录的方式将这些文件组织到一起

> bin目录：常用的命令都放到Bin目录 
> sbin目录:系统管理用到的命令

```powershell
/boot 目录 ：一个独立的分区挂载到boot目录下
/dev:     保存的是设备文件
/etc:     存放配置文件   、/etc/passwd   /etc/shadow   /etc/profile等等。
/home   每个用户的工作目录
/lib   用于存放程序库
/proc（虚拟目录）     存放的是系统运行的信息
/usr    类似于系统目录   相当于Windows里面的C:\Program Files
/var   存放大小容易变化的文件，日志文件
```
**df  系统分区情况**：df   用于查看目录分区   df  目录名  显示我所在目录的使用情况

```powershell
df /dev/sda1
```

df -h 以G为单位

```powershell
查看某一个分区： df -h /dev/sda1
df -h /var
```

**du  查看当前文件的大小** 

```powershell
du /boot/vmlinux-4.15.0-66.txt
du /boot
du -s /boot 不显示子目录的大小  默认以K为单位

du std.txt 显示为 4 std.txt 以字节为单位
du -h std.txt  显示为 4.0K std.txt  以K为单位
```
## 二，我的目录相关的命令：

```powershell
pwd  当前目录

..  上一级目录

cd 后面不跟任何东西切换回工作目录

mkdir dirc 创建dirc目录 

mkdir -p dirc/a/b   创建多级目录

rmdir dirc 删除目录，当目录为空才可以删除

ls dira 查看dira 目录下边的目录

ls -a 显示所有隐藏文件

ls -l 列出目录下的详细信息，默认当前目录下的，后面跟文件名的时候列出该文件目录下的所有详细信息

rm -i std.txt    -i会在删除文件时询问是否删除

rm 还可以删除目录   rm -r dira  删除dira目录    rm -fr dira 强制删除

cp 拷贝 文件、目录等  cp -r dirb dira 对dira复制

mv 文件移动，重命名  mv dira dirc

file 查看文件类型 file /tmp

touch  创建空文件或者修改日期 touch abc 如果abc不存在就创建abc 存在就修改最后改动的日期
```
## 三， file security（文件保密）
三个角色 `user(owner) ,group ,others：`

## 1、权限位的含义

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511194908496.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511194914183.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
第1位：表示文件类型
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511194928687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
第2-4位：表示文件所有者(用u表示)的权限，有字母则由该权限，为-则表示没有该权限
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511194939507.png)
第5-7位代表文件所属组(用g表示)的权限，同样用rwx表示

第8-10位代表其他人(用o表示)的权限，也用rwx表示

## 2、基本权限命令
①chmod：修改文件的权限模式，命令所在路径为/bin/chmod，所有用户可执行

```powershell
chmod [选项] 权限模式 文件名
```
选项：-R：递归设置权限，也就是给子目录中的所有文件设定权限
权限模式：[ugoa][+ - =][perms]，即[用户身份][赋予方式][权限]。

用户身份：                                                    
  赋予方式：
    u——所有者(user)                                      +——加入权限
    g——所属组(group)                                   -——减去权限
    o——其他人(other)                                    =——设置权限
    a——代表全部(all)
例子：

```powershell
chmod u+x cde    //针对cde这个文件给文件所有者(u)添加执行权限(x)
chmod g+w,o+w cde   //同时给多个身份添加相应权限，中间用逗号隔开
chmod u-x,g-w,o-w cde   //去除权限，使用减号
chmod ugo+r file1.txt  //将文件 file1.txt 设为所有人皆可读取

chmod ug+w,o-w file1.txt file2.txt  //将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入 :

```
## 3、数字权限
4：同r，读.
2：同w，写.
1：同x，执行.

```powershell
chmod 755 cde   
```
755中的第一位7表示给文件所有者赋的权限为`4+2+1`，即读写执行，`rwx`
同理第二位5表示给所属组赋的权限为`4+1`，即读和执行，`rx`
最后一位则是给其他人赋予的权限,`rx`
 常用数字权限：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511201327201.png)
## 4、修改所有者和所属组
chown：修改文件和目录的所有者和所属组.

```powershell
chown [选项] 所有者:所属组 文件或目录
```
普通用户不能修改文件的所有者，哪怕自己是这个文件的所有者也不行；普通用户只可以修改所有者是自己的文件的权限(rwx)

**（1）添加用户：**
添加用户的时候会创建一个同名的该用户的初始组，即同时会添加一个名为user1的group

```powershell
useradd user1    //
```
**（2）给新加用户设置密码：**

```powershell
passwd user1
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511201454408.png)

```powershell
修改文件所有者：chown user1 cde
修改文件和目录的所属组 chgrp user1 cde
改回所有者和所属组：chown root:root cde
```
## 5、权限含义的解释
首先，读、写、执行权限对  文件  和  目录   的作用是不同的。

**权限对文件的作用：**

 读(r)：对文件有读权限，代表可以读取文件中的数据。如果把权限对应到命令上，那么一旦对文件有读权限，就可以对文件执行cat、more、less、head、tail等文件查看命令。
 
   写(w)：对文件有写权限，代表可以修改文件中的数据。如果把权限对应到命令上，那么一旦对文件有写权限，就可以对文件执行vim、echo等修改文件数据的命令。注意：对文件有写权限并不能删除文件本身，只能修改文件中的数据；如果想删除文件，则需要对文件的上级目录拥有写权限。
   
   执行(x)：对文件有执行权限，代表文件可以运行。在Linux中，只要文件有执行权限，这个文件就是执行文件了。只是这个文件到底能不能正确执行，不仅需要执行权限，还要看文件中的代码是不是正确。对文件来说，执行权限是最高权限。

**权限对目录的作用：**

  读(r)：对目录有读权限，代表可以查看目录下的内容，也就是可以查看目录下有哪些文件和子目录。如果把权限对应到命令上，那么一旦对目录有了读权限，就可以在目录下执行ls命令，查看目录下的内容。
  
   写(w)：对目录有写权限，代表可以修改目录下的数据，也就是可以在目录中新建、删除、复制、剪切子文件或子目录。对应到命令上，就可以在目录下执行touch、rm、cp、mv命令。对目录来说，写权限是最高权限。
   
   执行(x)：目录是不能运行的，那么对目录拥有执行权限，代表可以进入目录。对应到命令上就是可以对目录执行cd命令，进入目录。

**目录的可用权限只有以下3个：**

  0：任何权限都不赋予
  
  5：基本的目录浏览和进入权限
  
  7：完全权限(读+写+进人)


## 6、umask默认权限

文件权限是linux系统中的一种安全机制，通过设置不同的权限，可以达到限制用户操作的目的，有效地保证了文件的完整性。

即新建文件时赋予文件的权限

默认的情况下，创建一个文件的权限为”`rw-r–r–`”，而创建一个目录的权限为`rwxr-xr-x`”，如果默认的不符合用户的需求，可以用`chmod`命令进行设置，但这样的效率很低。

linux提供了一个方便的工具`umask`，可以用来设置文件的默认掩码。

对于文件来说，这一数字的最 大值分别是6。系统不允许你在创建一个文本文件时就赋予它执行权限，必须在创建后用`chmod`命令增加这一权限。

目录则允许设置执行权限，这样针对目录来说，`umask`中各个数字最大可以到7。

Linux约定：
新建文件的权属是`-rw-rw-rw-`，权限值是`666`
新建目录的权属是`drwxrwxrwx`，权限值是`777`

查看系统的umask权限： `umask` 
用八进制数值显示umask权限： `umask -S`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511201743597.png)
上图表示root用户新建的文件对于root用户有rwx权限，对于所属组的其他用户有rx权限，对于其他用户有rx权限。![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511201754211.png)
 **根据umask值计算新建文件或文件夹的初始权限的算法如下：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511201807472.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
**一、设置文件的权限掩码，使文件自动生成默认权限为rw-rw----**

```powershell
w-rw----对应的数字就是660, 其实每一位用三位2进制来表示，所以3位二进制组成十进制数就得出660,由于要生成的文件默认权限改变，其权限掩码值为：666-660=006
linux@server:~$ umask 006
linux@server:~$ touch abc
linux@server:~$ ll abc
-rw-rw—- 1 linux linux 0 2010-12-11 21:44 abc
```
`umask 777` #创建文件会没有任何权限，他和chmod是相反的。
`umask 000` #具有所有权限。但文件没有x权限。


## 四， file processing

## 1，查看文本文件的内容：

**(1）more指令 —— 分页显示文件内容**

more指令会以一页一页的形式显示文件内容	，
按	空白键（space）	显示下一页内容，
按	Enter键	会显示下一行内容，
按 	b 键	就会往回（back）一页显示，

 - -num 一次显示的行数
 - +num 从第 num 行开始显示

```powershell
more    file1             查看文件file1的文件内容；
more   -num   file2    查看文件file2的内容，一次显示num行；
more   +num   file3   查看文件file3的内容，从第num行开始显示；
```

**（2） less指令 —— 可以向前或向后查看文件内容**

 - less 与 more 类似，less 可以随意浏览文件，支持翻页和搜索，支持向上翻页和向下翻页。

```powershell
less   file1    查看文件file1的内容；
less   -m    file2     查看文件file2的内容，并在屏幕底部显示已显示内容的百分比；
```

> 按空格键显示下一屏的内容，按回车键显示下一行的内容；  
> 按  U  向前滚动半页，按  Y   向前滚动一行；
> 按[PageDown]向下翻动一页，按[PageUp]向上翻动一页；
>  按   Q   退出less命令；

**（3）head指令 —— 查看文件开头的内容**

head指令用于显示文件开头的内容，默认情况下，只显示文件的头10行内容；

```powershell
head  -n  <行数>   filename      显示文件内容的前n行；
例如：head   -n   5   file1     显示文件file1的前5行内容

head   -c  <字节>    filename      显示文件内容的前n个字节；
例如：head  -c  20  file2      显示文件file2的前20个字节内容
```
**（4）tail指令 —— 显示文件尾部的内容**
ail指令用于显示文件尾部的内容，默认情况下只显示指定文件的末尾10行；

```powershell
tail    file1      显示文件file1的尾部10行内容；
tail  -n  <行数>  filename    显示文件尾部的n行内容；
```

tail实时监控变化

```powershell
例如：tail  -n  5   file1    显示文件file1的末尾5行内容

tail  -c  <字节数>   filename     显示文件尾部的n个字节内容；
例如：tail  -c  20   file2    显示文件file2的末尾20个字节
```
**（5） cat指令 —— 显示文件内容**

使用cat命令时，如果文件内容过多，则只会显示最后一屏的内容；

 - -n 或 --number：由 1 开始对所有输出的行数编号。
 - -b 或 --number-nonblank：和 -n 相似，只不过对于空白行不编号。
 - -s 或 --squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行。

cat指令的基本用法：

```powershell
cat   file1        用于查看文件名为file1的文件内容；
cat   -n   file2       查看文件名为file2的文件内容，并从1开始对所有输出的行数（包括空行）进行编号；
cat   -b   file3      查看文件名为file3的文件内容，并从1开始对所有的非空行进行编号；

```
## 2，如何查看文件的大小

 1. ls -l 文件实际的大小
 2. du 用于显示给文件分配的存储空间的大小
 3. df 命令用于显示目前在 Linux 系统上的文件系统磁盘使用情况统计。

## wc Linux

wc命令用于计算字数。利用wc指令我们可以计算文件的Byte数、字数、或是列数

 - -c 或 –bytes 只显示bytes数
 - -l 或者 –lines 只显示行数
 - -w 或者 –words 只显示单词数

> wc testfile #缺省参数将输出 指定文件的 行数、单词数、字节（符）数

当前系统的用户信息保存在 /etc/passwd

```powershell
wc /etc/passwd   得到行数等信息
```

## 3，如何比较两个文件的异同：

diff + 文件名 文件名        显示文本文件的差别
1c1 c修改
6a7 a 增加
13d11 d 删除
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202403482.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
## 4,unip 去掉文件内部重复的行

unip + 文件名 
只能去掉连续出现的行，并不会修改文件内容，原文件还是在的，只是把去重后的结果输出到屏幕上，可以保存

-c 用于统计重复出现的行数
## 5,压缩文件：

gzip hello1
gzip + 文件名，生成压缩文件，压缩文件的文件名是在原来的文件加后缀.gz
gzip -d hello.gz
文件经过gzip压缩后，文件会多出一个 .gz后缀。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202442312.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
**bzip2是比gzip更优秀的压缩方法，以bz2结尾。用法同gzip。**

## 6,文件查找

[https://blog.csdn.net/l_liangkk/article/details/81294260](https://blog.csdn.net/l_liangkk/article/details/81294260)

> Linux find 命令用来在指定目录下查找文件,如果使用该命令时，不设置任何参数，则 find
> 命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。

```powershell
语法：
find   path   -option   [   -print ]   [ -exec   -ok   command ]   {} \;
```
实例：
将当前目录及其子目录下所有文件后缀为 .c 的文件列出来:

```powershell
find . -name "*.c"
```

通过find命令查找

```powershell
按文件名进行查找：find . -name 'hello*'   查找我hello文件开头的文件
```

## (1)、按名字查找 

```powershell
 在当前目录及子目录中，查找大写字母开头的txt文件  
find . -name '[A-Z]*.txt' -print 

在/etc及其子目录中，查找host开头的文件 
      find /etc -name 'host*' -print   

      在$HOME目录及其子目录中，查找所有文件   
      find ~ -name '*' -print 

      在当前目录及子目录中，查找不是out开头的txt文件   
      find . -name "out*" -prune -o -name "*.txt" -print 
```
## (2),按目录查找   

```powershell
在当前目录除aa之外的子目录内搜索 txt文件   
      find . -path "./aa" -prune -o -name "*.txt" -print   

  在当前目录及除aa和bb之外的子目录中查找txt文件   
      find . −path′./dir0′−o−path′./dir1′−path′./dir0′−o−path′./dir1′ -a -prune -o -name '*.txt' -print

```
## 7,sort  -----------对文本文件进行排序的命令
Linux sort命令用于将文本文件内容加以排序。
参数说明：

 - -b 忽略每行前面开始出的空格字符。
 - -c 检查文件是否已经按照顺序排序。
 - -d 排序时，处理英文字母、数字及空格字符外，忽略其他的字符。
 - -f 排序时，将小写字母视为大写字母。
 - -i 排序时，除了040至176之间的ASCII字符外，忽略其他的字符。
 - -m 将几个排序好的文件进行合并。
 - -M 将前面3个字母依照月份的缩写进行排序。
 - -n 依照数值的大小排序。
 - -u 意味着是唯一的(unique)，输出的结果是去完重了的。
 - -o<输出文件> 将排序后的结果存入指定的文件。
 - -r 以相反的顺序来排序。
 - -t<分隔字符> 指定排序时所用的栏位分隔字符。
 - +<起始栏位>-<结束栏位> 以指定的栏位来排序，范围由起始栏位到结束栏位的前一栏位。
 - --help 显示帮助。
 - --version 显示版本信息。

sort + 文件名  从小到大按照字典排序
sort -k
sort -k -m
 [https://www.jianshu.com/p/c4d159a98dd8](https://www.jianshu.com/p/c4d159a98dd8)
设定黏着位：	如果不为目录设置粘滞位，任何具有该目录写和执行权限的用户都可以删除和移                        动其中的文件。实
不能删除别人的文件 除非你是超级用户


## 五，对文本处理的命令
## 7.1 cat
cat 是一个文本文件查看和连接工具。查看一个文件的内容，用cat比较简单，就是cat 后面直接接文件名，如cat linuxyw.txt

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202726557.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
把 textfile1 的文档内容加上行号后输入 textfile2 这个文档里：

```powershell
cat -n textfile1 > textfile2
```

把 textfile1 和 textfile2 的文档内容加上行号（空白行不加）之后将内容附加到 textfile3 文档里：

```powershell
cat -b textfile1 textfile2 >> textfile3
```

清空 /etc/test.txt 文档内容：

```powershell
cat /dev/null > /etc/test.txt
```

cat 也可以用来制作镜像文件。例如要制作软盘的镜像文件，将软盘放好后输入：

```powershell
cat /dev/fd0 > OUTFILE
```

相反的，如果想把 image file 写到软盘，输入：

```powershell
cat IMG_FILE > /dev/fd0
```

## 7.2 cut

Linux cut命令用于显示每行从开头算起 num1 到 num2 的文字。
## 7.3 正则表达式

[https://www.bilibili.com/video/BV1ef4y1U7V4?from=search&seid=12573741382167678317](https://www.bilibili.com/video/BV1ef4y1U7V4?from=search&seid=12573741382167678317)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202826493.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202831884.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511202839124.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
## 7.4  grep

> Linux系统中grep命令是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹 配的行打印出来。
> 
**（1）grep --help可查看**

 1.  -c 只输出匹配行的计数。
 2. -i 不区分大小写（只适用于单字符）。
 3. -h 查询多文件时不显示文件名。
 4. -l 查询多文件时只输出包含匹配字符的文件名。
 5. -n 显示匹配行及行号。
 6. -s 不显示不存在或无匹配文本的错误信息。
 7. -v 显示不包含匹配文本的所有行。
 8. -q 不显示存在或者匹配的文本信息
 9. -f 后接文件名，以文件中的每一行作为匹配项
 10. -R 递归查询当前目录下的文件
 11. -w 匹配单词
 12. -o 只输出匹配字符串
 13. -A 输出匹配行的后n行，后带数字，如-A 2
 14. -B 输出匹配行的前n行，后带数字，如-B 2
 15. -C 输出匹配行的前后n行，后带数字，如-C 2
 
**（2）grep命令使用简单实例**

```powershell
将/etc/passwd，有出现 root 的行取出来
# grep root /etc/passwd
root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin


2.将/etc/passwd，有出现 root 的行取出来,同时显示这些行在/etc/passwd的行号
# grep -n root /etc/passwd
1:root:x:0:0:root:/root:/bin/bash
30:operator:x:11:0:operator:/root:/sbin/nologin


3.将/etc/passwd，将没有出现 root 的行取出来
# grep -v root /etc/passwd


4.将/etc/passwd，将没有出现 root 和nologin的行取出来
# grep -v root /etc/passwd | grep -v nologin

-w 或 --word-regexp : 只显示符合的列。
grep -w 'CS' /tmp/student 

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511203124541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
练习：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210517232957455.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210517233014338.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210517233025114.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20210517233035579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/2021051723304776.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)





## 六，sed
sed（Stream Editor）：文本流编辑，sed是一个“非交互式的”面向字符流的编辑器。

能同时处理多个文件多行的内容，可以不对原文件改动，把整个文件输入到屏幕,也可以把只匹配到模式的内容输入到屏幕上。并不会修改原先的文件，只会把修改后的文件输出到屏幕

[https://www.runoob.com/linux/linux-comm-sed.html
https://www.cnblogs.com/ctaixw/p/5860221.html](https://www.runoob.com/linux/linux-comm-sed.html%20https://www.cnblogs.com/ctaixw/p/5860221.html)

**sed命令的语法格式：**

```powershell
sed的命令格式： sed [option] 'sed command'filename

sed的脚本格式：sed [option] -f 'sed script'filename
```
**sed命令的选项(option)：**

```powershell
-n ：只打印模式匹配的行
-e ：直接在命令行模式上进行sed动作编辑，此为默认选项
-f ：将sed的动作写在一个文件内，用–f filename 执行filename内的sed动作
-r ：支持扩展表达式
-i ：直接修改文件内容
```
实例：
**（1）以行为单位的新增/删除**

将 /tmp/student 的内容列出并且列印行号，同时，请将第 2~5 行删除！

d 就是 delete 命令

```powershell
sed '2,5d' /tmp/student 
```

只要删除第 2 行

```powershell
sed '2d' /tmp/student 
```
**（2）替换**

数据的搜寻并替换
除了整行的处理模式之外， sed 还可以用行为单位进行部分数据的搜寻并取代。基本上 sed 的搜寻与替代的与 vi 相当的类似！他有点像这样：

```powershell
sed 's/要被取代的字串/新的字串/'
--例子--  sed 's/\<CS/EECS/' /tmp/student 
```
把分数替换成*
原形式：3.54
正则表达式：'[0-9]*[.][0-9]*'

```powershell
sed 's/[0-9]*[.][0-9]*/***/' filename
```
其中【.】可以用 \. 表示

```powershell
sed 's/[0-9]*\.[0-9]*/***/' filename
```
有多少个字符就替换多少个*
默认替换第一个匹配到的字符，加上g表示符合条件的都替换

```powershell
sed 's/[0-9\.]/*/g' filename
```
**（3）其他**

 1. p ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起运行～
 2. -n或--quiet或--silent 仅显示script处理后的结果。
 3. 加n不再默认输出缓冲区内容
 4. a ：新增， a 的后面可以接字串，而这些字串会在新的一行出现(目前的下一行)

```powershell
   sed '\CS/a niubi' filename
```

```powershell
sed 's/,/#/g' /tmp/grade.csv   //将所有的，换成#   /g的意思是碰到就换
```

i ：插入， i 的后面可以接字串，而这些字串会在新的一行出现(目前的上一行)；

## Linux禁用账号：

（1）在每个用户前面加一个#号
（2）不让用户登录，把用户shell程序字段换成乱七八招的东西
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511203631488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)

```powershell
vi /etc/passwd
sed 's/:.*$/:\/bin\/nologin/' /etc/passwd 或者
sed 's/:.*$/***/' /etc/passwd
替换结尾不是：的若干个字符
sudo sed -i 's/[^:]*$/***/' /etc/passwd
```
实例练习：
With sed(/tmp/databook). 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511203712568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
Change Jon's name to Joanthan

```powershell
sed 's/^Jon/Joanthan/' /tmp/databook
```

Delete the first three lines

```powershell
sed '1,2,3d' /tmp/databook
```

Print lines 5 through 10  (-n ：只打印模式匹配的行)

```powershell
sed -n '5,10p' /tmp/databook
```

Delete lines containing Lane

```powershell
sed '/Lane/d' /tmp/databook
```

Print all lines where the birthdays are in November or December
 -n不输出不匹配的行

```powershell
sed -n '/:[1][1-2]\//p' /tmp/databook
```

Replace the line containing Jose with JOSE HAS RETIRED.
替换掉包含jose的行

.*匹配任意多的任意字符

.*Jose.* 匹配一整行

s代表替换

```powershell
sed -n 's/.*Jose.*/JOSE HAS RETIRED/' /tmp/databook
```

Change Popeye's birthday to 11/14/46

```powershell
sed '/^Popeye/s/[0-9]*\/[0-9]*\/[0-9]*/11\/14\/46/' /tmp/databook  或者
sed '/Popeye/s/[0-9]*\/[0-9]*\/[0-9]*/11\/14\/46/' /tmp/databook
```

/^Popeye/ 查找以Popeye开头的行

/:[0-9]*\/[0-9]*\/[0-9]*/  匹配 生日字段 :3/19/35

s/????/:11\/14\/46/ 将生日字段替换成  :11/14/46

Delete all blank lines

```powershell
sed '/^[ \t]*$/d' /tmp/databook
```

开头和结尾之间没有任何字符(空格和换行符都没有)

## 七，Awk
AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。
依次对每一行进行处理，然后输出
$0           表示整个当前行
$1           每行第一个字段

```powershell
awk ‘pattern' filename
awk '{{action}}' filename
awk 'pattern{action}' filenme
```
其中 pattern 表示 AWK 在数据中查找的内容，而 action 是在找到匹配内容时所执行的一系列命令

每行按空格或TAB分割，输出文本中的1、4项

```powershell
awk '{print $1,$4}' log.txt
```

每行按 : 分割，输出文本中的1、4项

```powershell
 awk -f: 'print $1,$2' filename
```

大写字母J开头的行

```powershell
awk '/^J/{print $1,$2}' filename
```

绩点大于三点五的

```powershell
awk '$4>3.5{print $1,$2}' filename
```

CS的：

```powershell
awk '$3=="CS"{print $1,$2}' filename
awk '$3=="CS" && $4>4{print $1,$2}' filename
```

以D开头的：

```powershell
awk '$2~/^D/{print $1,$2} ' filename
```

第三个字段包含CA，以：为分隔符

```powershell
awk  -f: '$3~/!CA/{print $1,$2}' filename
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511203938326.png)
找出2,3,4字段平均起来大于70的行

```powershell
awk '($2+$3+$4)/3>70{print $0,{$2+$3+$4}($2+$3+$4)/3}' /tmp/score
```

~匹配 $1!~/bash/

```powershell
awk -F: '$7!='/bin/bash' && $1~/^s19/' filename
```

NR 变量 行号
输出文件的第二行到第四行

```powershell
sed -n '2,4p' filename 
或者
awk 'NR>=2 && NR <=4' filename
```

```powershell
cat -n filename
awk '{print NR,$0}' filename
```

练习实例：
With awk(/tmp/donors): contains the names, phone numbers, and money contributions to the party campaign for the past three months
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210511204023468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
head -3 /temp/donors 查看文件长什么样
Print all the phone numbers

```powershell
 awk -F:'{print $2}' /tmp/donors
```

 -F:定义:为分隔符，打印第二个字段  
Print Dan's phone number

```powershell
awk -F: '/Dan/{print $2}' /tmp/donors
```

Print Susan's name and phone number

```powershell
awk -F: '/Susan/{print $1,$2}' /tmp/donors
```

Print all last names beginning with D

```powershell
awk -F'[: ]' '$2~^/D[a-z]*/{print $0}' /tmp/donors
```

以冒号和空格为分隔符
第二个字段去匹配以D开头的
用 / ? / 把正则表达式包括起来
Print all first names beginning with either a C or E.

```powershell
awk '$1 ~ /^[CE]/ {print $1}' /tmp/donors
```

Print all first names containing only four characters.

```powershell
awk '/^[a-zA-Z]{4} /{print $1}' /tmp/donors
```

/^....$/ 
/^.{4}/  开头和结尾之间只包含4个字符

Print the first names of all those in the 916 area code.

```powershell
awk '$2~/916/{print $1}'  /tmp/donors
```

Print Main’s campaign contributions. Each value should be printed with a leading dollar sign; e.g., $250 $100 $175.

```powershell
awk -F: '/[a-zA-Z]* Man/{print "$"$3,"$"$4,"$"$5}' 
```

Print second name followed with a comma and first name

```powershell
awk -F '[ :]' '{print $2", "$1}' /tmp/donors
```

Print the first and last names of those who contributed more than $100 in the second month.

```powershell
awk -F '[ :]' '$6>100{print $1, $2}' /tmp/donors
awk -F: $4>100{print $1}' /tmp/donors
```

Print the names and phone numbers of those who contributed less than $85 in the last month.

```powershell
awk -F '[ :]' '$7<85{print $1" "$2, "phone-number:"$4}' /tmp/donors
awk -F: $4<85{print $1,$2}' /tmp/donors
```

Print the names of those who contributed between $75 and $150 in the first month.

```powershell
awk -F '[ :]' '$5>=75&&$5<=150{print $1" "$2;}' /tmp/donors
awk -F: $5>=75&&$5<=150{print $1}' /tmp/donors
```

Print the names of those who contributed less than $800 over the three-month period.

```powershell
awk -F: '($5+$6+$7)<800{print $1}' /tmp/donors
```

Print the names and addresses of those with an average monthly contribution greater than $200.

```powershell
awk -F'[:(]': '($3+$4+$5)/3>200{print $1,$2}' /tmp/donors
```

Print the first name of those not in the 916 area code.

```powershell
awk '$2!~/916/{print $1}'  /tmp/donors
```

第二个字段不包含916

Print each record preceded by the number of the record.

```powershell
awk '{print NR，$0}'
```

NR表示行号
Print the name and total contribution of each person.

```powershell
awk -F: '{print $1,$3+$4+$5}' 
```
## 八，重定向和管道

**（一）重定向**
[https://www.cnblogs.com/softidea/p/3965093.html](https://www.cnblogs.com/softidea/p/3965093.html)
标准输入重定向：把标准输入和一个文件相关联  

```powershell
   command<文件名
```

标准输出重定向：把标准输出和一个文件相关联
                   

```powershell
   command>文件名(覆盖）
   command>>文件名(增加）
```

标准重定向标准错误:为了重定向标准错误，可以指定文件描述符2。

```powershell
ls -l /etc/password 2> result
```
grep命令没有找到该文件，缺省地向终端输出了一个错误信息。现在让我们把错误重定向到文件/dev/null中(实际就上是系统的垃圾箱)：

```powershell
$ grep "trident" missiles 2>/dev/null
这样所有的错误输出都输送到了/dev/null，不再出现在屏幕上。
```

**（二）管道**
用于将两个命令结合到一起，用“|”表示

```powershell
who|wc -l
将who命令的结果输送到wc -l命令
```

```powershell
who | grep '^s19' |grep '192.168.207'|awk '{print $1}'|sort|uniq|wc -l

grep -v '192.168.207' 
-v表示非
```

**作业：**

（1）并以下文件中的数据(按此顺序)并将其附加到all。LABS文件:lab1、lab2、lab3、lab4。           任何错误都应该重定向到error.log文件。显示您的会话。
 

```powershell
合并两个文件：
 cat lab1 lab2 lab3 lab4 >all 或者 cat lab[1-4] > all
 任何错误都应该重定向到error.log文件:
 cat lab1 lab2 lab3 lab4 >all 2>error.log
```
（2）使用命令行以GPA降序显示前五名学生的文件Student_record中的记录，即，最先显示GPA最高的学生记录。

```powershell
sort -k4 -n -r student_record | head -n 5
```

> sort命令中各个参数表示什么意思?
(1) -k -k1表示按第一个字段排序，-k2表示按第二个字段排序
          -k1 -k2 表示先按k1，若k1相同再按k2排序
(2) -n 依照数值的大小排序。
(3) -r 以相反的顺序来排序。
(4) -t 定义分隔符

**（三）重定向和管道组合在一起**

who 查看有谁登录了
who | wc -l 输出行数
tee 把结果重定向到指定文件

```powershell
who | tee filename | wc -l
```

>  把who命令的结果分成两份，一份标准输出，一本重定向到filenname



## 九，链接文件
Linux ln（英文全拼：link files）命令是一个非常重要命令，它的功能是为某一个文件在另外一个位置建立一个同步的链接。

> 当我们需要在不同的目录，用到相同的文件时，我们不需要在每一个需要的目录下都放一个必须相同的文件，我们只要在某个固定的目录，放上该文件，然后在 其它的目录下用ln命令链接（link）它就可以，不必重复的占用磁盘空间。


```powershell
ln [参数][源文件或目录][目标文件或目录]
参数： -f 强制创建
      -s 软链接(符号链接)
      -i 交互模式，文件存在则提示用户是否覆盖
      -b 删除，覆盖以前建立的链接
      -d 允许超级用户制作目录的硬链接
      -i 交互模式，文件存在则提示用户是否覆盖
      -n 把符号链接视为一般目录
      -v 显示详细的处理过程
```
平时使用感觉就像桌面应用上的快捷图标一样
比如你安装的`nginx`文件在`usr/local/nginx/sbin/nignx`，可以在`usr/local/bin`中建立一个`nginx`的软连接，这样每次就可以全局访问了。 

```powershell
// 给nginx建立一个可以全局访问的软连接
ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
```
软链接：软链接的方式则是产生一个特殊的档案，该档案的内容是指向另一个档案的位置。

 1. 软链接，以路径的形式存在。类似于Windows操作系统中的快捷方式
 2. 软链接可以 跨文件系统 ，硬链接不可以
 3. 软链接可以对一个不存在的文件名进行链接
 4. 软链接可以对目录进行链接

硬链接：硬链接的意思是一个档案可以有多个名称

 1. 硬链接，以文件副本的形式存在。但不占用实际空间。
 2. 不允许给目录创建硬链接
 3. 硬链接只有在同一个文件系统中才能创建,不能横跨系统。
 4. 源文件删除还能通过硬链接访问文件

> 硬链接是存在同一个文件系统中，而软链接却可以跨越不同的文件系统。

## 十， Linux ps 命令
	Linux中的ps命令是Process Status的缩写。ps命令用来列出系统中当前运行的那些进程。ps命令列出的是当前那些进程的快照，就是执行ps命令的那个时刻的那些进程，如果想要动态的显示进程信息，就可以使用top命令。	
	

> 类似于 windows 的任务管理器。

**linux上进程有5种状态:** 

 -  运行(正在运行或在运行队列中等待)
 - 中断(休眠中, 受阻, 在等待某个条件的形成或接受到信号)
 - 不可中断(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)
 - 僵死(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)
 - 停止(进程收到SIGSTOP, SIGSTP, SIGTIN, SIGTOU信号后停止运行运行)

**ps工具标识进程的5种状态码:** 

 - D 不可中断 uninterruptible sleep (usually IO)

 - R 运行 runnable (on run queue)

 - S 中断 sleeping

 - T 停止 traced or stopped

 - Z 僵死 a defunct (”zombie”) process


语法：

```powershell
ps[参数]
```
命令参数：

```powershell
a  显示所有进程
	-a 显示同一终端下的所有程序
	
	-A 或者 -e 显示所有进程

	c  显示进程的真实名称
	-N 反向选择
	e  显示环境变量
	f  显示程序间的关系
	-H 显示树状结构
	r  显示当前终端的进程
	T  显示当前终端的所有程序
	u  指定用户的所有进程
	-au 显示较详细的资讯
	-aux 显示所有包含其他使用者的行程 
	-C<命令> 列出指定命令的状况
	--lines<行数> 每页显示的行数
	--width<字符数> 每页显示的字符数
	--help 显示帮助信息
	--version 显示版本显示
```
例：

```powershell
ps -A

```

```powershell
 ps -e | grep 'nginx' | wc -l

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210527110812996.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
显示指定用户信息

```powershell
ps -u root

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210527110837946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)

```powershell
nice -n 10 | ps -l
设置优先级
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210527110859578.png)
## pstree(进程树)命令:

> Linux pstree命令将所有行程以树状图显示，树状图将会以 pid (如果有指定) 或是以 init 这个基本行程为根 (root)，如果有指定使用者 id，则树状图会只显示该使用者所拥有的行程。

```powershell
pstree -V

```
参数说明：
-a 显示该行程的完整指令及参数, 如果是被记忆体置换出去的行程则会加上括号
-c 如果有重覆的行程名, 则分开列出（预设值是会在前面加上 *）

```powershell
pstree -u //显示用户名称
```
## 十三，系统任务有关的  top,jobs,fg,bg,kill,nohub
**(1)top命令**
top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况，类似于Windows的任务管理器。
经常用来监控linux的系统状况，比如cpu、内存的使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210603102628233.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
第一行，任务队列信息，同 uptime 命令的执行结果
第二行，Tasks — 任务（进程）
第三行，cpu状态信息
第四行,内存状态
第五行，swap交换分区信息
第六行，空行
第七行以下：各进程（任务）的状态监控

```powershell
PID — 进程id
USER — 进程所有者
PR — 进程优先级
NI — nice值。负值表示高优先级，正值表示低优先级
VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
SHR — 共享内存大小，单位kb
S —进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
%CPU — 上次更新到现在的CPU时间占用百分比
%MEM — 进程使用的物理内存百分比
TIME+ — 进程使用的CPU时间总计，单位1/100秒
COMMAND — 进程名称（命令名/命令行）
```
**(2）& 放在命令后面表示设置此进程为后台进程**
加在一个命令的最后，可以把这个命令放到后台执行，如

```powershell
watch  -n 10 sh  test.sh  &  #每10s在后台执行一次test.sh脚本
```
**（3）ctrl + z**

可以将一个正在前台执行的命令放到后台，并且处于暂停状态。

**（4）jobs  查看后台运行的进程** 

查看当前有多少在后台运行的命令
jobs -l选项可显示所有任务的PID，jobs的状态可以是running, stopped, Terminated。但是如果任务被终止了（kill），shell 从当前的shell环境已知的列表中删除任务的进程标识。

**（5）fg**

将后台中的命令调至前台继续运行。如果后台中有多个命令，可以用fg %jobnumber（是命令编号，不是进程号）将选中的命令调出。

**（6）bg**

将一个在后台暂停的命令，变成在后台继续执行。如果后台中有多个命令，可以用bg %jobnumber将选中的命令调出。

**（7）kill 命令用于删除执行中的程序或工作。**

kill 可将指定的信息送至程序。预设的信息为 SIGTERM(15)，可将指定程序终止。
若仍无法终止该程序，可使用 SIGKILL(9) 信息尝试强制删除程序。
程序或工作的编号可利用 ps 指令或 jobs 指令查看。

kill除了可以终止进程，还能给进程发送其它信号，使用kill -l 可以察看kill支持的信号。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210603102816109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTY0NDMzNQ==,size_16,color_FFFFFF,t_70)
使用 kill -l 命令列出所有可用信号。

最常用的信号是：

 - 1 (HUP)：重新加载进程。
 - 9 (KILL)：杀死一个进程。
 - 15 (TERM)：正常停止一个进程。

**实例**

杀死进程

```powershell
 kill 12345
```

强制杀死进程

```powershell
 kill -KILL 123456
```

发送SIGHUP信号，可以使用一下信号

```powershell
kill -HUP pid
```

彻底杀死进程

```powershell
 kill -9 123456
```

显示信号

```powershell
 kill -l
```

```powershell
1) SIGHUP     2) SIGINT     3) SIGQUIT     4) SIGILL     5) SIGTRAP
6) SIGABRT     7) SIGBUS     8) SIGFPE     9) SIGKILL    10) SIGUSR1
11) SIGSEGV    12) SIGUSR2    13) SIGPIPE    14) SIGALRM    15) SIGTERM
16) SIGSTKFLT    17) SIGCHLD    18) SIGCONT    19) SIGSTOP    20) SIGTSTP
21) SIGTTIN    22) SIGTTOU    23) SIGURG    24) SIGXCPU    25) SIGXFSZ
26) SIGVTALRM    27) SIGPROF    28) SIGWINCH    29) SIGIO    30) SIGPWR
31) SIGSYS    34) SIGRTMIN    35) SIGRTMIN+1    36) SIGRTMIN+2    37) SIGRTMIN+3
38) SIGRTMIN+4    39) SIGRTMIN+5    40) SIGRTMIN+6    41) SIGRTMIN+7    42) SIGRTMIN+8
43) SIGRTMIN+9    44) SIGRTMIN+10    45) SIGRTMIN+11    46) SIGRTMIN+12    47) SIGRTMIN+13
48) SIGRTMIN+14    49) SIGRTMIN+15    50) SIGRTMAX-14    51) SIGRTMAX-13    52) SIGRTMAX-12
53) SIGRTMAX-11    54) SIGRTMAX-10    55) SIGRTMAX-9    56) SIGRTMAX-8    57) SIGRTMAX-7
58) SIGRTMAX-6    59) SIGRTMAX-5    60) SIGRTMAX-4    61) SIGRTMAX-3    62) SIGRTMAX-2
63) SIGRTMAX-1    64) SIGRTMAX
```

杀死指定用户所有进程

```powershell
kill -9 $(ps -ef | grep hnlinux) //方法一 过滤出hnlinux用户进程 
```

```powershell
kill -u hnlinux //方法二
```

终止进程：

```powershell
前台 ctrl + c
后台 fg + ctrl + c
```

**（8）nohup**
如果让程序始终在后台执行，即使关闭当前的终端也执行（之前的&做不到），这时候需要nohup。该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。关闭中断后，在另一个终端jobs已经无法看到后台跑得程序了，此时利用ps（进程查看命令）
```powershell
ps -aux | grep "test.sh"  #a:显示所有程序 u:以用户为主的格式来显示 x:显示所有程序，不以终端机来区分
```

一次性计划任务
命令： at



持续更新中......................................