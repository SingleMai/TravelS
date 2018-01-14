## 数据库设计
### admin 后台管理人员表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|------|--|
| id | int(15)| PRIMARYKEY<br>AUTOINCREMENT |
| name | varchar(16) |  | 管理员名称 |
| account | varchar(16) | unique | 登录账号 |
| password | varchar(16) |  | 加密后的密码字段 |
| permission | int(10) |  | 1： 总管理员<br>2: 特殊管理员<br>3. 一般管理员 |

### carousel 轮播图表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| title | varchar(20) |  | 轮播图的标题 |
| content | varchar(50) | | 轮播图的描述 |
| carousel | varchar(50) | | 轮播图文件名 |
| link | varchar(50) |  | 指向轮播图链接跳转处 |
| weight | int(10) | unique | 权重，数值越大，权重越高。影响轮播图的顺序 |
| site | int(10) |  | 区分首页或其他位置轮播图标志，暂默认1为首页。其余数字为缺省 |


### travels圈表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | ForeignKey | 指向`users`表的id |
| content | text |  | 文本信息，缺省值为'' |
| views | int(10) |  | 阅读量，初始值为0 |
| time | time |  | 发布时间 |

### travels_likes 评论点赞统计表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| travel_id | int(15) | ForeignKey | 指向`travels`的id |
| user_id | int(15) | ForeignKey | 指向`users`的id |

### tranvels_img 保存TravelS的图片信息
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| travel_id | int(15) | ForeignKey | 指向`travels`表的id |
| travel_img | varchar(30) |  | 图片文件名 |
| order | int(10) | 1-9 | 图片展示的顺序，从小到大排序 |
| time | time |  | 上传时间 |

### tranvels_comment 保存Travels评论信息
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| travels_id | int(15) | ForeignKey | 指向`travels`的id |
| commenter | int(15) | ForeignKey | 评论人id,指向`users`的id |
| replyer | int(15) | ForeignKey | 回复人id,指向`users`的id。缺省为0 |
| content | text |  | 评论内容 |
| time | time |  | 评论时间 |

### users 用户信息表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| head | varchar(30) | | 头像文件名 |
| name | varchar(30) | unique | |
| sex | tingyint(2) |  | 0： 保密<br>1: 男<br>2: 女 |
| phone | int(30) | unique | 电话 |
| wetchat | varchar(30) | unique | 微信号 |
| blog | varchar(30) | unique | 微博 |
| email | varchar(30) | unique | 邮箱 |
| instroduction | text |  | 自我介绍 |
| has_id_card | tinyint(2) |  | 根据`user_card`判断是否通过身份证认证 |
| has_edu_card | tinyint(2) |  | 根据`user_card`判断是否通过学历认证 |
| has_guide_card | tinyint(2) |  | 根据`user_card`判断是否通过导游认证 |
| has_drive_card | tinyint(2) |  | 根据`user_card`判断是否通过驾驶认证 |
| has_shop | tinyint(2) |  | 根据`user_shop`判断是否开启小店服务 |
| born | time |  | 出生年月 |
| job | varchar(30) |  | 行业、工作 |
| city | varchar(30) |  | 城市 |
| school | varchar(30) |  | 学校 |
| recommend_id | int(15) |  | 推荐人id,指向`users`的id |
| time | time |  | 注册时间 |

### user_card 各种认证信息表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | Foreignkey | 指向`users`的id |
| card_img | varchar(30) |  | 图片文件名 |
| status | int(2) |  | -1: 认证不通过<br>0: 未认证<br>1: 已认证<br> |
| type | int(2) |  | 0: 身份证<br>1: 学历证<br>2: 导游证<br>3: 驾驶证 |
| time | time |  | 操作时间 |

### user_private 用户私密性设置// TODO
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | Foreignkey | 指向`users`的id |
| phone | tingyInt(2) |  | 是否在付款成功前显示的信息 |
| wetchat | tingyInt(2) |  | 是否在付款成功前显示的信息 |
| blog | tingyInt(2) |  | 是否在付款成功前显示的信息 |

### user_likes 用户收藏
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | Foreignkey | 指向`users`的id |
| servies_id | int(15) | Foreignkey | 指向`servies`的id |
| time | time | | 时间 |

### user_shop 用户店铺信息表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | Foreignkey | 指向`users`的id |
| time | time |  | 创建时间 |

### servies 服务信息表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| shop_id | int(15) | Foreignkey | 指向`shops`的id |
| head_img | varchar(15) |  | 首图文件名 |
| tilte | varchar(30) |  | 标题 |
| content | text |  | 富文本内容 |
| price | int(30) |  | 价格（以分为单位） |
| type_id | int(15) |  | 服务类型，指向`servies_type`的id |
| views | int(10) |  | 阅读量 |
| likes | int(10) |  | 收藏量 |
| time | time |  | 创建时间 |

### servies_comment 服务评论
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| servies_id | int(15) | Foreignkey | 服务，指向`servies`的id |
| order_id | int(15) | ForeignKey | 订单,指向`orders`的id |
| content | text |  | 评论内容 |
| starts | int(10) |  | 评分（5星） |
| time | time |  | 评论时间 |

### servies_comment_img 服务评价图片信息
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| comments_id | int(15) | ForeignKey | 指向`servies_comment`表的id |
| servies_comment_img | varchar(30) |  | 图片文件名 |
| order | int(10) | 1-9 | 图片展示的顺序，从小到大排序 |
| time | time |  | 上传时间 |

### servies_reply 店家回复
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| comments_id | int(15) | ForeignKey | 指向`servies_comment`表的id |
| content | text |  | 评论内容 |
| time | time |  | 评论时间 |

### servies_img 服务内容图片
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| servies_id | int(15) | Foreignkey | 指向`servies`的id |
| servies_img | varchar(30) |  | 图片文件名 |
| time | time |  | 创建时间 |

### servies_type 服务类型映射表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| name | varchar(30) | | 服务类型（一日游、多日游、门票、酒店、演出活动、当地特产、租车） |

### orders 订单信息表
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| servies_id | int(15) | Foreignkey | 服务，指向`servies`的id |
| buyer_id | int(15) | Foreignkey | 游客，指向`users`的id |
| servies_comment_id | int(15) | Foreignkey | 评价，指向`servies_comment`的id |
| status | int(10) |  | 订单状态：<br>-2. 向导拒绝订单<br> -1. 已失效<br>0: 待付款<br>1: 待接收<br>2: 已确认<br>3: 售后<br>4:已评价|
| time | time |  | 创建时间 |

### wallet 用户钱包
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| user_id | int(15) | Foreignkey | 指向`users`的id |
| balance | int(15) |  | 账户余额（以分为单位）|
| password | int(4) |  | 交易密码 |
| bank |  |  | 银行卡 |

### bills 账单详情
| 字段 | 类型 | 属性 | 说明 |
|-----|------|---------|------|
| id | int(15) | PRIMARYKEY<br>AUTOINCREMENT | |
| time | time |  | 创建时间 |


### feedback 信息反馈
