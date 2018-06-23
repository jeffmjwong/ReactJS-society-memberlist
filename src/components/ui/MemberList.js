import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Member from './Member';

class MemberList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: [],
            loading: false,
            administrators: []
        };
    }

    componentWillMount() {
      this.style = {
        backgroundColor: 'skyblue'
      };
    }

    componentDidMount() {
      this.setState({ loading: true });
      fetch('https://api.randomuser.me/?results=12')
        .then(response => response.json())
        .then(json => json.results)
        .then(members => {
          console.log(members);
          this.setState({
            members,
            loading: false
          });
        })
        .catch(console.error);
    }

    render() {
        const { members, loading } = this.state;
        return (
            <div className="member-list" style={ this.style }>
            	<h1>Society Members</h1>
              { loading ? <h1>Loading...</h1> : <h1>{ members.length } members</h1> }
              { members.length ?
                  members.map((member, index) => {
                  return (
                    <Member
                      key={ index }
                      name={ member.name.title + ' ' + member.name.first + ' ' + member.name.last }
                      email={ member.email }
                      thumbnail={ member.picture.large } />
                  )}) :
                  <p>Currently 0 Members</p>
              }
            </div>
        )
   }
}

export default MemberList
