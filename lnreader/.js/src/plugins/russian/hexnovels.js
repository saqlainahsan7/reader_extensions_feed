"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var HexNovels = /** @class */ (function () {
    function HexNovels() {
        var _this = this;
        this.id = 'hexnovels';
        this.name = 'HexNovels';
        this.icon = 'src/ru/hexnovels/icon.png';
        this.site = 'https://hexnovels.me';
        this.version = '1.0.1';
        this.resolveUrl = function (path) { return _this.site + _this.normalizePath(path); };
    }
    // Paths are site-relative with a leading slash. Library entries saved by
    // 1.0.0 lack it, so accept both forms.
    HexNovels.prototype.normalizePath = function (path) {
        return '/' + path.replace(this.site, '').replace(/^\/+/, '');
    };
    HexNovels.prototype.fetchHtml = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error("Could not reach site (".concat(res.status, ")"));
                        return [2 /*return*/, res.text()];
                }
            });
        });
    };
    HexNovels.prototype.parseNovels = function (html) {
        var $ = (0, cheerio_1.load)(html);
        var novels = [];
        var seen = new Set();
        $('a[href^="/content/"]').each(function (_, el) {
            var a = $(el);
            var path = a.attr('href');
            var name = a.find('p.line-clamp-2').text().trim();
            var cover = a.find('img').attr('src');
            if (!path || !name || !cover || path.split('/').length !== 3)
                return;
            if (seen.has(path))
                return;
            seen.add(path);
            novels.push({ name: name, path: path, cover: cover });
        });
        return novels;
    };
    HexNovels.prototype.popularNovels = function (pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseNovels;
                        // The site's pages are 0-based
                        return [4 /*yield*/, this.fetchHtml("".concat(this.site, "/content?page=").concat(pageNo - 1))];
                    case 1: return [2 /*return*/, _a.apply(this, [
                            // The site's pages are 0-based
                            _b.sent()])];
                }
            });
        });
    };
    HexNovels.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var params, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = new URLSearchParams({
                            search: searchTerm,
                            page: (pageNo - 1).toString(),
                        });
                        _a = this.parseNovels;
                        return [4 /*yield*/, this.fetchHtml("".concat(this.site, "/content?").concat(params.toString()))];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    HexNovels.prototype.parseNovel = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var novelPath, html, $, slug, novel, bookStart, status_1, chaptersHtml, unescape, re, byId, _i, _a, m, branches, _b, _c, ch, list, chapters;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        novelPath = this.normalizePath(path);
                        return [4 /*yield*/, this.fetchHtml(this.resolveUrl(novelPath))];
                    case 1:
                        html = _f.sent();
                        $ = (0, cheerio_1.load)(html);
                        slug = novelPath.split('/')[2];
                        novel = {
                            path: novelPath,
                            name: $('h1').first().text().trim(),
                            cover: $('meta[property="og:image"]').attr('content'),
                            summary: (_d = $('meta[name="description"]').attr('content')) === null || _d === void 0 ? void 0 : _d.trim(),
                            status: novelStatus_1.NovelStatus.Unknown,
                            chapters: [],
                        };
                        bookStart = html.indexOf("slug:\"".concat(slug, "\",type:"));
                        if (bookStart !== -1) {
                            status_1 = (_e = html
                                .substring(bookStart, bookStart + 4000)
                                .match(/status:"(\w+)"/)) === null || _e === void 0 ? void 0 : _e[1];
                            novel.status =
                                status_1 === 'ONGOING'
                                    ? novelStatus_1.NovelStatus.Ongoing
                                    : status_1 === 'DONE'
                                        ? novelStatus_1.NovelStatus.Completed
                                        : status_1 === 'FROZEN'
                                            ? novelStatus_1.NovelStatus.OnHiatus
                                            : novelStatus_1.NovelStatus.Unknown;
                        }
                        return [4 /*yield*/, this.fetchHtml("".concat(this.resolveUrl(novelPath), "/chapters"))];
                    case 2:
                        chaptersHtml = _f.sent();
                        unescape = function (s) { return JSON.parse("\"".concat(s, "\"")); };
                        re = /\{id:"([0-9a-f-]{36})",name:"(?:[^"\\]|\\.)*",title:"((?:[^"\\]|\\.)*)",number:([0-9.]+),volume:(\d+)[^}]*?branchId:"([0-9a-f-]{36})"[^}]*?createdAt:"([^"]+)"/g;
                        byId = new Map();
                        for (_i = 0, _a = Array.from(chaptersHtml.matchAll(re)); _i < _a.length; _i++) {
                            m = _a[_i];
                            byId.set(m[1], {
                                id: m[1],
                                title: unescape(m[2]),
                                number: parseFloat(m[3]),
                                volume: parseInt(m[4], 10),
                                branchId: m[5],
                                createdAt: m[6],
                            });
                        }
                        branches = new Map();
                        for (_b = 0, _c = Array.from(byId.values()); _b < _c.length; _b++) {
                            ch = _c[_b];
                            list = branches.get(ch.branchId) || [];
                            list.push(ch);
                            branches.set(ch.branchId, list);
                        }
                        chapters = Array.from(branches.values()).sort(function (a, b) { return b.length - a.length; })[0];
                        novel.chapters = (chapters || [])
                            .sort(function (a, b) { return a.volume - b.volume || a.number - b.number; })
                            .map(function (ch, i) { return ({
                            name: "\u0422\u043E\u043C ".concat(ch.volume, ". ").concat(ch.title),
                            path: "".concat(novelPath, "/").concat(ch.id),
                            releaseTime: ch.createdAt,
                            chapterNumber: i + 1,
                        }); });
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    HexNovels.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var $, _a, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cheerio_1.load;
                        return [4 /*yield*/, this.fetchHtml(this.resolveUrl(chapterPath))];
                    case 1:
                        $ = _a.apply(void 0, [_b.sent()]);
                        content = $('.typeset-content').first();
                        if (!content.length)
                            throw new Error('Chapter content not found');
                        // Illustration-only chapters load their (encrypted) images client-side
                        if (!content.text().trim() && !content.find('img').length) {
                            return [2 /*return*/, '<p>Эта глава содержит только иллюстрации, они недоступны в приложении.</p>'];
                        }
                        return [2 /*return*/, content.html() || ''];
                }
            });
        });
    };
    return HexNovels;
}());
exports.default = new HexNovels();
