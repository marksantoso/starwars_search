import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { changeLanguage } from '../actions/accessibilityActions';
import { updateFontSize } from '../actions/accessibilityActions';

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
    };

    _changeToWookie() {
        this.setState({ chewy: chewy, english: english_disabled });
        this.props.changeLanguage('wookiee');
    };

    _increaseFont() {
        const elements = document.querySelectorAll('*');
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

        elements.forEach(function(item, i) {
            let currentFontSize = document.defaultView.getComputedStyle(item, null).fontSize;
            // Convert string to int
            currentFontSize = parseInt(currentFontSize);
            // Increase current fontsize by 1
            item.style.fontSize = currentFontSize + 1 + 'px';
        });

        this.props.updateFontSize(newFontSize);
    }


    _decreaseFont() {
        const elements = document.querySelectorAll('*');
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

        elements.forEach(function(item, i) {
            let currentFontSize = document.defaultView.getComputedStyle(item, null).fontSize;
                // Convert string to int
                currentFontSize = parseInt(currentFontSize);
                // Decrease current fontsize by 1
                item.style.fontSize = currentFontSize - 1 + 'px';
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
        if (this.props.accessibility.fontSize == 'bigger') {
                increaseFontColor = {
                    color: '#d7d7d7'
                }
        }

        let decreaseFontColor;
        if (this.props.accessibility.fontSize == 'smaller') {
                decreaseFontColor = {
                    color: '#d7d7d7'
                }
        }


         return (
            <div className="acess-container">
                <div className="col-md-3 col-md-offset-7">
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
                <div className="col-md-2  no-pad-right">
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

export default connect(mapStateToProps, { changeLanguage, updateFontSize })( Accessibility );
