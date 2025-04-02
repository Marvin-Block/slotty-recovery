"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyDocument)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_createEmotionCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/createEmotionCache */ \"./src/createEmotionCache.ts\");\n/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/server/create-instance */ \"@emotion/server/create-instance\");\n/* harmony import */ var _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_createEmotionCache__WEBPACK_IMPORTED_MODULE_2__]);\n_src_createEmotionCache__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            style: {\n                scrollBehavior: \"smooth\"\n            },\n            lang: \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"stylesheet\",\n                            href: \"https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&display=swap\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                            lineNumber: 10,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                            name: \"emotion-insertion-point\",\n                            content: \"\"\n                        }, void 0, false, {\n                            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                            lineNumber: 11,\n                            columnNumber: 21\n                        }, this),\n                        this.props.emotionStyleTags\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                    lineNumber: 9,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                            lineNumber: 15,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                            lineNumber: 16,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                    lineNumber: 14,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n            lineNumber: 8,\n            columnNumber: 13\n        }, this);\n    }\n}\nMyDocument.getInitialProps = async (ctx)=>{\n    const originalRenderPage = ctx.renderPage;\n    const cache = (0,_src_createEmotionCache__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const { extractCriticalToChunks } = _emotion_server_create_instance__WEBPACK_IMPORTED_MODULE_3___default()(cache);\n    ctx.renderPage = ()=>originalRenderPage({\n            enhanceApp: (App)=>function EnhanceApp(props) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, {\n                        emotionCache: cache,\n                        ...props\n                    }, void 0, false, {\n                        fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 28\n                    }, this);\n                }\n        });\n    const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n    const emotionStyles = extractCriticalToChunks(initialProps.html);\n    const emotionStyleTags = emotionStyles.styles.map((style)=>// eslint-disable-next-line react/no-danger\n        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"style\", {\n            \"data-emotion\": `${style.key} ${style.ids.join(\" \")}`,\n            dangerouslySetInnerHTML: {\n                __html: style.css\n            }\n        }, style.key, false, {\n            fileName: \"/Users/mabl/Desktop/restorecord-new/pages/_document.tsx\",\n            lineNumber: 42,\n            columnNumber: 9\n        }, undefined));\n    return {\n        ...initialProps,\n        emotionStyleTags\n    };\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNaO0FBQ087QUFFbkQsTUFBTU8sbUJBQW1CUCxzREFBUUE7SUFDNUNRLFNBQVM7UUFDTCxxQkFDSSw4REFBQ1AsK0NBQUlBO1lBQUNRLE9BQU87Z0JBQUVDLGdCQUFnQjtZQUFTO1lBQUdDLE1BQUs7OzhCQUM1Qyw4REFBQ1QsK0NBQUlBOztzQ0FDRCw4REFBQ1U7NEJBQUtDLEtBQUk7NEJBQWFDLE1BQUs7Ozs7OztzQ0FDNUIsOERBQUNDOzRCQUFLQyxNQUFLOzRCQUEwQkMsU0FBUTs7Ozs7O3dCQUMzQyxJQUFJLENBQUNDLEtBQUssQ0FBU0MsZ0JBQWdCOzs7Ozs7OzhCQUV6Qyw4REFBQ0M7O3NDQUNHLDhEQUFDakIsK0NBQUlBOzs7OztzQ0FDTCw4REFBQ0MscURBQVVBOzs7Ozs7Ozs7Ozs7Ozs7OztJQUkzQjtBQUNKO0FBR0FHLFdBQVdjLGVBQWUsR0FBRyxPQUFPQztJQUNoQyxNQUFNQyxxQkFBcUJELElBQUlFLFVBQVU7SUFFekMsTUFBTUMsUUFBUXBCLG1FQUFrQkE7SUFDaEMsTUFBTSxFQUFFcUIsdUJBQXVCLEVBQUUsR0FBR3BCLHNFQUFtQkEsQ0FBQ21CO0lBRXhESCxJQUFJRSxVQUFVLEdBQUcsSUFDYkQsbUJBQW1CO1lBQ2ZJLFlBQVksQ0FBQ0MsTUFDVCxTQUFTQyxXQUFXWCxLQUFVO29CQUMxQixxQkFBTyw4REFBQ1U7d0JBQUlFLGNBQWNMO3dCQUFRLEdBQUdQLEtBQUs7Ozs7OztnQkFDOUM7UUFDUjtJQUVKLE1BQU1hLGVBQWUsTUFBTS9CLG9FQUF3QixDQUFDc0I7SUFDcEQsTUFBTVUsZ0JBQWdCTix3QkFBd0JLLGFBQWFFLElBQUk7SUFDL0QsTUFBTWQsbUJBQW1CYSxjQUFjRSxNQUFNLENBQUNDLEdBQUcsQ0FBQyxDQUFDMUIsUUFDL0MsMkNBQTJDO3NCQUMzQyw4REFBQ0E7WUFBTTJCLGdCQUFjLENBQUMsRUFBRTNCLE1BQU00QixHQUFHLENBQUMsQ0FBQyxFQUFFNUIsTUFBTTZCLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFrQkMseUJBQXlCO2dCQUFFQyxRQUFRaEMsTUFBTWlDLEdBQUc7WUFBQztXQUF4RGpDLE1BQU00QixHQUFHOzs7OztJQUc5RSxPQUFPO1FBQ0gsR0FBR04sWUFBWTtRQUNmWjtJQUNKO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0b3JlY29yZC1uZXcvLi9wYWdlcy9fZG9jdW1lbnQudHN4P2QzN2QiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERvY3VtZW50LCB7IEh0bWwsIEhlYWQsIE1haW4sIE5leHRTY3JpcHQgfSBmcm9tIFwibmV4dC9kb2N1bWVudFwiO1xuaW1wb3J0IGNyZWF0ZUVtb3Rpb25DYWNoZSBmcm9tIFwiLi4vc3JjL2NyZWF0ZUVtb3Rpb25DYWNoZVwiO1xuaW1wb3J0IGNyZWF0ZUVtb3Rpb25TZXJ2ZXIgZnJvbSBcIkBlbW90aW9uL3NlcnZlci9jcmVhdGUtaW5zdGFuY2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SHRtbCBzdHlsZT17eyBzY3JvbGxCZWhhdmlvcjogXCJzbW9vdGhcIiB9fSBsYW5nPVwiZW5cIj5cbiAgICAgICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9SW50ZXI6MTAwLDIwMCwzMDAsNDAwLDUwMCw2MDAsNzAwLDgwMCw5MDAmZGlzcGxheT1zd2FwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cImVtb3Rpb24taW5zZXJ0aW9uLXBvaW50XCIgY29udGVudD1cIlwiIC8+XG4gICAgICAgICAgICAgICAgICAgIHsodGhpcy5wcm9wcyBhcyBhbnkpLmVtb3Rpb25TdHlsZVRhZ3N9XG4gICAgICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgICAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgICAgIDwvSHRtbD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuXG5NeURvY3VtZW50LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjdHg6IGFueSkgPT4ge1xuICAgIGNvbnN0IG9yaWdpbmFsUmVuZGVyUGFnZSA9IGN0eC5yZW5kZXJQYWdlO1xuICBcbiAgICBjb25zdCBjYWNoZSA9IGNyZWF0ZUVtb3Rpb25DYWNoZSgpO1xuICAgIGNvbnN0IHsgZXh0cmFjdENyaXRpY2FsVG9DaHVua3MgfSA9IGNyZWF0ZUVtb3Rpb25TZXJ2ZXIoY2FjaGUpO1xuICBcbiAgICBjdHgucmVuZGVyUGFnZSA9ICgpID0+XG4gICAgICAgIG9yaWdpbmFsUmVuZGVyUGFnZSh7XG4gICAgICAgICAgICBlbmhhbmNlQXBwOiAoQXBwOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gRW5oYW5jZUFwcChwcm9wczogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8QXBwIGVtb3Rpb25DYWNoZT17Y2FjaGV9IHsuLi5wcm9wc30gLz47XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gIFxuICAgIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuICAgIGNvbnN0IGVtb3Rpb25TdHlsZXMgPSBleHRyYWN0Q3JpdGljYWxUb0NodW5rcyhpbml0aWFsUHJvcHMuaHRtbCk7XG4gICAgY29uc3QgZW1vdGlvblN0eWxlVGFncyA9IGVtb3Rpb25TdHlsZXMuc3R5bGVzLm1hcCgoc3R5bGU6IGFueSkgPT4gKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGFuZ2VyXG4gICAgICAgIDxzdHlsZSBkYXRhLWVtb3Rpb249e2Ake3N0eWxlLmtleX0gJHtzdHlsZS5pZHMuam9pbignICcpfWB9IGtleT17c3R5bGUua2V5fSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHN0eWxlLmNzcyB9fSAvPlxuICAgICkpO1xuICBcbiAgICByZXR1cm4geyBcbiAgICAgICAgLi4uaW5pdGlhbFByb3BzLFxuICAgICAgICBlbW90aW9uU3R5bGVUYWdzLFxuICAgIH07XG59OyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJjcmVhdGVFbW90aW9uQ2FjaGUiLCJjcmVhdGVFbW90aW9uU2VydmVyIiwiTXlEb2N1bWVudCIsInJlbmRlciIsInN0eWxlIiwic2Nyb2xsQmVoYXZpb3IiLCJsYW5nIiwibGluayIsInJlbCIsImhyZWYiLCJtZXRhIiwibmFtZSIsImNvbnRlbnQiLCJwcm9wcyIsImVtb3Rpb25TdHlsZVRhZ3MiLCJib2R5IiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4Iiwib3JpZ2luYWxSZW5kZXJQYWdlIiwicmVuZGVyUGFnZSIsImNhY2hlIiwiZXh0cmFjdENyaXRpY2FsVG9DaHVua3MiLCJlbmhhbmNlQXBwIiwiQXBwIiwiRW5oYW5jZUFwcCIsImVtb3Rpb25DYWNoZSIsImluaXRpYWxQcm9wcyIsImVtb3Rpb25TdHlsZXMiLCJodG1sIiwic3R5bGVzIiwibWFwIiwiZGF0YS1lbW90aW9uIiwia2V5IiwiaWRzIiwiam9pbiIsImRhbmdlcm91c2x5U2V0SW5uZXJIVE1MIiwiX19odG1sIiwiY3NzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "./src/createEmotionCache.ts":
/*!***********************************!*\
  !*** ./src/createEmotionCache.ts ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createEmotionCache)\n/* harmony export */ });\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_cache__WEBPACK_IMPORTED_MODULE_0__]);\n_emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst isBrowser = typeof document !== \"undefined\";\n// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.\n// This assures that MUI styles are loaded first.\n// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.\nfunction createEmotionCache() {\n    let insertionPoint;\n    if (isBrowser) {\n        const emotionInsertionPoint = document.querySelector('meta[name=\"emotion-insertion-point\"]');\n        insertionPoint = emotionInsertionPoint ?? undefined;\n    }\n    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        key: \"mui-style\",\n        insertionPoint\n    });\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3JlYXRlRW1vdGlvbkNhY2hlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXlDO0FBRXpDLE1BQU1DLFlBQVksT0FBT0MsYUFBYTtBQUV0QywrRkFBK0Y7QUFDL0YsaURBQWlEO0FBQ2pELHFHQUFxRztBQUN0RixTQUFTQztJQUNwQixJQUFJQztJQUVKLElBQUlILFdBQVc7UUFDWCxNQUFNSSx3QkFBd0JILFNBQVNJLGFBQWEsQ0FDaEQ7UUFFSkYsaUJBQWlCQyx5QkFBeUJFO0lBQzlDO0lBRUEsT0FBT1AsMERBQVdBLENBQUM7UUFBRVEsS0FBSztRQUFhSjtJQUFlO0FBQzFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdG9yZWNvcmQtbmV3Ly4vc3JjL2NyZWF0ZUVtb3Rpb25DYWNoZS50cz85MTI3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDYWNoZSBmcm9tIFwiQGVtb3Rpb24vY2FjaGVcIjtcblxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiO1xuXG4vLyBPbiB0aGUgY2xpZW50IHNpZGUsIENyZWF0ZSBhIG1ldGEgdGFnIGF0IHRoZSB0b3Agb2YgdGhlIDxoZWFkPiBhbmQgc2V0IGl0IGFzIGluc2VydGlvblBvaW50LlxuLy8gVGhpcyBhc3N1cmVzIHRoYXQgTVVJIHN0eWxlcyBhcmUgbG9hZGVkIGZpcnN0LlxuLy8gSXQgYWxsb3dzIGRldmVsb3BlcnMgdG8gZWFzaWx5IG92ZXJyaWRlIE1VSSBzdHlsZXMgd2l0aCBvdGhlciBzdHlsaW5nIHNvbHV0aW9ucywgbGlrZSBDU1MgbW9kdWxlcy5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVtb3Rpb25DYWNoZSgpIHtcbiAgICBsZXQgaW5zZXJ0aW9uUG9pbnQ7XG5cbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGVtb3Rpb25JbnNlcnRpb25Qb2ludCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTE1ldGFFbGVtZW50PihcbiAgICAgICAgICAgICdtZXRhW25hbWU9XCJlbW90aW9uLWluc2VydGlvbi1wb2ludFwiXScsXG4gICAgICAgICk7XG4gICAgICAgIGluc2VydGlvblBvaW50ID0gZW1vdGlvbkluc2VydGlvblBvaW50ID8/IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2FjaGUoeyBrZXk6IFwibXVpLXN0eWxlXCIsIGluc2VydGlvblBvaW50IH0pO1xufSJdLCJuYW1lcyI6WyJjcmVhdGVDYWNoZSIsImlzQnJvd3NlciIsImRvY3VtZW50IiwiY3JlYXRlRW1vdGlvbkNhY2hlIiwiaW5zZXJ0aW9uUG9pbnQiLCJlbW90aW9uSW5zZXJ0aW9uUG9pbnQiLCJxdWVyeVNlbGVjdG9yIiwidW5kZWZpbmVkIiwia2V5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/createEmotionCache.ts\n");

/***/ }),

/***/ "@emotion/server/create-instance":
/*!**************************************************!*\
  !*** external "@emotion/server/create-instance" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@emotion/server/create-instance");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

module.exports = import("@emotion/cache");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();