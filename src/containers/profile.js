import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as myActions from '../actions/my'
import { nameCharacterSelector, mefetchedSelector } from '../reducers/me'
import { Avatar, Row, Col, Tag, Icon, Skeleton } from 'antd'

class Profile extends React.PureComponent {

  componentWillMount() {
    const { getMe } = this.props.myActions

    getMe().then(() => {
    })
  }

  render() {
  
    return <React.Fragment>
        <div className="pr-normal">
          {!this.props.isFetched && <Skeleton loading={true} active avatar />}
          {this.props.isFetched && <Row>
              <Col span={21}>
                <div className="title">
                  <h1>@{this.props.me.info.nick}</h1>
                  <ul className="statics">
                    <li key="Total" title="toplam entry sayısı">
                      {this.props.me.info.entryCounts.Total}
                    </li>
                    <li key="LastMonth" title="son 1 ayda girdiği entry sayısı">
                      {this.props.me.info.entryCounts.LastMonth}
                    </li>
                    <li key="LastWeek" title="son 1 haftada girdiği entry sayısı">
                      {this.props.me.info.entryCounts.LastWeek}
                    </li>
                    <li key="Today" title="son 24 saatte girdiği entry sayısı">
                      {this.props.me.info.entryCounts.Today}
                    </li>
                  </ul>
                </div>

                <div className="meta">
                  {!this.props.me.info.caylak && <span className="label">
                      <Tag color="green">Yazar</Tag>
                    </span>}
                  {this.props.me.info.caylak && <span className="label">
                      <Tag color="orange">Çaylak</Tag>
                    </span>}

                  {this.props.me.info.hasEntryUsedOnSeyler && <span className="label">
                      <Tag color="#55cbe2">Ekşi Şeyler</Tag>
                    </span>}

                  {this.props.me.info.banned && <span className="label">
                      <Tag color="red">Yasaklı</Tag>
                    </span>}
                </div>

                <div className="meta-socials">
                  {this.props.me.info.facebook && <span>
                      <a href={`https://facebook.com/${this.props.me.info.facebook}`} target="_blank">
                        <Icon type="facebook" />
                      </a>
                    </span>}

                  {this.props.me.info.instagram && <span>
                      <a href={`https://instagram.com/${this.props.me.info.instagram}`} target="_blank">
                        <Icon type="instagram" />
                      </a>
                    </span>}

                  {this.props.me.info.twitter && <span>
                      <a href={`https://twitter.com/${this.props.me.info.twitter}`} target="_blank">
                        <Icon type="twitter" />
                      </a>
                    </span>}
                </div>
                <div className="meta">
                  <span>
                    <Link to={`/profile/entrys`}>Entryleri</Link>
                  </span>
                  <span>
                    <Link to={`/profile/favorites`}>Favorileri</Link>
                  </span>
                </div>
              </Col>
              <Col span={3}>
                <Avatar src={this.props.me.info.picture} size={64} className="pr-avatar">
                  {this.props.character}
                </Avatar>
              </Col>
            </Row>}
        </div>
      {this.props.children}
      </React.Fragment>
  }
}

const mapStateToProps = (state) => ({
  me: state.me,
  character: nameCharacterSelector(state),
  isFetched: mefetchedSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
