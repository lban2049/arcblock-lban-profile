# ArcBlock 功能测试

本仓库为测试 ArcBlock 产品  Blocklet Server 功能，完成个人信息编辑、保存功能。

## 运行

1. git 拉取本仓库代码。

2. 运行 `npm install` 安装依赖。

3. 添加 Mongo 数据库相关环境变量：

```
MONGODB_URL = mongodb+srv://xxxxxx
DB_NAME = arcprofile
```

4. 运行 `npm run dev` 启动服务。


## 功能介绍

1. 首次打开页面时，提醒用户填写个人信息。

2. 填写个人信息后，点击保存按钮，保存个人信息。

3. 默认页面为只读模式，点击编辑按钮，进入编辑模式。

4. 编辑个人信息后，点击保存按钮，保存个人信息，返回只读模式，显示最新信息。

5. 重新打开或刷新页面，显示最新信息。
