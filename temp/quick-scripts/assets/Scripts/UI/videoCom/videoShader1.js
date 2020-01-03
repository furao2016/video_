(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/UI/videoCom/videoShader1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7bd80SK0Q9KHKq5aiUgfW0C', 'videoShader1', __filename);
// Scripts/UI/videoCom/videoShader1.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var videoShader1 = function () {
    function videoShader1() {
        _classCallCheck(this, videoShader1);

        this._currentBuffer = null;
        this.shaderPos = [];

        this.shaderPos = [shaderIndex++, shaderIndex++];
    }
    //占用纹理位置


    _createClass(videoShader1, [{
        key: "MycreateTexture",
        value: function MycreateTexture() {
            var gl = cc._renderContext;
            var texture = gl.createTexture();
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

    }, {
        key: "ShaderEffect",
        value: function ShaderEffect(node) {
            //GLProgram
            var program = new cc.GLProgram();
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
            var gl = cc._renderContext;
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
    }, {
        key: "Myrendering",
        value: function Myrendering(size) {
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
                gl.activeTexture(gl['TEXTURE' + this.shaderPos[0]]);
                gl.bindTexture(gl.TEXTURE_2D, this._texture2);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1, videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cr);
                gl.activeTexture(gl['TEXTURE' + this.shaderPos[1]]);
                gl.bindTexture(gl.TEXTURE_2D, this._texture3);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, videoSize.width >> 1, videoSize.height >> 1, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uint8Cb);
                uint8Y = null;
                uint8Cr = null;
                uint8Cb = null;
            }
        }
        //现目前 没有用

    }, {
        key: "setProgram",
        value: function setProgram(node, program) {
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
    }]);

    return videoShader1;
}();
//存储每个shader占用的纹理位置


exports.default = videoShader1;
var shaderIndex = 1;
//定点着色器
var default_vert = "\n    attribute vec4 a_position;\n    attribute vec2 a_texCoord;\n    attribute vec4 a_color;\n    varying vec2 v_texCoord;\n    varying lowp vec4 v_fragmentColor;\n    void main()\n    {\n        gl_Position = CC_PMatrix * a_position;\n        v_fragmentColor = a_color;\n        v_texCoord = a_texCoord;\n    }";
//片元着色器
var gray_frag = "\n    #ifdef GL_ES\n    precision mediump float;\n    #endif\n    varying vec4 v_fragmentColor;\n    varying vec2 v_texCoord;\n    uniform sampler2D YTexture;\n    uniform sampler2D CBTexture;\n    uniform sampler2D CRTexture;\n    const mat4 YUV2RGB = mat4(1.1643828125, 0, 1.59602734375, -.87078515625,\n           1.1643828125, -.39176171875, -.81296875, .52959375,\n           1.1643828125, 2.017234375, 0, -1.081390625,\n           0, 0, 0, 1);\n    const mat4 YUV2RGB2 = mat4(1.000000,    1.000000,    1.000000,    0.000000,\n        0.000000,    -0.34414,    1.177200,    0.000000,\n        1.402000,    -0.71414,    0.000000,    0.000000,\n        0.000000,    0.000000,    0.000000,    1.000000);\n    void main()\n    {\n        float y = texture2D(YTexture, v_texCoord).r;\n        float cr = texture2D(CBTexture, v_texCoord).r;\n        float cb = texture2D(CRTexture, v_texCoord).r;\n        gl_FragColor = v_fragmentColor * vec4(y, cr, cb, 1.0) *YUV2RGB ;\n    }";
module.exports = exports["default"];

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
        //# sourceMappingURL=videoShader1.js.map
        