import React, { Component } from "react";

class ElectrodeGeometry extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.size = [600, 250];
        this.xmin = 0;
        this.xmax = 1;
        this.ymin = 0;
        this.ymax = 2;
        this.transpose = false;
        this.margins = { top: 15, bottom: 15, left: 15, right: 15 };
        this.channel_rects = {};
        this.hovered_electrode_index = -1;
        this.current_electrode_index = -1;
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        // // Draws a square in the middle of the canvas rotated
        // // around the centre by this.props.angle
        // const angle = 30;
        // const width = canvas.width;
        // const height = canvas.height;
        // ctx.save();
        // ctx.beginPath();
        // ctx.clearRect(0, 0, width, height);
        // ctx.translate(width / 2, height / 2);
        // ctx.rotate((angle * Math.PI) / 180);
        // ctx.fillStyle = '#4397AC';
        // ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
        // ctx.restore();

        this.updatePositions();

        let painter = new CanvasPainter(ctx);
        painter.clear();
        let W = this.size[0];
        let H = this.size[1];

        let W1 = W, H1 = H;
        if (this.transpose) {
            W1 = H;
            H1 = W;
        }

        let x1 = this.xmin - this.mindist, x2 = this.xmax + this.mindist;
        let y1 = this.ymin - this.mindist, y2 = this.ymax + this.mindist;
        let w0 = x2 - x1, h0 = y2 - y1;
        let offset, scale;
        if (w0 * H1 > h0 * W1) {
            scale = W1 / w0;
            offset = [0 - x1 * scale, (H1 - h0 * scale) / 2 - y1 * scale];
        } else {
            scale = H1 / h0;
            offset = [(W1 - w0 * scale) / 2 - x1 * scale, 0 - y1 * scale];
        }
        this.channel_rects = [];
        if (this.props.locations) {
            for (let i in this.props.locations) {
                let pt0 = this.props.locations[i];
                let x = pt0[0] * scale + offset[0];
                let y = pt0[1] * scale + offset[1];
                let rad = this.mindist * scale / 3;
                let x1 = x, y1 = y;
                if (this.transpose) {
                    x1 = y;
                    y1 = x;
                }
                let col = this.getChannelColor(i);
                let rect0 = [x1 - rad, y1 - rad, rad * 2, rad * 2];
                painter.fillEllipse(rect0, col);
                this.channel_rects[i] = rect0;
                let label0 = this.props.labels[i] || '';
                if ((label0) || (label0 === 0)) {
                    painter.setBrush({ color: 'white' });
                    painter.setFont({ 'pixel-size': rad });
                    painter.drawText(rect0, { AlignCenter: true, AlignVCenter: true }, label0);
                }
            }
        }
    }

    updatePositions() {
        if (!this.props.locations) {
            return;
        }
        let pt0 = this.props.locations[0] || [0, 0];
        let xmin = pt0[0], xmax = pt0[0];
        let ymin = pt0[1], ymax = pt0[1];
        for (let i in this.props.locations) {
            let pt = this.props.locations[i];
            xmin = Math.min(xmin, pt[0]);
            xmax = Math.max(xmax, pt[0]);
            ymin = Math.min(ymin, pt[1]);
            ymax = Math.max(ymax, pt[1]);
        }
        if (xmax === xmin) xmax++;
        if (ymax === ymin) ymax++;

        this.xmin = xmin; this.xmax = xmax;
        this.ymin = ymin; this.ymax = ymax;

        this.transpose = (this.ymax - this.ymin > this.xmax - this.xmin);

        let mindists = [];
        for (var i in this.props.locations) {
            let pt0 = this.props.locations[i];
            let mindist = -1;
            for (let j in this.props.locations) {
                let pt1 = this.props.locations[j];
                let dx = pt1[0] - pt0[0];
                let dy = pt1[1] - pt0[1];
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    if ((dist < mindist) || (mindist < 0))
                        mindist = dist;
                }
            }
            if (mindist > 0) mindists.push(mindist);
        }
        let avg_mindist = compute_average(mindists);
        if (avg_mindist <= 0) avg_mindist = 1;
        this.mindist = avg_mindist;
    }

    getChannelColor(ind) {
        let color = 'rgb(0, 0, 255)';
        let color_hover = 'rgb(100, 100, 255)';
        let color_current = 'rgb(200, 200, 100)';
        let color_current_hover = 'rgb(220, 220, 150)';

        if (ind === this.current_electrode_index) {
            if (ind === this.hovered_electrode_index) return color_current_hover;
            else return color_current;
        }
        else {
            if (ind === this.hovered_electrode_index) return color_hover;
            else return color;
        }
    }

    render() {
        let canvas = <canvas width={this.size[0]} height={this.size[1]} ref={this.canvasRef} />

        if (this.props.locations === undefined) {
            return <span>
                <div>Loading...</div>
                {canvas}
            </span>
        }
        else if (this.props.locations === null) {
            return <span>
                <div>Not found.</div>
                {canvas}
            </span>
        }

        return canvas;
    }
}

function CanvasPainter(context2d) {
    var that = this;
    var ctx = context2d;

    var m_pen = { color: 'black' };
    var m_font = { "pixel-size": 12, family: 'Arial' };
    var m_brush = { color: 'black' };
    let m_width = 0;
    let m_height = 0;

    this.pen = function () { return clone(m_pen); };
    this.setPen = function (pen) { setPen(pen); };
    this.font = function () { return clone(m_font); };
    this.setFont = function (font) { setFont(font); };
    this.brush = function () { return clone(m_brush); };
    this.setBrush = function (brush) { setBrush(brush); };

    this._initialize = function (W, H) {
        //ctx.fillStyle='black';
        //ctx.fillRect(0,0,W,H);
        m_width = W;
        m_height = H;
    };
    this._finalize = function () {
    };
    this.clearRect = function (x, y, W, H) {
        ctx.clearRect(x, y, W, H);
    };
    this.clear = function () {
        ctx.clearRect(0, 0, m_width, m_height);
    }
    this.fillRect = function (x, y, W, H, brush) {
        if (typeof brush === 'string') brush = { color: brush };
        if (!('color' in brush)) brush = { color: brush };
        ctx.fillStyle = to_color(brush.color);
        ctx.fillRect(x, y, W, H);
    };
    this.drawRect = function (x, y, W, H) {
        ctx.strokeStyle = to_color(m_pen.color);
        ctx.strokeRect(x, y, W, H);
    };
    this.drawPath = function (painter_path) {
        ctx.strokeStyle = to_color(m_pen.color);
        painter_path._draw(ctx);
    };
    this.drawLine = function (x1, y1, x2, y2) {
        var ppath = new PainterPath();
        ppath.moveTo(x1, y1);
        ppath.lineTo(x2, y2);
        that.drawPath(ppath);
    };
    this.drawText = function (rect, alignment, txt) {
        var x, y, textAlign, textBaseline;
        if (alignment.AlignLeft) {
            x = rect[0];
            textAlign = 'left';
        }
        else if (alignment.AlignCenter) {
            x = rect[0] + rect[2] / 2;
            textAlign = 'center';
        }
        else if (alignment.AlignRight) {
            x = rect[0] + rect[2];
            textAlign = 'right';
        }

        if (alignment.AlignTop) {
            y = rect[1];
            textBaseline = 'top';
        }
        else if (alignment.AlignBottom) {
            y = rect[1] + rect[3];
            textBaseline = 'bottom';
        }
        else if (alignment.AlignVCenter) {
            y = rect[1] + rect[3] / 2;
            textBaseline = 'middle';
        }

        ctx.font = m_font['pixel-size'] + 'px ' + m_font.family;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.strokeStyle = to_color(m_pen.color);
        ctx.fillStyle = to_color(m_brush.color);
        ctx.fillText(txt, x, y);
    }
    this.drawEllipse = function (rect) {
        ctx.strokeStyle = to_color(m_pen.color);
        ctx.beginPath();
        ctx.ellipse(rect[0] + rect[2] / 2, rect[1] + rect[3] / 2, rect[2] / 2, rect[3] / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
    }
    this.fillEllipse = function (rect, brush) {
        if (brush) {
            if (typeof brush === 'string') brush = { color: brush };
            if (!('color' in brush)) brush = { color: brush };
            ctx.fillStyle = to_color(brush.color);
        }
        else {
            ctx.fillStyle = to_color(m_brush.color);
        }
        ctx.beginPath();
        ctx.ellipse(rect[0] + rect[2] / 2, rect[1] + rect[3] / 2, rect[2] / 2, rect[3] / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    function setPen(pen) {
        m_pen = clone(pen);
    }

    function setFont(font) {
        m_font = clone(font);
    }

    function setBrush(brush) {
        m_brush = clone(brush);
    }

    function to_color(col) {
        if (typeof col === 'string') return col;
        return 'rgb(' + Math.floor(col[0]) + ',' + Math.floor(col[1]) + ',' + Math.floor(col[2]) + ')';
    }
}


function PainterPath() {
    this.moveTo = function (x, y) { moveTo(x, y); };
    this.lineTo = function (x, y) { lineTo(x, y); };

    this._draw = function (ctx) {
        ctx.beginPath();
        for (var i = 0; i < m_actions.length; i++) {
            apply_action(ctx, m_actions[i]);
        }
        ctx.stroke();
    }
    var m_actions = [];

    function moveTo(x, y) {
        if (y === undefined) { moveTo(x[0], x[1]); return; }
        m_actions.push({
            name: 'moveTo',
            x: x, y: y
        });
    }
    function lineTo(x, y) {
        if (m_actions.length === 0) {
            moveTo(x, y);
            return;
        }
        if (y === undefined) { lineTo(x[0], x[1]); return; }
        m_actions.push({
            name: 'lineTo',
            x: x, y: y
        });
    }

    function apply_action(ctx, a) {
        if (a.name === 'moveTo') {
            ctx.moveTo(a.x, a.y);
        }
        else if (a.name === 'lineTo') {
            ctx.lineTo(a.x, a.y);
        }
    }
}

function compute_average(list) {
    if (list.length === 0) return 0;
    var sum = 0;
    for (var i in list) sum += list[i];
    return sum / list.length;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 *
 * @fileoverview Description of this file.
 *
 * A polyfill for HTML Canvas features, including
 * Path2D support.
 */
if (CanvasRenderingContext2D.prototype.ellipse === undefined) {
    CanvasRenderingContext2D.prototype.ellipse = function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
        this.save();
        this.translate(x, y);
        this.rotate(rotation);
        this.scale(radiusX, radiusY);
        this.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
        this.restore();
    }
}


export default ElectrodeGeometry