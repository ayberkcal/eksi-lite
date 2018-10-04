import React from 'react'
import { Popover } from 'antd'
import asyncComponent from '../containers/asyncComponent'
const HeadChannelsDesktop = asyncComponent(() =>
  import('../containers/header_channels_desktop')
)
const HeadChannelsMobile = asyncComponent(() =>
    import('../containers/header_channels_mobile')
)

export default () => (
  <React.Fragment>
      <div className="desktop-channels"> 
            <Popover placement="bottom" content={<HeadChannelsDesktop />}>
                <span className="more">•••</span>
            </Popover>
      </div>
    <div className="mobile-channels">
        <HeadChannelsMobile />
    </div>
  </React.Fragment>
)
