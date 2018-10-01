import React from 'react'
import { Spin, Icon } from 'antd'

export default ({ size = 24, color }) => <Spin indicator={<Icon type="loading" style={{ fontSize: size, color }} spin />} />