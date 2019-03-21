import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import {
  Crosshair,
  XYPlot,
  XAxis,
  HorizontalGridLines,
  LineSeries
} from "react-vis";

import { isEmpty } from "../../utils";

class SpikeSprayInner extends Component {
  constructor(props) {
    super(props);
    this.state = { splitSpikeCols: [], spikeCols: [], hoveredNode: null };
  }