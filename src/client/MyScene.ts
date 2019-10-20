import ShaderProgram from "./ShaderProgram";
import { mat4, vec3 } from "gl-matrix";

export default class MyScene
{
    private _shaderProgram: ShaderProgram;
    private _program: WebGLProgram;
    private _gl: WebGLRenderingContext;
    private _modelMatrix: mat4;
    private _x = 64;
    private _y = 96;
 
    public constructor(canvasName: string)
    {
        this._shaderProgram = new ShaderProgram(canvasName);
        this._gl = this._shaderProgram.GetGL();
 
        this.Init();
    }
 
    private Init(): void
    {
        var verticesAndTexCoords = new Float32Array([
            -0.5, 0.5, 0.0, 1.0,    // (x, y), (u, v)
            -0.5, -0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5, -0.5, 1.0, 0.0
        ]);
 
        let gl = this._shaderProgram.GetGL();

        this._program = this._shaderProgram.GetProgram();
        if (this._program === null) return;
 
        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, verticesAndTexCoords, gl.STATIC_DRAW);
 
        let FSIZE = verticesAndTexCoords.BYTES_PER_ELEMENT;
 
        let aPosition = gl.getAttribLocation(this._program, "aPosition");
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 4 * FSIZE, 0);
        gl.enableVertexAttribArray(aPosition);
 
        let aTexCoord = gl.getAttribLocation(this._program, "aTexCoord");
        gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 4 * FSIZE, 2 * FSIZE);
        gl.enableVertexAttribArray(aTexCoord);
 
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
 
        let image = new Image();
        image.onload = () => { this.OnImageLoaded(image); };
        image.crossOrigin = "";
        image.src = "assets/images/tank_yellow_small_right_01.png";
    }
 
    private OnImageLoaded(image: HTMLImageElement)
    {
        let gl = this._shaderProgram.GetGL();
        let program = this._shaderProgram.GetProgram();
 
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.activeTexture(gl.TEXTURE0);
 
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
 
        let uSampler = gl.getUniformLocation(program, "uSampler");
        gl.uniform1i(uSampler, 0);
 
        this._modelMatrix = mat4.create();

        let projMatrix = mat4.create();
        mat4.ortho(projMatrix, 0, gl.canvas.width, 0, gl.canvas.height, 0.1, 100);
        let uProjMatrix = gl.getUniformLocation(program, "uProjMatrix");
        gl.uniformMatrix4fv(uProjMatrix, false, projMatrix);

        let viewMatrix = mat4.create();
        mat4.lookAt(viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
        let uViewMatrix = gl.getUniformLocation(program, "uViewMatrix");
        gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);

        gl.clearColor(0, 0, 0, 1.0);

        this.GameLoop();
    }

    private GameLoop(): void
    {
        this.Update();
        this.Draw();
        requestAnimationFrame(() => this.GameLoop());
    }

    private Update(): void
    {
        this._x += 2;

        // Check a collisiion with the right wall
        if (this._x > this._gl.canvas.width)
        {
            // Move an object to left wall
            this._x = 0;
        }

        mat4.identity(this._modelMatrix);
        mat4.translate(this._modelMatrix, this._modelMatrix, vec3.fromValues(this._x, this._y, 0));
        mat4.rotateZ(this._modelMatrix, this._modelMatrix, 0 * Math.PI / 180.0);
        mat4.scale(this._modelMatrix, this._modelMatrix, vec3.fromValues(32, 32, 1));
 
        let uModelMatrix = this._gl.getUniformLocation(this._program, "uModelMatrix");
        this._gl.uniformMatrix4fv(uModelMatrix, false, this._modelMatrix);
    }

    private Draw(): void
    {
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
    }
}