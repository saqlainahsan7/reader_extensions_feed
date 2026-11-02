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
var novelStatus_1 = require("@libs/novelStatus");
var cheerio_1 = require("cheerio");
var RanobeLife = /** @class */ (function () {
    function RanobeLife() {
        var _this = this;
        this.id = 'ranobelife';
        this.name = 'Ranobe.life';
        this.site = 'https://ranobe.life';
        this.version = '1.0.0';
        this.icon = 'src/ru/ranobelife/icon.png';
        this.absolute = function (url) {
            return url.startsWith('http')
                ? url
                : _this.site + (url.startsWith('/') ? '' : '/') + url;
        };
        this.resolveUrl = function (path) { return _this.absolute(path); };
        this.filters = {
            sort: {
                label: 'Сортировка',
                value: 'rating',
                options: [
                    { label: 'По популярности', value: 'rating' },
                    { label: 'По посещаемости', value: 'news_read' },
                    { label: 'По дате изменения', value: 'editdate' },
                    { label: 'По дате добавления', value: 'date' },
                    { label: 'По комментариям', value: 'comm_num' },
                    { label: 'По алфавиту', value: 'title' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            genre: {
                label: 'Жанр',
                value: '',
                options: [
                    { label: 'Любой', value: '' },
                    { label: 'Арт', value: '279' },
                    { label: 'Безумие', value: '273' },
                    { label: 'Боевик', value: '241' },
                    { label: 'Боевые искусства', value: '252' },
                    { label: 'Вампиры', value: '264' },
                    { label: 'Военное', value: '251' },
                    { label: 'Гарем', value: '242' },
                    { label: 'Героическое фэнтези', value: '265' },
                    { label: 'Демоны', value: '256' },
                    { label: 'Детектив', value: '277' },
                    { label: 'Детское', value: '289' },
                    { label: 'Дзёсэй', value: '270' },
                    { label: 'Драма', value: '243' },
                    { label: 'Игра', value: '269' },
                    { label: 'Исекай', value: '255' },
                    { label: 'История', value: '274' },
                    { label: 'Киберпанк', value: '284' },
                    { label: 'Кодомо', value: '288' },
                    { label: 'Комедия', value: '244' },
                    { label: 'Космос', value: '271' },
                    { label: 'Магия', value: '250' },
                    { label: 'Махо-сёдзё', value: '285' },
                    { label: 'Машины', value: '280' },
                    { label: 'Меха', value: '278' },
                    { label: 'Мистика', value: '261' },
                    { label: 'Музыка', value: '281' },
                    { label: 'Научная фантастика', value: '253' },
                    { label: 'Омегаверс', value: '287' },
                    { label: 'Пародия', value: '283' },
                    { label: 'Повседневность', value: '257' },
                    { label: 'Полиция', value: '282' },
                    { label: 'Постапокалиптика', value: '258' },
                    { label: 'Приключения', value: '254' },
                    { label: 'Психология', value: '267' },
                    { label: 'Романтика', value: '245' },
                    { label: 'Самурайский боевик', value: '286' },
                    { label: 'Сверхъестественное', value: '246' },
                    { label: 'Спорт', value: '272' },
                    { label: 'Супер сила', value: '276' },
                    { label: 'Сэйнэн', value: '247' },
                    { label: 'Сёдзё', value: '275' },
                    { label: 'Сёнэн', value: '259' },
                    { label: 'Трагедия', value: '268' },
                    { label: 'Триллер', value: '266' },
                    { label: 'Ужасы', value: '262' },
                    { label: 'Фантастика', value: '263' },
                    { label: 'Фэнтези', value: '248' },
                    { label: 'Школа', value: '260' },
                    { label: 'Этти', value: '249' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    RanobeLife.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var genre, url, sort, html;
            var _c, _d;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        genre = (_c = filters === null || filters === void 0 ? void 0 : filters.genre) === null || _c === void 0 ? void 0 : _c.value;
                        url = this.site +
                            '/catalog/' +
                            (genre ? 'g=' + genre + '/' : '') +
                            (pageNo > 1 ? 'page/' + pageNo + '/' : '');
                        sort = showLatestNovels ? 'editdate' : (_d = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _d === void 0 ? void 0 : _d.value;
                        return [4 /*yield*/, this.fetchPage(url, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                body: new URLSearchParams({
                                    dlenewssortby: sort || 'rating',
                                    dledirection: sort === 'title' ? 'asc' : 'desc',
                                    set_new_sort: 'dle_sort_xfilter',
                                    set_direction_sort: 'dle_direction_xfilter',
                                }).toString(),
                            })];
                    case 1:
                        html = _e.sent();
                        return [2 /*return*/, this.parseNovelList(html)];
                }
            });
        });
    };
    RanobeLife.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.site +
                            '/search/' +
                            encodeURIComponent(searchTerm) +
                            '/' +
                            (pageNo > 1 ? 'page/' + pageNo + '/' : '');
                        _a = this.parseNovelList;
                        return [4 /*yield*/, this.fetchPage(url)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    RanobeLife.prototype.parseNovelList = function (html) {
        var _this = this;
        var $ = (0, cheerio_1.load)(html);
        var novels = [];
        $('div.short').each(function (index, element) {
            var link = $(element).find('h3 a').first();
            var href = link.attr('href');
            if (!href)
                return;
            var image = $(element).find('img').first();
            var cover = image.attr('data-src') || image.attr('src');
            novels.push({
                name: link.text().trim(),
                path: href.replace(_this.site, ''),
                cover: cover && !cover.startsWith('data:')
                    ? _this.absolute(cover)
                    : defaultCover_1.defaultCover,
            });
        });
        return novels;
    };
    RanobeLife.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $, info, cover, status, novel, json, data, novelId;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetchPage(this.site + novelPath)];
                    case 1:
                        html = _b.sent();
                        $ = (0, cheerio_1.load)(html);
                        info = {};
                        $('.page__list li').each(function (index, element) {
                            var title = $(element).children('div').first().text().trim();
                            $(element).children('div').first().remove();
                            info[title] = $(element).text().trim();
                        });
                        cover = $('.page__poster img').first().attr('src');
                        status = info['Статус:'] || '';
                        novel = {
                            path: novelPath,
                            name: $('h1').first().text().trim(),
                            cover: cover ? this.absolute(cover) : defaultCover_1.defaultCover,
                            summary: this.htmlToText($('.page__text').first().html() || ''),
                            status: status.includes('Заверш')
                                ? novelStatus_1.NovelStatus.Completed
                                : status.includes('Онгоинг')
                                    ? novelStatus_1.NovelStatus.Ongoing
                                    : novelStatus_1.NovelStatus.Unknown,
                            genres: this.readGenres($),
                        };
                        json = html.match(/window\.__DATA__ = (\{[\s\S]*?\});?\s*<\/script>/);
                        data = json ? JSON.parse(json[1]) : undefined;
                        if (!data || !Array.isArray(data.chapters)) {
                            throw new Error('Не удалось загрузить список глав');
                        }
                        novelId = data.news_id || ((_a = novelPath.match(/^\/(\d+)-/)) === null || _a === void 0 ? void 0 : _a[1]);
                        novel.chapters = data.chapters
                            .slice()
                            .sort(function (a, b) { return a.posi - b.posi; })
                            .map(function (chapter) { return ({
                            name: chapter.title,
                            path: '/reader/' + novelId + '/' + chapter.id,
                            releaseTime: _this.parseDate(chapter.date),
                            chapterNumber: chapter.posi,
                        }); });
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    RanobeLife.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var $, _a, text;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = cheerio_1.load;
                        return [4 /*yield*/, this.fetchPage(this.site + chapterPath)];
                    case 1:
                        $ = _a.apply(void 0, [_b.sent()]);
                        text = $('div.rl-text').first();
                        if (!text.length)
                            throw new Error('Текст главы недоступен');
                        text.find('img').each(function (index, element) {
                            var src = $(element).attr('data-src') || $(element).attr('src');
                            if (src)
                                $(element).attr('src', _this.absolute(src));
                        });
                        return [2 /*return*/, text.html() || ''];
                }
            });
        });
    };
    // the site answers with a redirect to its own browser check (/_c?t=...)
    // until it has been passed once in the WebView
    RanobeLife.prototype.fetchPage = function (url, init) {
        return __awaiter(this, void 0, void 0, function () {
            var res, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url, init)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        body = _a.sent();
                        if (res.url.includes('/_c?') || body.includes('var targetUrl')) {
                            throw new Error('Пройдите проверку: откройте сайт в WebView');
                        }
                        if (!res.ok) {
                            throw new Error('Не удалось открыть страницу (' + res.status + ')');
                        }
                        return [2 /*return*/, body];
                }
            });
        });
    };
    RanobeLife.prototype.readGenres = function ($) {
        for (var _i = 0, _a = $('script[type="application/ld+json"]').toArray(); _i < _a.length; _i++) {
            var element = _a[_i];
            try {
                var graph = JSON.parse($(element).text())['@graph'] || [];
                var series = graph.find(function (item) {
                    return Array.isArray(item.genre);
                });
                if (series)
                    return series.genre.join(',');
            }
            catch (_b) {
                // not the structured data block we need
            }
        }
        return undefined;
    };
    RanobeLife.prototype.parseDate = function (date) {
        // "10.08.2026"
        var _a = date.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/) || [], day = _a[1], month = _a[2], year = _a[3];
        if (!day)
            return null;
        var pad = function (part) { return ('0' + part).slice(-2); };
        return year + '-' + pad(month) + '-' + pad(day);
    };
    // the app shows summaries as plain text
    RanobeLife.prototype.htmlToText = function (html) {
        var $ = (0, cheerio_1.load)(html);
        $('br').replaceWith('\n');
        $('p, div, li').after('\n\n');
        return ($.root()
            .text()
            .replace(/[ \t]*\n[ \t]*/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim() || undefined);
    };
    return RanobeLife;
}());
exports.default = new RanobeLife();
