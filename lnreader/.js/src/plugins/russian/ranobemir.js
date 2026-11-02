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
var filterInputs_1 = require("@libs/filterInputs");
var defaultCover_1 = require("@libs/defaultCover");
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var cheerio_1 = require("cheerio");
var headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
};
var RanobeMir = /** @class */ (function () {
    function RanobeMir() {
        var _this = this;
        this.id = 'ranobemir';
        this.name = 'РанобэМир';
        this.icon = 'src/ru/ranobemir/icon.png';
        this.site = 'https://ranobemir.com';
        this.version = '1.0.1';
        this.imageRequestInit = { headers: headers };
        this.resolveUrl = function (path) { return _this.site + path; };
        this.filters = {
            sort: {
                label: 'Сортировка',
                value: 'views',
                options: [
                    { label: 'По просмотрам', value: 'views' },
                    { label: 'По дате обновления', value: 'last_chapter_id' },
                    { label: 'По дате добавления', value: 'published_at' },
                    { label: 'По названию', value: 'name' },
                    { label: 'По рейтингу', value: 'rating' },
                    { label: 'По подпискам', value: 'subscriptions' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    RanobeMir.prototype.request = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url, { headers: headers })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw Object.assign(new Error("\u0420\u0430\u043D\u043E\u0431\u044D\u041C\u0438\u0440: HTTP ".concat(response.status, ".")), {
                                status: response.status,
                            });
                        }
                        return [2 /*return*/, response.text()];
                }
            });
        });
    };
    RanobeMir.prototype.parseList = function (html) {
        var $ = (0, cheerio_1.load)(html);
        var novels = [];
        $('a[data-card-link-type="title"]').each(function (_, el) {
            var link = $(el);
            var path = link.attr('href');
            if (!path)
                return;
            novels.push({
                name: link.text().trim(),
                path: path,
                cover: link
                    .closest('section')
                    .find('a[data-card-link-type="poster"] img')
                    .attr('src') || defaultCover_1.defaultCover,
            });
        });
        return novels;
    };
    RanobeMir.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var sort, html;
            var _c;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        sort = showLatestNovels
                            ? 'last_chapter_id'
                            : ((_c = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _c === void 0 ? void 0 : _c.value) || 'views';
                        return [4 /*yield*/, this.request("".concat(this.site, "/novel?sort=").concat(sort, "&page=").concat(pageNo))];
                    case 1:
                        html = _d.sent();
                        return [2 /*return*/, this.parseList(html)];
                }
            });
        });
    };
    RanobeMir.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $, novel, ldJson, book, summary, statusLabel, chapters;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.request("".concat(this.site).concat(novelPath, "?toc"))];
                    case 1:
                        html = _c.sent();
                        $ = (0, cheerio_1.load)(html);
                        novel = {
                            path: novelPath,
                            name: $('h1').first().text().trim() || 'Untitled',
                            cover: $('meta[property="og:image"]').attr('content') || defaultCover_1.defaultCover,
                        };
                        ldJson = $('script[type="application/ld+json"]').first().html();
                        if (ldJson) {
                            try {
                                book = (_a = JSON.parse(ldJson)['@graph']) === null || _a === void 0 ? void 0 : _a[0];
                                if ((_b = book === null || book === void 0 ? void 0 : book.genre) === null || _b === void 0 ? void 0 : _b.length)
                                    novel.genres = book.genre.join(', ');
                            }
                            catch (_d) {
                                // genres are optional
                            }
                        }
                        summary = $('h2:contains("О романе")').next('div');
                        summary.find('br').replaceWith('\n');
                        summary.find('div').before('\n');
                        novel.summary = summary
                            .text()
                            .split('\n')
                            .map(function (line) { return line.trim(); })
                            .filter(Boolean)
                            .join('\n\n');
                        statusLabel = $('a[href^="/novel?status"]').first().text().trim();
                        novel.status =
                            {
                                'Выпускается': novelStatus_1.NovelStatus.Ongoing,
                                'Выпущено': novelStatus_1.NovelStatus.Completed,
                                'Заброшено': novelStatus_1.NovelStatus.Cancelled,
                            }[statusLabel] || novelStatus_1.NovelStatus.Unknown;
                        chapters = [];
                        $('#chapters_list li.list-row').each(function (_, el) {
                            var _a;
                            var row = $(el);
                            var link = row.find('a[href]').first();
                            var path = link.attr('href');
                            var releaseTime = row.find('time').attr('datetime');
                            // Rows without a date are "Прогноз" placeholders for unpublished chapters.
                            if (!path || !releaseTime)
                                return;
                            var name = link.text().trim();
                            chapters.push({
                                name: name,
                                path: path,
                                releaseTime: releaseTime,
                                chapterNumber: Number((_a = name.match(/Глава\s+(\d+(?:\.\d+)?)/)) === null || _a === void 0 ? void 0 : _a[1]) || 0,
                            });
                        });
                        // The site lists the newest chapter first.
                        novel.chapters = chapters.reverse();
                        chapters.forEach(function (chapter, index) {
                            if (!chapter.chapterNumber)
                                chapter.chapterNumber = index + 1;
                        });
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    RanobeMir.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $, article;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request(this.site + chapterPath)];
                    case 1:
                        html = _a.sent();
                        $ = (0, cheerio_1.load)(html);
                        article = $('article[data-chapter-url]');
                        // The collapsible «Ранее в ...» recap precedes the real chapter text.
                        article.find('details.collapse').remove();
                        article.find('script, style, noscript').remove();
                        // The app renders this HTML as is, so drop event handlers and URLs that
                        // would run script.
                        article.find('*').each(function (_, el) {
                            var node = $(el);
                            for (var _i = 0, _a = Object.keys(el.attribs); _i < _a.length; _i++) {
                                var name_1 = _a[_i];
                                if (/^on/i.test(name_1)) {
                                    node.removeAttr(name_1);
                                }
                                else if (name_1 === 'href' || name_1 === 'src') {
                                    var value = el.attribs[name_1]
                                        .split('')
                                        .filter(function (c) { return c.charCodeAt(0) > 32; })
                                        .join('')
                                        .toLowerCase();
                                    if (/^(javascript|vbscript):/.test(value) ||
                                        (value.startsWith('data:') && !value.startsWith('data:image/'))) {
                                        node.removeAttr(name_1);
                                    }
                                }
                            }
                        });
                        return [2 /*return*/, article
                                .find('p')
                                .map(function (_, el) { return $.html(el); })
                                .get()
                                .join('')];
                }
            });
        });
    };
    RanobeMir.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("".concat(this.site, "/novel?q=").concat(encodeURIComponent(searchTerm), "&page=").concat(pageNo))];
                    case 1:
                        html = _a.sent();
                        return [2 /*return*/, this.parseList(html)];
                }
            });
        });
    };
    return RanobeMir;
}());
exports.default = new RanobeMir();
