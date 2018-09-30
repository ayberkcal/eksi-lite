import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import { nameCharacterSelector, userfetchedSelector } from '../reducers/user'
import { Avatar, Row, Col, Tag, Icon, Button, Skeleton } from 'antd'

class User extends React.PureComponent {
  componentWillMount() {
    const {
      match: { params }
    } = this.props

    const { getUser } = this.props.userActions

    getUser(params).then(() => {})
  }

  follow = () => {
    const {
      match: { params }
    } = this.props
    const { setUserFollow } = this.props.userActions
    setUserFollow(params).then(() => {})
  }

  unfollow = () => {
    const {
      match: { params }
    } = this.props
    const { setUserUnfollow } = this.props.userActions
    setUserUnfollow(params).then(() => {})
  }

  topicsBlock = () => {
    const {
      match: { params }
    } = this.props
    const { setUserTopicsBlock } = this.props.userActions
    setUserTopicsBlock(params).then(() => {})
  }

  topicsUnblock = () => {
    const {
      match: { params }
    } = this.props
    const { setUserTopicsUnblock } = this.props.userActions
    setUserTopicsUnblock(params).then(() => {})
  }

  block = () => {
    const {
      match: { params }
    } = this.props
    const { setUserBlock } = this.props.userActions
    setUserBlock(params).then(() => {})
  }

  unBlock = () => {
    const {
      match: { params }
    } = this.props
    const { setUserUnblock } = this.props.userActions
    setUserUnblock(params).then(() => {})
  }

  render() {
    return (
      <React.Fragment>
        <div className="pr-normal">
          {!this.props.isFetched && <Skeleton loading={true} active avatar />}
          {this.props.isFetched && (
            <Row>
              <Col span={21}>
                <div className="title">
                  <h1>@{this.props.user.info.nick}</h1>
                  <ul className="statics">
                    <li key="Total" title="toplam entry sayısı">
                      {this.props.user.info.entryCounts.Total}
                    </li>
                    <li key="LastMonth" title="son 1 ayda girdiği entry sayısı">
                      {this.props.user.info.entryCounts.LastMonth}
                    </li>
                    <li
                      key="LastWeek"
                      title="son 1 haftada girdiği entry sayısı"
                    >
                      {this.props.user.info.entryCounts.LastWeek}
                    </li>
                    <li key="Today" title="son 24 saatte girdiği entry sayısı">
                      {this.props.user.info.entryCounts.Today}
                    </li>
                  </ul>
                </div>

                <div className="meta">
                  {!this.props.user.info.caylak && (
                    <span className="label">
                      <Tag color="green">Yazar</Tag>
                    </span>
                  )}
                  {this.props.user.info.caylak && (
                    <span className="label">
                      <Tag color="orange">Çaylak</Tag>
                    </span>
                  )}

                  {this.props.user.info.hasEntryUsedOnSeyler && (
                    <span className="label">
                      <Tag color="#55cbe2">Ekşi Şeyler</Tag>
                    </span>
                  )}

                  {this.props.user.info.banned && (
                    <span className="label">
                      <Tag color="red">Yasaklı</Tag>
                    </span>
                  )}
                </div>

                <div className="meta-socials">
                  {this.props.user.info.facebook && (
                    <span>
                      <a
                        href={`https://facebook.com/${
                          this.props.user.info.facebook
                        }`}
                        target="_blank"
                      >
                        <Icon type="facebook" />
                      </a>
                    </span>
                  )}

                  {this.props.user.info.instagram && (
                    <span>
                      <a
                        href={`https://instagram.com/${
                          this.props.user.info.instagram
                        }`}
                        target="_blank"
                      >
                        <Icon type="instagram" />
                      </a>
                    </span>
                  )}

                  {this.props.user.info.twitter && (
                    <span>
                      <a
                        href={`https://twitter.com/${
                          this.props.user.info.twitter
                        }`}
                        target="_blank"
                      >
                        <Icon type="twitter" />
                      </a>
                    </span>
                  )}
                </div>

                <div className="meta">
                  <span>
                    <Link to={`/user/${this.props.user.info.nick}/entrys`}>
                      Entryleri
                    </Link>
                  </span>
                  <span>
                    <Link to={`/user/${this.props.user.info.nick}/favorites`}>
                      Favorileri
                    </Link>
                  </span>
                  <span
                    onClick={
                      this.props.user.info.topicsBlocked
                        ? this.topicsUnblock
                        : this.topicsBlock
                    }
                  >
                    {this.props.user.info.topicsBlocked
                      ? 'Başlıklarını Göster'
                      : 'Başlıklarını Engelle'}
                  </span>
                  <span
                    onClick={
                      this.props.user.info.blocked ? this.unBlock : this.block
                    }
                  >
                    {this.props.user.info.blocked
                      ? 'Engellemeyi Kaldır'
                      : 'Engelle'}
                  </span>
                </div>
              </Col>
              <Col span={3}>
                <Avatar
                  src={this.props.user.info.picture}
                  size={64}
                  className="pr-avatar"
                >
                  {this.props.character}
                </Avatar>
                <div className="meta">
                  <Button
                    type={this.props.user.info.friend ? 'default' : 'primary'}
                    className="follow-btn"
                    size="small"
                    onClick={
                      this.props.user.info.friend ? this.unfollow : this.follow
                    }
                  >
                    {this.props.user.info.friend ? 'takip etme' : 'takip et'}
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </div>
        {this.props.children}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  character: nameCharacterSelector(state),
  isFetched: userfetchedSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)
)
