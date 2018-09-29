import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as userActions from '../actions/user'
import User from './user'
import { Skeleton, List, Icon, Button } from 'antd'
import { favsListSelector, fetchedFavsSelector } from '../reducers/user'
import ShowMore from '../components/show_more'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text > 0 ? text : null}
  </span>
)

const LoadMore = (props) =>
  !props.hide ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px'
      }}
    >
      <Button onClick={() => props.onLoadMore()}>Daha Fazla Göster</Button>
    </div>
  ) : null

class MyFavorites extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadmore: false,
      page: 1
    }
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props

      const { getUserFavoriteEntrys } = this.props.userActions
      getUserFavoriteEntrys(params).then(() => {})
  }

  loadmore = () => {
      const { getUserFavoriteEntrys } = this.props.userActions
    const { pageSize } = this.props.favorites

    if (this.state.page != pageSize) {
      let page = this.state.page + 1
        getUserFavoriteEntrys({ p: page }).then(() => {
        this.setState({
          page: page,
          loadmore: (this.props.favorites.pageSize = page ? true : false)
        })
      })
    }
  }

  render() {
    return (
      <User>
        <div className="entry-normal">
          {!this.props.isFetched && <Skeleton loading={true} active avatar />}

          {this.props.isFetched && (
            <List
              dataSource={this.props.list}
              itemLayout="vertical"
              loadMore={
                <LoadMore
                  onLoadMore={this.loadmore}
                  hide={this.state.loadmore}
                />
              }
              renderItem={(item) => (
                <List.Item
                  key={item.Entry.Id}
                  actions={[
                    <IconText type="star-o" text={item.Entry.FavoriteCount} />
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Link to={`/topic/${item.TopicId.Id}`}>
                        {item.TopicId.Title}
                      </Link>
                    }
                    description={<ShowMore text={item.Entry.Content} />}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </User>
    )
  }
}

const mapStateToProps = (state) => ({
  favorites: state.user.favorites,
  list: favsListSelector(state),
  isFetched: fetchedFavsSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavorites)
