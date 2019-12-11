# Git 常用操作

## Git 配置

1. 设定 用户名／电子邮件地址

```bash
$ git config --global user.name "Your username"
$ git config --global user.email "Your@email.com"
```

**注**: 设置本地可改为`--local`

2. 输出彩色

```bash
$ git config --global color.ui true
```

3. 设定命令别名

```bash
$ git config --global alias.<aliasname> <command>
```

4. 显示设定菜单

```bash
$ git config --global list
```

## 基本操作

1. 将当前目录初始化为 git 数据库

```bash
$ git init
```

2. 查看状态

```bash
$ git status
```

3. 查看日志

```bash
$ git log
$ git log --pretty=oneline  (单行模式)
$ git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short (漂亮的输出格式)
```

4. 显示暂存区和工作区的差异

```bash
$ git diff
```

5. 添加文件或目录到索引（暂存区)

```bash
$ git add [filename]
```

6. 将暂存区生成快照并提交

```bash
$ git commit -m 'commit message' (提交到仓库)
$ git commit -v (提交时显示所有diff信息)
$ git commit -a (提交工作区自上次commit的变化)
$ git commit --amend -m 'commit message' (替代上一次提交)
```

7. 停止跟踪指定文件，但该文件保留在工作区

```bash
$ git rm --cached [filename]
```

8. 删除工作区文件并放入暂存区

```bash
$ git rm [filename]
```

9. 删除未跟踪的文件

```bash
$ git clean -f
```

10. 删除未跟踪的文件及目录

```bash
$ git clean -fd
```

11. 删除未跟踪的文件及目录，包含 gitignore 的文件/目录

```bash
$ git clean -xfd
```

::: tip
在用上述 git clean 前，强烈建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删

```bash
$ git clean -nxfd
$ git clean -nf
$ git clean -nfd
```

:::

## 标签

1. 添加标签

```bash
$ git tag [tagName]
```

2. 上传标签到远程仓库

```bash
$ git push origin [tagName]
```

## 撤销

1. 撤销本地修改

```bash
$ git checkout -- [filename]
$ git checkout -- .
```

2. 重置暂存区和工作区，与上一次 commit 保持一致

```bash
$ git reset --hard ［filename］
```

## 分支

1. 创建分支

```bash
$ git branch [name]
```

2. 切换分支

```bash
$ git checkout [name]
```

3. 创建并切换分支

```bash
$ git checkout -b [name]
```

4. 合并分支

```bash
$ git merge [name]
```

5. 删除分支

```bash
$ git branch -d [name]
```

6. 查看分支

```bash
$ git branch
```

## 远程同步

1. 添加远程库

```bash
$ git remote add origin git@github.com:yourname/yourrepoistry.git
```

2. 推送本地仓库到远程库

```bash
# 第一次push使用 -u，将本地的master分支与远程的master分支关联起来，以后推送或拉取就可以简化命令
$ git push -u origin master
$ git push origin master
```

3. 克隆现有的远程数据库

```bash
$ git clone [url]
```

4. 查看远程仓库

```bash
$ git remote -v
```

5. 查看远程数据库分支的修改内容

```bash
$ git fetch origin master
```

6. 拉取远程数据库的分支的变化，并于本地分支合并

```bash
$ git pull [remote]
```

## 其他

1. 忽略文件

```bash
$ git ignore [file]
```

## Q&A

1. 拉取代码时，git 拒绝合并无关历史?

原因:

git 合并命令拒绝合并没有共同祖先的历史。换言之，就是本地仓库和远程仓库提交历史不一致，没有共同的祖先 commit。对此，git 的官方文档是这样描述的：

> By default, git merge command refuses to merge histories that do not share a common ancestor. This option can be used to override this safety when merging histories of two projects that started their lives independently. As that is a very rare occasion, no configuration variable to enable this by default exists and will not be added.

解决方法：

```bash
$ git pull origin master --allow-unrelated-histories
```
