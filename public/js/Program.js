define(["require", "exports", "./MyScene"], function (require, exports, MyScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Playgrounds:
    // Plunker: https://next.plnkr.co/edit/4pnm93F1eWQuvpYg?preview
    // CodeSandbox: https://codesandbox.io/s/textured-rectangle-with-transforms-typescript-s7gfb
    var Program = /** @class */ (function () {
        function Program() {
        }
        Program.Main = function () {
            var scene = new MyScene_1.default("renderCanvas");
        };
        return Program;
    }());
    // Debug Version
    Program.Main();
});
// Release Version
// window.onload = () => Program.Main();
//# sourceMappingURL=Program.js.map