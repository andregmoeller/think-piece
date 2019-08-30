import React, { Component } from 'react';
import { auth, firestore } from '../firebase';
import Posts from './Posts';
import { throwStatement } from '@babel/types';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unssubscribeFromFirestore = null;
  unssubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unssubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unssubscribeFromFirestore();

  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
