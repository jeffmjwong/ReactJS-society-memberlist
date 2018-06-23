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
        this.makeAdmin = this.makeAdmin.bind(this);
        this.removeAdmin = this.removeAdmin.bind(this);
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

    makeAdmin(email) {
      const administrators = [...this.state.administrators, email];
      this.setState({
        administrators
      });
    }

    removeAdmin(email) {
      const administrators = this.state.administrators.filter(adminEmail => adminEmail !== email);
      this.setState({
        administrators
      });
    }

    render() {
        const { members, loading, administrators } = this.state;
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
                      thumbnail={ member.picture.large }
                      admin={ this.state.administrators.includes(member.email) }
                      makeAdmin={ this.makeAdmin }
                      removeAdmin={ this.removeAdmin } />
                  )}) :
                  <p>Currently 0 Members</p>
              }
            </div>
        )
   }
}

export default MemberList
