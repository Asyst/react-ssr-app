import React from 'react';
import Loader from 'react-loaders';
import { Grid, Segment, Card, Icon, Image, Sticky, Rail } from 'semantic-ui-react';

import SideMenu from '../SideMenu/SideMenu';
import AdvertisementContainer from '../Advertisement/Advertisement'

const NewsFeed = ({ news, isLoading, contextRef }) => (
    <Grid centered columns={2}>
        <Grid.Column>
            <Rail position="left">
                <Sticky context={ contextRef } offset={50}>
                    <SideMenu />
                </Sticky>
            </Rail>

            <Rail position="right">
                <Sticky context={ contextRef } offset={50}>
                    <AdvertisementContainer />
                </Sticky>
            </Rail>

            <div className="card-container">
                { news.map(item => 
                    <Card key={ item.id } id={ item.id }>
                        <Card.Content extra>
                            <Card.Header>
                                { item.name }
                            </Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Image src={ item.avatar } />
                        </Card.Content>
                        
                        <Card.Content> 
                            <Card.Meta>
                                <span className='date'>
                                Joined in 2015
                                </span>
                            </Card.Meta>
                            <Card.Description>
                                Matthew is a musician living in Nashville.
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
                            </a>
                        </Card.Content>
                    </Card>)
                }

                { isLoading && <Loader type="ball-pulse" active /> }
            </div>
        </Grid.Column>
    </Grid>
);

export default NewsFeed;