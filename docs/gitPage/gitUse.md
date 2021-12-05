@[toc]

## Git 的工作流程
![在这里插入图片描述](https://img-blog.csdnimg.cn/d026e38579484a1ea577c5dd0ca132a2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
工作区：就是当前正在操作的文件夹
暂存区 staging Area/Index：需要提交的文件修改暂时放到暂存区，然后再一次性提 交到本地版本库中。
![在这里插入图片描述](https://img-blog.csdnimg.cn/58c5ef79b7b74381a8da19ca3bee297e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
把文件添加到本地 Git 版本库里时，要执行以下两步：
第一步，执行“git add”命令把文件添加到暂存区；
第二步，执行“git commit”提交更改，把暂存区的所有内容提交到本地版本库 master 分支中。Git 在版本库会为项目自动创建的一个主分支 master，默认情况 下 git commit 会向 master 分支提交更改。

课堂实验：依次执行以下命令
git status：查看版本库的状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/b4930b18a0504ea2b67f8e28413aef7b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
在 GitTest 文件夹中创建一个 hello.text 文件，然后再次执行 git status 命令：
![在这里插入图片描述](https://img-blog.csdnimg.cn/5f968d112352451494ba3dd702b12432.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)

如上图所示，Git 发现在“GitTest”文件夹下有“untracke files”未跟踪的文件。
git add：把文件添加到暂存区
![在这里插入图片描述](https://img-blog.csdnimg.cn/d7a85fa087244810a3535975d25dccae.png)
再次执行 git status：
![在这里插入图片描述](https://img-blog.csdnimg.cn/94ebedaa0ceb42d88b4139975aaeab7e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)


从上图可以发现，当前文件状态已从 Untracked 变成了 new file，表明该文件已经被 安置到暂存区（staging Area/Index）。也可以执行以下命令： 

Git add *.txt -------- 把*.txt 的文件加到暂存区

 Git add --all 或 git add . ------把所有的文件都加到暂存区

注意：执行了 git add 命令后，如果又修改了 hello.txt 文件，需要再次执行 git add hello.txt 命令，把修改后的 hello.txt 加入暂存区

Git commit：把暂存区的内容提交到本地版本库中 Git commit -m “内容说明” ----把文件永久保存下来，并添加内容说明
![在这里插入图片描述](https://img-blog.csdnimg.cn/a7c6b8c139ec49babf9ff943e606415f.png)
















## 创建本地版本库
版本库又名仓库，可以理解成一个目录，这个目录里面的所有文件都可以被 Git 管 理，每个文件的修改、删除，Git 都能跟踪，以便任何时刻都可以追踪历史，或者在将 来某个时刻可以“还原”。所以，首先应该创建一个本地版本库。


## git和GitHub的关联

## （1）GitHub
GitHub 是一个商业网站，是当前全球最大的 Git 服务器。

Git 和 GitHub 的区别：Git 是一款版本控制软件，而 GitHub 是一个商业网站， 其本体是一个 Git 服务器，但这个网站上的应用程序可以让大家通过 Web 操作，来 完成原本要用复杂的 Git 指令才能做到的操作。

GitHub 的具体使用步骤，可访问以下网页：

[https://www.runoob.com/w3cnote/git-guide.html](https://www.runoob.com/w3cnote/git-guide.html)

也可以使用码云：https://gitee.com/ 作为远程仓库。

GitHub 支持团队协同开发，另外 Idea 中也支持 GitHub 的应用，可自行查阅相 关材料进行自学


**Git配置SSH Key**

```cpp
git config --global user.name "用户名"
git config --global user.email "绑定的电子邮箱"
ssh -keygen -t rsa -C“绑定的电子邮箱”
cat ~/.ssh/id_rsa.pub
```


## git常用命令

```cpp
git status    //查看当前状态 

git add .        //将所有文件更改添加到暂存区
git commit -m "更改说明"       //提交到本地仓库
git push origin          //将代码推送到远程
git clone 地址     //克隆GitHub上的仓库到本地   ,拷贝一份远程仓库，也就是下载一个项目。
git clone 地址 -b 分支名称    //克隆某个特定分支

```
## git的分支管理
git remote -v  列出详细信息，在每一个名字后面列出其远程url，此时， -v 选项(译注:此为 –verbose 的简写,取首字母),显示对应的克隆地址。![在这里插入图片描述](https://img-blog.csdnimg.cn/2020100820483635.png#pic_center)

```cpp
git remote    //不带参数，列出已经存在的远程分支

git branch    //查看分支，一般克隆下来的默认只有一个master分支  前面加* 号的是当前的分支
git branch -a    //加上-a参数可以查看远程分支

git branch <name>     //创建分支

git switch <name>
git checkout <name>    //切换分支

git switch -c <name>        //创建分支的同时切换到该分支（写法1）
git checkout -b <name>     //创建分支的同时切换到该分支（写法2）

git branch -d <name>      //删除分支

git branch -r -d origin/branch-name  
git push origin :branch-name   //删除远程分支

git branch --set-upstream-to=origin/remote_branch your_branch  
 //将本地的仓库和远程的仓库关联起来

//如果远程新建了一个分支，本地没有该分支。可以利用
 git checkout --track origin/branch_name 
 //这时本地会新建一个分支名叫 branch_name ，会自动跟踪远程的同名分支 branch_name。

//如果本地新建了一个分支 branch_name，但是在远程没有。
//这时候 push 和 pull 指令就无法确定该跟踪谁，一般来说我们都会使其跟踪远程同名分支
//所以可以利用 
git push --set-upstream origin branch_name 
//这样就可以自动在远程创建一个 branch_name 分支，然后本地分支会 track 该分支。
//后面再对该分支使用 push 和 pull 就自动同步。

git push --set-upstream origin branch_name

//如果是多人开发的话 需要把远程master上的代码pull下来
git pull    
//然后合并冲突，然后再git add .
然后再git commit -m "balabala"
然后再git push origin <name>   //提交到远程仓库

git merge dev  //将dev分支和现在分支的开发历史合并在一起，再自己手动解决分支
```
## 如何将本地的项目上传到GitHub上


```bash
git init  //把这个文件夹变成Git可管理的仓库

git add .
git commit -m "aaa"
在Github上创建好Git仓库之后我们就可以和本地仓库进行关联了
$ git remote add origin https://github.com/guyibang/TEST2.git
或者
$ git remote add origin git@github.com:GDUFS-IIIP-DEV/yunyin.git

git push -u origin master
// 由于新建的远程仓库是空的，所以要加上-u这个参数，
//等远程仓库里面有了内容之后，下次再从本地库上传内容的时候只需下面这样就可以了

git push origin master

当github上的仓库不是空的时，即在GitHub上创建仓库的时候勾选了创建README.md文件时，要先pull
git pull --rebase origin master

git log --oneline --graph //以简洁的方式显示 git 记录
git log -最近提交的次数 //查看最近几次的 git 记录
Git rm 文件名 --cached //某个文件不再被 Git 控制
Git mv hello.txt world.txt：更新文件名

Git checkout 文件名：找回已删除的文件： 

Git reset master^:撤销某次 commit





```



## 项目开发中使用git的标准

master分支：只有项目经理才能合并，是项目的最终版
dev开发分支：最后要合并到master分支上的，我们在开发分支上操作

开发：
先拉取dev分支到本地
然后在本地再建新分支开发新功能：比如新建feature分支，在feature分支上写代码，运行没问题后再合并到dev分支上，dev分支检查下有没有问题，没有问题就可以推送到远程

```cpp
怎么合并分支，首先，我们要切换到dev分支上，然后输入
git merge feature
把feature分支的代码合并到dev上
```
其他命令
```cpp
更新远程分支列表
git remote update origin --prune

查看所有分支
git branch -a

删除远程分支Chapater6
git push origin --delete Chapater6

删除本地分支 Chapater6
git branch -d  Chapater6
```

测试分支：
项目开发完毕时，在远程的dev分支上新建出一个测试分支，用来测试，测试没问题后就可以将dev分支合并到master分支上，然后就能上线了

## git版本回退
当修改出错的时候想回退到某个版本

```javascript
git log //该命令显示从最近到最远的提交日志。每一次提交都有对应的 commit id 和 commit message。
git log --pretty=oneline //简化
git reset --hard id //根据 id 回退到指定的版本；
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/d0e3ae92ee1d4876ad9413fcf71a7a80.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
