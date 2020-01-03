(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/VideoSimple/js/video/VideoShader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb4408KxqpMLJTVtcUY1d0k', 'VideoShader', __filename);
// VideoSimple/js/video/VideoShader.js

"use strict";

module.exports = {
    node: null,
    _currentBuffer: null,
    default_vert: "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying lowp vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }\n    ",
    gray_frag: "\n    #ifdef GL_ES\n    precision mediump float;\n    #endif\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n\n    uniform sampler2D YTexture;\n    uniform sampler2D CBTexture;\n    uniform sampler2D CRTexture;\n\n    \n    const mat4 YUV2RGB = mat4(1.1643828125, 0, 1.59602734375, -.87078515625,\n           1.1643828125, -.39176171875, -.81296875, .52959375,\n           1.1643828125, 2.017234375, 0, -1.081390625,\n           0, 0, 0, 1);\n    const mat4 YUV2RGB2 = mat4(1.000000,    1.000000,    1.000000,    0.000000,\n        0.000000,    -0.34414,    1.177200,    0.000000,\n        1.402000,    -0.71414,    0.000000,    0.000000,\n        0.000000,    0.000000,    0.000000,    1.000000);\n    \n    void main()\n    {\n        \n\n        float y = texture2D(YTexture, v_texCoord).r;\n        float cr = texture2D(CBTexture, v_texCoord).r;\n        float cb = texture2D(CRTexture, v_texCoord).r;\n        gl_FragColor = v_fragmentColor * vec4(y, cr, cb, 1.0) *YUV2RGB ;\n    }\n    ",
    MycreateTexture: function MycreateTexture() {
        var gl = cc._renderContext;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //gl.LINEAR
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        return texture;
    },
    /**
     * shader
     */
    ShaderEffect: function ShaderEffect() {
        this.program = new cc.GLProgram();
        if (cc.sys.isNative) {
            this.program.initWithString(this.default_vert, this.gray_frag);
            this.program.link();
            this.program.updateUniforms();
        } else {
            this.program.initWithVertexShaderByteArray(this.default_vert, this.gray_frag);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this.program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this.program.link();
            this.program.updateUniforms();
        }
        var gl = cc._renderContext;
        this.program._uniforms[1] = gl.getUniformLocation(this.program._programObj, "YTexture");
        this.program._uniforms[2] = gl.getUniformLocation(this.program._programObj, "CBTexture");
        this.program._uniforms[3] = gl.getUniformLocation(this.program._programObj, "CRTexture");

        this.program.setUniformLocationWith1i(this.program._uniforms[1], 0);
        this.program.setUniformLocationWith1i(this.program._uniforms[2], 1);
        this.program.setUniformLocationWith1i(this.program._uniforms[3], 2);
        if (this.isAllChildrenUse) {
            this.setProgram(this.node._sgNode, this.program);
        } else {
            this.setProgram(this.node.getComponent(cc.Sprite)._sgNode, this.program);
        }
        this._texture1 = this.MycreateTexture();
        this._texture2 = this.MycreateTexture();
        this._texture3 = this.MycreateTexture();
    },
    Myrendering: function Myrendering(size) {
        var videoSize = size; //{width:864,height:480};
        var lumaSize = videoSize.width * videoSize.height;
        var chromaSize = lumaSize >> 2;
        var buffer = this._currentBuffer;
        if (buffer) {
            var uint8Y = buffer.subarray(0, lumaSize),
                uint8Cr = buffer.subarray(lumaSize, lumaSize + chromaSize),
                uint8Cb = buffer.subarray(lumaSize + chromaSize, lumaSize + 2 * chromaSize);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this._texture1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1, videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Y);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this._texture2);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1, videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cr);
            gl.activeTexture(gl.TEXTURE2);
            gl.bindTexture(gl.TEXTURE_2D, this._texture3);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1, videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cb);
            uint8Y = null;
            uint8Cr = null;
            uint8Cb = null;
        }
    },
    setProgram: function setProgram(node, program) {
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            node.setGLProgramState(glProgram_state);
        } else {
            node.setShaderProgram(program);
        }
        var children = node.children;
        if (!children) return;

        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], program);
        }
    }
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=VideoShader.js.map
        