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
var fetch_1 = require("@libs/fetch");
var novelStatus_1 = require("@libs/novelStatus");
var defaultCover_1 = require("@libs/defaultCover");
var cheerio_1 = require("cheerio");
var Novels2 = /** @class */ (function () {
    function Novels2() {
        var _this = this;
        this.id = 'novels2';
        this.name = 'Novels2';
        this.site = 'https://www.novels2.com';
        this.version = '1.0.0';
        this.icon = 'src/es/novels2/icon.png';
        /** Absolute URLs (such as cover images) are returned as they are. */
        this.resolveUrl = function (path) {
            return /^https?:\/\//.test(path) ? path : _this.site + path;
        };
    }
    Novels2.prototype.fetchHtml = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Could not reach site (".concat(res.status, ")"));
                        }
                        return [2 /*return*/, res.text()];
                }
            });
        });
    };
    /**
     * Covers without an image are served as the site's `*_failed.png`
     * placeholder, so those fall back to the default cover. Other paths can be
     * relative, so they are resolved against the site.
     */
    Novels2.prototype.toCover = function (src) {
        if (!src || /_failed\.png$/.test(src)) {
            return defaultCover_1.defaultCover;
        }
        return src.startsWith('http') ? src : "".concat(this.site).concat(src);
    };
    /** Novel cards share one markup on the listing and search pages. */
    Novels2.prototype.parseNovelCards = function (html) {
        var _this = this;
        var $ = (0, cheerio_1.load)(html);
        var novels = [];
        var seen = {};
        $('h3 a[href^="/novel/"]').each(function (_, el) {
            var path = $(el).attr('href') || '';
            if (!path || seen[path]) {
                return;
            }
            seen[path] = true;
            novels.push({
                name: $(el).text().trim(),
                path: path,
                cover: _this.toCover($("a.novel-cover[href=\"".concat(path, "\"] img")).attr('src')),
            });
        });
        return novels;
    };
    Novels2.prototype.popularNovels = function (pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchHtml("".concat(this.site, "/?page=").concat(pageNo))];
                    case 1:
                        html = _a.sent();
                        return [2 /*return*/, this.parseNovelCards(html)];
                }
            });
        });
    };
    Novels2.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $, metaValue, sectionByHeading, summary, genres, status, novel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchHtml("".concat(this.site).concat(novelPath))];
                    case 1:
                        html = _a.sent();
                        $ = (0, cheerio_1.load)(html);
                        metaValue = function (label) {
                            var value = '';
                            $('div.text-md').each(function (_, el) {
                                var spans = $(el).children('span');
                                if (spans.first().text().trim() === label) {
                                    value = spans.eq(1).text().trim();
                                }
                            });
                            return value;
                        };
                        sectionByHeading = function (heading) {
                            return $('h3')
                                .filter(function (_, el) { return $(el).text().trim() === heading; })
                                .first()
                                .parent();
                        };
                        summary = sectionByHeading('Synopsis')
                            .find('p')
                            .map(function (_, el) { return $(el).text().trim(); })
                            .get()
                            .filter(Boolean)
                            .join('\n');
                        genres = sectionByHeading('Genre')
                            .find('a')
                            .map(function (_, el) { return $(el).text().trim(); })
                            .get()
                            .join(', ');
                        status = metaValue('Status:').toLowerCase();
                        novel = {
                            path: novelPath,
                            name: $('h2.text-xl').first().text().trim(),
                            cover: this.toCover($('.novel-cover img').first().attr('src')),
                            author: metaValue('Author:') || undefined,
                            summary: summary || undefined,
                            genres: genres || undefined,
                            status: status.includes('ongoing')
                                ? novelStatus_1.NovelStatus.Ongoing
                                : status.includes('complet')
                                    ? novelStatus_1.NovelStatus.Completed
                                    : novelStatus_1.NovelStatus.Unknown,
                        };
                        novel.chapters = this.parseChapterList(html, novelPath);
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    /**
     * The novel page renders only the first 20 chapters in its markup. The full
     * list (every chapter, ascending by number) is serialized in the Next.js RSC
     * payload as escaped JSON, so it is read from the raw HTML instead.
     */
    Novels2.prototype.parseChapterList = function (html, novelPath) {
        var chapters = [];
        var chapterRe = /\\"id\\":(\d+),\\"title\\":\\"((?:[^"\\]|\\.)*?)\\",\\"number\\":(\d+),\\"createdAt\\":\\"\$D([^"\\]+)\\"/g;
        var match = chapterRe.exec(html);
        while (match !== null) {
            var title = this.unescapeRsc(match[2]);
            var slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            chapters.push({
                name: title,
                path: "".concat(novelPath, "/").concat(slug || 'chapter', "-").concat(match[1]),
                releaseTime: match[4],
                chapterNumber: parseInt(match[3], 10),
            });
            match = chapterRe.exec(html);
        }
        if (chapters.length === 0 && /\\"number\\":\d/.test(html)) {
            throw new Error("Could not parse chapter list for ".concat(novelPath));
        }
        return chapters;
    };
    /** Undo the JSON string escaping used inside the RSC payload. */
    Novels2.prototype.unescapeRsc = function (value) {
        var rowEscaped = JSON.parse("\"".concat(value, "\""));
        return JSON.parse("\"".concat(rowEscaped, "\""));
    };
    Novels2.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $, paragraphs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchHtml("".concat(this.site).concat(chapterPath))];
                    case 1:
                        html = _a.sent();
                        $ = (0, cheerio_1.load)(html);
                        paragraphs = $('article p')
                            .map(function (_, el) {
                            var text = $(el).text().trim();
                            return text ? "<p>".concat($(el).html(), "</p>") : '';
                        })
                            .get()
                            .filter(Boolean)
                            .join('');
                        if (!paragraphs) {
                            throw new Error('Chapter text not found');
                        }
                        return [2 /*return*/, paragraphs];
                }
            });
        });
    };
    Novels2.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchHtml("".concat(this.site, "/search?keyword=").concat(encodeURIComponent(searchTerm), "&page=").concat(pageNo))];
                    case 1:
                        html = _a.sent();
                        return [2 /*return*/, this.parseNovelCards(html)];
                }
            });
        });
    };
    return Novels2;
}());
exports.default = new Novels2();
