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
var fetch_1 = require("@libs/fetch");
var defaultCover_1 = require("@libs/defaultCover");
var cheerio_1 = require("cheerio");
var months = {
    января: 1,
    февраля: 2,
    марта: 3,
    апреля: 4,
    мая: 5,
    июня: 6,
    июля: 7,
    августа: 8,
    сентября: 9,
    октября: 10,
    ноября: 11,
    декабря: 12,
};
var RanobeMe = /** @class */ (function () {
    function RanobeMe() {
        var _this = this;
        this.id = 'ranobeme';
        this.name = 'Ranobe.me';
        this.site = 'https://ranobe.me';
        this.version = '1.0.0';
        this.icon = 'src/ru/ranobeme/icon.png';
        this.resolveUrl = function (path) {
            return /^https?:\/\//i.test(path) ? path : _this.site + path;
        };
        this.filters = {
            sort: {
                label: 'Сортировка',
                value: 'stat',
                options: [
                    { label: 'По обновлению', value: '' },
                    { label: 'По просмотрам', value: 'stat' },
                    { label: 'По читателям', value: 'readers' },
                    { label: 'По рекомендациям', value: 'recommend' },
                    { label: 'По размеру', value: 'size' },
                    { label: 'По названию', value: 'title' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            completed: {
                label: 'Только завершённые',
                value: false,
                type: filterInputs_1.FilterTypes.Switch,
            },
            genre: {
                label: 'Жанр (без учёта «Только завершённые»)',
                value: '',
                options: [
                    { label: 'Любой', value: '' },
                    { label: '16+', value: '15' },
                    { label: '18+', value: '2' },
                    { label: 'Боевые искусства', value: '14' },
                    { label: 'В прошлом', value: '10' },
                    { label: 'Гарем', value: '9' },
                    { label: 'Детектив', value: '41' },
                    { label: 'Дзёсэй', value: '12' },
                    { label: 'Драма', value: '5' },
                    { label: 'Игра', value: '38' },
                    { label: 'Лоли', value: '13' },
                    { label: 'Мехи', value: '16' },
                    { label: 'Мистика', value: '17' },
                    { label: 'Научная фантастика', value: '21' },
                    { label: 'Переодевания', value: '8' },
                    { label: 'Повседневность', value: '28' },
                    { label: 'Постапокалипсис', value: '40' },
                    { label: 'Приключения', value: '3' },
                    { label: 'Психология', value: '18' },
                    { label: 'Романтика', value: '19' },
                    { label: 'Сверхспособности', value: '31' },
                    { label: 'Сёдзё', value: '24' },
                    { label: 'Сёдзё Ай', value: '25' },
                    { label: 'Сёнэн', value: '26' },
                    { label: 'Сёнэн Ай', value: '27' },
                    { label: 'Сётакон', value: '23' },
                    { label: 'Смат', value: '29' },
                    { label: 'Спорт', value: '30' },
                    { label: 'Сэйнэн', value: '39' },
                    { label: 'Сюаньхуа', value: '35' },
                    { label: 'Сянься', value: '34' },
                    { label: 'Трагедия', value: '32' },
                    { label: 'Ужасы', value: '11' },
                    { label: 'Уся', value: '33' },
                    { label: 'Фэнтези', value: '7' },
                    { label: 'Шенён', value: '22' },
                    { label: 'Школьные будни', value: '20' },
                    { label: 'Экшн', value: '1' },
                    { label: 'Этти', value: '6' },
                    { label: 'Юмор', value: '4' },
                    { label: 'Юри', value: '37' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    RanobeMe.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var url, sort, _c;
            var _d, _e, _f;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        url = this.site + '/catalog';
                        if ((_d = filters === null || filters === void 0 ? void 0 : filters.genre) === null || _d === void 0 ? void 0 : _d.value) {
                            url += '/genre/' + filters.genre.value;
                        }
                        else if ((_e = filters === null || filters === void 0 ? void 0 : filters.completed) === null || _e === void 0 ? void 0 : _e.value) {
                            url += '/completed';
                        }
                        sort = showLatestNovels ? '' : ((_f = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _f === void 0 ? void 0 : _f.value) || '';
                        url += '?' + (sort ? 'sort=' + sort + '&' : '') + 'page=' + pageNo;
                        _c = this.parseNovelList;
                        return [4 /*yield*/, this.fetchPage(url)];
                    case 1: return [2 /*return*/, _c.apply(this, [_g.sent()])];
                }
            });
        });
    };
    RanobeMe.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.site +
                            '/index.php?section=search&str=' +
                            encodeURIComponent(searchTerm) +
                            '&page=' +
                            pageNo;
                        _a = this.parseNovelList;
                        return [4 /*yield*/, this.fetchPage(url)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    RanobeMe.prototype.parseNovelList = function (html) {
        var _this = this;
        var $ = (0, cheerio_1.load)(html);
        var novels = [];
        $('div.FicTable').each(function (index, element) {
            var link = $(element).find('.FicTable_Title > a[href^="/ranobe"]');
            var path = link.attr('href');
            if (!path)
                return;
            var cover = $(element).find('.FicTable_Cover img').attr('src');
            novels.push({
                name: link.text().trim(),
                path: path,
                cover: cover ? _this.site + cover : defaultCover_1.defaultCover,
            });
        });
        return novels;
    };
    RanobeMe.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var $, _a, head, cover, info, novel, chapters;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cheerio_1.load;
                        return [4 /*yield*/, this.fetchPage(this.site + novelPath)];
                    case 1:
                        $ = _a.apply(void 0, [_b.sent()]);
                        head = $('.FicHead');
                        cover = head.find('.FicCover img');
                        info = {};
                        head.find('.FicHeadRight .tr').each(function (index, element) {
                            var title = $(element).find('.title').text().trim();
                            info[title] = $(element).find('.content').text().trim();
                        });
                        novel = {
                            path: novelPath,
                            name: head.find('h1').first().text().trim(),
                            cover: cover.attr('data-src') || cover.attr('src')
                                ? this.site + (cover.attr('data-src') || cover.attr('src'))
                                : defaultCover_1.defaultCover,
                            author: info['Автор:'] || undefined,
                            genres: head
                                .find('.FicHeadRight a[href^="/catalog/genre/"]')
                                .map(function (index, element) { return $(element).text().trim(); })
                                .get()
                                .join(','),
                            summary: this.htmlToText($('.summary_text_fic3').first().html() || ''),
                        };
                        chapters = [];
                        $('ul.FicContents li').each(function (index, element) {
                            var link = $(element).find('.FicContentsChapterName a');
                            var path = link.attr('href');
                            if (!path)
                                return;
                            chapters.push({
                                name: link.text().trim(),
                                path: path,
                                // "24 апреля 2020 / 11 т.с."
                                releaseTime: _this.parseDate($(element).find('.small_light').text()),
                                chapterNumber: chapters.length + 1,
                            });
                        });
                        novel.chapters = chapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    RanobeMe.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var $, _a, chapter;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cheerio_1.load;
                        return [4 /*yield*/, this.fetchPage(this.site + chapterPath)];
                    case 1:
                        $ = _a.apply(void 0, [_b.sent()]);
                        chapter = $('div.chapter').first();
                        if (!chapter.length)
                            throw new Error('Текст главы недоступен');
                        chapter.find('a[name]').remove();
                        chapter.find('img').each(function (index, element) {
                            var src = $(element).attr('src');
                            if (src === null || src === void 0 ? void 0 : src.startsWith('/'))
                                $(element).attr('src', _this.site + src);
                        });
                        return [2 /*return*/, chapter.html() || ''];
                }
            });
        });
    };
    RanobeMe.prototype.fetchPage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url)];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error('Не удалось открыть страницу (' + res.status + ')');
                        }
                        return [2 /*return*/, res.text()];
                }
            });
        });
    };
    RanobeMe.prototype.parseDate = function (dateString) {
        var _a = dateString.match(/(\d{1,2})\s+([а-я]+)\s+(\d{4})/) || [], day = _a[1], month = _a[2], year = _a[3];
        if (!day || !months[month])
            return null;
        var pad = function (part) { return ('0' + part).slice(-2); };
        return year + '-' + pad(months[month]) + '-' + pad(day);
    };
    // the app shows summaries as plain text
    RanobeMe.prototype.htmlToText = function (html) {
        var $ = (0, cheerio_1.load)(html);
        $('br').replaceWith('\n');
        $('p, div, li').after('\n\n');
        return ($.root()
            .text()
            .replace(/[ \t]*\n[ \t]*/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim() || undefined);
    };
    return RanobeMe;
}());
exports.default = new RanobeMe();
