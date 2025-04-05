import React from 'react';
import { useNode, Element } from '@craftjs/core';
import { Accordion, Form } from 'react-bootstrap';
import { Text } from './Text';

export const AccordionItemBody = ({ children }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Accordion.Body ref={ref => connect(drag(ref))}>
      {children}
    </Accordion.Body>
  );
}

export const AccordionItem = ({ id, title, content }) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <Accordion.Item eventKey={id} ref={ref => connect(drag(ref))}>
      <Accordion.Header>
        <Text text={title} fontSize={20} />
      </Accordion.Header>
      <Element canvas id="accordion-item-body" is={AccordionItemBody}>
        <Text text={content} fontSize={14} />
      </Element>
    </Accordion.Item>
  );  
};

const AccordionItemSettings = () => {
  const {
    actions: { setProp },
    title,
    content,
  } = useNode((node) => ({
    title: node.data.props.title,
    content: node.data.props.content,
  }));

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Accordion Item Header</Form.Label>
          <Form.Control placeholder={title} onChange={(e) => setProp((props) => (props.title = e.target.value), 500)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Accordion Item Content</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setProp((props) => (props.content = e.target.value), 500)} />
        </Form.Group>
      </Form>
    </>
  );
};


export const AccordionItemDefaultProps = {
  id: '',
  title: 'Accordion Item Title',
  content: 'Accordion Item Content',
};

AccordionItem.craft = {
  props: AccordionItemDefaultProps,
  related: {
    settings: AccordionItemSettings,
  },
};