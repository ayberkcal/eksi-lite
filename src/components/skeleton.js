import React from 'react'
import { Skeleton } from 'antd'

export default () => (
    <div className="view">
        <div className="entry-normal">
            <Skeleton loading={true} active avatar />
        </div>
    </div>
)