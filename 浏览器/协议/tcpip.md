### OSI 七层协议模型

![OSI](https://zbd-image.oss-cn-hangzhou.aliyuncs.com/rumination/v2-854e3df8ea850c977c30cb1deb1f64db_r.jpg)

在互联网还没普及时，这些协议就已经出来，随着后来数据日渐丰富，协议种类也在累加。

对于我们来说网络世界丰富多彩，对于互联网来说也就是数据根据相应的规则在跑来跑去。（这些规则就是协议）。就像早上你开车到公司，路上遵守交通规则。然后安全抵达公司。就相当于完成了一次信息发送。

上面的 OSI 模型是一种接近完美的理论，注意这种模型只出现在教课书里，这种模型是在 TCP/IP 协议已经成熟之后提出的，可以理解为升级版。但是由于种种原因并没有流行起来，所以现在网络数据传输还是 TCP/IP 的天下

### TCP/IP

TCP/IP 协议是一大堆协议的集合，TCP/IP 协议分为四层（也就是数据传输一次主要经历以下 4 个步骤），分别是从上到下为：应用层，传输层，Internet，物理层。

假如你给你的基友发一个消息，数据开始传输，这时数据就要遵循 TCP/IP 协议啦，你的电脑会做出以下动作，这些动作你是看不到的。

1. 应用层先把你的消息进行格式转换,你的消息是文字还是图片，还是成人视频并进行加密等操作交给传输层。（这时的数据单元（单位）是信息）
2. 传输层将数据切割成一段一段的，便与传输并往里加上一些标记，比如当前应用的端口号等，交给 Internet。（这时的数据单元（单位）是数据流）
3. Internet 开始在将数据进行分组，分组头部包含目标地址的 IP 及一些相关信息交给物理层。（这时的数据单元（单位）是分组）
4. 物理层将数据转换为比特流开始查找主机真实物理地址进行校验等操作，校验通过，开始嗖~嗖~嗖~的住目的地跑。（这时的数据单元（单位）是比特）

到达目的地后，对方设备会将上面的顺序反向的操作一遍，最后呈现出来。

### 协议族

TCP/IP 是基于 TCP 和 IP 这两个最初的协议之上的不同的通信协议的大集合。

TCP - 传输控制协议
TCP 用于从应用程序到网络的数据传输控制。

TCP 负责在数据传送之前将它们分割为 IP 包，然后在它们到达的时候将它们重组。

IP - 网际协议（Internet Protocol）
IP 负责计算机之间的通信。

IP 负责在因特网上发送和接收数据包。

HTTP - 超文本传输协议(Hyper Text Transfer Protocol)
HTTP 负责 web 服务器与 web 浏览器之间的通信。

HTTP 用于从 web 客户端（浏览器）向 web 服务器发送请求，并从 web 服务器向 web 客户端返回内容（网页）。

HTTPS - 安全的 HTTP（HTTP Secure）
HTTPS 负责在 web 服务器和 web 浏览器之间的安全通信。
作为有代表性的应用，HTTPS 会用于处理信用卡交易和其他的敏感数据。

SSL - 安全套接字层（Secure Sockets Layer）
SSL 协议用于为安全数据传输加密数据。

SMTP - 简易邮件传输协议（Simple Mail Transfer Protocol）
SMTP 用于电子邮件的传输。

MIME - 多用途因特网邮件扩展（Multi-purpose Internet Mail Extensions）
MIME 协议使 SMTP 有能力通过 TCP/IP 网络传输多媒体文件，包括声音、视频和二进制数据。

IMAP - 因特网消息访问协议（Internet Message Access Protocol）
IMAP 用于存储和取回电子邮件。

POP - 邮局协议（Post Office Protocol）
POP 用于从电子邮件服务器向个人电脑下载电子邮件。

FTP - 文件传输协议（File Transfer Protocol）
FTP 负责计算机之间的文件传输。

NTP - 网络时间协议（Network Time Protocol）
NTP 用于在计算机之间同步时间（钟）。

DHCP - 动态主机配置协议（Dynamic Host Configuration Protocol）
DHCP 用于向网络中的计算机分配动态 IP 地址。

SNMP - 简单网络管理协议（Simple Network Management Protocol）
SNMP 用于计算机网络的管理。

LDAP - 轻量级的目录访问协议（Lightweight Directory Access Protocol）
LDAP 用于从因特网搜集关于用户和电子邮件地址的信息。

ICMP - 因特网消息控制协议（Internet Control Message Protocol）
ICMP 负责网络中的错误处理。

ARP - 地址解析协议（Address Resolution Protocol）
ARP - 用于通过 IP 来查找基于 IP 地址的计算机网卡的硬件地址。

RARP - 反向地址转换协议（Reverse Address Resolution Protocol）
RARP 用于通过 IP 查找基于硬件地址的计算机网卡的 IP 地址。

BOOTP - 自举协议（Boot Protocol）
BOOTP 用于从网络启动计算机。

PPTP - 点对点隧道协议（Point to Point Tunneling Protocol）
PPTP 用于私人网络之间的连接（隧道）。

### 域名

12 个阿拉伯数字很难记忆。使用一个名称更容易。

用于 TCP/IP 地址的名字被称为域名。runoob.com 就是一个域名。

当你键入一个像 http://www.runoob.com 这样的域名，域名会被一种 DNS 程序翻译为数字。

在全世界，数量庞大的 DNS 服务器被连入因特网。DNS 服务器负责将域名翻译为 TCP/IP 地址，同时负责使用新的域名信息更新彼此的系统。

当一个新的域名连同其 TCP/IP 地址一起注册后，全世界的 DNS 服务器都会对此信息进行更新。
