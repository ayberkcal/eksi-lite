import React from 'react'
import { Row, Col, Button, Radio, Icon, Input } from 'antd'
import Loader from './loader'

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  next = () => {
    let next =
      this.props.current !== this.props.total
        ? this.props.current + 1
        : this.props.current
    if (this.props.onChange && next != this.props.current) {
      this.props.onChange(next)
    }
  }

  prev = () => {
    let prev =
      this.props.current <= 1 ? this.props.current : this.props.current - 1
    if (this.props.onChange && prev != this.props.current) {
      this.props.onChange(prev)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={2}>
            <Button
              type="default"
              shape="circle"
              icon="left"
              onClick={this.prev}
              disabled={this.props.status === 'fetching' ? true : false}
            />
          </Col>
          <Col span={20}>
            <span style={{ color: '#81c14b', fontSize: 15 }}>
              {this.props.status === 'fetching' && <Loader color="#81c14b" />}

              {this.props.status !== 'fetching' && (
                <React.Fragment>
                  {this.props.current == 0
                    ? this.props.defaultCurrent
                    : this.props.current}{' '}
                  &nbsp; / &nbsp;{' '}
                  {this.props.total == 0 ? '...' : this.props.total}
                </React.Fragment>
              )}
            </span>
          </Col>
          <Col span={2}>
            <Button
              type="default"
              shape="circle"
              icon="right"
              onClick={this.next}
              disabled={this.props.status === 'fetching' ? true : false}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
