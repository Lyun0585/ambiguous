var AutoLink = /** @class */ (function () {
    function AutoLink(args) {
        if (args === void 0) { args = {}; }
        // 间隔时间，默认20分钟
        this.interval = 20;
        // 账号规则列表
        this.rules = [];
        // 模式
        this.mode = 'm';
        if (args === null || args === void 0 ? void 0 : args.defaultLink)
            this.defaultLink = args.defaultLink;
        if (args === null || args === void 0 ? void 0 : args.interval)
            this.interval = args.interval;
        if (args === null || args === void 0 ? void 0 : args.mode)
            this.mode = args.mode;
        if (args === null || args === void 0 ? void 0 : args.links)
            this.rules = this.genRules(args === null || args === void 0 ? void 0 : args.links, this.interval);
        this.getLink = this.getLink.bind(this);
    }
    AutoLink.prototype.genRules = function (links, interval) {
        return links.map(function (link, idx) { return ({ link: link, fn: new Function('n', "return ".concat(idx * interval, " <= n && n < ").concat((idx + 1) * interval)) }); });
    };
    AutoLink.prototype.getLink = function () {
        var _a, _b, _c;
        if (!((_a = this.rules) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error('规则生成失败，请检查配置');
        // 当前时间
        var date = new Date();
        // 时
        var h = date.getHours();
        // 分
        var m = date.getMinutes();
        // 秒
        var s = date.getSeconds();
        // 总时间
        var sum = this.mode === 's' ? s + (m * 60) + (h * 60) : m + (h * 60);
        // 循环一次总耗时
        var t = this.rules.length * this.interval;
        // 余数
        var e = sum > t ? sum % t : sum;
        // 后缀
        var link = ((_b = this.rules.find(function (_a) {
            var fn = _a.fn;
            return fn(e);
        })) === null || _b === void 0 ? void 0 : _b.link) || '';
        // 打开链接
        window.open(!link || ((_c = link === null || link === void 0 ? void 0 : link.trim) === null || _c === void 0 ? void 0 : _c.call(link)) === '' ? this.defaultLink : link);
    };
    return AutoLink;
}());
