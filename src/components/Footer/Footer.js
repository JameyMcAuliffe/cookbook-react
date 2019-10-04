import React from 'react';

import './Footer.css';
import GithubLogo from '../../images/github.png';
import LinkedInLogo from '../../images/linked.png';

const Footer = () => (
	<footer className="page-footer font-small">
		<div className="container-fluid text-center">
			<div className="row justify-content-center">
			<a href="https://github.com/JameyMcAuliffe">
				<img src={GithubLogo} alt="github-logo" className="footer-logo mt-3 mb-3 mr-3"/>
			</a>
			<a href="https://www.linkedin.com/in/jamey-mcauliffe/">
				<img src={LinkedInLogo} alt="linked-in-logo" className="footer-logo mt-3 mb-3 ml-3"/>
			</a>
			</div>
		</div>
	</footer>
);

export default Footer
