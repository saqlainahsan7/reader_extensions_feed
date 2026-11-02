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
var PAGE_SIZE = 40;
var WebFandom = /** @class */ (function () {
    function WebFandom() {
        var _this = this;
        this.id = 'webfandom';
        this.name = 'WebFandom';
        this.site = 'https://webfandom.ru';
        this.api = this.site + '/api/v1';
        this.version = '1.0.0';
        this.icon = 'src/ru/webfandom/icon.png';
        this.lastSegment = function (path) {
            return path.replace(/\/+$/, '').split('/').pop() || path;
        };
        this.absolute = function (url) {
            return url.startsWith('http')
                ? url
                : _this.site + (url.startsWith('/') ? '' : '/') + url;
        };
        this.resolveUrl = function (path) { return _this.absolute(path); };
        this.filters = {
            sort: {
                label: 'Сортировка',
                value: '-views',
                options: [
                    { label: 'По популярности', value: '-views' },
                    { label: 'Популярное за неделю', value: '-views_week' },
                    { label: 'По обновлению', value: '-date_change' },
                    { label: 'По дате выхода', value: '-date_publication' },
                    { label: 'По количеству глав', value: '-chapters_count' },
                    { label: 'По названию', value: 'name' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            status: {
                label: 'Статус',
                value: '',
                options: [
                    { label: 'Любой', value: '' },
                    { label: 'Продолжается', value: 'CONTINUES' },
                    { label: 'Завершён', value: 'FINISHED' },
                    { label: 'Заморожен', value: 'FROZEN' },
                    { label: 'Нет переводчика', value: 'NOT_TRANSLATOR' },
                    { label: 'Анонс', value: 'ANNOUNCE' },
                    { label: 'Лицензировано', value: 'LICENSED' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            genre: {
                label: 'Жанр',
                value: '',
                options: [
                    { label: 'Любой', value: '' },
                    { label: 'Арт', value: 'art' },
                    { label: 'Безумие', value: 'bezumie' },
                    { label: 'Боевик', value: 'boevik' },
                    { label: 'Боевые искусства', value: 'boevyie-iskusstva' },
                    { label: 'Вампиры', value: 'vampiryi' },
                    { label: 'Военное', value: 'voennoe' },
                    { label: 'Гарем', value: 'garem' },
                    { label: 'Героическое фэнтези', value: 'geroicheskoe-fentezi' },
                    { label: 'Демоны', value: 'demonyi' },
                    { label: 'Детектив', value: 'detektiv' },
                    { label: 'Дзёсэй', value: 'dzyosej' },
                    { label: 'Драма', value: 'drama' },
                    { label: 'Игра', value: 'igra' },
                    { label: 'Исекай', value: 'isekaj' },
                    { label: 'История', value: 'istoriya' },
                    { label: 'Киберпанк', value: 'kiberpank' },
                    { label: 'Комедия', value: 'komediya' },
                    { label: 'Космос', value: 'kosmos' },
                    { label: 'Магия', value: 'magiya' },
                    { label: 'Махо-сёдзё', value: 'maho-syodzyo' },
                    { label: 'Машины', value: 'mashinyi' },
                    { label: 'Меха', value: 'meha' },
                    { label: 'Мистика', value: 'mistika' },
                    { label: 'Музыка', value: 'muzyika' },
                    { label: 'Научная фантастика', value: 'nauchnaya-fantastika' },
                    { label: 'Омегаверс', value: 'omegavers' },
                    { label: 'Пародия', value: 'parodiya' },
                    { label: 'Повседневность', value: 'povsednevnost' },
                    { label: 'Полиция', value: 'politsiya' },
                    { label: 'Постапокалиптика', value: 'postapokaliptika' },
                    { label: 'Приключения', value: 'priklyucheniya' },
                    { label: 'Психология', value: 'psihologiya' },
                    { label: 'Романтика', value: 'romantika' },
                    { label: 'Самурайский боевик', value: 'samurajskij-boevik' },
                    { label: 'Сверхъестественное', value: 'sverhestestvennoe' },
                    { label: 'Сёдзё', value: 'syodzyo' },
                    { label: 'Сёнэн', value: 'syonen' },
                    { label: 'Спорт', value: 'sport' },
                    { label: 'Супер сила', value: 'super-sila' },
                    { label: 'Сэйнэн', value: 'sejnen' },
                    { label: 'Трагедия', value: 'tragediya' },
                    { label: 'Триллер', value: 'triller' },
                    { label: 'Ужасы', value: 'uzhasyi' },
                    { label: 'Фантастика', value: 'fantastika' },
                    { label: 'Фэнтези', value: 'fentezi' },
                    { label: 'Школа', value: 'shkola' },
                    { label: 'Этти', value: 'etti' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
        };
    }
    WebFandom.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var sort, query;
            var _c, _d, _e;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_f) {
                sort = showLatestNovels ? '-date_change' : (_c = filters === null || filters === void 0 ? void 0 : filters.sort) === null || _c === void 0 ? void 0 : _c.value;
                query = '&sort=' + (sort || '-views');
                if ((_d = filters === null || filters === void 0 ? void 0 : filters.genre) === null || _d === void 0 ? void 0 : _d.value)
                    query += '&genres=' + filters.genre.value;
                if ((_e = filters === null || filters === void 0 ? void 0 : filters.status) === null || _e === void 0 ? void 0 : _e.value) {
                    query += '&publication_status=' + filters.status.value;
                }
                return [2 /*return*/, this.fetchNovels(pageNo, query)];
            });
        });
    };
    WebFandom.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchNovels(pageNo, '&search=' + encodeURIComponent(searchTerm))];
            });
        });
    };
    WebFandom.prototype.fetchNovels = function (pageNo, query) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchJson(this.api +
                            '/catalog/publications/?type=NOVELLA&limit=' +
                            PAGE_SIZE +
                            '&offset=' +
                            (pageNo - 1) * PAGE_SIZE +
                            query)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.results.map(function (novel) { return ({
                                name: novel.name,
                                path: '/publications/' + novel.slug,
                                cover: novel.image ? _this.absolute(novel.image) : defaultCover_1.defaultCover,
                            }); })];
                }
            });
        });
    };
    WebFandom.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var slug, data, novel, chapters;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        slug = this.lastSegment(novelPath);
                        return [4 /*yield*/, this.fetchJson(this.api + '/catalog/publications/' + slug + '/')];
                    case 1:
                        data = _c.sent();
                        novel = {
                            path: novelPath,
                            name: data.name,
                            cover: data.image ? this.absolute(data.image) : defaultCover_1.defaultCover,
                            summary: ((_a = data.description) === null || _a === void 0 ? void 0 : _a.trim()) || undefined,
                            author: ((_b = data.authors) === null || _b === void 0 ? void 0 : _b.map(function (author) { return author.name; }).join(', ')) || undefined,
                            genres: (data.genres || [])
                                .concat(data.tags || [])
                                .map(function (genre) { return genre.name; })
                                // tags often repeat the genres
                                .filter(function (name, index, names) { return names.indexOf(name) === index; })
                                .join(',') || undefined,
                            status: statuses[data.publicationStatus] || novelStatus_1.NovelStatus.Unknown,
                        };
                        return [4 /*yield*/, this.fetchJson(this.api +
                                '/catalog/publications/' +
                                slug +
                                '/chapters/?ordering=asc&limit=10000')];
                    case 2:
                        chapters = _c.sent();
                        novel.chapters = chapters.results.map(function (chapter, index) { return ({
                            name: 'Том ' +
                                chapter.volume +
                                ' Глава ' +
                                chapter.chapter +
                                (chapter.name ? ' - ' + chapter.name : ''),
                            path: '/reader/novella/' + chapter.slug,
                            releaseTime: chapter.dateCreate,
                            chapterNumber: index + 1,
                        }); });
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    WebFandom.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var data, html;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchJson(this.api +
                            '/catalog/publication_chapters/' +
                            this.lastSegment(chapterPath) +
                            '/')];
                    case 1:
                        data = _a.sent();
                        if (!data.isAccess || data.isAccessAdult === false) {
                            throw new Error('Глава доступна только после входа на сайте');
                        }
                        html = (data.content || [])
                            .slice()
                            .sort(function (a, b) { return a.number - b.number; })
                            .map(function (block) {
                            if (block.type === 'TEXT')
                                return block.text || '';
                            if (block.type === 'IMAGE' && block.image) {
                                return '<img src="' + _this.absolute(block.image) + '">';
                            }
                            if (block.type === 'SEPARATION')
                                return '<hr>';
                            return '';
                        })
                            .join('\n');
                        if (!html.trim())
                            throw new Error('Текст главы недоступен');
                        return [2 /*return*/, html];
                }
            });
        });
    };
    // DDoS-Guard sometimes answers with its HTML check page instead of JSON
    WebFandom.prototype.fetchJson = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var res, body, fail, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(url, {
                            headers: { Accept: 'application/json' },
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 2:
                        body = _a.sent();
                        fail = function (message) {
                            return Object.assign(new Error(message), { status: res.status });
                        };
                        if (res.status === 404)
                            throw fail('Страница не найдена (404)');
                        try {
                            // the API uses snake_case keys
                            data = JSON.parse(body, function (key, value) {
                                if (!value || typeof value !== 'object' || Array.isArray(value)) {
                                    return value;
                                }
                                var result = {};
                                for (var name_1 in value) {
                                    result[name_1.replace(/_([a-z])/g, function (match, letter) { return letter.toUpperCase(); })] = value[name_1];
                                }
                                return result;
                            });
                        }
                        catch (_b) {
                            throw fail('Пройдите проверку: откройте сайт в WebView');
                        }
                        if (!res.ok) {
                            throw fail('Не удалось загрузить данные (' + res.status + ')');
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return WebFandom;
}());
var statuses = {
    FINISHED: novelStatus_1.NovelStatus.Completed,
    CONTINUES: novelStatus_1.NovelStatus.Ongoing,
    FROZEN: novelStatus_1.NovelStatus.OnHiatus,
    LICENSED: novelStatus_1.NovelStatus.Licensed,
};
exports.default = new WebFandom();
