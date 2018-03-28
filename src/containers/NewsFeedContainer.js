import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import { userSelector } from '../selectors/userSelector';
import { isLoading } from '../selectors/isLoading';
import fp from 'lodash-fp';

import NewsFeed from '../components/NewsFeed/NewsFeed';

class NewsFeedContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.loadMoreOnce = fp.throttle(5000)(props.loadMoreAction);
        this.bodyCoords = 0;
    }

    handleContextRef = contextRef => this.setState({ contextRef })

    handleScroll = (e) => {
        const { isLoading } = this.props;

        let lastCard = document.querySelector('.card-container .card:last-child');
        let lastCardId = lastCard.getAttribute('id');
        let cardContLast = lastCard.getBoundingClientRect();
        console.log('scroll lastCard -> ', lastCardId);
        // console.log('scroll isLoading -> ', isLoading);
    
        if (cardContLast.bottom <= this.bodyCoords.bottom) {
            console.log('last elemet -> ', lastCardId);
            // console.log('last elemet -> ', loadMoreAction);
            cardContLast = {};
            !isLoading && this.loadMoreOnce(lastCardId);
        }
    }

    // lifecycles
    componentWillMount() {
        const { fetchUsersAction } = this.props;
        // fetchUsersAction();
    }

    componentDidMount() {
        const { loadMoreAction } = this.props;

        this.bodyCoords = document.querySelector('body').getBoundingClientRect();
    }
    
    render() {
        const { contextRef } = this.state;
        const { news, isLoading } = this.props;

        if (!isLoading) {
            process.env.IS_BROWSER && window.addEventListener('scroll', this.handleScroll);
            console.log('init listener -> ', isLoading);
        }
        else {
            process.env.IS_BROWSER && window.removeEventListener('scroll', this.handleScroll);
            console.log('remove listener -> ', isLoading);
        }

        return (
            <div className="main-wrapper" ref={ this.handleContextRef }>
                <NewsFeed 
                    news={ news } 
                    isLoading={ isLoading }
                    contextRef={ contextRef } />;
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('NewsFeed state -> ', isLoading(state));
    return { 
        isLoading: isLoading(state),
        news: userSelector(state),
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedContainer);