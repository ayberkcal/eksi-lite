import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as entryActions from '../actions/entrys'
import Skeleton from '../components/skeleton'
import { Row, Col, Divider, Button, Icon } from 'antd'
import { entrysStatusSelector, entrysListSelector } from '../reducers/entrys'
import Pagination from '../components/pagination'
import ShowMore from '../components/show_more'
import { parse, stringify } from 'query-string'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import en from 'date-fns/locale/en'

class Entrys extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { page } = parse(this.props.location.search)
    const {
      match: {
        params: { topic_id }
      }
    } = this.props
    const { getEntrys } = this.props.entryActions

    getEntrys(topic_id, { p: page }).then(() => {})
  }

  pageChange = (page) => {
    const { history, location } = this.props
    const {
      match: {
        params: { topic_id }
      }
    } = this.props
    const { getEntrys } = this.props.entryActions

    getEntrys(topic_id, { p: page }).then(() => {
      history.replace({ ...location, search: stringify({ page: page }) })
    })
  }

  favoriteEntry(entry_id) {
    const { setEntryFavorite } = this.props.entryActions

    setEntryFavorite(entry_id).then(() => {})
  }
  unFavoriteEntry(entry_id) {
    const { setEntryUnFavorite } = this.props.entryActions

    setEntryUnFavorite(entry_id).then(() => {})
  }

  render() {
    const { list, status } = this.props
    return <div className="view">
        <div className="topics-pagination">
          <div className="view">
            <Pagination defaultCurrent={1} current={this.props.entrys.page} total={this.props.entrys.pageTotal} onChange={this.pageChange} status={status} />
          </div>
        </div>
        <div className="message-container">
          {status === 'fetching' && <React.Fragment>
              {Array.from({
                length: 25
              }).map((_, i) => <Skeleton avatar key={i} />)}
            </React.Fragment>}

          {status === 'success' && <React.Fragment>
              <div className="entry-info">
                <Row>
                  <Col span={20}>
                    <h3>{this.props.entrys.info.title} </h3>
                  </Col>
                  <Col span={4}>
                    {this.props.entrys.info.isTrackable && <React.Fragment>
                        {!this.props.entrys.info.isTracked && <Icon type="plus-circle" />}
                        {this.props.entrys.info.isTracked && <Icon type="minus-circle" />}
                      </React.Fragment>}
                  </Col>
                </Row>
              </div>
              <div className="entrys-list">
                {list.map((entry) => (
                  <div className="entry-block" key={entry.Id}>
                    <div className="entry-content">
                      <ShowMore text={entry.Content} />
                    </div>
                    <div className="entry-info-block">
                      <Divider orientation="right">
                        <Link
                          to={`/user/${entry.Author.Nick}`}
                          className="entry-user"
                        >
                          {entry.Author.Nick}
                        </Link>
                      </Divider>
                      <Row>
                        <Col span={12}>
                          <span
                            className="entry-favorite-action"
                            onClick={() =>
                              entry.IsFavorite
                                ? this.unFavoriteEntry(entry.Id)
                                : this.favoriteEntry(entry.Id)
                            }
                          >
                            <Icon
                              type={entry.IsFavorite ? 'star' : 'star-o'}
                              className={
                                entry.IsFavorite
                                  ? 'entry-favorite-action--active'
                                  : 'entry-favorite-action--default'
                              }
                            />
                            &nbsp;
                            {entry.FavoriteCount}
                          </span>
                        </Col>
                        <Col span={12}>
                          <Link
                            to={`/entry/${entry.Id}`}
                            className="entry-date"
                          >{`${distanceInWordsToNow(
                            new Date(entry.Created),
                            {
                              locale: en // todo: remove after
                            }
                          )}`}</Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>}
        </div>
      </div>
  }
}

const mapStateToProps = (state) => ({
  entrys: state.entrys.list,
  list: entrysListSelector(state),
  status: entrysStatusSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  entryActions: bindActionCreators(entryActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrys)
