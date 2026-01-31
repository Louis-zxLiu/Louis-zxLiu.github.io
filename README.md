# 刘志轩个人主页 (Zhixuan Liu's Academic Homepage)

这是一个基于 HTML/JS 和 Markdown 驱动的个人学术主页。

## 🚀 项目特点

- **Markdown 驱动**：所有页面内容（Home, Awards, Experience, Publications, Blog）均通过 `contents/` 目录下的 `.md` 或 `.yml` 文件管理，无需修改 HTML 即可更新内容。
- **响应式设计**：适配 PC、平板和手机端。
- **动态博客系统**：支持独立 Markdown 文件的博客加载。
- **论文展示系统**：支持论文卡片展示、预览图及分类筛选。
- **悬浮侧边栏**：个人信息随滚动悬浮，方便随时查看联系方式。

## 📂 目录结构

```text
/
├── index.html          # 页面主入口
├── contents/           # 内容配置目录 (核心维护区域)
│   ├── config.yml      # 全局基本信息 (姓名、职位、邮箱等)
│   ├── home.md         # 个人简介内容
│   ├── awards.md       # 获奖信息
│   ├── experience.md   # 经历信息
│   ├── publications.yml # 论文列表配置
│   ├── blogs.yml       # 博客列表配置
│   └── blogs/          # 存放独立博客 .md 文件
├── static/             # 静态资源
│   ├── css/            # 样式表 (main.css)
│   ├── js/             # 脚本 (scripts.js)
│   └── assets/         # 图片、头像、图标
└── _config.yml         # Jekyll 配置 (用于 GitHub Pages 部署)
```

## 🛠️ 如何维护

### 更新个人信息
修改 `contents/config.yml` 中的对应字段。

### 发布新论文
在 `contents/publications.yml` 中添加新的项，并上传预览图至 `static/assets/img/`。

### 写博客
1. 在 `contents/blogs/` 下新建 `.md` 文件。
2. 在 `contents/blogs.yml` 中注册该文章的标题和文件名。

### 本地预览
直接使用浏览器打开 `index.html` 即可预览大部分效果。

## 📄 开源协议
MIT License

