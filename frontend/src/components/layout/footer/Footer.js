import React from 'react';
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './footer.css';
function Footer() {
    return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUT APP</h4>
            <p >Available for Android and iOS device. </p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>
        <div className="midFooter">
            <h1>Bazar</h1>
            <p>High Quality is our first Priority </p>
            <p className='p2'>Long live the Introverts</p>

            <p>Copyrights 2022 &copy; Monirul Islam</p>
        </div>
        <div className="rightFooter">
            <h4>FOLLOW US</h4>
            <a href="https//:facebook.com">facebook</a>
            <a href="https//:facebook.com">instagram</a>
            <a href="https//:facebook.com">twitter</a>
        </div>
    </footer>
    
    );
}

export default Footer;
