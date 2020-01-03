export default class videoShader1 {
    _currentBuffer = null;
    //占用纹理位置
    shaderPos = [];

    constructor() {
        this.shaderPos = [shaderIndex++, shaderIndex++];
    }
    MycreateTexture() {
        const gl = cc._renderContext;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //gl.LINEAR
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return texture;
    }

    /**
     * shader
     */
    ShaderEffect(node) {
        //GLProgram
        let program = new cc.GLProgram();
        if (cc.sys.isNative) {
            program.initWithString(default_vert, gray_frag);
            program.link();
            program.updateUniforms();
        } else {
            program.initWithVertexShaderByteArray(default_vert, gray_frag);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            program.link();
            program.updateUniforms();
        }
        let gl = cc._renderContext;
        program._uniforms[1] = gl.getUniformLocation(program._programObj, "YTexture");
        program._uniforms[2] = gl.getUniformLocation(program._programObj, "CBTexture");
        program._uniforms[3] = gl.getUniformLocation(program._programObj, "CRTexture");
        program.setUniformLocationWith1i(program._uniforms[1], 0);
        program.setUniformLocationWith1i(program._uniforms[2], this.shaderPos[0]);
        program.setUniformLocationWith1i(program._uniforms[3], this.shaderPos[1]);
        //渲染节点
        this.setProgram(node.getComponent(cc.Sprite)._sgNode, program);
        //
        this._texture1 = this.MycreateTexture();
        this._texture2 = this.MycreateTexture();
        this._texture3 = this.MycreateTexture();
    }

    Myrendering(size) {
        var videoSize = size; //{width:864,height:480};
        const lumaSize = videoSize.width * videoSize.height;
        const chromaSize = lumaSize >> 2;
        const buffer = this._currentBuffer;
        if (buffer) {
            var uint8Y = buffer.subarray(0, lumaSize),
                uint8Cr = buffer.subarray(lumaSize, lumaSize + chromaSize),
                uint8Cb = buffer.subarray(lumaSize + chromaSize, lumaSize + 2 *
                    chromaSize);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1,
                videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Y);
            gl.activeTexture(gl['TEXTURE' + this.shaderPos[0]]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture2);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1,
                videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cr);
            gl.activeTexture(gl['TEXTURE' + this.shaderPos[1]]);
            gl.bindTexture(gl.TEXTURE_2D, this._texture3);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1,
                videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cb);
            uint8Y = null;
            uint8Cr = null;
            uint8Cb = null;
        }
    }
    //现目前 没有用
    setProgram(node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        } else {
            node.setShaderProgram(program);
        }
        var children = node.children;
        if (!children)
            return;

        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    }
}
//存储每个shader占用的纹理位置
var shaderIndex = 1;
//定点着色器
var default_vert = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying lowp vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }`;
//片元着色器
var gray_frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec4 v_fragmentColor;
    varying vec2 v_texCoord;
    uniform sampler2D YTexture;
    uniform sampler2D CBTexture;
    uniform sampler2D CRTexture;
    const mat4 YUV2RGB = mat4(1.1643828125, 0, 1.59602734375, -.87078515625,
           1.1643828125, -.39176171875, -.81296875, .52959375,
           1.1643828125, 2.017234375, 0, -1.081390625,
           0, 0, 0, 1);
    const mat4 YUV2RGB2 = mat4(1.000000,    1.000000,    1.000000,    0.000000,
        0.000000,    -0.34414,    1.177200,    0.000000,
        1.402000,    -0.71414,    0.000000,    0.000000,
        0.000000,    0.000000,    0.000000,    1.000000);
    void main()
    {
        float y = texture2D(YTexture, v_texCoord).r;
        float cr = texture2D(CBTexture, v_texCoord).r;
        float cb = texture2D(CRTexture, v_texCoord).r;
        gl_FragColor = v_fragmentColor * vec4(y, cr, cb, 1.0) *YUV2RGB ;
    }`;