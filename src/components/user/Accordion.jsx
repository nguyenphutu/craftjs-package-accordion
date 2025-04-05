import React from 'react';
import { useNode, Element } from '@craftjs/core';
import { Accordion } from 'react-bootstrap';
import { AccordionItem } from './AccordionItem.jsx';

export const AccordionCraft = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Accordion style={{ padding: '5px 0' }} ref={ref => connect(drag(ref))}>
      {children}
    </Accordion>
  );
};

AccordionCraft.craft = {
  rules: {
    canMoveIn: (incomingNodes) => {
      incomingNodes.forEach((incomingNode) => {
        incomingNode.data.props.id = `accordion-item-${incomingNode.id}`;
      });
      return incomingNodes.every((incomingNode) => incomingNode.data.type === AccordionItem);
    },
  },
};

export const AccordionMain = () => {
  return (
    <Element canvas id="accordion" is={AccordionCraft} data-cy="accordion">
      <AccordionItem id="1" title='Accordion Item Title' content='Accordion Item Content' />
    </Element>
  );
};