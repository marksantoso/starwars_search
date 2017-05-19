import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { changeLanguage, updateFontSize } from '../actions/accessibilityActions';
import { getChars } from '../actions/charactersActions';

// images import
import chewy from '../assets/images/accessibility/chewbacca.png';
import english from '../assets/images/accessibility/english_flag.png';
import chewy_disabled from '../assets/images/accessibility/chewbacca_grey.png';
import english_disabled from '../assets/images/accessibility/english_flag_grey.png';


class Accessibility extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            chewy: chewy_disabled,
            english: english
        };
    }

    _changeToEnglish() {
        this.setState({ chewy: chewy_disabled, english: english });
        this.props.changeLanguage('english');
        this.props.getChars(null, this.props.api.rootUrl, null);
    };

    _changeToWookie() {
        this.setState({ chewy: chewy, english: english_disabled });
        this.props.changeLanguage('wookiee');
        this.props.getChars('wookiee', this.props.api.rootUrl, null);
    };

    _increaseFont() {
        if (this.props.api.loading) return;
        let newFontSize;

        switch (this.props.accessibility.fontSize) {
            case 'smallest':
                newFontSize = 'smaller';
                break;
            case 'smaller':
                newFontSize = 'small';
                break;
            case 'small':
                newFontSize = 'normal';
                break;
            case 'normal':
                newFontSize = 'big';
                break;
            case 'big':
                newFontSize = 'bigger';
                break;
            default:
                return;
        }

        let currentFontSize = document.defaultView.getComputedStyle(document.body, null).fontSize;
        currentFontSize = parseInt(currentFontSize);
        // Increase current fontsize by 1
        document.body.style.fontSize = currentFontSize + 1 + 'px';

        const tiles = document.getElementsByClassName('content');
        const currentHeight = document.defaultView.getComputedStyle(tiles[0], null).height;

        // getElementsByClassName returns html collection obj not a true array, so convert to array
        Array.from(tiles).forEach(function(item, i) {
            item.style.height = currentHeight + 1 + 'px';
        });

        this.props.updateFontSize(newFontSize);
    }


    _decreaseFont() {

        if (this.props.api.loading) return;

        let newFontSize;

        switch (this.props.accessibility.fontSize) {
            case 'biggest':
                newFontSize = 'bigger';
                break;
            case 'bigger':
                newFontSize = 'big';
                break;
            case 'big':
                newFontSize = 'normal';
                break;
            case 'normal':
                newFontSize = 'small';
                break;
            case 'small':
                newFontSize = 'smaller';
                break;
            default:
                return;
        }

        let currentFontSize = document.defaultView.getComputedStyle(document.body, null).fontSize;
        currentFontSize = parseInt(currentFontSize);
        // Increase current fontsize by 1
        document.body.style.fontSize = currentFontSize - 1 + 'px';

        const tiles = document.getElementsByClassName('content');
        const currentHeight = document.defaultView.getComputedStyle(tiles[0], null).height;

        // getElementsByClassName returns html collection obj not a true array, so convert to array
        Array.from(tiles).forEach(function(item, i) {
            item.style.height = currentHeight - 1 + 'px';
        });

        this.props.updateFontSize(newFontSize);
    }


    render() {

        const wookiePopover = (
          <Popover id="popover-trigger-hover-focus" className="pop-over">
            Wookie
          </Popover>
        );

        const englishPopover = (
          <Popover id="popover-trigger-hover-focus" className="pop-over">
            English
          </Popover>
        );

        const increaseFontPopover = (
          <Popover id="popover-trigger-hover-focus" className="pop-over">
            Increase font
          </Popover>
        );

        const decreaseFontPopover = (
          <Popover id="popover-trigger-hover-focus" className="pop-over">
            Decrease font
          </Popover>
        );

        let increaseFontColor;
        if (this.props.accessibility.fontSize == 'bigger' || this.props.api.loading) {
                increaseFontColor = {
                    color: '#d7d7d7'
                }
        }

        let decreaseFontColor;
        if (this.props.accessibility.fontSize == 'smaller' || this.props.api.loading) {
                decreaseFontColor = {
                    color: '#d7d7d7'
                }
        }

         return (
            <div className="access-container">
                <div className="fonts">
                    <div className="font-size">
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"  overlay={decreaseFontPopover} name="decreaseFont " onClick={this._decreaseFont.bind(this)}>
                            <div className="decrease" style={decreaseFontColor}>
                                A<span className="minus">-</span>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"  overlay={increaseFontPopover} name="increaseFont" onClick={this._increaseFont.bind(this)}>
                            <div className="increase" style={increaseFontColor}>
                                A<span className="plus">+</span>
                            </div>
                        </OverlayTrigger>

                    </div>
                </div>
                <div className="language">
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"  overlay={englishPopover} name="english" onClick={this._changeToEnglish.bind(this)}>
                        <img className="english-flag"  src={ this.state.english }  />
                    </OverlayTrigger>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom"  overlay={wookiePopover} name="chewy" onClick={this._changeToWookie.bind(this)}>
                        <img className="wookie"  src={ this.state.chewy }  />
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    const { api, accessibility } = state
    return { api, accessibility };
}

export default connect(mapStateToProps, { changeLanguage, updateFontSize, getChars })(Accessibility);
