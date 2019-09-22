import React, { Component } from 'react';
import { auth, createUserProfileDocument } from '../firebase';
import Posts from './Posts';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    user: null,
  };

  unssubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unssubscribeFromAuth();
  };

  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts />
      </main>
    );
  }
}

export default Application;
