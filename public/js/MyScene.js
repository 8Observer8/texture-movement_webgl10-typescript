define(["require", "exports", "./ShaderProgram", "gl-matrix"], function (require, exports, ShaderProgram_1, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyScene = /** @class */ (function () {
        function MyScene(canvasName) {
            this._x = 64;
            this._y = 96;
            this._shaderProgram = new ShaderProgram_1.default(canvasName);
            this._gl = this._shaderProgram.GetGL();
            this.Init();
        }
        MyScene.prototype.Init = function () {
            var _this = this;
            var verticesAndTexCoords = new Float32Array([
                -0.5, 0.5, 0.0, 1.0,
                -0.5, -0.5, 0.0, 0.0,
                0.5, 0.5, 1.0, 1.0,
                0.5, -0.5, 1.0, 0.0
            ]);
            var gl = this._shaderProgram.GetGL();
            this._program = this._shaderProgram.GetProgram();
            if (this._program === null)
                return;
            var vbo = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, verticesAndTexCoords, gl.STATIC_DRAW);
            var FSIZE = verticesAndTexCoords.BYTES_PER_ELEMENT;
            var aPosition = gl.getAttribLocation(this._program, "aPosition");
            gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 4 * FSIZE, 0);
            gl.enableVertexAttribArray(aPosition);
            var aTexCoord = gl.getAttribLocation(this._program, "aTexCoord");
            gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 4 * FSIZE, 2 * FSIZE);
            gl.enableVertexAttribArray(aTexCoord);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            var image = new Image();
            image.onload = function () { _this.OnImageLoaded(image); };
            image.crossOrigin = "";
            image.src = "assets/images/tank_yellow_small_right_01.png";
        };
        MyScene.prototype.OnImageLoaded = function (image) {
            var gl = this._shaderProgram.GetGL();
            var program = this._shaderProgram.GetProgram();
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.activeTexture(gl.TEXTURE0);
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            var uSampler = gl.getUniformLocation(program, "uSampler");
            gl.uniform1i(uSampler, 0);
            this._modelMatrix = gl_matrix_1.mat4.create();
            var projMatrix = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.ortho(projMatrix, 0, gl.canvas.width, 0, gl.canvas.height, 0.1, 100);
            var uProjMatrix = gl.getUniformLocation(program, "uProjMatrix");
            gl.uniformMatrix4fv(uProjMatrix, false, projMatrix);
            var viewMatrix = gl_matrix_1.mat4.create();
            gl_matrix_1.mat4.lookAt(viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
            var uViewMatrix = gl.getUniformLocation(program, "uViewMatrix");
            gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);
            gl.clearColor(0, 0, 0, 1.0);
            this.GameLoop();
        };
        MyScene.prototype.GameLoop = function () {
            var _this = this;
            this.Update();
            this.Draw();
            requestAnimationFrame(function () { return _this.GameLoop(); });
        };
        MyScene.prototype.Update = function () {
            this._x += 2;
            // Check a collisiion with the right wall
            if (this._x > this._gl.canvas.width) {
                // Move an object to left wall
                this._x = 0;
            }
            gl_matrix_1.mat4.identity(this._modelMatrix);
            gl_matrix_1.mat4.translate(this._modelMatrix, this._modelMatrix, gl_matrix_1.vec3.fromValues(this._x, this._y, 0));
            gl_matrix_1.mat4.rotateZ(this._modelMatrix, this._modelMatrix, 0 * Math.PI / 180.0);
            gl_matrix_1.mat4.scale(this._modelMatrix, this._modelMatrix, gl_matrix_1.vec3.fromValues(32, 32, 1));
            var uModelMatrix = this._gl.getUniformLocation(this._program, "uModelMatrix");
            this._gl.uniformMatrix4fv(uModelMatrix, false, this._modelMatrix);
        };
        MyScene.prototype.Draw = function () {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT);
            this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
        };
        return MyScene;
    }());
    exports.default = MyScene;
});
//# sourceMappingURL=MyScene.js.map