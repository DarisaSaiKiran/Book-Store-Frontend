import React from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    axios
      .get('http://localhost:8082/user/users')
      .then((response) => response.data)
      .then((data) => {
        this.setState({ users: data });
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div className="bgad">
        <AdminDashboard />
        <div>
          <div style={{ display: this.state.show ? 'block' : 'none' }}>
            <MyToast show={this.state.show} message={'User Deleted Successfully.'} type={'danger'} />
          </div>
          <div className="row">
            {users.length === 0 ? (
              <div className="col-12 text-center">
                <p>No Users Available</p>
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} style={{ width: '14rem', margin: '10px', position: 'relative' }}>
                  <Card>
                  <Card.Img variant="top" src={user.profileImageUrl} className="img-fluid" style={{ width: '100%', height: '10rem' }} />
                    <Card.Body>
                      <Card.Title>{user.username}</Card.Title>
                      <Card.Text>Email: </Card.Text>
                      <Card.Text>{user.email}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
