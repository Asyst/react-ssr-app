import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

class Header extends Component {
    state = {
        activeItem: 'gamepad'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu icon='labeled'>
                <Menu.Item>
                    <h3 style={ { display: 'flex', alignItems: 'center', height: '49px' } }>Logo</h3>
                </Menu.Item>
                <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}>
                    <Icon name='gamepad' />
                    Games
                </Menu.Item>

                <Menu.Item name='video camera' active={activeItem === 'video camera'} onClick={this.handleItemClick}>
                    <Icon name='video camera' />
                    Channels
                </Menu.Item>

                <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
                    <Icon name='video play' />
                    Videos
                </Menu.Item>
            </Menu>
        );
    }
}

export default Header;