import React from "react";
import ReactDOM from "react-dom";
import KifuTreeNode from "./KifuTreeNode.js"

import './KifuTree.css';

export default class KifuTree extends React.Component {
  onClick(e) {
    const path = e.target.dataset.path || e.target.parentNode.dataset.path || e.target.parentNode.parentNode.dataset.path;
    if (!path) {
      return; // do nothing
    }
    const pathArray = JSON.parse(path);

    if (e.target.classList.contains('readable-kifu')) {
      this.props.onClickPath(pathArray);
    } else if (e.target.classList.contains('up')) {
      this.props.onClickMoveUpFork(pathArray);
    } else if (e.target.classList.contains('down')) {
      this.props.onClickMoveDownFork(pathArray);
    } else if (e.target.classList.contains('remove')) {
      this.props.onClickRemoveFork(pathArray);
    }
  }
  componentDidUpdate(prevProps) {
    const needScroll = this.props.booleanCounterOfNeedScroll !== prevProps.booleanCounterOfNeedScroll;
    //console.log('componentDidUpdate', needScroll);
    if (needScroll) {
      const domNode = ReactDOM.findDOMNode(this);
      const currentElementDOMNode = domNode.querySelector('span.current');

      const currentElementBoundingRect = currentElementDOMNode.getBoundingClientRect();
      const currentElementLeft = domNode.scrollLeft + currentElementBoundingRect.left;
      const scrollLeft = Math.max(0, currentElementLeft - domNode.clientWidth / 2);
      domNode.scrollLeft = scrollLeft;
    }
  }
  render() {
    const { kifuTree, currentPath } = this.props;

    return (
      <ul className="kifu-tree" onClick={e => this.onClick(e)}>
        <KifuTreeNode
          kifuTreeNode={kifuTree}
          pathArray={[]}
          currentPath={currentPath} />
      </ul>
    );
  }
}
