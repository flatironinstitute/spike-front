import React from "react";
import PathLink from "./components/PathLink/PathLink";

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function formatToNDigits(value, digits) {
  return value.toFixed(digits);
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getRandomKeyInt(index) {
  return Math.floor(Math.random() * 100000) + index;
}

export function abbreviateSha1Path(path, opts) {
  opts = opts || {};
  return (
    <PathLink
      path={path}
      abbreviate={true}
      canCopy={true}
      canDownload={opts.canDownload || false}
    />
  );
  // let list0 = path.split('/');
  // return <span title={path}>{`${list0[0]}//.../${list0[list0.length-1]}`}</span>;
}
