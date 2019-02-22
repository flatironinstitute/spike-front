export function buildSpikeForm(div) {
  // TODO: Do I need a div passed in here?
  // Set your variables
  let m_svg = $("<svg width=200 height=200 />");
  let m_plot = new Simplot.PlotArea(m_svg[0]);
  let m_spikes = {};
  let m_current_spike_id = null;
  let m_hovered_spike_id = null;
  let m_geometry = null;
  let m_channel_areas = null;
  let m_channel_spacing = null;
  let m_y_range = null;
}

function setSize(width, height) {
  let m_plot = new Simplot.PlotArea(m_svg[0]);

  m_plot.setSize(W, H);
}

// function PlotArea(svg_elmt) {
//     let that = this;

//     this.setSize = function(W, H) {
//       setSize(W, H);
//     };
//     this.addObject = function(id, obj) {
//       addObject(id, obj);
//     };
//     this.removeObject = function(id) {
//       removeObject(id);
//     };
//     this.css = function(stye) {
//       css(style);
//     };
//     this.setXRange = function(range, dummy) {
//       setXRange(range, dummy);
//     };
//     this.setYRange = function(range, dummy) {
//       setYRange(range, dummy);
//     };
//     this.xToPix = function(x) {
//       return xToPix(x);
//     };
//     this.yToPix = function(y) {
//       return yToPix(y);
//     };
//     this.xyToPix = function(xy) {
//       return xyToPix(xy);
//     };
//     this.pixToXY = function(pix) {
//       return pixToXY(pix);
//     };
//     this.pixToX = function(pix) {
//       return pixToX(pix);
//     };
//     this.pixToY = function(pix) {
//       return pixToY(pix);
//     };
//     this.bringObjectToFront = function(id) {
//       bringObjectToFront(id);
//     };

//     let m_width = 100;
//     let m_height = 100;
//     let m_objects = {};
//     let m_x_range = [0, 0];
//     let m_y_range = [0, 0];
//     let m_tooltip_div = document.createElement("div");
//     m_tooltip_div.setAttribute("class", "tooltiptext");
//     document.body.appendChild(m_tooltip_div);

//     function setSize(W, H) {
//       m_width = W;
//       m_height = H;
//       update_attributes();
//     }

//     function xToPix(x) {
//       let pct = (x - m_x_range[0]) / (m_x_range[1] - m_x_range[0]);
//       return pct * m_width;
//     }
//     function yToPix(y) {
//       let pct = (y - m_y_range[0]) / (m_y_range[1] - m_y_range[0]);
//       return (1 - pct) * m_height;
//     }
//     function xyToPix(xy) {
//       return [xToPix(xy[0]), yToPix(xy[1])];
//     }
//     function pixToX(pix) {
//       let pct = pix / m_width;
//       return m_x_range[0] + pct * (m_x_range[1] - m_x_range[0]);
//     }
//     function pixToY(pix) {
//       let pct = 1 - pix / m_height;
//       return m_y_range[0] + pct * (m_y_range[1] - m_y_range[0]);
//     }
//     function pixToXY(pix) {
//       return [pixToX(pix[0]), pixToY(pix[1])];
//     }

//     function setXRange(range, dummy) {
//       if (dummy) range = [range, dummy];
//       if (same(range, m_x_range)) return;
//       m_x_range = clone(range);
//       schedule_refresh();
//     }
//     function setYRange(range, dummy) {
//       if (dummy) range = [range, dummy];
//       if (same(range, m_y_range)) return;
//       m_y_range = clone(range);
//       schedule_refresh();
//     }

//     function update_attributes() {
//       d3.select(svg_elmt)
//         .attr("width", m_width)
//         .attr("height", m_height);
//     }
//     function addObject(id, obj) {
//       if (!obj) {
//         obj = id;
//         id = null;
//       }
//       if (!id) {
//         id = guidGenerator();
//       }
//       if (!(id in m_objects)) {
//         m_objects[id] = {
//           gg: d3.select(svg_elmt).append("g"),
//           object: null
//         };
//       }

//       let gg = m_objects[id].gg;
//       gg.selectAll("*").remove();
//       m_objects[id].object = obj;
//       obj.initialize(gg, that);

//       if (obj.onTooltipChanged) {
//         obj.onTooltipChanged(update_tooltip);
//       }
//       update_tooltip();
//       schedule_refresh();
//     }
//     function bringObjectToFront(id) {
//       if (!(id in m_objects)) return;
//       let gg = m_objects[id].gg;
//       gg.node().parentNode.appendChild(gg.node());
//       //d3.select(svg_elmt).appendChild(gg);
//     }
//     function update_tooltip() {
//       let the_tooltip = { text: "", mouse: [0, 0] };
//       for (let id in m_objects) {
//         let obj = m_objects[id].object;
//         if (obj.tooltip) {
//           let tt = obj.tooltip();
//           if (tt && tt.text) {
//             the_tooltip = tt;
//           }
//         }
//       }

//       let elmt = m_tooltip_div;
//       elmt.innerHTML = the_tooltip.text;
//       elmt.style.left = the_tooltip.mouse[0] + 18 + "px";
//       elmt.style.top = the_tooltip.mouse[1] + 18 + "px";
//       if (the_tooltip.text) {
//         elmt.style.visibility = "visible";
//       } else {
//         elmt.style.visibility = "hidden";
//       }
//     }
//     function removeObject(id) {
//       if (m_objects[id]) {
//         m_objects[id].gg.remove();
//         delete m_objects[id];
//       }
//       update_tooltip();
//     }
//     function css(style) {
//       for (let key in style) {
//         d3.select(svg_elmt).style(key, style[key]);
//       }
//     }

//     let _refresh_scheduled = false;
//     function schedule_refresh() {
//       if (_refresh_scheduled) return;
//       _refresh_scheduled = true;
//       setTimeout(function() {
//         _refresh_scheduled = false;
//         do_refresh();
//       }, 10);
//       function do_refresh() {
//         if (m_x_range[0] == m_x_range[1] || m_y_range[0] == m_y_range[1])
//           return;
//         for (let id in m_objects) {
//           m_objects[id].object.update();
//         }
//       }
//     }

//     update_attributes();
//   }
