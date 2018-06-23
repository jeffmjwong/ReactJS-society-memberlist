import FaShield from 'react-icons/lib/fa/shield'
import React, { Component } from 'react';

class Member extends Component {
	render() {
		const { name, thumbnail, email } = this.props;
    return (
        <div className="member">
        	<h1>{ name }</h1>
					<img src={ thumbnail } alt="profile-picture" />
					<p>
						<a href={ `mailto:${email}` }>{ email }</a>
					</p>
        </div>
    );
	}
}

export default Member;
